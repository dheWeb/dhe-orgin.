import { homeStats, homeImpactStats } from "@/data/home/content";
import { HomeIcon } from "@/components/home/HomeIcons";
import HomeAnimatedCounter from "./HomeAnimatedCounter";

export default function HomeStatGrid() {
  const allStats = [...homeStats, ...homeImpactStats];

  return (
    <section aria-labelledby="home-stats-heading" className="bg-dhe-muted border-y border-gray-100">
      <div className="dhe-container py-8 sm:py-10">
        <h2 id="home-stats-heading" className="sr-only">
          DHE institutional statistics
        </h2>
        <ul
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5"
          role="list"
        >
          {allStats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl bg-white border border-gray-200/80 px-3 py-4 text-center shadow-dhe-sm hover:shadow-dhe-md hover:border-orange-200 hover:-translate-y-0.5 motion-safe:transition-all"
            >
              {"icon" in stat && stat.icon ? (
                <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <HomeIcon name={stat.icon} className="w-4 h-4" />
                </span>
              ) : null}
              <p className="text-xl sm:text-2xl font-bold text-orange-600 tabular-nums leading-none">
                <HomeAnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-snug">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
