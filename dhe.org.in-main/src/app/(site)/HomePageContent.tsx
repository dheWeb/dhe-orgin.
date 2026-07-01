import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import MiddleComponent from "@/components/home/MiddleComponent";
import HomeClosingCta from "@/components/home/HomeClosingCta";
import HomeFaqSection from "@/components/home/HomeFaqSection";
import { homeSlides } from "@/data/home/slides";
import AdSlot from "@/components/ui/AdSlot";

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

/**
 * Homepage flow:
 * Hero → Overview & stats → Achievements → Cells/ecosystem → Programs → News → Gallery → CTA
 */
export default function HomePageContent({ tagline }: { tagline?: string }) {
  return (
    <div className="bg-white overflow-x-hidden min-w-0">
      <HomeHero />
      {tagline ? (
        <p className="dhe-container text-center text-sm sm:text-base text-gray-600 -mt-2 mb-4 px-4">
          {tagline}
        </p>
      ) : null}

      <div className="dhe-container">
        <MiddleComponent />
      </div>

      <div className="dhe-container dhe-section-py">
        <AdSlot slotId="home-mid-1" minHeight={120} label="Advertisement placeholder" />
      </div>

      <HomeNewsSection />

      <HomeGalleryPreview slides={homeSlides} />

      <HomeFaqSection />

      <HomeClosingCta />
    </div>
  );
}
