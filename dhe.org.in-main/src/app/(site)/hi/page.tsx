import Link from "next/link";
import type { Metadata } from "next";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";

export const metadata: Metadata = {
  title: "विभाग ऑफ़ होलिस्टिक एजुकेशन | DHE",
  description:
    "होलिस्टिक शिक्षा के लिए राष्ट्रीय मंच — शिक्षा महाकुंभ, NEP 2020, और विकसित भारत।",
  alternates: { canonical: "https://www.dhe.org.in/hi" },
};

const LINKS = [
  { href: "/programs", label: "कार्यक्रम", desc: "ओलंपियाड, प्रकाशन, SMK और अधिक" },
  { href: "/structure", label: "25 राष्ट्रीय सेल", desc: "संस्थागत संरचना" },
  { href: "/noticeboard", label: "सूचना पट्ट", desc: "आधिकारिक सूचनाएँ" },
  { href: "/upcomingevent", label: "आगामी कार्यक्रम", desc: "SMK 6.0 · NIT हमीरपुर" },
  { href: "/donation", label: "दान करें (80G)", desc: "VBITR ट्रस्ट" },
  { href: "/contribute", label: "सदस्यता", desc: "DHE से जुड़ें" },
  { href: "/transparency", label: "पारदर्शिता", desc: "ट्रस्ट दस्तावेज़" },
  { href: "/contact", label: "संपर्क", desc: "संस्थागत पूछताछ" },
] as const;

const HIGHLIGHTS = [
  { value: "25", label: "राष्ट्रीय सेल" },
  { value: "10,040+", label: "ओलंपियाड छात्र" },
  { value: "80G", label: "दान लाभ" },
  { value: "NEP", label: "2020 संरेखित" },
] as const;

export default function HindiLandingPage() {
  return (
    <div className="bg-gradient-to-b from-orange-50/30 to-white min-h-[60vh]">
      <div className="dhe-container py-10 sm:py-14 max-w-4xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 text-center">
          हिंदी संस्करण
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-center tracking-tight">
          विभाग ऑफ़ होलिस्टिक एजुकेशन
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
          DHE राष्ट्रीय शैक्षिक परिवर्तन मंच है — समग्र शिक्षा, नवाचार, शोध और विकसित भारत के लक्ष्य के साथ NEP 2020 संरेखित।
        </p>

        <ul
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3"
          role="list"
          aria-label="मुख्य आँकड़े"
        >
          {HIGHLIGHTS.map((item) => (
            <li
              key={item.label}
              className="rounded-xl border border-gray-200 bg-white px-3 py-4 text-center shadow-dhe-sm"
            >
              <p className="text-xl font-bold text-orange-600">{item.value}</p>
              <p className="mt-1 text-xs text-gray-600">{item.label}</p>
            </li>
          ))}
        </ul>

        <section className="mt-10" aria-labelledby="hi-quick-links">
          <h2 id="hi-quick-links" className="text-xl font-bold text-gray-900 mb-5">
            मुख्य अनुभाग
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LINKS.map((item) => (
              <li key={item.href}>
                <HomeFeatureCard
                  href={item.href}
                  title={item.label}
                  description={item.desc}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl bg-dhe-navy text-white p-6 sm:p-8 shadow-dhe-lg">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
            शिक्षा महाकुंभ 6.0
          </p>
          <h2 className="mt-2 text-2xl font-bold">NIT हमीरपुर</h2>
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            छठा संस्करण 9–11 अक्टूबर 2026 को आयोजित होगा। पंजीकरण और विवरण के लिए आगामी कार्यक्रम पृष्ठ देखें।
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/programs/shiksha-mahakumbh" className="dhe-btn-primary text-sm">
              SMK कार्यक्रम
            </Link>
            <Link href="/upcomingevent" className="dhe-btn-ghost-light text-sm">
              आगामी कार्यक्रम
            </Link>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="dhe-btn-primary text-sm">
            English site
          </Link>
          <Link
            href="/receipt/verify"
            className="inline-flex min-h-11 items-center px-5 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:border-orange-300"
          >
            दान रसीद सत्यापन
          </Link>
        </div>
      </div>
    </div>
  );
}
