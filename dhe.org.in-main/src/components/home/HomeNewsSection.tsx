"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import HomeNoticeLazy from "@/components/home/HomeNoticeLazy";
import type { MarqueeItem } from "@/lib/cms/cms-parsers";

const Marquees = dynamic(() => import("@/components/home/Marquees"), {
  ssr: false,
  loading: () => <div className="h-9 bg-dhe-navy animate-pulse" aria-hidden />,
});

export default function HomeNewsSection({
  marqueeItems,
}: {
  marqueeItems?: MarqueeItem[];
}) {
  return (
    <section
      aria-labelledby="news-updates-heading"
      className="bg-dhe-muted border-y border-gray-200"
    >
      <Marquees items={marqueeItems} />

      <div className="dhe-container dhe-section-py">
        <header className="mb-4 max-w-3xl">
          <h2
            id="news-updates-heading"
            className="text-lg sm:text-xl font-semibold text-gray-900"
          >
            News, Notices & Updates
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            Official announcements and the latest notices from the Department of
            Holistic Education.
          </p>
        </header>

        <div className="max-w-3xl border border-gray-200 rounded-xl bg-white text-gray-900 overflow-hidden shadow-dhe-sm">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gray-900">
              Latest Notices
            </span>
            <Link
              href="/noticeboard"
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 min-h-10 inline-flex items-center"
            >
              View all →
            </Link>
          </div>
          <div className="px-2 py-2 sm:px-3">
            <HomeNoticeLazy />
          </div>
        </div>
      </div>
    </section>
  );
}
