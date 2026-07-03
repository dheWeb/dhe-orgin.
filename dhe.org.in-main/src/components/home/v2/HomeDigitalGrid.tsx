import HomeFeatureCard from "@/components/ui/HomeFeatureCard";
import { HomeIcon } from "@/components/home/HomeIcons";
import { digitalEcosystem } from "@/data/home/content";
import HomeSectionShell from "./HomeSectionShell";

type Props = { digitalDescription?: string };

export default function HomeDigitalGrid({ digitalDescription }: Props) {
  return (
    <HomeSectionShell
      id="digital-ecosystem-heading"
      title={digitalEcosystem.title}
      description={digitalDescription || digitalEcosystem.description}
      variant="muted"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" role="list">
        {digitalEcosystem.cards.map((item) => (
          <li key={item.title}>
            <HomeFeatureCard
              href={"href" in item ? item.href : undefined}
              external={"href" in item && typeof item.href === "string" && item.href.startsWith("http")}
              title={item.title}
              description={item.desc}
              icon={<HomeIcon name={item.icon} className="w-5 h-5" />}
            />
          </li>
        ))}
      </ul>
    </HomeSectionShell>
  );
}
