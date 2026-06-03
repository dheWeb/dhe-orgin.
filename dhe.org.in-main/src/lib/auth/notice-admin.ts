/**
 * Client-visible admin allowlist for /noticeboarddata UI gating.
 * Real protection must be enforced with Firebase Security Rules (see docs/FIREBASE_SECURITY.md).
 */

const DEFAULT_ADMIN_EMAIL = "kandarisonal21200@gmail.com";

export function getNoticeAdminEmails(): string[] {
  const raw =
    process.env.NEXT_PUBLIC_NOTICE_ADMIN_EMAILS ?? DEFAULT_ADMIN_EMAIL;

  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isNoticeAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return getNoticeAdminEmails().includes(email.trim().toLowerCase());
}
