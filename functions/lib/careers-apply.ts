import { CAREERS_APPLY_LIMITS } from "../../shared/careers-apply-limits";
import { escapeHtml, sanitizeSubjectFragment } from "./contact";

export { CAREERS_APPLY_LIMITS };

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CareersApplyFields = {
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  coverLetter: string;
  jobSlug: string;
  website?: string;
};

export function isPdfBuffer(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 5 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

function trimField(value: FormDataEntryValue | null, max: number): string | null {
  if (value === null || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function parseCareersApplyForm(form: FormData): CareersApplyFields | null {
  const website = trimField(form.get("website"), 200) ?? "";
  if (website) {
    return { position: "", firstName: "", lastName: "", email: "", country: "", coverLetter: "", jobSlug: "", website };
  }

  const position = trimField(form.get("position"), CAREERS_APPLY_LIMITS.position);
  const firstName = trimField(form.get("firstName"), CAREERS_APPLY_LIMITS.firstName);
  const lastName = trimField(form.get("lastName"), CAREERS_APPLY_LIMITS.lastName);
  const email = trimField(form.get("email"), CAREERS_APPLY_LIMITS.email);
  const country = trimField(form.get("country"), CAREERS_APPLY_LIMITS.country);
  const coverLetter = trimField(form.get("coverLetter"), CAREERS_APPLY_LIMITS.coverLetter);
  const jobSlug = trimField(form.get("jobSlug"), 120);

  if (!position || !firstName || !lastName || !email || !country || !coverLetter || !jobSlug) {
    return null;
  }
  if (!EMAIL_RE.test(email)) return null;

  return {
    position,
    firstName,
    lastName,
    email,
    country,
    coverLetter,
    jobSlug,
  };
}

export function buildCareersApplyEmailContent(
  fields: CareersApplyFields,
  submittedAt: Date,
): { subject: string; text: string; html: string } {
  const name = `${fields.firstName} ${fields.lastName}`;
  const submitted = submittedAt.toISOString();
  const positionLabel = sanitizeSubjectFragment(fields.position);
  const header = `Job Application - ${positionLabel}`;

  const messageBody = [
    `Country: ${fields.country}`,
    `Job listing: ${fields.jobSlug}`,
    "",
    fields.coverLetter,
  ].join("\n");

  const subject = header;

  const text = [
    `Name: ${name}`,
    `Email: ${fields.email}`,
    "",
    `Submitted: ${submitted}`,
    "",
    "Message:",
    messageBody,
    "",
    "(Resume attached as PDF.)",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
  <h2 style="margin: 0 0 1rem;">${escapeHtml(header)}</h2>
  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a></p>
  <p><strong>Submitted:</strong> ${escapeHtml(submitted)}</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
  <p><strong>Message:</strong></p>
  <p style="white-space: pre-wrap;">${escapeHtml(messageBody)}</p>
  <p style="margin-top: 1rem; color: #64748b;">Resume attached as PDF.</p>
</body>
</html>`;

  return { subject, text, html };
}

export function buildCareersApplyAutoReplyContent(
  fields: CareersApplyFields,
): { subject: string; text: string; html: string } {
  const applicantName = `${fields.firstName} ${fields.lastName}`.trim();
  const positionTitle = fields.position;
  const subject = `Application Received – ${sanitizeSubjectFragment(positionTitle)} | Sabertooth Software Labs`;

  const text = [
    `Hi ${applicantName},`,
    "",
    "Thank you for your interest in joining Sabertooth Software Labs!",
    "",
    `We have successfully received your application for the position of ${positionTitle}. We appreciate the time and effort you took to apply and consider becoming part of our team.`,
    "",
    "Our team will carefully review your application and qualifications. If your experience and skills align with the requirements of the position, we will contact you regarding the next steps in our recruitment process.",
    "",
    "We appreciate your interest in Sabertooth Software Labs and wish you the best of luck with your application.",
    "",
    "If you have additional information you'd like to share regarding your application, please feel free to reply to this email.",
    "",
    "Best regards,",
    "Sabertooth Software Labs",
    "Talent Acquisition Team",
    "sabertoothsoftwarelabs.net",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111; max-width: 36rem;">
  <p>Hi ${escapeHtml(applicantName)},</p>
  <p>Thank you for your interest in joining <strong>Sabertooth Software Labs</strong>!</p>
  <p>We have successfully received your application for the position of <strong>${escapeHtml(positionTitle)}</strong>. We appreciate the time and effort you took to apply and consider becoming part of our team.</p>
  <p>Our team will carefully review your application and qualifications. If your experience and skills align with the requirements of the position, we will contact you regarding the next steps in our recruitment process.</p>
  <p>We appreciate your interest in Sabertooth Software Labs and wish you the best of luck with your application.</p>
  <p>If you have additional information you&apos;d like to share regarding your application, please feel free to reply to this email.</p>
  <p>
    Best regards,<br />
    <strong>Sabertooth Software Labs</strong><br />
    Talent Acquisition Team<br />
    <a href="https://sabertoothsoftwarelabs.net">sabertoothsoftwarelabs.net</a>
  </p>
</body>
</html>`;

  return { subject, text, html };
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
