/** Comma-separated admin emails (server or legacy public env). */
export function getAdminEmailAllowlist(): string[] {
  const raw =
    process.env.ADMIN_EMAIL_ALLOWLIST?.trim() ||
    process.env.NEXT_PUBLIC_NOTICE_ADMIN_EMAILS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAdminAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = getAdminEmailAllowlist();
  if (!list.length) return false;
  return list.includes(email.trim().toLowerCase());
}

export function isSupabaseAdminAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() &&
      getAdminEmailAllowlist().length
  );
}
