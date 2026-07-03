import { MetricCard } from "@/components/shared/MetricCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { impactMetrics } from "@/data/metrics";

export function ImpactMetricsSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Impact"
            title="Building India's Talent Future"
            subtitle="Trusted by millions of students, thousands of schools, and educators across every state and union territory."
          />
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {impactMetrics.map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.05}>
              <MetricCard {...metric} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
