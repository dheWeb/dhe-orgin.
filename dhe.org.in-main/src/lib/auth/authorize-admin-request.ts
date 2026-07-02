import type { NextRequest } from "next/server";
import { isAdminAuthorized } from "@/lib/auth/admin-gate";
import { isEmailAdminAllowed } from "@/lib/auth/admin-email-allowlist";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Basic Auth header or Supabase session with allowlisted email. */
export async function isAdminRequestAuthorized(
  req: NextRequest
): Promise<boolean> {
  if (isAdminAuthorized(req.headers.get("authorization"))) {
    return true;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return isEmailAdminAllowed(user?.email);
  } catch {
    return false;
  }
}
