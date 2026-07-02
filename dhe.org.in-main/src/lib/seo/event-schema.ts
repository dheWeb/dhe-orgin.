import { siteConfig } from "@/lib/seo/site-metadata";

type EventLike = {
  title: string;
  date?: string;
  venue?: string;
  href?: string;
  link?: string;
};

function eventUrl(href: string | undefined): string | undefined {
  if (!href) return undefined;
  return href.startsWith("http") ? href : `${siteConfig.url}${href}`;
}

/** Schema.org Event for past or upcoming listings. */
export function buildEventSchema(event: EventLike, status: "scheduled" | "completed") {
  return {
    "@type": "Event",
    name: event.title,
    startDate: event.date || undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      status === "scheduled"
        ? "https://schema.org/EventScheduled"
        : undefined,
    location: event.venue
      ? { "@type": "Place", name: event.venue }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: eventUrl(event.href ?? event.link),
  };
}

export function buildEventItemListSchema(
  name: string,
  events: EventLike[],
  status: "scheduled" | "completed"
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildEventSchema(event, status),
    })),
  };
}
