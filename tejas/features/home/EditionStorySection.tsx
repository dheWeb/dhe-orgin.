import { Timeline } from "@/components/shared/Timeline";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { editions } from "@/data/editions";

export function EditionStorySection() {
  const timelineItems = editions.map((e) => ({
    year: e.year,
    title: e.name,
    description: e.bio,
    status: e.status,
  }));

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Editions"
            title="Featured Edition Story"
            subtitle="Each TEJAS edition honours a luminary of Indian knowledge, science, and culture."
          />
        </FadeIn>
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}
