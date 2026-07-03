import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { ResourceCard } from "@/components/shared/ResourceCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { resources } from "@/data/resources";

export const metadata = createMetadata({
  title: "Resources",
  description: "Study guides, sample papers, video lessons, and practice materials for TEJAS olympiads.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Learning Resources Hub"
        subtitle="Curated materials to support your olympiad preparation journey."
        primaryCta={{ label: "Prepare Hub", href: "/prepare" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader title="All Resources" subtitle="Sample papers, videos, articles, and practice sets." />
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r, i) => (
              <FadeIn key={r.id} delay={i * 0.05}>
                <ResourceCard resource={r} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
