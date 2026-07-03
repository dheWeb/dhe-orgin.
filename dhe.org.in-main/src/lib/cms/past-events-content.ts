import { getSiteContent } from "@/lib/cms/site-content";

export type PastEventRow = {
  title: string;
  date: string;
  venue: string;
  link: string;
};

/** Shiksha Mahakumbh editions + allied DHE programs (synced with rase.co.in archive). */
export const DEFAULT_PAST_EVENTS: PastEventRow[] = [
  {
    title: "Shiksha Mahakumbh 5.0 — Classroom to Society: Healthier World",
    date: "31 October – 2 November 2025",
    venue: "NIPER Mohali, Punjab",
    link: "https://drive.google.com/drive/folders/1c2CKx2Z9IaN-dsoW-Ymw6Npx1EOTFcsA",
  },
  {
    title: "Shiksha Mahakumbh 4.0 — Indian Education for Global Development",
    date: "16–17 December 2024",
    venue: "Kurukshetra University, Haryana",
    link: "https://www.shikshamahakumbh.com/",
  },
  {
    title: "Shiksha Mahakumbh 3.0 — Startups in J&K Economy",
    date: "29–30 June 2024",
    venue: "National Institute of Technology Srinagar",
    link: "https://sk24.rase.co.in",
  },
  {
    title: "Shiksha Mahakumbh 2.0 — Academic-driven Startups in Economy",
    date: "20 December 2023",
    venue: "National Institute of Technology Kurukshetra",
    link: "https://sk23.rase.co.in",
  },
  {
    title: "Shiksha Mahakumbh 1.0 — Recent Advances in School Education",
    date: "9–11 June 2023",
    venue: "National Institute of Technology Jalandhar",
    link: "https://sm23.rase.co.in",
  },
  {
    title:
      "Innovation and Entrepreneurship for School Students, Teachers and ATL Coordinators",
    date: "10 May 2024",
    venue: "CSIR–CSIO Chandigarh",
    link: "/workshop",
  },
  {
    title: "Teacher Development Program in Collaboration with NITTTR",
    date: "12–17 March 2024",
    venue: "NITTTR Chandigarh",
    link: "https://itrchandigarh.org",
  },
  {
    title: "Spoken English Workshop",
    date: "25–31 January 2024",
    venue: "Gita Niketan, Kurukshetra",
    link: "https://itrchandigarh.org",
  },
];

function parsePastEventsJson(
  raw: string | undefined,
  fallback: PastEventRow[]
): PastEventRow[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.length) return fallback;
    return parsed as PastEventRow[];
  } catch {
    return fallback;
  }
}

export async function getPastEvents(): Promise<PastEventRow[]> {
  const content = await getSiteContent(["past_events_json"]);
  return parsePastEventsJson(content.past_events_json?.json, DEFAULT_PAST_EVENTS);
}
