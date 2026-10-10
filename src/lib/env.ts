/**
 * Email-related environment variables (`.env.local` / `.env.production`).
 *
 * `CONTACT_EMAIL` — inbox that receives contact form submissions (local and live).
 * If unset at runtime, `getContactRecipient` falls back to the form’s work email.
 */

const DEFAULT_FROM_EMAIL = "marketing@sabertoothsoftwarelabs.net";

/** Sender address for outbound contact / notification mail. */
export function getFromEmail(): string {
  const value = process.env.FROM_EMAIL?.trim();
  return value || DEFAULT_FROM_EMAIL;
}

/** Inbox for contact submissions; uses `CONTACT_EMAIL` when set, else the form email. */
export function getContactRecipient(formEmail: string): string {
  const override = process.env.CONTACT_EMAIL?.trim();
  if (override) return override;
  const trimmed = formEmail.trim();
  if (!trimmed) {
    throw new Error(
      "getContactRecipient: form email is required when CONTACT_EMAIL is not set.",
    );
  }
  return trimmed;
}

/** True when running with a fixed dev/test inbox (CONTACT_EMAIL is set). */
export function hasFixedContactInbox(): boolean {
  return Boolean(process.env.CONTACT_EMAIL?.trim());
}
