import Link from "next/link";
import { homeIntro as defaultHomeIntro, homeHeroCtas } from "@/data/home/content";
import { homeTrustBadges } from "@/data/home/redesign-content";
import HeroImagePreload from "@/components/home/HeroImagePreload";
import HomeHeroCarouselClient from "@/components/home/HomeHeroCarouselClient";

type HomeIntroProps = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
};

export default function HomeHero({
  homeIntro = defaultHomeIntro,
}: {
  homeIntro?: HomeIntroProps;
}) {
  const primaryCta = homeHeroCtas.find((c) => c.primary) ?? homeHeroCtas[0];
  const secondaryCtas = homeHeroCtas.filter((c) => !c.primary).slice(0, 2);

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/40 border-b border-gray-200/80"
    >
      <HeroImagePreload />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl motion-safe:animate-float-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl motion-safe:animate-float-slow-reverse"
        aria-hidden
      />

      <div className="dhe-container relative py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 min-w-0 order-2 lg:order-1">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-orange-600 mb-3">
              {homeIntro.badge}
            </p>
            <h1
              id="home-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              {homeIntro.titleLine1}{" "}
              <span className="text-orange-600">{homeIntro.titleLine2}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600 max-w-xl line-clamp-3">
              {homeIntro.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Institutional credentials">
              {homeTrustBadges.slice(0, 4).map((badge, i) => (
                <span
                  key={badge}
                  className="rounded-full border border-orange-200/80 bg-white/80 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-orange-800 shadow-sm motion-safe:animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              {primaryCta.external ? (
                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dhe-btn-primary text-sm sm:text-base px-6"
                >
                  {primaryCta.label}
                </a>
              ) : (
                <Link
                  href={primaryCta.href}
                  className="dhe-btn-primary text-sm sm:text-base px-6"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCtas.map((cta) =>
                cta.external ? (
                  <a
                    key={cta.href}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-300 bg-white/80 text-gray-800 hover:border-orange-400 hover:text-orange-700 shadow-dhe-sm motion-safe:transition-colors"
                  >
                    {cta.label}
                  </a>
                ) : (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="inline-flex min-h-11 items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-300 bg-white/80 text-gray-800 hover:border-orange-400 hover:text-orange-700 shadow-dhe-sm motion-safe:transition-colors"
                  >
                    {cta.label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-dhe-lg ring-1 ring-black/5 min-h-[220px] sm:min-h-[280px] lg:min-h-[380px]">
              <HomeHeroCarouselClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
