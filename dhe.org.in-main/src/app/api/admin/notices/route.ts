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
    .from("notices")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notices: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req.headers.get("authorization"))) {
    return unauthorized();
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const body = await req.json();
  const { error } = await supabase.from("notices").insert({
    title: body.title,
    body: body.body ?? null,
    image_path: body.image_path ?? body.imageUrl ?? null,
    published_at: body.published_at ?? new Date().toISOString(),
    status: body.status ?? "published",
    is_pinned: body.is_pinned ?? false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
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
  const id = body.id as string | undefined;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.title !== undefined) updates.title = body.title;
  if (body.body !== undefined) updates.body = body.body;
  if (body.image_path !== undefined) updates.image_path = body.image_path;
  if (body.imageUrl !== undefined) updates.image_path = body.imageUrl;
  if (body.status !== undefined) updates.status = body.status;
  if (body.is_pinned !== undefined) updates.is_pinned = body.is_pinned;
  if (body.published_at !== undefined) {
    updates.published_at = body.published_at;
  } else if (body.date !== undefined) {
    updates.published_at = new Date(body.date).toISOString();
  }

  const { error } = await supabase.from("notices").update(updates).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthorized(req.headers.get("authorization"))) {
    return unauthorized();
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
