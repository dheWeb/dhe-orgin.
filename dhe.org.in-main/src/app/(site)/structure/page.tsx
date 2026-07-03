import StructurePage from "@/components/sections/StructurePage";
import { CELLS } from "@/data/cells";
import CellCardGrid from "@/components/ui/CellCardGrid";

export default function StructureRoutePage() {
  return (
    <>
      <StructurePage />
      <section
        aria-labelledby="all-cells-heading"
        className="dhe-container pb-12 sm:pb-16 max-w-6xl mx-auto"
      >
        <header className="mb-6 sm:mb-8">
          <h2
            id="all-cells-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
          >
            All 25 national cells
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">
            Research, innovation, publications, events, Olympiads, and community outreach — open any cell for objectives and programs.
          </p>
        </header>
        <CellCardGrid cells={CELLS} />
      </section>
    </>
  );
}
