import { createPageMetadata } from "@/lib/seo/build-metadata";
import Feedback from "@/components/forms/FeedbackForm";
import { getFeedbackEventOptions } from "@/lib/cms/home-faq-content";

export const metadata = createPageMetadata("feedback");

export default async function FeedbackPage() {
  const eventOptions = await getFeedbackEventOptions();
  return <Feedback eventOptions={eventOptions} />;
}
