"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditionCard } from "@/components/shared/EditionCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { getCurrentEdition } from "@/data/editions";
import { brand } from "@/design-system/tokens";

export function HomeHero() {
  const edition = getCurrentEdition();

  return (
    <section className="relative overflow-hidden bg-mandala-accent py-16 md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-tejas-saffron">
            {brand.tagline}
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-tejas-blue md:text-6xl lg:text-7xl">
            {brand.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-tejas-muted md:text-xl">
            {brand.fullName}
          </p>
          <p className="mt-6 max-w-lg text-tejas-muted leading-relaxed">
            India&apos;s National Talent Development Ecosystem — discover your potential,
            prepare with world-class resources, and shine on the national stage.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/olympiads">
              <Button size="lg">
                Explore Olympiads
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
            <Link href="/prepare/mock-tests">
              <Button variant="outline" size="lg">
                Free Mock Test
              </Button>
            </Link>
          </div>
          <p className="mt-6 font-hindi text-sm text-tejas-muted">
            खोजें · तैयारी करें · चमकें
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <EditionCard
            year={edition.year}
            name={edition.name}
            subtitle={edition.subtitle}
            theme={edition.theme}
            status={edition.status}
            featured
            href="/editions"
          />
        </FadeIn>
      </div>
    </section>
  );
}
