import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ daily: 0, total: 0 });
  }

  const today = new Date().toISOString().split("T")[0];
  const dailyId = `daily:${today}`;

  const [{ data: totalRow }, { data: dailyRow }] = await Promise.all([
    supabase.from("visitor_stats").select("count").eq("id", "total").maybeSingle(),
    supabase.from("visitor_stats").select("count").eq("id", dailyId).maybeSingle(),
  ]);

  return NextResponse.json({
    total: totalRow?.count ?? 0,
    daily: dailyRow?.count ?? 0,
  });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limit = await checkRateLimit(`visitors:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ daily: 0, total: 0 });
  }

  const today = new Date().toISOString().split("T")[0];
  const dailyId = `daily:${today}`;

  const { data: totalRow } = await supabase
    .from("visitor_stats")
    .select("count")
    .eq("id", "total")
    .maybeSingle();

  const totalCount = (totalRow?.count ?? 0) + 1;
  await supabase.from("visitor_stats").upsert({
    id: "total",
    count: totalCount,
    updated_at: new Date().toISOString(),
  });

  const { data: dailyRow } = await supabase
    .from("visitor_stats")
    .select("count")
    .eq("id", dailyId)
    .maybeSingle();

  const dailyCount = (dailyRow?.count ?? 0) + 1;
  await supabase.from("visitor_stats").upsert({
    id: dailyId,
    count: dailyCount,
    stat_date: today,
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({ daily: dailyCount, total: totalCount });
}
