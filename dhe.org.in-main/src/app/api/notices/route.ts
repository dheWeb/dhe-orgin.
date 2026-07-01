import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ notices: [] });
  }

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("notices")
    .select("id, title, body, image_path, published_at, is_pinned")
    .eq("status", "published")
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order("is_pinned", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[notices]", error);
    return NextResponse.json({ notices: [] });
  }

  const notices = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    date: row.published_at,
    imageUrl: row.image_path || "/logo.webp",
    body: row.body,
  }));

  return NextResponse.json({ notices });
}
