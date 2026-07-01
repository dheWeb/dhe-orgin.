/**
 * CMS field registry — keys stored in Supabase `site_content`.
 */

export type CmsFieldType = "text" | "textarea" | "url" | "email";

export type CmsFieldDef = {
  name: string;
  label: string;
  type?: CmsFieldType;
  rows?: number;
};

export type CmsKeyDef = {
  key: string;
  label: string;
  fields: CmsFieldDef[];
};

export const CMS_REGISTRY: CmsKeyDef[] = [
  {
    key: "home_tagline",
    label: "Home page tagline",
    fields: [{ name: "text", label: "Tagline", type: "text" }],
  },
  {
    key: "home_intro",
    label: "Home hero intro",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title_line1", label: "Title line 1", type: "text" },
      { name: "title_line2", label: "Title line 2 (accent)", type: "text" },
      { name: "description", label: "Description", type: "textarea", rows: 4 },
    ],
  },
  {
    key: "site_contact",
    label: "Public contact",
    fields: [
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "email" },
    ],
  },
  {
    key: "footer_mission",
    label: "Footer mission blurb",
    fields: [{ name: "text", label: "Text", type: "textarea", rows: 4 }],
  },
  {
    key: "director_message",
    label: "Director message",
    fields: [
      { name: "excerpt", label: "Home excerpt", type: "textarea", rows: 3 },
      { name: "body", label: "Full message (paragraphs)", type: "textarea", rows: 12 },
    ],
  },
  {
    key: "donation_intro",
    label: "Donation page intro",
    fields: [{ name: "text", label: "Intro text", type: "textarea", rows: 4 }],
  },
  {
    key: "programs_intro",
    label: "Programs page intro",
    fields: [{ name: "text", label: "Intro text", type: "textarea", rows: 3 }],
  },
  {
    key: "marquee_items",
    label: "News marquee (JSON array)",
    fields: [
      {
        name: "json",
        label: 'JSON: [{"text":"...","link":"https://..."}]',
        type: "textarea",
        rows: 8,
      },
    ],
  },
  {
    key: "upcoming_events",
    label: "Upcoming events (JSON array)",
    fields: [
      {
        name: "json",
        label:
          'JSON: [{"title","date","venue","href","status":"planned|completed","statusLabel","external":true}]',
        type: "textarea",
        rows: 12,
      },
    ],
  },
];

export const CMS_KEY_SET = new Set(CMS_REGISTRY.map((d) => d.key));

export function getCmsKeyDef(key: string): CmsKeyDef | undefined {
  return CMS_REGISTRY.find((d) => d.key === key);
}
