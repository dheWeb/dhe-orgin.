import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { editions } from "@/data/editions";

export const metadata = createMetadata({
  title: "Current Editions",
  description: "Explore current and upcoming TEJAS editions honouring India's greatest minds.",
  path: "/editions",
});

export default function EditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Editions"
        title="Current & Upcoming Editions"
        subtitle="Each edition honours a luminary of Indian knowledge, science, and culture."
        primaryCta={{ label: "Previous Editions", href: "/editions/previous" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {editions.map((edition, i) => (
              <FadeIn key={edition.slug} delay={i * 0.08}>
                <article className="rounded-2xl border border-stone-200 bg-white p-8 shadow-tejas-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-4xl font-bold text-tejas-blue">{edition.year}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-tejas-saffron">
                        {edition.status === "current" ? "Current Edition" : "Upcoming"}
                      </p>
                    </div>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-tejas-ink">{edition.name}</h2>
                  <p className="mt-1 text-sm font-medium text-tejas-muted">{edition.subtitle}</p>
                  {edition.theme && (
                    <p className="mt-3 text-sm italic text-tejas-blue">&ldquo;{edition.theme}&rdquo;</p>
                  )}
                  <p className="mt-6 text-tejas-muted leading-relaxed">{edition.bio}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
