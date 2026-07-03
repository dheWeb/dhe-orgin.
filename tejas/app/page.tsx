import { HomeHero } from "@/features/home/HomeHero";
import { ImpactMetricsSection } from "@/features/home/ImpactMetricsSection";
import { CurrentOlympiadsSection } from "@/features/home/CurrentOlympiadsSection";
import { WhyTejasSection } from "@/features/home/WhyTejasSection";
import { PrepareZoneSection } from "@/features/home/PrepareZoneSection";
import { EditionStorySection } from "@/features/home/EditionStorySection";
import { HallOfFamePreviewSection } from "@/features/home/HallOfFamePreviewSection";
import { ForSchoolsSection } from "@/features/home/ForSchoolsSection";
import { NewsSection } from "@/features/home/NewsSection";
import { FAQSection } from "@/components/shared/FAQSection";
import { faqItems } from "@/data/faq";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ImpactMetricsSection />
      <CurrentOlympiadsSection />
      <WhyTejasSection />
      <PrepareZoneSection />
      <EditionStorySection />
      <HallOfFamePreviewSection />
      <ForSchoolsSection />
      <NewsSection />
      <FAQSection items={faqItems.slice(0, 5)} />
    </>
  );
}
