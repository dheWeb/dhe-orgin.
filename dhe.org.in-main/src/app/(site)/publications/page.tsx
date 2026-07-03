import PageHero from "@/components/ui/PageHero";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";
import { HomeIcon } from "@/components/home/HomeIcons";

const hubs = [
  {
    title: "Books",
    href: "/books",
    description: "DHE books and curated reading aligned with holistic education.",
    icon: "journal" as const,
  },
  {
    title: "Journals",
    href: "/journals",
    description: "Viksit India and allied journals from DHE programs.",
    icon: "journal" as const,
  },
  {
    title: "pub.dhe.org.in",
    href: "https://pub.dhe.org.in",
    description: "Official publications portal for proceedings and digital outputs.",
    icon: "digital" as const,
    external: true,
  },
  {
    title: "Shiksha Mahakumbh archives",
    href: "/pastevent",
    description: "Past conference materials and event archives.",
    icon: "summit" as const,
  },
  {
    title: "Notice Board",
    href: "/noticeboard",
    description: "Latest circulars and publication announcements.",
    icon: "events" as const,
  },
  {
    title: "Research & Proceedings",
    href: "/programs/publications",
    description: "DHE publications program and journal outputs.",
    icon: "academic" as const,
  },
] as const;

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge outputs"
        title="Publications Hub"
        description="Books, journals, proceedings, and research from the Department of Holistic Education and partner institutions."
      />
      <div className="dhe-container py-10 sm:py-12 max-w-6xl mx-auto">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {hubs.map((item) => (
            <li key={item.title}>
              <HomeFeatureCard
                href={item.href}
                external={"external" in item && item.external}
                title={item.title}
                description={item.description}
                icon={<HomeIcon name={item.icon} className="w-5 h-5" />}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
