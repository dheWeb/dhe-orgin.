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
    return NextResponse.json({ donations: [], total: 0 });
  }

  const { searchParams } = req.nextUrl;
  const exportAll = searchParams.get("export") === "all";
  const limit = exportAll
    ? 10000
    : Math.min(
        Math.max(1, Number(searchParams.get("limit")) || DEFAULT_LIMIT),
        MAX_LIMIT
      );
  const offset = exportAll ? 0 : Math.max(0, Number(searchParams.get("offset")) || 0);

  const { count } = await supabase
    .from("donations")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, exportAll ? offset + limit - 1 : offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    donations: data ?? [],
    total: count ?? 0,
    limit,
    offset,
  });
}
