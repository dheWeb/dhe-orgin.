"use client";

import Link from "next/link";
import Image from "next/image";
import type { HomeSlide } from "@/data/home/slides";

type Props = {
  slides: HomeSlide[];
};

export default function HomeGalleryPreview({ slides }: Props) {
  const preview = slides.slice(0, 4);

  return (
    <section
      aria-labelledby="gallery-preview-heading"
      className="dhe-section-py border-b border-gray-200 bg-white"
    >
      <div className="dhe-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
          <div>
            <h2
              id="gallery-preview-heading"
              className="text-lg font-semibold text-gray-900"
            >
              Events & Gallery
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Highlights from Shiksha Mahakumbh, institutional partnerships, and national educational initiatives.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
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
              Workshop Archive
            </Link>
            <Link
              href="/upcomingevent"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 min-h-11 inline-flex items-center"
            >
              Upcoming Events
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {preview.map((slide, index) => (
            <figure key={`${slide.src}-${index}`} className="min-w-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="w-full aspect-[4/3] object-cover rounded-md border border-gray-200"
              />
              <figcaption className="mt-1.5 text-[10px] sm:text-xs text-gray-500 line-clamp-2 leading-tight">
                {slide.legend || slide.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
