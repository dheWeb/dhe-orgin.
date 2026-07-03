import HomeFeatureCard from "@/components/ui/HomeFeatureCard";
import { HomeIcon } from "@/components/home/HomeIcons";
import { homeWhyPillars } from "@/data/home/redesign-content";
import HomeSectionShell from "./HomeSectionShell";

export default function HomePillarCards() {
  return (
    <HomeSectionShell
      id="why-dhe-heading"
      title="Why DHE"
      description="A national platform advancing holistic education, innovation, and Bharatiya values — with measurable impact across institutions."
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" role="list">
        {homeWhyPillars.map((pillar) => (
          <li key={pillar.title}>
            <HomeFeatureCard
              href={pillar.href}
              title={pillar.title}
              description={pillar.description}
              icon={<HomeIcon name={pillar.icon} className="w-5 h-5" />}
            />
          </li>
        ))}
      </ul>
    </HomeSectionShell>
  );
}
