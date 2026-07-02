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
      { name: "office_address", label: "Office address (single line)", type: "text" },
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
    key: "home_vision",
    label: "Home vision section",
    fields: [{ name: "body", label: "Vision & Foundation body", type: "textarea", rows: 5 }],
  },
  {
    key: "home_closing_cta",
    label: "Home closing CTA",
    fields: [
      { name: "title_line1", label: "Title line 1", type: "text" },
      { name: "title_line2", label: "Title line 2 (accent)", type: "text" },
      { name: "body", label: "Body", type: "textarea", rows: 4 },
    ],
  },
  {
    key: "home_national_impact",
    label: "Home national impact",
    fields: [
      { name: "body", label: "Body", type: "textarea", rows: 4 },
      {
        name: "highlights_json",
        label: 'Highlights JSON: ["item 1","item 2"]',
        type: "textarea",
        rows: 5,
      },
    ],
  },
  {
    key: "home_leadership",
    label: "Home leadership section",
    fields: [
      { name: "body_prefix", label: "Body prefix", type: "text" },
      { name: "leader_name", label: "Leader name", type: "text" },
      { name: "leader_url", label: "Leader URL", type: "url" },
      { name: "body_suffix", label: "Body suffix", type: "textarea", rows: 3 },
      { name: "vision_quote", label: "Vision quote", type: "textarea", rows: 3 },
    ],
  },
  {
    key: "home_shiksha",
    label: "Home Shiksha Mahakumbh",
    fields: [
      { name: "paragraph1", label: "Paragraph 1", type: "textarea", rows: 4 },
      { name: "paragraph2", label: "Paragraph 2", type: "textarea", rows: 4 },
    ],
  },
  {
    key: "home_digital_ecosystem",
    label: "Home digital ecosystem intro",
    fields: [{ name: "description", label: "Section description", type: "textarea", rows: 3 }],
  },
  {
    key: "leadership_intro",
    label: "Leadership page intro",
    fields: [{ name: "text", label: "Intro text", type: "textarea", rows: 3 }],
  },
  {
    key: "cells_shared_intro",
    label: "Cell pages shared intro",
    fields: [{ name: "text", label: "Intro blurb", type: "textarea", rows: 3 }],
  },
  {
    key: "cell_overrides",
    label: "Cell page overrides (JSON by slug)",
    fields: [
      {
        name: "json",
        label:
          'JSON: {"rd":{"displayTitle":"...","blocks":[{"objective":"..."}]}}',
        type: "textarea",
        rows: 12,
      },
    ],
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
  {
    key: "people_json",
    label: "Cell coordinators (JSON array)",
    fields: [
      {
        name: "json",
        label: 'JSON: [{"name","designation","contact"}]',
        type: "textarea",
        rows: 14,
      },
    ],
  },
  {
    key: "advisory_json",
    label: "Advisory council (JSON array)",
    fields: [
      {
        name: "json",
        label: 'JSON: [{"name","des2","designation","contact"}]',
        type: "textarea",
        rows: 10,
      },
    ],
  },
  {
    key: "lmc_patrons_json",
    label: "LMC patrons (JSON array)",
    fields: [
      {
        name: "json",
        label: 'JSON: [{"name","designation","contact"}]',
        type: "textarea",
        rows: 8,
      },
    ],
  },
  {
    key: "lmc_members_json",
    label: "LMC members (JSON array)",
    fields: [
      {
        name: "json",
        label: 'JSON: [{"name","designation","contact"}]',
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
