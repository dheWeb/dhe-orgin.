import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { RankingTable } from "@/components/shared/RankingTable";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { nationalRankings } from "@/data/rankings";

export const metadata = createMetadata({
  title: "Rankings",
  description: "National TEJAS rankings — top performers from the latest edition.",
  path: "/rankings",
});

export default function RankingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Rankings"
        title="National Rankings"
        subtitle="Top performers from the Sir CV Raman Edition 2026. Updated rankings publish after each edition."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader title="National Top 10" subtitle="Mathematics Olympiad — Overall Performance" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <RankingTable rows={nationalRankings} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
