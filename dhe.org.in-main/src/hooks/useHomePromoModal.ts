"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DISMISS_KEY = "dhe-home-promo-dismissed";
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const OPEN_DELAY_MS = 8000;

export function useHomePromoModal() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !isHomePage) {
      setIsOpen(false);
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

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [hasMounted, isHomePage]);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* private browsing */
    }
  }, []);

  const shouldRender = hasMounted && isHomePage && isOpen;

  return { isOpen, shouldRender, close };
}
