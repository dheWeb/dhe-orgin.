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
      <div className="min-h-[2.75rem] border-b border-transparent" aria-hidden />
    );
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Shiksha Mahakumbh announcement"
      className="bg-orange-600 text-white border-b border-orange-700/30"
    >
      <div className="dhe-container py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
        <p className="text-xs sm:text-sm leading-snug">
          <strong className="font-semibold">Shiksha Mahakumbh 6.0</strong>
          {" — "}9–11 Oct 2026, NIT Hamirpur. National summit by DHE Event Management Cell.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={smkRegistrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-white text-orange-700 hover:bg-orange-50 min-h-9 inline-flex items-center"
          >
            SMK register ↗
          </a>
          <a
            href={smkSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-white/40 hover:bg-white/10 min-h-9 inline-flex items-center"
          >
            RASE portal ↗
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
            className="inline-flex items-center justify-center rounded-md hover:bg-white/10 min-h-9 min-w-9 text-sm"
            aria-label="Dismiss announcement"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
