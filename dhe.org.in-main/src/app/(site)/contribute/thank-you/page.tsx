import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("contribute");

export default function ContributeThankYouPage() {
  return (
    <div className="dhe-container py-12 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
        Thank you for joining DHE
      </h1>
      <p className="mt-4 text-gray-700 leading-relaxed">
        Your membership payment was received. Our team will follow up on your
        application status by email.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link
          href="/contribute"
          className="text-orange-700 font-semibold hover:underline"
        >
          Membership information
        </Link>
        <Link href="/" className="text-orange-700 font-semibold hover:underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
