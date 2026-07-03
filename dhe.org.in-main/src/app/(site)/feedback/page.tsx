import Feedback from "@/components/forms/FeedbackForm";
import { getFeedbackEventOptions } from "@/lib/cms/home-faq-content";

export default async function FeedbackPage() {
  const eventOptions = await getFeedbackEventOptions();
  return (
    <div className="dhe-container py-8">
      <header className="max-w-2xl mx-auto text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
          Feedback
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Share your experience from DHE programs and help us improve national
          initiatives.
        </p>
      </header>
      <Feedback eventOptions={eventOptions} />
    </div>
  );
}
