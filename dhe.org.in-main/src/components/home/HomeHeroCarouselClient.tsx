"use client";

import dynamic from "next/dynamic";
import { homeSlides } from "@/data/home/slides";

const SlideShow = dynamic(() => import("@/components/gallery/SlideShow"), {
  ssr: false,
  loading: () => null,
});

export default function HomeHeroCarouselClient() {
  return (
    <div className="absolute inset-0 z-10">
      <SlideShow slides={homeSlides} deferNonFirst />
    </div>
  );
}
