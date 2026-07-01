import { createPageMetadata } from "@/lib/seo/build-metadata";
import UpcomingEvent from "@/components/sections/UpcomingEvent";
import { siteConfig } from "@/lib/seo/site-metadata";

export const metadata = createPageMetadata("upcomingevent");

const eventsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DHE Upcoming Events",
  itemListElement: [
    {
      "@type": "Event",
      name: "Shiksha Mahakumbh 6.0",
      startDate: "2026-10-09",
      endDate: "2026-10-11",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "NIT Hamirpur",
        address: "Hamirpur, Himachal Pradesh, India",
      },
      organizer: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      url: "https://www.rase.co.in/registration/Single_Registration",
    },
  ],
};

export default function UpcomingEventPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <UpcomingEvent />
    </>
  );
}
