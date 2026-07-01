"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "dhe-cookie-consent";

type ConsentState = "pending" | "accepted" | "rejected";

export function useCookieConsent(): ConsentState {
  const [consent, setConsent] = useState<ConsentState>("pending");

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    }
  }, []);

  return consent;
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const save = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    window.dispatchEvent(new Event("dhe-cookie-consent"));
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 bg-gray-900/95 text-white shadow-lg"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-sm leading-relaxed">
          We use cookies and third-party scripts (analytics, chat) to improve
          your experience. See our{" "}
          <a href="/privacy-policy" className="underline text-orange-300">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="px-4 py-2 text-sm border border-white/40 rounded-md hover:bg-white/10"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="px-4 py-2 text-sm bg-orange-600 rounded-md hover:bg-orange-500"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

export function ThirdPartyScripts() {
  const [consent, setConsent] = useState<ConsentState>("pending");

  useEffect(() => {
    const read = () => {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
      }
    };
    read();
    window.addEventListener("dhe-cookie-consent", read);
    return () => window.removeEventListener("dhe-cookie-consent", read);
  }, []);

  if (process.env.NODE_ENV !== "production" || consent !== "accepted") {
    return null;
  }

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
  );
}
