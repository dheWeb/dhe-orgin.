"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const NoticeBoard = dynamic(
  () => import("@/components/notices/NoticeBoard"),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[140px] animate-pulse bg-gray-50 rounded-md"
        aria-hidden
      />
    ),
  }
);

/**
 * Defers NoticeBoard + Firebase until the news section nears the viewport.
 * Full board remains on /noticeboard unchanged.
 */
export default function HomeNoticeLazy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[140px]">
      {shouldLoad ? (
        <NoticeBoard embedded />
      ) : (
        <div
          className="min-h-[140px] animate-pulse bg-gray-50 rounded-md"
          role="status"
          aria-label="Loading latest notices"
        />
      )}
    </div>
  );
}
