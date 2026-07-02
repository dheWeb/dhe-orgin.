import { getSiteContent } from "@/lib/cms/site-content";
import { homeFaq as DEFAULT_FAQ } from "@/data/home/content";
import { parseUpcomingEvents } from "@/lib/cms/cms-parsers";
import { getPastEvents } from "@/lib/cms/past-events-content";

export type FaqItem = { question: string; answer: string };

function parseFaqJson(raw: string | undefined, fallback: FaqItem[]): FaqItem[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.length) return fallback;
    return parsed as FaqItem[];
  } catch {
    return fallback;
  }
}

export async function getHomeFaq(): Promise<FaqItem[]> {
  const content = await getSiteContent(["home_faq_json"]);
  return parseFaqJson(content.home_faq_json?.json, [...DEFAULT_FAQ]);
}

export type FeedbackEventOption = { value: string; label: string };

const DEFAULT_FEEDBACK_EVENTS: FeedbackEventOption[] = [
  { value: "shiksha-mahakumbh-6-2026", label: "Shiksha Mahakumbh 6.0 (2026)" },
  { value: "shiksha-mahakumbh-5-2025", label: "Shiksha Mahakumbh 5.0 (2025)" },
  { value: "shiksha-mahakumbh-2024", label: "शिक्षा महाकुंभ 2024" },
  { value: "shiksha-mahakumbh-2023", label: "शिक्षा महाकुंभ 2023" },
  { value: "shiksha-kumbh-2024", label: "शिक्षा कुंभ 2024" },
  { value: "shiksha-kumbh-2023", label: "शिक्षा कुंभ 2023" },
  { value: "general-dhe-program", label: "Other DHE program" },
];

export async function getFeedbackEventOptions(): Promise<FeedbackEventOption[]> {
  const content = await getSiteContent([
    "feedback_events_json",
    "upcoming_events",
  ]);

  if (content.feedback_events_json?.json?.trim()) {
    try {
      const parsed = JSON.parse(content.feedback_events_json.json) as unknown;
      if (Array.isArray(parsed) && parsed.length) {
        return parsed as FeedbackEventOption[];
      }
    } catch {
      /* fall through */
    }
  }

  const upcoming = parseUpcomingEvents(content.upcoming_events);
  const fromUpcoming: FeedbackEventOption[] = upcoming.map((e) => ({
    value: e.title.toLowerCase().replace(/\s+/g, "-").slice(0, 48),
    label: e.title,
  }));

  const past = await getPastEvents();
  const fromPast: FeedbackEventOption[] = past.slice(0, 4).map((e) => ({
    value: e.title.toLowerCase().replace(/\s+/g, "-").slice(0, 48),
    label: e.title,
  }));

  const merged = [...fromUpcoming, ...fromPast, ...DEFAULT_FEEDBACK_EVENTS];
  const seen = new Set<string>();
  return merged.filter((o) => {
    if (seen.has(o.value)) return false;
    seen.add(o.value);
    return true;
  });
}
