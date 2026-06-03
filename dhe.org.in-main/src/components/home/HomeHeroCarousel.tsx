"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { homeSlides } from "@/data/home/slides";

function HeroLcpImage() {
  const first = homeSlides[0];
  return (
    <div className="relative min-h-[160px] sm:min-h-[200px] lg:min-h-[220px] w-full">
      <Image
        src={first.src}
        alt={first.alt}
        width={1200}
        height={750}
        priority
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="w-full h-auto max-h-[200px] sm:max-h-[240px] lg:max-h-[280px] object-cover"
      />
    </div>
  );
}

const SlideShow = dynamic(() => import("@/components/gallery/SlideShow"), {
  ssr: false,
  loading: () => <HeroLcpImage />,
});

export default function HomeHeroCarousel() {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-gray-50">
      <SlideShow slides={homeSlides} />
    </div>
  );
}
