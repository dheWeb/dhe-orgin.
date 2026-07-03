"use client";

import Link from "next/link";
import { getProgramsForCell } from "@/data/programs/registry";

type Props = {
  cellSlug: string;
};

export default function CellProgramsSection({ cellSlug }: Props) {
  const programs = getProgramsForCell(cellSlug);
  if (!programs.length) return null;

  return (
    <section
      className="dhe-container py-6 border-t border-gray-200"
      aria-labelledby={`cell-programs-${cellSlug}`}
    >
      <h2
        id={`cell-programs-${cellSlug}`}
        className="text-lg font-semibold text-primary-color mb-3"
      >
        Active programs
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2" role="list">
        {programs.map((program) => (
          <li key={program.slug}>
            <Link
              href={`/programs/${program.slug}`}
              className="block rounded-md border border-gray-200 p-4 hover:border-orange-400 transition"
            >
              <span className="text-sm font-semibold text-gray-900">
                {program.title}
              </span>
              <span className="mt-1 block text-xs text-gray-600 leading-snug">
                {program.summary}
              </span>
              {program.smkConvergence ? (
                <span className="mt-2 inline-block text-[10px] font-medium uppercase tracking-wide text-orange-700 bg-orange-50 px-2 py-0.5 rounded">
                  SMK convergence
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
