import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { OlympiadCard } from "@/components/shared/OlympiadCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { olympiads } from "@/data/olympiads";

export const metadata = createMetadata({
  title: "Olympiads",
  description: "Explore TEJAS Olympiads across Mathematics, Science, Technology, Languages, AI, Coding, and more.",
  path: "/olympiads",
});

export default function OlympiadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Olympiads"
        title="National Olympiad Series"
        subtitle="Ten subjects designed to discover and celebrate India's brightest young minds."
        primaryCta={{ label: "Free Mock Test", href: "/prepare/mock-tests" }}
        secondaryCta={{ label: "Prepare Hub", href: "/prepare" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
