import { createPageMetadata } from "@/lib/seo/build-metadata";
import UpcomingEvent from "@/components/sections/UpcomingEvent";
import { getSiteContent } from "@/lib/cms/site-content";
import { parseUpcomingEvents } from "@/lib/cms/cms-parsers";
import { buildEventItemListSchema } from "@/lib/seo/event-schema";

export const metadata = createPageMetadata("upcomingevent");

export default async function UpcomingEventPage() {
  const content = await getSiteContent(["upcoming_events"]);
  const rows = parseUpcomingEvents(content.upcoming_events);
  const planned = rows.filter((r) => r.status === "planned" || r.status === "external");
  const eventsJsonLd = buildEventItemListSchema(
    "DHE Upcoming Events",
    planned.map((e) => ({
      title: e.title,
      venue: e.venue,
      href: e.href,
    })),
    "scheduled"
  );

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
