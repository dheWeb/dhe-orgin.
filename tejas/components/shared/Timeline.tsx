"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface TimelineItem {
  year: number;
  title: string;
  description: string;
  status?: "current" | "upcoming" | "past";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tejas-saffron via-tejas-blue to-tejas-gold md:left-1/2 md:-translate-x-px"
        aria-hidden
      />
      <div className="space-y-8">
        {items.map((item, index) => (
          <FadeIn key={item.year} delay={index * 0.1}>
            <div
              className={cn(
                "relative flex flex-col gap-4 md:flex-row md:items-center",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              <div className="hidden md:block md:w-1/2" />
              <div
                className={cn(
                  "absolute left-4 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-tejas-saffron shadow md:left-1/2",
                  item.status === "current" && "ring-4 ring-tejas-saffron/30"
                )}
                aria-hidden
              />
              <div
                className={cn(
                  "ml-10 md:ml-0 md:w-1/2",
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                )}
              >
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-tejas">
                  <p className="text-2xl font-bold text-tejas-saffron">{item.year}</p>
                  <h3 className="mt-1 text-lg font-bold text-tejas-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-tejas-muted">{item.description}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
