import Link from "next/link";
import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { prepareCategories } from "@/data/resources";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Prepare Hub",
  description: "Your Netflix-style preparation hub — mock tests, practice sets, videos, and question banks.",
  path: "/prepare",
});

export default function PreparePage() {
  return (
    <>
      <PageHero
        eyebrow="Prepare"
        title="Prepare Hub"
        subtitle="Everything you need to excel — curated like a premium learning platform."
        primaryCta={{ label: "Start Mock Test", href: "/prepare/mock-tests" }}
        secondaryCta={{ label: "Resources", href: "/resources" }}
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prepareCategories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.06}>
                <Link
                  href={cat.href}
                  className="group block overflow-hidden rounded-2xl shadow-tejas-lg transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tejas-saffron"
                >
                  <div className={cn("bg-gradient-to-br p-8 text-white min-h-[220px] flex flex-col", cat.gradient)}>
                    <h2 className="text-2xl font-bold">{cat.title}</h2>
                    <p className="mt-2 flex-1 text-white/80">{cat.description}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-3xl font-bold">{cat.count}+</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium opacity-80 group-hover:opacity-100">
                        Explore <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
