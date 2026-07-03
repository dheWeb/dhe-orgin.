/**
 * Serialized JSON defaults for CMS keys not stored as structured fields.
 * Used by site-content fallbacks, admin merge, and seed script parity.
 */

import { PROGRAMS } from "@/data/programs/registry";
import { homeFaq } from "@/data/home/content";
import { homeTestimonials } from "@/data/home/redesign-content";
import {
  DEFAULT_COORDINATORS,
  DEFAULT_ADVISORY,
} from "@/data/people/registry";
import { DEFAULT_PAST_EVENTS } from "@/lib/cms/past-events-content";
import {
  lmcCurrentMembers,
  lmcCurrentPatrons,
} from "@/data/institution";

export const DEFAULT_FEEDBACK_EVENTS_JSON = JSON.stringify(
  [
    { value: "shiksha-mahakumbh-6-2026", label: "Shiksha Mahakumbh 6.0 (2026)" },
    { value: "shiksha-mahakumbh-5-2025", label: "Shiksha Mahakumbh 5.0 (2025)" },
    { value: "shiksha-mahakumbh-2024", label: "शिक्षा महाकुंभ 2024" },
    { value: "shiksha-mahakumbh-2023", label: "शिक्षा महाकुंभ 2023" },
    { value: "shiksha-kumbh-2024", label: "शिक्षा कुंभ 2024" },
    { value: "shiksha-kumbh-2023", label: "शिक्षा कुंभ 2023" },
    { value: "general-dhe-program", label: "Other DHE program" },
  ],
  null,
  2
);

export const CMS_JSON_DEFAULTS: Record<string, Record<string, string>> = {
  programs_json: { json: JSON.stringify(PROGRAMS, null, 2) },
  past_events_json: { json: JSON.stringify(DEFAULT_PAST_EVENTS, null, 2) },
  home_faq_json: { json: JSON.stringify([...homeFaq], null, 2) },
  home_testimonials_json: { json: JSON.stringify([...homeTestimonials], null, 2) },
  feedback_events_json: { json: DEFAULT_FEEDBACK_EVENTS_JSON },
  people_json: { json: JSON.stringify(DEFAULT_COORDINATORS, null, 2) },
  advisory_json: { json: JSON.stringify(DEFAULT_ADVISORY, null, 2) },
  lmc_patrons_json: {
    json: JSON.stringify(
      lmcCurrentPatrons.map((m) => ({
        name: m.name,
        designation: m.designation,
        contact: m.contact,
      })),
      null,
      2
    ),
  },
  lmc_members_json: {
    json: JSON.stringify(
      lmcCurrentMembers.map((m) => ({
        name: m.name,
        designation: m.designation,
        contact: m.contact,
      })),
      null,
      2
    ),
  },
};
