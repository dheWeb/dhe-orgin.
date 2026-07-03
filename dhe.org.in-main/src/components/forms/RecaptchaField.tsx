"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
        }
      ) => number;
      reset: (id?: number) => void;
    };
  }
}

type RecaptchaFieldProps = {
  onToken: (token: string) => void;
};

function canRenderRecaptcha(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.grecaptcha?.render === "function"
  );
}

export default function RecaptchaField({ onToken }: RecaptchaFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || widgetId.current !== null) {
      return;
    }
    if (!canRenderRecaptcha()) {
      return;
    }

    try {
      const mount = () => {
        if (!containerRef.current || widgetId.current !== null) return;
        if (!canRenderRecaptcha()) return;

        widgetId.current = window.grecaptcha!.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(""),
        });
      };

      if (typeof window.grecaptcha?.ready === "function") {
        window.grecaptcha.ready(mount);
      } else {
        mount();
      }
    } catch (error) {
      console.error("reCAPTCHA render failed:", error);
    }
  }, [onToken, siteKey]);

  useEffect(() => {
    if (!scriptLoaded) return;

    let cancelled = false;
    let attempts = 0;

    const tryRender = () => {
      if (cancelled) return;
      if (canRenderRecaptcha()) {
        renderWidget();
        return;
      }
      attempts += 1;
      if (attempts < 30) {
        window.setTimeout(tryRender, 100);
      }
    };

    tryRender();
    return () => {
      cancelled = true;
    };
  }, [scriptLoaded, renderWidget]);

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
        onLoad={() => setScriptLoaded(true)}
      />
      <div ref={containerRef} className="my-4" />
    </>
  );
}

export function resetRecaptcha(widgetId: number | null) {
  if (widgetId !== null && typeof window.grecaptcha?.reset === "function") {
    window.grecaptcha.reset(widgetId);
  }
}
