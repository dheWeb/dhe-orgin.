import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  homeIntro as defaultHomeIntro,
  visionFoundation,
  closingCta as defaultClosingCta,
  nationalImpact,
  leadership,
  shikshaMahakumbh,
  digitalEcosystem,
} from "@/data/home/content";
import { CMS_JSON_DEFAULTS } from "@/lib/cms/cms-json-defaults";
import { CMS_REGISTRY } from "@/lib/cms/content-registry";

export type SiteContentMap = Record<string, Record<string, string>>;

const DEFAULTS: SiteContentMap = {
  home_tagline: { text: "Empowering holistic education for Viksit Bharat" },
  home_intro: {
    badge: defaultHomeIntro.badge,
    title_line1: defaultHomeIntro.titleLine1,
    title_line2: defaultHomeIntro.titleLine2,
    description: defaultHomeIntro.description,
  },
  site_contact: {
    phone: "7903431900",
    email: "director@dhe.org.in",
    office_address:
      "E-7, Orchid Towers, Sector 125, Sunny Enclave, SAS Nagar, Punjab-140301",
  },
  footer_mission: {
    text: "DHE integrates educational leadership, innovation, skill development, research, entrepreneurship, publications, digital transformation, and institutional collaboration into one unified ecosystem empowering Bharat towards becoming a global knowledge leader.",
  },
  donation_intro: {
    text: "Your contribution helps advance holistic education, national programs, and institutional initiatives led by DHE in service of educational transformation and Viksit Bharat.",
  },
  programs_intro: {
    text: "Flagship programs and cells advancing holistic education across Bharat.",
  },
  home_vision: {
    body: visionFoundation.body,
  },
  home_closing_cta: {
    title_line1: defaultClosingCta.titleLine1,
    title_line2: defaultClosingCta.titleLine2,
    body: defaultClosingCta.body,
  },
  home_national_impact: {
    body: nationalImpact.body,
    highlights_json: JSON.stringify(nationalImpact.highlights),
  },
  home_leadership: {
    body_prefix: leadership.bodyPrefix,
    leader_name: leadership.leaderName,
    leader_url: leadership.leaderUrl,
    body_suffix: leadership.bodySuffix,
    vision_quote: leadership.visionQuote,
  },
  home_shiksha: {
    paragraph1: shikshaMahakumbh.paragraph1,
    paragraph2: shikshaMahakumbh.paragraph2,
  },
  home_digital_ecosystem: {
    description: digitalEcosystem.description,
  },
  leadership_intro: {
    text: "Patrons and members of the Local Management Committee (LMC) governing the Department of Holistic Education.",
  },
  cells_shared_intro: {
    text: "Each DHE cell advances a focused mission within the national holistic education ecosystem — collaborating across institutions, research, innovation, and community outreach.",
  },
  cell_overrides: { json: "{}" },
  director_message: {
    excerpt:
      "Holistic education integrates mind, body, and spirit for nation-building.",
    body: "The Department of Holistic Education (DHE) is a national educational transformation platform dedicated to building Bharat as a global knowledge leader through value-based education, innovation, research, entrepreneurship, and holistic human development aligned with NEP 2020.\n\nInspired by the transformative educational philosophy of Vidya Bharati, DHE advances holistic education, skill development, leadership, and Bharatiya values through programs, cells, and national initiatives such as Shiksha Mahakumbh.",
  },
  marquee_items: {
    json: JSON.stringify(
      [
        {
          text: "DHE English Olympiad — 10,040+ students. Download brochure (PDF).",
          link: "/documents/dhe-english-olympiad.pdf",
        },
        {
          text: "Explore 25 national cells and year-round DHE programs.",
          link: "/programs",
        },
        {
          text: "Donate to VBITR Trust — Section 80G eligible. Transparency documents.",
          link: "/transparency",
        },
        {
          text: "Shiksha Mahakumbh 6.0 — NIT Hamirpur, 9–11 Oct 2026. Registration open.",
          link: "https://www.rase.co.in/registration/Single_Registration",
        },
      ],
      null,
      2
    ),
  },
  upcoming_events: {
    json: JSON.stringify(
      [
        {
          title: "Shiksha Mahakumbh 6.0",
          date: "9–11 October 2026",
          venue: "NIT Hamirpur, Himachal Pradesh",
          href: "https://www.rase.co.in/registration/Single_Registration",
          external: true,
          status: "planned",
          statusLabel: "Registration Open",
        },
        {
          title: "Shiksha Mahakumbh 5.0",
          date: "31 October – 2 November 2025",
          venue: "NIPER Mohali",
          href: "https://drive.google.com/drive/folders/1c2CKx2Z9IaN-dsoW-Ymw6Npx1EOTFcsA",
          external: true,
          status: "completed",
          statusLabel: "Concluded",
        },
        {
          title: "Indian Education System for Global Development",
          date: "December 16–17, 2024",
          venue: "Kurukshetra University",
          href: "https://www.shikshamahakumbh.com/",
          external: true,
          status: "completed",
          statusLabel: "Archived",
        },
      ],
      null,
      2
    ),
  },
  ...CMS_JSON_DEFAULTS,
};

export const CMS_CONTENT_KEYS = Object.keys(DEFAULTS);

/** Full default map for every registry key (admin UI + seed parity). */
export function getAllCmsDefaults(): SiteContentMap {
  const merged: SiteContentMap = { ...DEFAULTS };
  for (const def of CMS_REGISTRY) {
    if (!merged[def.key]) {
      merged[def.key] = {};
    }
  }
  return merged;
}

export async function getSiteContent(
  keys?: string[]
): Promise<SiteContentMap> {
  const supabase = getSupabaseAdmin();
  const result: SiteContentMap = { ...DEFAULTS };

  if (!supabase) {
    return keys
      ? (Object.fromEntries(
          keys.map((k) => [k, result[k] ?? {}])
        ) as SiteContentMap)
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
