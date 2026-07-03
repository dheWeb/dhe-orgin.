"use client";

import dynamic from "next/dynamic";
import type { CellDefinition } from "@/data/cells/types";
import CellInfo from "@/components/cells/CellInfo";
import CellEnrichmentSections from "@/components/cells/CellEnrichmentSections";
import CellProgramsSection from "@/components/cells/CellProgramsSection";

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

function CellPageHeader({ title }: { title: string }) {
  return (
    <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold text-primary-color px-2 sm:px-4 mb-4">
      {title}
    </h1>
  );
}

export default function CellPageView({ cell, sharedIntro }: Props) {
  const title = cell.displayTitle.trim();
  const isSlideshow =
    cell.layoutVariant === "slideshow" && cell.slides.length > 0;

  const introBlock = sharedIntro ? (
    <p className="text-sm text-gray-600 px-2 sm:px-4 mb-4 max-w-3xl mx-auto text-center sm:text-left">
      {sharedIntro}
    </p>
  ) : null;

  if (isSlideshow) {
    return (
      <div className="bg-white sm:w-3/5 m-auto px-2 min-w-0 pb-4">
        <CellPageHeader title={title} />
        {introBlock}
        <div className="flex justify-center">
          <div className="sm:-mt-8 sm:-mb-8 min-w-0 w-full">
            <SlideShow slides={cell.slides} />
          </div>
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
    );
  }

  return (
    <div className="bg-white min-w-0 pb-4">
      <CellPageHeader title={title} />
      {introBlock}
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
  );
}
