import Image from "next/image";
import { homeSlides } from "@/data/home/slides";

export default function HeroFirstSlide() {
  const first = homeSlides[0];

  return (
    <div className="relative min-h-[160px] sm:min-h-[200px] lg:min-h-[220px] w-full">
      <Image
        src={first.src}
        alt={first.alt}
        width={1200}
        height={750}
        priority
        fetchPriority="high"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 42vw"
        className="w-full h-auto max-h-[200px] sm:max-h-[240px] lg:max-h-[280px] object-cover"
      />
    </div>
  );
}
