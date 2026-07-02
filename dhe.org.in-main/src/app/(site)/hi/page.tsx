import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "विभाग ऑफ़ होलिस्टिक एजुकेशन | DHE",
  description:
    "होलिस्टिक शिक्षा के लिए राष्ट्रीय मंच — शिक्षा महाकुंभ, NEP 2020, और विकसित भारत।",
  alternates: { canonical: "https://www.dhe.org.in/hi" },
};

const LINKS = [
  { href: "/programs", label: "कार्यक्रम" },
  { href: "/noticeboard", label: "सूचना पट्ट" },
  { href: "/upcomingevent", label: "आगामी कार्यक्रम" },
  { href: "/donation", label: "दान करें" },
  { href: "/contribute", label: "सदस्यता" },
  { href: "/contact", label: "संपर्क" },
  { href: "/leadership", label: "नेतृत्व" },
  { href: "/publications", label: "प्रकाशन" },
] as const;

export default function HindiLandingPage() {
  return (
    <div className="dhe-container py-12 max-w-3xl mx-auto">
      <p className="text-sm text-orange-700 font-medium mb-2 text-center">
        हिंदी संस्करण
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color leading-snug text-center">
        विभाग ऑफ़ होलिस्टिक एजुकेशन (DHE)
      </h1>
      <p className="mt-4 text-gray-700 leading-relaxed text-center">
        DHE राष्ट्रीय शैक्षिक परिवर्तन मंच है — समग्र शिक्षा, शिक्षा महाकुंभ,
        NEP 2020, और विकसित भारत के लक्ष्य के साथ। नीचे मुख्य पृष्ठों के लिंक
        दिए गए हैं; विस्तृत सामग्री अंग्रेज़ी साइट पर भी उपलब्ध है।
      </p>

      <section className="mt-10" aria-labelledby="hi-quick-links">
        <h2 id="hi-quick-links" className="text-lg font-semibold text-gray-900 mb-4">
          मुख्य अनुभाग
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block min-h-11 px-4 py-3 rounded-md border border-gray-200 hover:border-orange-400 text-gray-800"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-lg bg-orange-50 border border-orange-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900">शिक्षा महाकुंभ</h2>
        <p className="mt-2 text-gray-700 text-sm leading-relaxed">
          छठा संस्करण 9–11 अक्टूबर 2026 को NIT हमीरपुर, हिमाचल प्रदेश में आयोजित
          होगा। पंजीकरण और विवरण के लिए आगामी कार्यक्रम पृष्ठ देखें।
        </p>
        <Link
          href="/upcomingevent"
          className="inline-flex mt-4 min-h-11 items-center px-5 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-500"
        >
          आगामी कार्यक्रम
        </Link>
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="min-h-11 px-5 py-2 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800"
        >
          English site
        </Link>
        <Link
          href="/receipt/verify"
          className="min-h-11 px-5 py-2 rounded-md border border-gray-300 hover:border-orange-400"
        >
          दान रसीद सत्यापन
        </Link>
      </div>
    </div>
  );
}
