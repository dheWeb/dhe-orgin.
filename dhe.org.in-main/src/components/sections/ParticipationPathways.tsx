import Link from "next/link";
import { participationPathways } from "@/data/home/content";

type Props = {
  className?: string;
  /** full: title + intro + links (homepage). compact: links only for pages with their own intro. */
  variant?: "full" | "compact";
};

/** Informational links toward notices, events, membership, and contact. */
export default function ParticipationPathways({
  className = "",
  variant = "full",
}: Props) {
  const headingId = "participation-pathways-heading";
  const isCompact = variant === "compact";

  return (
    <section
      aria-labelledby={headingId}
      className={className}
    >
      <h2
        id={headingId}
        className="text-lg sm:text-xl font-semibold text-primary-color"
      >
        {isCompact ? "Official channels" : participationPathways.title}
      </h2>
      {!isCompact && (
        <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
          {participationPathways.intro}
        </p>
      )}
      <ul className="mt-4 flex flex-wrap gap-2" role="list">
        {participationPathways.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              title={link.description}
              className="inline-flex min-h-11 items-center rounded-md border border-orange-200 bg-orange-50/50 px-3 py-2 text-sm font-medium text-orange-800 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
