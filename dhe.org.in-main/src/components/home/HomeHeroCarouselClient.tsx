"use client";

import dynamic from "next/dynamic";
import { homeSlides } from "@/data/home/slides";

const SlideShow = dynamic(() => import("@/components/gallery/SlideShow"), {
  ssr: false,
  loading: () => null,
});

const HERO_IMAGE_CLASS =
  "w-full h-auto min-h-[220px] sm:min-h-[280px] lg:min-h-[380px] max-h-[420px] object-cover";

export default function HomeHeroCarouselClient() {
  return (
    <SlideShow
      slides={homeSlides}
      deferNonFirst
      imageClassName={HERO_IMAGE_CLASS}
    />
  );
}
