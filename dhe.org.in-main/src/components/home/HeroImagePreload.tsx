import { homeSlides } from "@/data/home/slides";

export default function HeroImagePreload() {
  const first = homeSlides[0];
  if (!first) return null;

  return (
    <link
      rel="preload"
      as="image"
      href={first.src}
    />
  );
}
