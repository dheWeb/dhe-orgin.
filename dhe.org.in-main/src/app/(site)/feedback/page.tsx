import Feedback from "@/components/forms/FeedbackForm";
import { getFeedbackEventOptions } from "@/lib/cms/home-faq-content";

export default async function FeedbackPage() {
  const eventOptions = await getFeedbackEventOptions();
  return <Feedback eventOptions={eventOptions} />;
}
