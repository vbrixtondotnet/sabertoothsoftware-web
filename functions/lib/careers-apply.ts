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
  const subject = `Job Application - ${sanitizeSubjectFragment(fields.position)} - ${sanitizeSubjectFragment(`${fields.firstName} ${fields.lastName}`)}`;

  const text = [
    `Position applied for: ${fields.position}`,
    `Name: ${fields.firstName} ${fields.lastName}`,
    `Email: ${fields.email}`,
    `Country: ${fields.country}`,
    `Job slug: ${fields.jobSlug}`,
    `Submitted: ${submittedAt.toISOString()}`,
    "",
    "Cover letter:",
    fields.coverLetter,
    "",
    "(Resume attached as PDF.)",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
  <h2 style="margin: 0 0 1rem;">New job application</h2>
  <p><strong>Position applied for:</strong> ${escapeHtml(fields.position)}</p>
  <p><strong>Name:</strong> ${escapeHtml(fields.firstName)} ${escapeHtml(fields.lastName)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a></p>
  <p><strong>Country:</strong> ${escapeHtml(fields.country)}</p>
  <p><strong>Submitted:</strong> ${escapeHtml(submittedAt.toISOString())}</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
  <p><strong>Cover letter:</strong></p>
  <p style="white-space: pre-wrap;">${escapeHtml(fields.coverLetter)}</p>
  <p style="margin-top: 1rem; color: #64748b;">Resume attached as PDF.</p>
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
