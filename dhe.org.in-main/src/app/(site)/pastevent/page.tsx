import { createPageMetadata } from "@/lib/seo/build-metadata";
import PastEvent from "@/components/sections/PastEvent";
import { getPastEvents } from "@/lib/cms/past-events-content";

export const metadata = createPageMetadata("pastevent");

export default async function PastEventPage() {
  const events = await getPastEvents();
  return <PastEvent events={events} />;
}
