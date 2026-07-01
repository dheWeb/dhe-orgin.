import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("donation");

type PageProps = {
  searchParams: Promise<{ receipt?: string }>;
};

export default async function DonationThankYouPage({ searchParams }: PageProps) {
  const { receipt } = await searchParams;

  return (
    <div className="dhe-container py-12 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
        Thank you for your donation
      </h1>
      <p className="mt-4 text-gray-700 leading-relaxed">
        Your payment was received. An official receipt with PDF attachment will
        arrive by email within a few minutes. Please check your spam folder.
      </p>
      {receipt && (
        <p className="mt-4 text-sm text-gray-600">
          Receipt No.: <strong>{receipt}</strong>
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link
          href="/donation"
          className="text-orange-700 font-semibold hover:underline"
        >
          Make another donation
        </Link>
        <Link href="/" className="text-orange-700 font-semibold hover:underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
