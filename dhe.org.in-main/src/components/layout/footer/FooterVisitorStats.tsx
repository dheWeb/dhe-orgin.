"use client";

import { useEffect, useRef, useState } from "react";

function VisitorCountSpinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600 motion-safe:animate-spin"
      role="status"
      aria-label="Loading visitor count"
    />
  );
}

export default function FooterVisitorStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [dailyVisitors, setDailyVisitors] = useState<number | null>(null);
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;

    const syncVisitors = async () => {
      try {
        await fetch("/api/visitors", { method: "POST" });
        const res = await fetch("/api/visitors");
        const data = await res.json();
        if (!cancelled) {
          setTotalVisitors(data.total ?? 0);
          setDailyVisitors(data.daily ?? 0);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    };

    syncVisitors();
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 mt-6">
      <div className="rounded-xl border border-gray-700 bg-[#111827] p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">Today</p>
        <p className="mt-1 text-2xl font-bold text-orange-300 tabular-nums">
          {loading ? <VisitorCountSpinner /> : dailyVisitors}
        </p>
      </div>
      <div className="rounded-xl border border-gray-700 bg-[#111827] p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">Total</p>
        <p className="mt-1 text-2xl font-bold text-orange-300 tabular-nums">
          {loading ? <VisitorCountSpinner /> : totalVisitors}
        </p>
      </div>
      <p className="col-span-2 text-xs text-gray-500">
        Approximate counts — see{" "}
        <a href="/privacy-policy" className="text-orange-400 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
