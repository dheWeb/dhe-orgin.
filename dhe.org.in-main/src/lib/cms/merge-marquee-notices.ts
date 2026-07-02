import type { MarqueeItem } from "@/lib/cms/cms-parsers";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { PublishedNotice } from "@/services/notices/fetch-notices";

/** Merge latest published notices into the home marquee (notices first). */
export function mergeMarqueeWithNotices(
  cmsItems: MarqueeItem[],
  notices: PublishedNotice[],
  maxItems = 12
): MarqueeItem[] {
  const noticeItems: MarqueeItem[] = notices.slice(0, 6).map((n) => ({
    text: n.title,
    link: "/noticeboard",
  }));

  const seen = new Set(noticeItems.map((i) => i.text.toLowerCase()));
  const staticItems = cmsItems.filter(
    (item) => !seen.has(item.text.toLowerCase())
  );

  return [...noticeItems, ...staticItems].slice(0, maxItems);
}

/** Persist merged marquee to CMS after notice admin changes (K-13). */
export async function syncMarqueeFromNotices(
  notices: PublishedNotice[]
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const { data: row } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "marquee_items")
    .maybeSingle();

  let existing: MarqueeItem[] = [];
  try {
    const raw = (row?.value as { json?: string } | null)?.json;
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) existing = parsed as MarqueeItem[];
    }
  } catch {
    /* keep existing empty */
  }

  const merged = mergeMarqueeWithNotices(existing, notices);

  await supabase.from("site_content").upsert(
    {
      key: "marquee_items",
      label: "News marquee (JSON array)",
      value: { json: JSON.stringify(merged, null, 2) },
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );
}
