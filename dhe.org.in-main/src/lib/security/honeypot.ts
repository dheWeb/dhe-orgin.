/** Hidden field name — must match client forms. Bots that fill it are rejected silently. */
export const HONEYPOT_FIELD = "company_website";

export function isHoneypotTripped(body: Record<string, unknown>): boolean {
  return String(body[HONEYPOT_FIELD] ?? "").trim().length > 0;
}
