import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("registrationThankYou");

export default function RegistrationThankYouPage() {
  return (
    <div className="dhe-container py-12 max-w-xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
        Registration received
      </h1>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Thank you for registering your interest in DHE workshops. Our team will
        contact you by email when the next program opens.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="dhe-btn-primary min-h-11 inline-flex items-center justify-center px-6"
        >
          Back to home
        </Link>
        <Link
          href="/workshop"
          className="min-h-11 inline-flex items-center justify-center px-6 rounded-md border border-gray-300 text-gray-800 hover:border-orange-400"
        >
          Workshop archive
        </Link>
      </div>
    </div>
  );
}
