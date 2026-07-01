import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("contactThankYou");

export default function ContactThankYouPage() {
  return (
    <div className="dhe-container py-12 max-w-xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
        Message received
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Thank you for contacting the Department of Holistic Education. Our team
        will respond to your inquiry at the email address you provided.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="dhe-btn-primary min-h-11 inline-flex items-center justify-center px-6">
          Back to home
        </Link>
        <Link
          href="/noticeboard"
          className="min-h-11 inline-flex items-center justify-center px-6 rounded-md border border-gray-300 text-gray-800 hover:border-orange-400"
        >
          View notices
        </Link>
      </div>
    </div>
  );
}
