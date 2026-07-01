import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type SiteContentMap = Record<string, Record<string, string>>;

const DEFAULTS: SiteContentMap = {
  home_tagline: { text: "Empowering holistic education for Viksit Bharat" },
  site_contact: { phone: "7903431900", email: "director@dhe.org.in" },
  director_message: {
    excerpt:
      "Holistic education integrates mind, body, and spirit for nation-building.",
  },
};

export async function getSiteContent(
  keys?: string[]
): Promise<SiteContentMap> {
  const supabase = getSupabaseAdmin();
  const result: SiteContentMap = { ...DEFAULTS };

  if (!supabase) {
    return keys
      ? Object.fromEntries(
          keys.map((k) => [k, result[k] ?? {}])
        ) as SiteContentMap
      : result;
  }

  let query = supabase.from("site_content").select("key, value");
  if (keys?.length) {
    query = query.in("key", keys);
  }

  const { data } = await query;
  for (const row of data ?? []) {
    result[row.key] = row.value as Record<string, string>;
  }

  return keys
    ? (Object.fromEntries(keys.map((k) => [k, result[k] ?? {}])) as SiteContentMap)
    : result;
}
