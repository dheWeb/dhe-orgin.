import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { OlympiadCard } from "@/components/shared/OlympiadCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { olympiads } from "@/data/olympiads";

export const metadata = createMetadata({
  title: "Mock Tests",
  description: "Free TEJAS mock tests across all olympiad subjects. Practice with confidence.",
  path: "/prepare/mock-tests",
});

export default function MockTestsPage() {
  return (
    <>
      <PageHero
        eyebrow="Mock Tests"
        title="Free Mock Tests"
        subtitle="Full-length simulated exams with instant scoring. No registration required in Phase 0."
        primaryCta={{ label: "Prepare Hub", href: "/prepare" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              title="Choose Your Subject"
              subtitle="Select an olympiad to start a free mock test. Live exam engine coming in a future release."
            />
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {olympiads.map((o, i) => (
              <FadeIn key={o.slug} delay={i * 0.04}>
                <OlympiadCard {...o} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
