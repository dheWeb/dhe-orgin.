export type MarqueeItem = { text: string; link: string };

export type UpcomingEventRow = {
  title: string;
  date: string;
  venue: string;
  href: string;
  external?: boolean;
  status: "completed" | "planned" | "external";
  statusLabel: string;
  statusNote?: string;
};

export const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  {
    text: "DHE English Olympiad — 10,040+ students. Download brochure (PDF).",
    link: "/documents/dhe-english-olympiad.pdf",
  },
  {
    text: "Explore 25 national cells and year-round DHE programs.",
    link: "/programs",
  },
  {
    text: "Donate to VBITR Trust — Section 80G eligible. View transparency documents.",
    link: "/transparency",
  },
  {
    text: "Shiksha Mahakumbh 6.0 — NIT Hamirpur, 9–11 Oct 2026. Registration open.",
    link: "https://www.rase.co.in/registration/Single_Registration",
  },
];

export const DEFAULT_UPCOMING_EVENTS: UpcomingEventRow[] = [
  {
    title: "Shiksha Mahakumbh 6.0",
    date: "9–11 October 2026",
    venue: "NIT Hamirpur, Himachal Pradesh",
    href: "https://www.rase.co.in/registration/Single_Registration",
    external: true,
    status: "planned",
    statusLabel: "Registration Open",
    statusNote:
      "6th edition — Meeting of the Minds. Register on the official RASE portal.",
  },
  {
    title: "Shiksha Mahakumbh 5.0",
    date: "31 October – 2 November 2025",
    venue: "NIPER Mohali",
    href: "https://drive.google.com/drive/folders/1c2CKx2Z9IaN-dsoW-Ymw6Npx1EOTFcsA",
    external: true,
    status: "completed",
    statusLabel: "Concluded",
    statusNote: "284 papers at this edition; 1,200+ cumulative across SMK editions.",
  },
  {
    title: "Shiksha Mahakumbh 4.0",
    date: "16–17 December 2024",
    venue: "Kurukshetra University",
    href: "https://www.shikshamahakumbh.com/",
    external: true,
    status: "completed",
    statusLabel: "Archived",
    statusNote: "91 papers, 21 conclaves — see past events for full archive.",
  },
];

function parseJsonArray<T>(raw: string | undefined, fallback: T[]): T[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.length ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function parseMarqueeItems(
  value?: Record<string, string>
): MarqueeItem[] {
  return parseJsonArray(value?.json, DEFAULT_MARQUEE_ITEMS);
}

export function parseUpcomingEvents(
  value?: Record<string, string>
): UpcomingEventRow[] {
  return parseJsonArray(value?.json, DEFAULT_UPCOMING_EVENTS);
}

export function parseStringListJson(
  raw: string | undefined,
  fallback: string[]
): string[] {
  return parseJsonArray(raw, fallback);
}
