"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  className?: string;
};

function parseStat(value: string): {
  target: number | null;
  prefix: string;
  suffix: string;
  formatted: string;
} {
  const trimmed = value.trim();
  const match = trimmed.match(/^([^0-9]*)([\d,]+)(.*)$/);
  if (!match) {
    return { target: null, prefix: "", suffix: "", formatted: trimmed };
  }
  const numeric = parseInt(match[2].replace(/,/g, ""), 10);
  const prefix = match[1];
  const suffix = match[3];
  const formatted = numeric.toLocaleString("en-IN") + suffix;
  return { target: numeric, prefix, suffix, formatted };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HomeAnimatedCounter({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const parsed = parseStat(value);

  useEffect(() => {
    if (parsed.target === null) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(parsed.formatted);
      return;
    }

    let frame = 0;
    let started = false;
    const duration = 1400;
    const target = parsed.target;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = Math.round(target * easeOutCubic(progress));
          setDisplay(
            parsed.prefix + current.toLocaleString("en-IN") + parsed.suffix
          );
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [parsed.formatted, parsed.prefix, parsed.suffix, parsed.target, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
