import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/auth/authorize-admin-request";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminRequestAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ errors: [] });
  }

  const { data, error } = await supabase
    .from("error_logs")
    .select("id, message, path, digest, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ errors: data ?? [] });
}
