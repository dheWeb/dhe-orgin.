import Link from "next/link";
import StructurePage from "@/components/sections/StructurePage";
import { CELLS } from "@/data/cells";

export default function StructureRoutePage() {
  return (
    <>
      <section className="dhe-container pt-6 pb-2 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-primary-color">All DHE cells</h2>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm" role="list">
          {CELLS.map((cell) => (
            <li key={cell.slug}>
              <Link
                href={`/cells/${cell.slug}`}
                className="text-orange-700 hover:underline min-h-10 inline-flex items-center"
              >
                {cell.displayTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <StructurePage />
    </>
  );
}
