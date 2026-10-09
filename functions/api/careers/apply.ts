import {
  buildCareersApplyEmailContent,
  bytesToBase64,
  CAREERS_APPLY_LIMITS,
  isPdfBuffer,
  parseCareersApplyForm,
} from "../../lib/careers-apply";
import {
  ContactEmailSendError,
  sendContactEmail,
  type ContactMailEnv,
} from "../../lib/send-contact-email";

interface Env extends ContactMailEnv {
  FROM_EMAIL: string;
  CAREERS_EMAIL: string;
}

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function jsonResponse(body: object, status: number): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function isLocalRequest(request: Request): boolean {
  const host = [
    request.headers.get("Host"),
    request.headers.get("X-Forwarded-Host"),
  ]
    .filter(Boolean)
    .join(" ");
  return /localhost|127\.0\.0\.1|:8788\b/.test(host);
}

function mapSendErrorToClient(
  request: Request,
  err: ContactEmailSendError,
): { status: number; message: string } {
  const local = isLocalRequest(request);

  if (err.code === "rest_not_configured") {
    return {
      status: 503,
      message: local
        ? "Email API is not configured. Run: npm run setup:email (requires wrangler login), then restart npm run dev."
        : "Unable to submit your application right now. Please try again later.",
    };
  }

  if (err.code === "rest_rejected" || err.httpStatus === 401 || err.httpStatus === 403) {
    return {
      status: 502,
      message: local
        ? `Email provider rejected the request (${err.message}). Re-run npm run setup:email or update Pages secrets.`
        : "Unable to submit your application right now. Please try again later.",
    };
  }

  return {
    status: 500,
    message: local
      ? `Sending failed (${err.code}). See the wrangler \"api\" terminal logs for details.`
      : "Unable to submit your application right now. Please try again later.",
  };
}

function safeResumeFilename(raw: string): string {
  const cleaned = raw.replace(/[^\w.\- ()]+/g, "").trim().slice(0, 200);
  const base = cleaned || "resume.pdf";
  return base.toLowerCase().endsWith(".pdf") ? base : `${base.replace(/\.[^.]+$/, "")}.pdf`;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const contentLength = request.headers.get("Content-Length");
  if (
    contentLength &&
    Number(contentLength) > CAREERS_APPLY_LIMITS.maxMultipartBytes
  ) {
    return jsonResponse({ ok: false, error: "Request too large." }, 413);
  }

  const contentType = request.headers.get("Content-Type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const fields = parseCareersApplyForm(form);
  if (!fields) {
    return jsonResponse(
      { ok: false, error: "Please check the form fields and try again." },
      400,
    );
  }

  if (fields.website) {
    return jsonResponse({ ok: true }, 200);
  }

  const resumeEntry = form.get("resume");
  if (!resumeEntry || typeof resumeEntry === "string") {
    return jsonResponse(
      { ok: false, error: "Please attach your resume as a PDF file." },
      400,
    );
  }

  const resumeFile = resumeEntry as File;
  if (
    resumeFile.size <= 0 ||
    resumeFile.size > CAREERS_APPLY_LIMITS.maxResumeBytes
  ) {
    return jsonResponse(
      {
        ok: false,
        error: "Resume must be a PDF no larger than 4 MB.",
      },
      400,
    );
  }

  const resumeType = resumeFile.type.toLowerCase();
  const resumeName = resumeFile.name.toLowerCase();
  if (resumeType !== "application/pdf" && !resumeName.endsWith(".pdf")) {
    return jsonResponse(
      { ok: false, error: "Resume must be a PDF file." },
      400,
    );
  }

  let bytes: Uint8Array;
  try {
    const buffer = await resumeFile.arrayBuffer();
    bytes = new Uint8Array(buffer);
  } catch {
    return jsonResponse({ ok: false, error: "Could not read resume file." }, 400);
  }

  if (!isPdfBuffer(bytes)) {
    return jsonResponse(
      { ok: false, error: "Resume must be a valid PDF file." },
      400,
    );
  }

  const fromEmail = env.FROM_EMAIL?.trim();
  const careersEmail = env.CAREERS_EMAIL?.trim();
  if (!fromEmail || !careersEmail) {
    console.error("careers_apply_config_missing", {
      hasFrom: Boolean(fromEmail),
      hasCareers: Boolean(careersEmail),
    });
    const local = isLocalRequest(request);
    return jsonResponse(
      {
        ok: false,
        error: local
          ? "Missing FROM_EMAIL or CAREERS_EMAIL in .dev.vars. Add them to .env.local and restart npm run dev."
          : "Unable to submit your application right now. Please try again later.",
      },
      503,
    );
  }

  const submittedAt = new Date();
  const { subject, text, html } = buildCareersApplyEmailContent(fields, submittedAt);
  const filename = safeResumeFilename(resumeFile.name);

  try {
    const result = await sendContactEmail(env, {
      to: careersEmail,
      from: fromEmail,
      replyTo: fields.email,
      subject,
      text,
      html,
      attachments: [
        {
          filename,
          content: bytesToBase64(bytes),
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    });
    console.log("careers_apply_send_accepted", { method: result.method });
    return jsonResponse(
      {
        ok: true,
        message:
          "Your application was submitted. Our team will review it and reach out if there is a fit.",
      },
      200,
    );
  } catch (err: unknown) {
    if (err instanceof ContactEmailSendError) {
      const mapped = mapSendErrorToClient(request, err);
      return jsonResponse({ ok: false, error: mapped.message }, mapped.status);
    }
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: string }).code)
        : "unknown";
    console.error("careers_apply_send_failed", { code });
    return jsonResponse(
      {
        ok: false,
        error: isLocalRequest(request)
          ? `Sending failed (${code}). Check the wrangler api process logs.`
          : "Unable to submit your application right now. Please try again later.",
      },
      500,
    );
  }
}
