import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { HallOfFameCard } from "@/components/shared/HallOfFameCard";
import { CertificatePreview } from "@/components/shared/CertificatePreview";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { hallOfFameEntries } from "@/data/hall-of-fame";

export const metadata = createMetadata({
  title: "Hall of Fame",
  description: "Celebrating India's brightest young minds — national toppers, state champions, and schools of excellence.",
  path: "/hall-of-fame",
});

export default function HallOfFamePage() {
  const national = hallOfFameEntries.filter((e) => e.category === "national");
  const state = hallOfFameEntries.filter((e) => e.category === "state");
  const schools = hallOfFameEntries.filter((e) => e.category === "school");

  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Hall of Fame"
        subtitle="Prestigious recognition for India's most outstanding young talent."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <CertificatePreview studentName="Aarav Sharma" rank="National Gold — Rank #1" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <SectionHeader className="mt-20" eyebrow="National" title="National Toppers" />
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {national.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 0.05}>
                <HallOfFameCard entry={entry} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <SectionHeader className="mt-20" eyebrow="State" title="State Champions" />
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            {state.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 0.05}>
                <HallOfFameCard entry={entry} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <SectionHeader className="mt-20" eyebrow="Schools" title="Schools of Excellence" />
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            {schools.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 0.05}>
                <HallOfFameCard entry={entry} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
