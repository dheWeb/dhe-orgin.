import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { scholarships } from "@/data/scholarships";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Scholarships",
  description: "TEJAS scholarships and grants for outstanding performers across India.",
  path: "/scholarships",
});

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Scholarships"
        title="Scholarships & Grants"
        subtitle="Merit-based financial support for India's brightest young minds."
        primaryCta={{ label: "View Rankings", href: "/rankings" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader title="Available Scholarships" subtitle="Eligibility based on olympiad performance." />
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            {scholarships.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.06}>
                <article className="rounded-2xl border border-stone-200 bg-white p-8 shadow-tejas h-full flex flex-col">
                  <Badge variant="gold">{s.amount}</Badge>
                  <h3 className="mt-4 text-xl font-bold text-tejas-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-tejas-muted leading-relaxed">{s.description}</p>
                  <dl className="mt-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-tejas-muted">Eligibility</dt>
                      <dd className="font-medium text-tejas-ink text-right max-w-[60%]">{s.eligibility}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-tejas-muted">Deadline</dt>
                      <dd className="font-medium text-tejas-ink">{s.deadline}</dd>
                    </div>
                  </dl>
                  <Button className="mt-6 w-full" disabled title="Applications open with registration">
                    Apply — Coming Soon
                  </Button>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
