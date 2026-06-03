"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import type { HomeSlide } from "@/data/home/slides";

const FALLBACK_SRC = "/logo.png";

interface SlideShowProps {
  slides: HomeSlide[];
}

function SlideImage({
  slide,
  priority,
}: {
  slide: HomeSlide;
  priority?: boolean;
}) {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={FALLBACK_SRC}
        alt={slide.alt}
        width={1200}
        height={750}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-auto max-h-[200px] sm:max-h-[240px] lg:max-h-[280px] object-cover"
      />
    );
  }

  return (
    <Image
      src={slide.src}
      alt={slide.alt}
      width={1200}
      height={750}
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 58vw"
      className="w-full h-auto max-h-[200px] sm:max-h-[240px] lg:max-h-[280px] object-cover"
      onError={() => setUseFallback(true)}
    />
  );
}

const SlideShow: React.FC<SlideShowProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    <div className="min-w-0" role="region" aria-label="Featured event slideshow">
      <Carousel
        selectedItem={currentIndex}
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop
        emulateTouch
        swipeable
        dynamicHeight={false}
        onChange={(index) => setCurrentIndex(index)}
      >
        {slides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className="relative min-h-[160px] sm:min-h-[200px] lg:min-h-[220px]"
          >
            <SlideImage slide={slide} priority={index === 0} />

            {(slide.legend || slide.alt) && (
              <div
                className="hidden md:block absolute bottom-0 left-0 right-0 px-3 py-2 bg-gray-900/70 text-xs"
                aria-live="polite"
              >
                <p className="text-gray-100 text-sm leading-relaxed">
                  {slide.legend || slide.alt}
                </p>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default memo(SlideShow);
