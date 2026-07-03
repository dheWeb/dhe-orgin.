import Link from "next/link";
import type { CellDefinition } from "@/data/cells/types";
import cellRegistry from "@/data/cells/registry.json";
import { homeFeaturedCellSlugs } from "@/data/home/redesign-content";
import HomeSectionShell from "./HomeSectionShell";

const cells = cellRegistry as CellDefinition[];
const featured = homeFeaturedCellSlugs
  .map((slug) => cells.find((c) => c.slug === slug))
  .filter(Boolean) as CellDefinition[];

export default function HomeCellsGrid() {
  return (
    <HomeSectionShell
      id="cells-heading"
      title="25 National Cells"
      description="Research, innovation, entrepreneurship, publications, events, and community outreach — explore featured cells or view the full structure."
    >
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" role="list">
        {featured.map((cell) => (
          <li key={cell.slug}>
            <Link
              href={`/cells/${cell.slug}`}
              className="group flex min-h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-800 shadow-dhe-sm hover:border-orange-300 hover:text-orange-700 hover:shadow-dhe-md motion-safe:transition-all"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-xs font-bold text-orange-600"
                aria-hidden
              >
                {cell.displayTitle.trim().charAt(0)}
              </span>
              <span className="line-clamp-2 leading-snug">{cell.displayTitle.trim()}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href="/structure"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 min-h-11 inline-flex items-center"
        >
          View full organizational structure →
        </Link>
      </p>
    </HomeSectionShell>
  );
}
