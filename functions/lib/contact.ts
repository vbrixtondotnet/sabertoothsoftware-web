import { CONTACT_LIMITS } from "../../shared/contact-limits";

export { CONTACT_LIMITS };

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  body: string;
  website?: string;
  turnstileToken?: string;
};

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeSubjectFragment(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

export function parseContactPayload(raw: unknown): ContactPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const str = (key: string, max: number, required: boolean): string | null => {
    const v = o[key];
    if (v === undefined || v === null || v === "") {
      return required ? null : "";
    }
    if (typeof v !== "string") return null;
    const trimmed = v.trim();
    if (required && !trimmed) return null;
    if (trimmed.length > max) return null;
    return trimmed;
  };

  const name = str("name", CONTACT_LIMITS.name, true);
  const email = str("email", CONTACT_LIMITS.email, true);
  const company = str("company", CONTACT_LIMITS.company, false);
  const body = str("body", CONTACT_LIMITS.body, true);
  if (name === null || email === null || company === null || body === null) {
    return null;
  }
  if (!EMAIL_RE.test(email)) return null;

  const website = str("website", 200, false) ?? "";
  const turnstileToken =
    typeof o.turnstileToken === "string" ? o.turnstileToken.slice(0, 4096) : undefined;

  return { name, email, company, body, website, turnstileToken };
}

export function buildContactEmailContent(
  payload: ContactPayload,
  submittedAt: Date,
): { subject: string; text: string; html: string } {
  const companyLine = payload.company || "—";
  const submitted = submittedAt.toISOString();

  const subject = `Website Inquiry – New Client Lead - ${sanitizeSubjectFragment(payload.name)}`;

  const text = [
    `Name: ${payload.name}`,
    `Company: ${companyLine}`,
    `Email: ${payload.email}`,
    "",
    `Submitted: ${submitted}`,
    "",
    "Message:",
    payload.body,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
  <h2 style="margin: 0 0 1rem;">Website Inquiry – New Client Lead</h2>
  <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
  <p><strong>Company:</strong> ${escapeHtml(companyLine)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
  <p><strong>Submitted:</strong> ${escapeHtml(submitted)}</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
  <p><strong>Message:</strong></p>
  <p style="white-space: pre-wrap;">${escapeHtml(payload.body)}</p>
</body>
</html>`;

  return { subject, text, html };
}

export function splitContactName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const trimmed = fullName.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) {
    return { firstName: trimmed, lastName: "" };
  }
  return {
    firstName: trimmed.slice(0, space),
    lastName: trimmed.slice(space + 1).trim(),
  };
}

export const CONTACT_AUTO_REPLY_SUBJECT =
  "We've Received Your Inquiry | Sabertooth Software Labs";

export function buildContactAutoReplyContent(name: string): {
  subject: string;
  text: string;
  html: string;
} {
  const { firstName, lastName } = splitContactName(name);
  const greetingName = lastName ? `${firstName} ${lastName}` : firstName;

  const text = [
    `Hi ${greetingName},`,
    "",
    "Thank you for contacting Sabertooth Software Labs!",
    "",
    "We have successfully received your inquiry, and we appreciate your interest in our software development services.",
    "",
    "Our marketing team will review your message and get in touch with you as soon as possible to discuss your requirements and explore how we can help bring your ideas to life.",
    "",
    "In the meantime, if you have additional information about your project or business requirements, feel free to reply to this email.",
    "",
    "We look forward to connecting with you and exploring the opportunity to work together.",
    "",
    "Best regards,",
    "Sabertooth Software Labs",
    "Software Development & Technology Solutions",
    "sabertoothsoftwarelabs.net",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111; max-width: 36rem;">
  <p>Hi ${escapeHtml(greetingName)},</p>
  <p>Thank you for contacting <strong>Sabertooth Software Labs</strong>!</p>
  <p>We have successfully received your inquiry, and we appreciate your interest in our software development services.</p>
  <p>Our marketing team will review your message and get in touch with you as soon as possible to discuss your requirements and explore how we can help bring your ideas to life.</p>
  <p>In the meantime, if you have additional information about your project or business requirements, feel free to reply to this email.</p>
  <p>We look forward to connecting with you and exploring the opportunity to work together.</p>
  <p>
    Best regards,<br />
    <strong>Sabertooth Software Labs</strong><br />
    Software Development &amp; Technology Solutions<br />
    <a href="https://sabertoothsoftwarelabs.net">sabertoothsoftwarelabs.net</a>
  </p>
</body>
</html>`;

  return { subject: CONTACT_AUTO_REPLY_SUBJECT, text, html };
}

export function formatEmailFrom(displayName: string, address: string): string {
  const email = address.match(/<([^>]+)>/)?.[1]?.trim() ?? address.trim();
  return `${displayName} <${email}>`;
}

export async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
