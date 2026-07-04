import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Beta Testing",
  description: "Closed beta feedback for the DHE website before public launch.",
  robots: { index: false, follow: false },
};

const CHECKLIST = [
  { href: "/", label: "Homepage — hero, cells, programs, trust signals" },
  { href: "/structure", label: "Organisation structure and 25 cells" },
  { href: "/programs", label: "Programs hub including TEJAS Olympiads" },
  { href: "https://tejas.dhe.org.in", label: "TEJAS platform (external)", external: true },
  { href: "/donation", label: "Donation flow (test mode if available)" },
  { href: "/contact", label: "Contact information" },
  { href: "/hi", label: "Hindi landing page" },
  { href: "/transparency", label: "Transparency hub" },
];

export default function BetaPage() {
  return (
    <div className="dhe-container py-10 max-w-3xl">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
          Closed Beta
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-primary-color">
          Help Shape dhe.org.in
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          You are among the first testers of the Department of Holistic Education website.
          Explore the areas below, then submit structured feedback.
        </p>
      </header>

      <section className="rounded-xl border border-orange-200 bg-orange-50/60 p-6 mb-8">
        <h2 className="font-bold text-primary-color">What to explore</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          {CHECKLIST.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-700 font-medium hover:underline"
                >
                  {item.label} ↗
                </a>
              ) : (
                <Link href={item.href} className="text-orange-700 font-medium hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-primary-color">Submit feedback</h2>
        <p className="mt-2 text-sm text-gray-600">
          Use the official feedback form — responses go to the DHE team and help prioritise
          fixes before public announcement.
        </p>
        <ul className="mt-4 list-decimal list-inside text-sm text-gray-600 space-y-1">
          <li>Is the site clear as DHE&apos;s national platform?</li>
          <li>Can you find cells, programs, and donation paths quickly?</li>
          <li>Does the TEJAS / Olympiad link make sense?</li>
          <li>Any broken links, confusing labels, or mobile issues?</li>
          <li>Would you recommend this site to partner schools?</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/feedback"
            className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
          >
            Open Feedback Form
          </Link>
          <a
            href="mailto:director@dhe.org.in?subject=DHE%20Website%20Beta%20Feedback"
            className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Email director@dhe.org.in
          </a>
        </div>
      </section>
    </div>
  );
}
