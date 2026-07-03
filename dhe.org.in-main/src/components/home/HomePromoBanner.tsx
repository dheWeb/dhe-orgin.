"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DEFAULT_SMK_REGISTRATION_URL,
  DEFAULT_SMK_SITE_URL,
} from "@/lib/programs/external-urls";

const DISMISS_KEY = "dhe-home-promo-banner-dismissed";
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Props = {
  smkRegistrationUrl?: string;
  smkSiteUrl?: string;
};

function shouldShowBanner(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (raw) {
      const dismissedAt = Number(raw);
      if (!Number.isNaN(dismissedAt) && Date.now() - dismissedAt < DISMISS_TTL_MS) {
        return false;
      }
    }
  } catch {
    /* private browsing */
  }
  return true;
}

export default function HomePromoBanner({
  smkRegistrationUrl = DEFAULT_SMK_REGISTRATION_URL,
  smkSiteUrl = DEFAULT_SMK_SITE_URL,
}: Props) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(!onHome);

  useEffect(() => {
    if (!onHome) {
      setVisible(false);
      setChecked(true);
      return;
    }
    setVisible(shouldShowBanner());
    setChecked(true);
  }, [onHome]);

  if (!onHome) {
    return null;
  }

  if (!checked) {
    return (
      <div
        className="min-h-[3.25rem] border-b border-transparent"
        aria-hidden
      />
    );
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="DHE programs highlight"
      className="dhe-gradient-navy text-white border-b border-orange-500/30 min-h-[3.25rem]"
    >
      <div className="dhe-container py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between">
        <p className="text-xs sm:text-sm leading-snug line-clamp-2 sm:line-clamp-none">
          <strong className="text-orange-200">DHE national programs</strong> — 25 cells,
          Olympiads, publications, membership, and workshops year-round.
          Shiksha Mahakumbh 6.0: 9–11 Oct 2026, NIT Hamirpur.
        </p>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Link
            href="/programs"
            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-orange-600 hover:bg-orange-500 min-h-9 inline-flex items-center"
          >
            Explore programs
          </Link>
          <a
            href={smkRegistrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-white/30 hover:bg-white/10 min-h-9 inline-flex items-center"
          >
            SMK register
          </a>
          <a
            href={smkSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/10 min-h-9 inline-flex items-center sr-only sm:not-sr-only"
          >
            RASE portal
          </a>
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
