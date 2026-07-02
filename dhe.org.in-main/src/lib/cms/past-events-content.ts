import { getSiteContent } from "@/lib/cms/site-content";

export type PastEventRow = {
  title: string;
  date: string;
  venue: string;
  link: string;
};

export const DEFAULT_PAST_EVENTS: PastEventRow[] = [
  {
    title: "Shiksha Mahakumbh 5.0",
    date: "31 October – 2 November 2025",
    venue: "NIPER Mohali",
    link: "https://drive.google.com/drive/folders/1c2CKx2Z9IaN-dsoW-Ymw6Npx1EOTFcsA",
  },
  {
    title: "Indian Education System for Global Development",
    date: "16–17 December 2024",
    venue: "Kurukshetra University",
    link: "https://www.shikshamahakumbh.com/",
  },
  {
    title: "Role of Academic-driven Startups in Developing Economy of J&K",
    date: "June 29-30, 2024",
    venue: "National Institute of Technology Srinagar",
    link: "https://sk24.rase.co.in",
  },
  {
    title:
      "Innovation and Entrepreneurship for School Students, Teachers and ATL Coordinators",
    date: "May 10, 2024",
    venue: "CSIO Chandigarh",
    link: "/workshop",
  },
  {
    title: "Teacher Development Program in Collaboration with NITTTER",
    date: "March 12-17, 2024",
    venue: "NITTTER Chandigarh",
    link: "https://itrchandigarh.org",
  },
  {
    title: "Spoken English Workshop",
    date: "January 25-31, 2024",
    venue: "Gita Niketan, Kurukshetra",
    link: "https://itrchandigarh.org",
  },
  {
    title: "Role of Academic-driven Startups in Economy",
    date: "December 20, 2023",
    venue: "National Institute of Technology Kurukshetra",
    link: "https://sk23.rase.co.in",
  },
  {
    title: "Recent Advances in School Education",
    date: "June 09-11, 2023",
    venue: "National Institute of Technology Jalandhar",
    link: "https://sm23.rase.co.in",
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
