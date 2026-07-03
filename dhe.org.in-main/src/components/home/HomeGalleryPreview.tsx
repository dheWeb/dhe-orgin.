"use client";

import Link from "next/link";
import Image from "next/image";
import type { HomeSlide } from "@/data/home/slides";
import { homeGalleryPreviewIndices } from "@/data/home/slides";

type Props = {
  slides: HomeSlide[];
};

/** Mosaic gallery — featured hero tile + asymmetric grid */
export default function HomeGalleryPreview({ slides }: Props) {
  const preview = homeGalleryPreviewIndices.map((i) => slides[i]).filter(Boolean);
  const [featured, ...rest] = preview;

  return (
    <section
      aria-labelledby="gallery-preview-heading"
      className="py-10 sm:py-14 border-t border-gray-200 bg-white"
    >
      <div className="dhe-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h2
              id="gallery-preview-heading"
              className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
            >
              Events &amp; Gallery
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl">
              Olympiads, workshops, institutional MoUs, and Shiksha Mahakumbh highlights from across Bharat.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/pastevent"
              className="text-sm font-medium text-gray-700 hover:text-orange-600 min-h-11 inline-flex items-center"
            >
              Past Events
            </Link>
            <Link
              href="/workshop"
              className="text-sm font-medium text-gray-700 hover:text-orange-600 min-h-11 inline-flex items-center"
            >
              Workshops
            </Link>
            <Link
              href="/upcomingevent"
              className="dhe-btn-primary text-sm py-2 px-4 min-h-10"
            >
              Upcoming Events
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 auto-rows-[120px] sm:auto-rows-[140px] lg:auto-rows-[160px]">
          {featured ? (
            <figure className="col-span-2 row-span-2 min-w-0 group relative overflow-hidden rounded-2xl border border-gray-200 shadow-dhe-md">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover motion-safe:transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/80 to-transparent px-3 py-3 text-xs sm:text-sm text-white leading-snug">
                {featured.legend || featured.alt}
              </figcaption>
            </figure>
          ) : null}

          {rest.map((slide, index) => (
            <figure
              key={`${slide.src}-${index}`}
              className={`min-w-0 group relative overflow-hidden rounded-xl border border-gray-200 shadow-dhe-sm ${
                index === 2 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover motion-safe:transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gray-900/70 px-2 py-1.5 text-[10px] sm:text-xs text-gray-100 line-clamp-2 leading-tight opacity-0 group-hover:opacity-100 motion-safe:transition-opacity">
                {slide.legend || slide.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
