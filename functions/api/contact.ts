import {
  MARKETING_FROM_NAME,
  MARKETING_INBOX,
} from "../../shared/email-recipients";
import {
  buildContactAutoReplyContent,
  buildContactEmailContent,
  CONTACT_LIMITS,
  formatEmailFrom,
  parseContactPayload,
  verifyTurnstile,
} from "../lib/contact";
import {
  ContactEmailSendError,
  sendContactEmail,
  type ContactMailEnv,
} from "../lib/send-contact-email";

interface Env extends ContactMailEnv {
  FROM_EMAIL: string;
  CONTACT_EMAIL: string;
  TURNSTILE_SECRET_KEY?: string;
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
        : "Unable to send your message right now. Please try again later.",
    };
  }

  if (err.code === "rest_rejected" || err.httpStatus === 401 || err.httpStatus === 403) {
    return {
      status: 502,
      message: local
        ? `Email provider rejected the request (${err.message}). Re-run npm run setup:email or update Pages secrets.`
        : "Unable to send your message right now. Please try again later.",
    };
  }

  return {
    status: 500,
    message: local
      ? `Sending failed (${err.code}). See the wrangler \"api\" terminal logs for details.`
      : "Unable to send your message right now. Please try again later.",
  };
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const contentLength = request.headers.get("Content-Length");
  if (contentLength && Number(contentLength) > CONTACT_LIMITS.maxJsonBytes) {
    return jsonResponse({ ok: false, error: "Request too large." }, 413);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const payload = parseContactPayload(raw);
  if (!payload) {
    return jsonResponse({ ok: false, error: "Please check the form fields and try again." }, 400);
  }

  if (payload.website) {
    return jsonResponse({ ok: true }, 200);
  }

  const turnstileSecret = env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const token = payload.turnstileToken?.trim();
    if (!token) {
      return jsonResponse({ ok: false, error: "Verification required. Please try again." }, 400);
    }
    const ip = request.headers.get("CF-Connecting-IP") ?? undefined;
    const verified = await verifyTurnstile(turnstileSecret, token, ip);
    if (!verified) {
      return jsonResponse({ ok: false, error: "Verification failed. Please try again." }, 400);
    }
  }

  const fromEmail = env.FROM_EMAIL?.trim() || MARKETING_INBOX;
  const contactEmail = env.CONTACT_EMAIL?.trim() || MARKETING_INBOX;
  const marketingFrom = formatEmailFrom(MARKETING_FROM_NAME, fromEmail);

  const submittedAt = new Date();
  const { subject, text, html } = buildContactEmailContent(payload, submittedAt);

  try {
    const result = await sendContactEmail(env, {
      to: contactEmail,
      from: marketingFrom,
      replyTo: payload.email,
      subject,
      text,
      html,
    });
    console.log("contact_send_accepted", { method: result.method });

    const autoReply = buildContactAutoReplyContent(payload.name);
    try {
      const autoResult = await sendContactEmail(env, {
        to: payload.email,
        from: marketingFrom,
        replyTo: MARKETING_INBOX,
        subject: autoReply.subject,
        text: autoReply.text,
        html: autoReply.html,
      });
      console.log("contact_auto_reply_accepted", { method: autoResult.method });
    } catch (autoErr: unknown) {
      const code =
        autoErr instanceof ContactEmailSendError
          ? autoErr.code
          : autoErr && typeof autoErr === "object" && "code" in autoErr
            ? String((autoErr as { code: string }).code)
            : "unknown";
      console.error("contact_auto_reply_failed", { code });
    }

    return jsonResponse(
      {
        ok: true,
        message:
          "Your message was accepted for delivery. We typically reply within one US business day.",
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
    console.error("contact_send_failed", { code });
    return jsonResponse(
      {
        ok: false,
        error: isLocalRequest(request)
          ? `Sending failed (${code}). Check the wrangler api process logs.`
          : "Unable to send your message right now. Please try again later.",
      },
      500,
    );
  }
}
