import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    /* ignore */
  }
  const redirect = req.nextUrl.searchParams.get("redirect") || "/admin/login";
  return NextResponse.redirect(new URL(redirect, req.url));
}
