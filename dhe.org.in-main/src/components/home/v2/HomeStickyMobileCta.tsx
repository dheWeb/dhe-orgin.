"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Sticky conversion bar — mobile only, appears after scrolling past hero */
export default function HomeStickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home-hero-heading");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(7,17,31,0.12)] px-3 py-2.5 motion-safe:transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      role="region"
      aria-label="Quick actions"
      aria-hidden={!visible}
    >
      <div className="flex gap-2 max-w-lg mx-auto">
        <Link
          href="/programs"
          className="dhe-btn-primary flex-1 text-sm py-2.5 min-h-11"
        >
          Programs
        </Link>
        <Link
          href="/contribute"
          className="flex-1 inline-flex min-h-11 items-center justify-center rounded-md text-sm font-medium border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100"
        >
          Join DHE
        </Link>
        <Link
          href="/donation"
          className="inline-flex min-h-11 min-w-[3.5rem] items-center justify-center rounded-md border border-gray-300 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100"
          aria-label="Donate with 80G benefit"
          title="Donate (80G)"
        >
          80G
        </Link>
      </div>
    </div>
  );
}
