import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth/admin-gate";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!isAdminAuthorized(req.headers.get("authorization"))) {
    return unauthorized();
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("key, label, value, updated_at")
    .order("key");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  if (!isAdminAuthorized(req.headers.get("authorization"))) {
    return unauthorized();
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const body = await req.json();
  const key = body.key as string | undefined;
  if (!key) {
    return NextResponse.json({ error: "key required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("site_content")
    .update({
      value: body.value ?? {},
      updated_at: new Date().toISOString(),
    })
    .eq("key", key);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
