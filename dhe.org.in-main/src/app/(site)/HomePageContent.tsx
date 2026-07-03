import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import HomeMainSections from "@/components/home/v2/HomeMainSections";
import HomeClosingCta from "@/components/home/HomeClosingCta";
import HomeTrustStrip from "@/components/home/HomeTrustStrip";
import { homeSlides } from "@/data/home/slides";
import type { MarqueeItem } from "@/lib/cms/cms-parsers";

import HomeStickyMobileCta from "@/components/home/v2/HomeStickyMobileCta";
const HomeNewsSection = dynamic(() => import("@/components/home/HomeNewsSection"), {
  loading: () => <div className="h-40 bg-[#07111f] animate-pulse" aria-hidden />,
});

const HomeGalleryPreview = dynamic(
  () => import("@/components/home/HomeGalleryPreview"),
  {
    loading: () => (
      <div className="dhe-container h-32 animate-pulse bg-gray-50" aria-hidden />
    ),
  }
);

const HomeFaqSection = dynamic(() => import("@/components/home/HomeFaqSection"), {
  loading: () => (
    <div className="dhe-container h-48 animate-pulse bg-gray-50" aria-hidden />
  ),
});

type HomeIntroProps = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
};

/**
 * Homepage flow (v2):
 * Hero → Trust → Stats → Why DHE → Programs → SMK → Journey → Cells → Digital → Leadership → Partners → News → Gallery → FAQ → CTA
 */
export default function HomePageContent({
  tagline,
  homeIntro,
  marqueeItems,
  visionBody,
  closingCta,
  nationalImpactBody,
  nationalImpactHighlights,
  leadership,
  shiksha,
  digitalDescription,
  faqItems,
  smkSiteUrl,
  testimonials,
}: {
  tagline?: string;
  homeIntro?: HomeIntroProps;
  marqueeItems?: MarqueeItem[];
  visionBody?: string;
  closingCta?: { titleLine1?: string; titleLine2?: string; body?: string };
  nationalImpactBody?: string;
  nationalImpactHighlights?: string[];
  leadership?: {
    bodyPrefix?: string;
    leaderName?: string;
    leaderUrl?: string;
    bodySuffix?: string;
    visionQuote?: string;
  };
  shiksha?: { paragraph1?: string; paragraph2?: string };
  digitalDescription?: string;
  faqItems?: { question: string; answer: string }[];
  smkSiteUrl?: string;
  testimonials?: { quote: string; name: string; role: string }[];
}) {
  return (
    <div className="bg-white overflow-x-hidden min-w-0 pb-20 md:pb-0">
      <HomeHero homeIntro={homeIntro} />

      {tagline ? (
        <p className="dhe-container text-center text-sm sm:text-base text-gray-500 py-3 px-4 border-b border-gray-100">
          {tagline}
        </p>
      ) : null}

      <div className="dhe-container py-8 sm:py-10">
        <HomeTrustStrip />
      </div>

      <HomeMainSections
        visionBody={visionBody}
        nationalImpactBody={nationalImpactBody}
        nationalImpactHighlights={nationalImpactHighlights}
        leadership={leadership}
        shiksha={shiksha}
        digitalDescription={digitalDescription}
        smkSiteUrl={smkSiteUrl}
        testimonials={testimonials}
      />

      <HomeNewsSection marqueeItems={marqueeItems} />

      <HomeGalleryPreview slides={homeSlides} />

      <HomeFaqSection items={faqItems} />

      <HomeClosingCta
        titleLine1={closingCta?.titleLine1}
        titleLine2={closingCta?.titleLine2}
        body={closingCta?.body}
        smkSiteUrl={smkSiteUrl}
      />

      <HomeStickyMobileCta />
    </div>
  );
}
