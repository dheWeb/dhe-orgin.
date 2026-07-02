import { createPageMetadata } from "@/lib/seo/build-metadata";
import PastEvent from "@/components/sections/PastEvent";
import { getPastEvents } from "@/lib/cms/past-events-content";
import { buildEventItemListSchema } from "@/lib/seo/event-schema";

export const metadata = createPageMetadata("pastevent");

export default async function PastEventPage() {
  const events = await getPastEvents();
  const jsonLd = buildEventItemListSchema("DHE Past Events", events, "completed");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PastEvent events={events} />
    </>
  );
}
