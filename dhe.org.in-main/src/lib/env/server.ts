/**
 * Server-only environment variables (API routes, server components).
 * Never import this module from client components.
 */

export type SmtpConfig = {
  service: string;
  user: string;
  pass: string;
  from: string;
};

export function getSmtpConfig(): SmtpConfig | null {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  return {
    service: process.env.SMTP_SERVICE?.trim() || "gmail",
    user,
    pass,
    from: process.env.SMTP_FROM?.trim() || user,
  };
}

export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}
