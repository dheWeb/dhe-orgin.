"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StickySubNavProps {
  items: { id: string; label: string }[];
  className?: string;
}

export function StickySubNav({ items, className }: StickySubNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <nav
      className={cn(
        "sticky top-16 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-md",
        className
      )}
      aria-label="Page sections"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tejas-saffron",
              active === item.id
                ? "bg-tejas-saffron-soft text-tejas-saffron-dark"
                : "text-tejas-muted hover:text-tejas-ink"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
