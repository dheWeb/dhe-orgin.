import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("feedbackThankYou");

export default function FeedbackThankYouPage() {
  return (
    <div className="dhe-container py-12 max-w-xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
        Thank you for your feedback
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Your response helps DHE improve programs, events, and institutional
        engagement across Bharat.
      </p>
      <Link href="/programs" className="dhe-btn-primary mt-8 min-h-11 inline-flex items-center justify-center px-6">
        Explore programs
      </Link>
    </div>
  );
}
