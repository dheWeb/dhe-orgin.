import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OlympiadCard } from "@/components/shared/OlympiadCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { olympiads } from "@/data/olympiads";

export function CurrentOlympiadsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Olympiads"
            title="Current Olympiads"
            subtitle="Ten subjects. One national platform. Every student deserves to be discovered."
          />
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {olympiads.map((o, i) => (
            <FadeIn key={o.slug} delay={i * 0.04}>
              <OlympiadCard {...o} />
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/olympiads"
              className="inline-flex items-center gap-2 font-semibold text-tejas-saffron hover:underline"
            >
              View all olympiads
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
