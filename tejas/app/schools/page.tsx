import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { SchoolCard } from "@/components/shared/SchoolCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { featuredSchools } from "@/data/schools";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "For Schools",
  description: "Partner with TEJAS — school registration, dashboards, and recognition tiers.",
  path: "/schools",
});

export default function SchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Schools"
        title="School Partnership Program"
        subtitle="Join 12,000+ schools in India's most prestigious talent assessment network."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-2xl bg-tejas-blue p-10 text-white text-center">
              <h2 className="text-2xl font-bold">Register Your School</h2>
              <p className="mt-3 text-white/70 max-w-xl mx-auto">
                School portal and bulk registration coming soon. Contact us to express interest.
              </p>
              <Button className="mt-6" disabled title="School portal coming soon">
                School Portal — Coming Soon
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <SectionHeader
              className="mt-20"
              title="Featured Partner Schools"
              subtitle="Schools leading the way in talent development."
            />
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSchools.map((school, i) => (
              <FadeIn key={school.id} delay={i * 0.05}>
                <SchoolCard school={school} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
