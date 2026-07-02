"use client";

import { useEffect, useState } from "react";

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
          <a href="/privacy-policy" className="underline text-orange-100 hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="px-4 py-2 text-sm border border-white/70 rounded-md hover:bg-white/10 text-white"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="px-4 py-2 text-sm bg-orange-700 rounded-md hover:bg-orange-600"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

