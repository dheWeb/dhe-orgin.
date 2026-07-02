import { createPageMetadata } from "@/lib/seo/build-metadata";
import UpcomingEvent from "@/components/sections/UpcomingEvent";
import { siteConfig } from "@/lib/seo/site-metadata";
import { getSiteContent } from "@/lib/cms/site-content";
import { parseUpcomingEvents } from "@/lib/cms/cms-parsers";

export const metadata = createPageMetadata("upcomingevent");

function buildEventsJsonLd(
  rows: ReturnType<typeof parseUpcomingEvents>
): Record<string, unknown> {
  const planned = rows.filter((r) => r.status === "planned" || r.status === "external");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DHE Upcoming Events",
    itemListElement: planned.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.title,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus:
          event.status === "planned"
            ? "https://schema.org/EventScheduled"
            : "https://schema.org/EventMovedOnline",
        location: {
          "@type": "Place",
          name: event.venue,
        },
        organizer: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        url: event.href.startsWith("http")
          ? event.href
          : `${siteConfig.url}${event.href}`,
      },
    })),
  };
}

export default async function UpcomingEventPage() {
  const content = await getSiteContent(["upcoming_events"]);
  const rows = parseUpcomingEvents(content.upcoming_events);
  const eventsJsonLd = buildEventsJsonLd(rows);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <UpcomingEvent rows={rows} />
    </>
  );
}
