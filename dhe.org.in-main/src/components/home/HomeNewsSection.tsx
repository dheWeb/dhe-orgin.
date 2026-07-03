"use client";

import dynamic from "next/dynamic";
import HomeNoticeLazy from "@/components/home/HomeNoticeLazy";
import type { MarqueeItem } from "@/lib/cms/cms-parsers";

const Marquees = dynamic(() => import("@/components/home/Marquees"), {
  ssr: false,
  loading: () => <div className="h-11 bg-dhe-navy animate-pulse" aria-hidden />,
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
        <header className="mb-4 max-w-4xl mx-auto">
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

        <div className="max-w-4xl mx-auto rounded-xl border border-gray-200/90 bg-white/95 text-gray-900 overflow-hidden shadow-dhe-sm">
          <div className="px-3 py-2 sm:px-4">
            <HomeNoticeLazy
              embeddedHeader={{
                title: "Latest Notices",
                viewAllHref: "/noticeboard",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
