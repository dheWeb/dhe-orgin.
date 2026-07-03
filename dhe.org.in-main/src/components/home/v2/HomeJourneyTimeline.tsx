import { homeJourneyMilestones } from "@/data/home/redesign-content";
import HomeSectionShell from "./HomeSectionShell";

export default function HomeJourneyTimeline() {
  return (
    <HomeSectionShell
      id="journey-heading"
      title="Our Journey"
      description="From Vidya Bharti Punjab roots to a national platform shaping Viksit Bharat."
    >
      <ol className="relative border-l-2 border-orange-200 ml-3 sm:ml-4 space-y-6 sm:space-y-8">
        {homeJourneyMilestones.map((milestone, i) => (
          <li key={milestone.year} className="relative pl-6 sm:pl-8">
            <span
              className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 ring-4 ring-white"
              aria-hidden
            />
            <p className="text-sm font-bold text-orange-600 tabular-nums">{milestone.year}</p>
            <p className="mt-1 text-sm sm:text-base text-gray-700">{milestone.label}</p>
            {i === homeJourneyMilestones.length - 1 ? (
              <span className="mt-2 inline-block rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
                Current
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </HomeSectionShell>
  );
}
