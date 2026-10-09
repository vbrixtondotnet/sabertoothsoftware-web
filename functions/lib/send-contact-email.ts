export type EmailAttachment = {
  filename: string;
  content: string;
  type: string;
  disposition: "attachment";
};

export type OutboundContactEmail = {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  attachments?: EmailAttachment[];
};

export type ContactMailEnv = {
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_EMAIL_API_TOKEN?: string;
};

export class ContactEmailSendError extends Error {
  code: string;
  httpStatus?: number;

  constructor(code: string, message: string, httpStatus?: number) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

function hasRestCredentials(env: ContactMailEnv): boolean {
  return Boolean(
    env.CLOUDFLARE_ACCOUNT_ID?.trim() && env.CLOUDFLARE_EMAIL_API_TOKEN?.trim(),
  );
}

function sanitizeCloudflareErrors(errors: unknown): string[] {
  if (!Array.isArray(errors)) return [];
  return errors
    .map((e) => {
      if (e && typeof e === "object" && "message" in e) {
        return String((e as { message: string }).message).slice(0, 120);
      }
      return "unknown_error";
    })
    .slice(0, 3);
}

async function sendViaRestApi(
  env: ContactMailEnv,
  message: OutboundContactEmail,
): Promise<{ method: "rest" }> {
  const accountId = env.CLOUDFLARE_ACCOUNT_ID!.trim();
  const token = env.CLOUDFLARE_EMAIL_API_TOKEN!.trim();

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: message.to,
        from: message.from,
        reply_to: message.replyTo,
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(message.attachments?.length ? { attachments: message.attachments } : {}),
      }),
    },
  );

  let payload: {
    success?: boolean;
    errors?: unknown;
    result?: {
      delivered?: string[];
      queued?: string[];
      message_id?: string;
    };
  };

  try {
    payload = (await res.json()) as typeof payload;
  } catch {
    console.error("contact_email_rest_invalid_json", { status: res.status });
    throw new ContactEmailSendError(
      "rest_invalid_response",
      "Email provider returned an invalid response.",
      res.status,
    );
  }

  const errorMessages = sanitizeCloudflareErrors(payload.errors);
  console.log("contact_email_rest_response", {
    status: res.status,
    success: payload.success,
    errors: errorMessages,
    delivered: payload.result?.delivered?.length ?? 0,
    queued: payload.result?.queued?.length ?? 0,
    messageId: payload.result?.message_id ? "present" : "none",
  });

  if (!res.ok || !payload.success) {
    const hint = errorMessages[0] ?? `http_${res.status}`;
    throw new ContactEmailSendError("rest_rejected", hint, res.status);
  }

  const delivered = payload.result?.delivered?.length ?? 0;
  const queued = payload.result?.queued?.length ?? 0;
  if (delivered + queued < 1) {
    throw new ContactEmailSendError(
      "rest_not_accepted",
      "Email provider did not accept the message for delivery.",
      res.status,
    );
  }

  return { method: "rest" };
}

/** Cloudflare Pages uses REST — Workers send_email binding is not supported on Pages. */
export async function sendContactEmail(
  env: ContactMailEnv,
  message: OutboundContactEmail,
): Promise<{ method: "rest" }> {
  console.log("contact_email_start", {
    integration: "rest",
    restConfigured: hasRestCredentials(env),
  });

  if (!hasRestCredentials(env)) {
    throw new ContactEmailSendError(
      "rest_not_configured",
      "CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_EMAIL_API_TOKEN are required.",
    );
  }

  return sendViaRestApi(env, message);
}
