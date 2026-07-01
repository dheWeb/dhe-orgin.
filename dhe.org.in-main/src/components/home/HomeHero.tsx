import Link from "next/link";
import { homeIntro as defaultHomeIntro, homeHeroCtas } from "@/data/home/content";
import HeroFirstSlide from "@/components/home/HeroFirstSlide";
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
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="bg-white border-b border-gray-200"
    >
      <div className="dhe-container dhe-section-py">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          <div className="lg:col-span-5 min-w-0 order-2 lg:order-1">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-orange-600 mb-2">
              {homeIntro.badge}
            </p>
            <h1
              id="home-hero-heading"
              className="text-2xl sm:text-3xl lg:text-[2rem] font-semibold text-gray-900 leading-tight tracking-tight"
            >
              {homeIntro.titleLine1}{" "}
              <span className="text-orange-600">{homeIntro.titleLine2}</span>
            </h1>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-gray-600 max-w-xl">
              {homeIntro.description}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              {homeHeroCtas.map((cta) =>
                cta.external ? (
                  <a
                    key={cta.href}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      cta.primary
                        ? "dhe-btn-primary text-sm px-4 py-2 min-h-10"
                        : "inline-flex min-h-10 items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-700 motion-safe:transition-colors"
                    }
                  >
                    {cta.label}
                  </a>
                ) : (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={
                      cta.primary
                        ? "dhe-btn-primary text-sm px-4 py-2 min-h-10"
                        : "inline-flex min-h-10 items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-700 motion-safe:transition-colors"
                    }
                  >
                    {cta.label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 order-1 lg:order-2">
            <div className="overflow-hidden rounded-md border border-gray-200 bg-gray-50 relative">
              <HeroFirstSlide />
              <HomeHeroCarouselClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
