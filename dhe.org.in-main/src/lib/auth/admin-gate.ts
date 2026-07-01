/**
 * Shared admin gate for middleware (Edge) and API routes (Node).
 * Configure ADMIN_USERNAME + ADMIN_PASSWORD in Vercel / .env.local.
 */

export type AdminCredentials = {
  username: string;
  password: string;
};

export function getAdminCredentials(): AdminCredentials | null {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!username || !password) {
    return null;
  }

  return { username, password };
}

export function isAdminGateConfigured(): boolean {
  return getAdminCredentials() !== null;
}

function decodeBasicAuth(
  authHeader: string
): { username: string; password: string } | null {
  if (!authHeader.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = authHeader.slice(6);
    const decoded = atob(encoded);
    const separator = decoded.indexOf(":");

    if (separator === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

/** Returns true when the request carries valid admin credentials. */
export function isAdminAuthorized(
  authHeader: string | null | undefined
): boolean {
  const creds = getAdminCredentials();

  if (!creds) {
    return process.env.ADMIN_DEV_BYPASS === "1";
  }

  if (!authHeader) {
    return false;
  }

  const basic = decodeBasicAuth(authHeader);
  if (!basic) {
    return false;
  }

  return basic.username === creds.username && basic.password === creds.password;
}

export const ADMIN_PROTECTED_PATHS = [
  "/admin",
  "/WD",
  "/donationdatadekh",
  "/noticeboarddata",
  "/api/admin",
] as const;
