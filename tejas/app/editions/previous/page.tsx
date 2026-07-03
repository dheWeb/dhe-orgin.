import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { EditionCard } from "@/components/shared/EditionCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { previousEditions } from "@/data/editions";

export const metadata = createMetadata({
  title: "Previous Editions",
  description: "Archive of past TEJAS editions and their legacy.",
  path: "/editions/previous",
});

export default function PreviousEditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Archive"
        title="Previous Editions"
        subtitle="Honouring the journey of India's national talent assessment platform."
        primaryCta={{ label: "Current Editions", href: "/editions" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {previousEditions.map((edition, i) => (
              <FadeIn key={edition.slug} delay={i * 0.1}>
                <article className="rounded-2xl border border-stone-200 bg-white p-8 shadow-tejas">
                  <EditionCard
                    year={edition.year}
                    name={edition.name}
                    subtitle={edition.subtitle}
                    theme={edition.theme}
                    status="past"
                  />
                  <p className="mt-6 text-tejas-muted">{edition.bio}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
