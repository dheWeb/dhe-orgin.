"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void }
      ) => number;
      reset: (id?: number) => void;
    };
  }
}

type RecaptchaFieldProps = {
  onToken: (token: string) => void;
};

export default function RecaptchaField({ onToken }: RecaptchaFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.grecaptcha || widgetId.current !== null) {
      return;
    }
    widgetId.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(""),
    });
  }, [onToken, siteKey]);

  useEffect(() => {
    if (ready) renderWidget();
  }, [ready, renderWidget]);

  if (!siteKey) {
    return (
      <p className="text-sm text-amber-700" role="alert">
        reCAPTCHA is not configured.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      <div ref={containerRef} className="my-4" />
    </>
  );
}

export function resetRecaptcha(widgetId: number | null) {
  if (widgetId !== null && window.grecaptcha) {
    window.grecaptcha.reset(widgetId);
  }
}
