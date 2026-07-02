"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DISMISS_KEY = "dhe-home-promo-banner-dismissed";
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export default function HomePromoBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const dismissedAt = Number(raw);
        if (!Number.isNaN(dismissedAt) && Date.now() - dismissedAt < DISMISS_TTL_MS) {
          return;
        }
      }
    } catch {
      /* private browsing */
    }
    setVisible(true);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Featured program"
      className="bg-gradient-to-r from-[#07111f] to-gray-900 text-white border-b border-orange-500/30"
    >
      <div className="dhe-container py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between">
        <p className="text-xs sm:text-sm leading-snug">
          <strong className="text-orange-300">Shiksha Mahakumbh 6.0</strong> — NIT Hamirpur,
          9–11 Oct 2026. Registration open on the official RASE portal.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://www.rase.co.in/registration/Single_Registration"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-orange-600 hover:bg-orange-500 min-h-9 inline-flex items-center"
          >
            Register
          </a>
          <Link
            href="/upcomingevent"
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-white/30 hover:bg-white/10 min-h-9 inline-flex items-center"
          >
            All events
          </Link>
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              try {
                localStorage.setItem(DISMISS_KEY, String(Date.now()));
              } catch {
                /* ignore */
              }
            }}
            className="text-xs px-2 py-1.5 rounded-md hover:bg-white/10 min-h-9 min-w-9"
            aria-label="Dismiss announcement"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
