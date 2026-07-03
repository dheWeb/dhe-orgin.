import Link from "next/link";
import { participationPathways } from "@/data/home/content";

export default function HomeParticipationStrip() {
  return (
    <section
      aria-labelledby="participation-heading"
      className="dhe-container py-8 sm:py-10"
    >
      <h2
        id="participation-heading"
        className="text-lg sm:text-xl font-bold text-gray-900"
      >
        Get involved
      </h2>
      <p className="mt-2 text-sm text-gray-600 max-w-2xl">
        {participationPathways.intro}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2 sm:gap-3" role="list">
        {participationPathways.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              title={link.description}
              className="inline-flex min-h-11 items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-dhe-sm hover:border-orange-300 hover:text-orange-700 hover:shadow-dhe-md motion-safe:transition-all"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
