"use client";

import { Users, School, Map, Trophy, Award, type LucideIcon } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  school: School,
  map: Map,
  trophy: Trophy,
  award: Award,
};

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  className?: string;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export function MetricCard({ label, value, suffix = "", icon, className }: MetricCardProps) {
  const { count, ref } = useAnimatedCounter(value);
  const Icon = iconMap[icon] ?? Trophy;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-stone-200/60 bg-white p-6 text-center shadow-tejas",
        className
      )}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-tejas-saffron-soft text-tejas-saffron">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <p className="text-3xl font-bold text-tejas-blue md:text-4xl">
        {formatNumber(count)}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-tejas-muted">{label}</p>
    </div>
  );
}
