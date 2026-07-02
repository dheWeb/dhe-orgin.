import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/auth/authorize-admin-request";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export async function GET(req: NextRequest) {
  if (!(await isAdminRequestAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ feedback: [], contact: [] });
  }

  const limit = Math.min(
    Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || DEFAULT_LIMIT),
    MAX_LIMIT
  );

  const [feedbackRes, contactRes] = await Promise.all([
    supabase
      .from("feedback_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  if (feedbackRes.error) {
    return NextResponse.json({ error: feedbackRes.error.message }, { status: 500 });
  }
  if (contactRes.error) {
    return NextResponse.json({ error: contactRes.error.message }, { status: 500 });
  }

  return NextResponse.json({
    feedback: feedbackRes.data ?? [],
    contact: contactRes.data ?? [],
    limit,
  });
}
