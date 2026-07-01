"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SESSION_DISMISS_KEY = "dhe-home-promo-dismissed";
/** Delay before showing — avoids AdSense/CWV impact from immediate interstitial */
const OPEN_DELAY_MS = 3000;

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

    if (sessionStorage.getItem(SESSION_DISMISS_KEY) === "1") {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [hasMounted, isHomePage]);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    } catch {
      /* private browsing */
    }
  }, []);

  const shouldRender = hasMounted && isHomePage && isOpen;

  return { isOpen, shouldRender, close };
}
