"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "dhe-cookie-consent";
const IDLE_MS = 5000;

type ConsentState = "pending" | "accepted" | "rejected";

function readConsent(): ConsentState {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return "pending";
}

/** GA4 + AdSense — load only after consent and idle delay (Lighthouse-friendly). */
export function DeferredAnalyticsScripts() {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener("dhe-cookie-consent", sync);
    return () => window.removeEventListener("dhe-cookie-consent", sync);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || consent !== "accepted") return;

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setReady(true);
    };

    const timeoutId = window.setTimeout(activate, IDLE_MS);
    let idleId: number | undefined;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(activate, { timeout: IDLE_MS });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [consent]);

  if (!ready) return null;

  return (
    <>
      <Script
        id="adsense"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4330032354977759"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            id="ga4-loader"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
    </>
  );
}

/** Botpress — loads only when user opens chat (saves ~200KB on initial load). */
export function BotpressChatLauncher() {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener("dhe-cookie-consent", sync);
    return () => window.removeEventListener("dhe-cookie-consent", sync);
  }, []);

  const launch = useCallback(() => setOpen(true), []);

  if (process.env.NODE_ENV !== "production" || consent !== "accepted") {
    return null;
  }

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={launch}
          className="fixed bottom-20 right-4 z-[90] min-h-11 px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-medium shadow-lg hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          aria-label="Open chat assistant"
        >
          Chat
        </button>
      ) : null}
      {open ? (
        <>
          <Script
            id="botpress-inject"
            src="https://cdn.botpress.cloud/webchat/v1/inject.js"
            strategy="lazyOnload"
          />
          <Script
            id="botpress-config"
            src="https://mediafiles.botpress.cloud/fa60123e-045a-48d8-862e-81258c3ccc9a/webchat/config.js"
            strategy="lazyOnload"
          />
        </>
      ) : null}
    </>
  );
}

/** @deprecated Use DeferredAnalyticsScripts + BotpressChatLauncher */
export function ThirdPartyScripts() {
  return (
    <>
      <DeferredAnalyticsScripts />
      <BotpressChatLauncher />
    </>
  );
}
