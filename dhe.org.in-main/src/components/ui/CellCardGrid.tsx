import Link from "next/link";
import type { CellDefinition } from "@/data/cells/types";

export default function CellCardGrid({ cells }: { cells: CellDefinition[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" role="list">
      {cells.map((cell) => (
        <li key={cell.slug}>
          <Link
            href={`/cells/${cell.slug}`}
            className="group flex min-h-11 flex-col rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-dhe-sm hover:border-orange-300 hover:shadow-dhe-md hover:-translate-y-0.5 motion-safe:transition-all"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-sm font-bold text-orange-600"
              aria-hidden
            >
              {cell.displayTitle.trim().charAt(0)}
            </span>
            <span className="mt-2 text-sm font-medium text-gray-900 group-hover:text-orange-700 line-clamp-2 leading-snug">
              {cell.displayTitle.trim()}
            </span>
            <span className="mt-2 text-xs font-medium text-orange-600 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity">
              Open cell →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
