import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HallOfFameCard } from "@/components/shared/HallOfFameCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { hallOfFameEntries } from "@/data/hall-of-fame";

export function HallOfFamePreviewSection() {
  const preview = hallOfFameEntries.slice(0, 3);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Recognition"
            title="Hall of Fame"
            subtitle="Celebrating India's brightest young minds and their extraordinary achievements."
          />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {preview.map((entry, i) => (
            <FadeIn key={entry.id} delay={i * 0.08}>
              <HallOfFameCard entry={entry} />
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/hall-of-fame"
              className="inline-flex items-center gap-2 font-semibold text-tejas-saffron hover:underline"
            >
              View full Hall of Fame
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
