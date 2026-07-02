import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "विभाग ऑफ़ होलिस्टिक एजुकेशन | DHE",
  description:
    "होलिस्टिक शिक्षा के लिए राष्ट्रीय मंच — शिक्षा महाकुंभ, NEP 2020, और विकसित भारत।",
  alternates: { canonical: "https://www.dhe.org.in/hi" },
};

export default function HindiLandingPage() {
  return (
    <div className="dhe-container py-12 max-w-3xl mx-auto text-center">
      <p className="text-sm text-orange-700 font-medium mb-2">हिंदी संस्करण (प्रारंभिक)</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color leading-snug">
        विभाग ऑफ़ होलिस्टिक एजुकेशन
      </h1>
      <p className="mt-4 text-gray-700 leading-relaxed">
        DHE राष्ट्रीय शैक्षिक परिवर्तन मंच है — समग्र शिक्षा, शिक्षा महाकुंभ,
        NEP 2020, और विकसित भारत के लक्ष्य के साथ। पूर्ण हिंदी साइट जल्द उपलब्ध होगी।
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="min-h-11 px-5 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-500"
        >
          English site
        </Link>
        <Link
          href="/upcomingevent"
          className="min-h-11 px-5 py-2 rounded-md border border-gray-300 hover:border-orange-400"
        >
          आगामी कार्यक्रम
        </Link>
        <Link
          href="/donation"
          className="min-h-11 px-5 py-2 rounded-md border border-gray-300 hover:border-orange-400"
        >
          दान
        </Link>
      </div>
    </div>
  );
}
