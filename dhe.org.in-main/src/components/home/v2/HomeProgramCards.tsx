import Link from "next/link";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";
import { homeProgramHighlights } from "@/data/home/content";
import HomeSectionShell from "./HomeSectionShell";

export default function HomeProgramCards() {
  return (
    <HomeSectionShell
      id="active-programs-heading"
      title="Active Programs"
      description="Year-round initiatives across DHE cells — Olympiads, workshops, publications, and the flagship Shiksha Mahakumbh."
      variant="muted"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" role="list">
        {homeProgramHighlights.map((item) => (
          <li key={item.slug}>
            <HomeFeatureCard
              href={`/programs/${item.slug}`}
              title={item.title}
              stat={item.stat}
            />
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link
          href="/programs"
          className="dhe-btn-primary text-sm"
        >
          View all programs
        </Link>
      </p>
    </HomeSectionShell>
  );
}
