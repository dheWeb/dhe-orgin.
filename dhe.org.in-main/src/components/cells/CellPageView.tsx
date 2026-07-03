"use client";

import dynamic from "next/dynamic";
import type { CellDefinition } from "@/data/cells/types";
import CellInfo from "@/components/cells/CellInfo";
import CellEnrichmentSections from "@/components/cells/CellEnrichmentSections";
import CellProgramsSection from "@/components/cells/CellProgramsSection";
import CellPageHero from "@/components/cells/CellPageHero";

const SlideShow = dynamic(() => import("@/components/gallery/SlideShow"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[16/9] max-h-[280px] w-full bg-gray-100 animate-pulse rounded-md" />
  ),
});

type Props = {
  cell: CellDefinition;
  sharedIntro?: string;
};

export default function CellPageView({ cell, sharedIntro }: Props) {
  const title = cell.displayTitle.trim();
  const isSlideshow =
    cell.layoutVariant === "slideshow" && cell.slides.length > 0;

  const hero = <CellPageHero title={title} description={sharedIntro} />;

  if (isSlideshow) {
    return (
      <div className="bg-white min-w-0 pb-8">
        {hero}
        <div className="dhe-container max-w-5xl mx-auto px-2">
          <div className="flex justify-center rounded-2xl overflow-hidden border border-gray-200 shadow-dhe-sm">
            <SlideShow slides={cell.slides} />
          </div>
          {cell.blocks.map((block, index) => (
            <CellInfo
              key={index}
              title={index === 0 ? undefined : block.title}
              objective={block.objective}
              footnote={block.footnote}
            />
          ))}
          <CellEnrichmentSections cell={cell} />
          <CellProgramsSection cellSlug={cell.slug} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-w-0 pb-8">
      {hero}
      <div className="dhe-container max-w-5xl mx-auto px-2">
        {cell.blocks.map((block, index) => (
          <CellInfo
            key={index}
            title={block.title}
            objective={block.objective}
            footnote={block.footnote}
            hideTitle={index === 0}
          />
        ))}
        <CellEnrichmentSections cell={cell} />
        <CellProgramsSection cellSlug={cell.slug} />
      </div>
    </div>
  );
}
