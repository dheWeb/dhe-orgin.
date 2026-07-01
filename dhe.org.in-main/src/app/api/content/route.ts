import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const keysParam = req.nextUrl.searchParams.get("keys");
  const keys = keysParam
    ? keysParam.split(",").map((k) => k.trim()).filter(Boolean)
    : null;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ content: {} });
  }

  let query = supabase.from("site_content").select("key, value");
  if (keys?.length) {
    query = query.in("key", keys);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const content: Record<string, unknown> = {};
  for (const row of data ?? []) {
    content[row.key] = row.value;
  }

  return NextResponse.json(
    { content },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
