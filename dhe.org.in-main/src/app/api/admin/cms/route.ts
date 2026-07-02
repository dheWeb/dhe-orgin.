import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/auth/authorize-admin-request";
import { CMS_REGISTRY } from "@/lib/cms/content-registry";
import { getAllCmsDefaults } from "@/lib/cms/site-content";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!(await isAdminRequestAuthorized(req))) {
    return unauthorized();
  }

  const supabase = getSupabaseAdmin();
  const defaults = getAllCmsDefaults();

  if (!supabase) {
    const items = CMS_REGISTRY.map((def) => ({
      key: def.key,
      label: def.label,
      value: defaults[def.key] ?? {},
      updated_at: undefined,
    }));
    return NextResponse.json({ items });
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("key, label, value, updated_at");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const dbMap = new Map((data ?? []).map((row) => [row.key, row]));

  const items = CMS_REGISTRY.map((def) => {
    const row = dbMap.get(def.key);
    return {
      key: def.key,
      label: def.label,
      value: row?.value ?? defaults[def.key] ?? {},
      updated_at: row?.updated_at,
    };
  });

  return NextResponse.json({ items });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequestAuthorized(req))) {
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

  const def = CMS_REGISTRY.find((d) => d.key === key);
  const label = def?.label ?? key;
  const now = new Date().toISOString();

  const { error } = await supabase.from("site_content").upsert(
    {
      key,
      label,
      value: body.value ?? {},
      updated_at: now,
    },
    { onConflict: "key" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/programs");
  revalidatePath("/pastevent");
  revalidatePath("/leadership");
  revalidatePath("/people");
  revalidatePath("/advisory");

  return NextResponse.json({ success: true });
}
