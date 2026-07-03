import Link from "next/link";
import { shikshaMahakumbh } from "@/data/home/content";
import HomeSectionShell from "./HomeSectionShell";

type Props = {
  paragraph1?: string;
  paragraph2?: string;
  smkSiteUrl?: string;
};

export default function HomeSmkFeature({
  paragraph1,
  paragraph2,
  smkSiteUrl,
}: Props) {
  const p1 = paragraph1 || shikshaMahakumbh.paragraph1;
  const p2 = paragraph2 || shikshaMahakumbh.paragraph2;

  return (
    <HomeSectionShell
      id="shiksha-mahakumbh-heading"
      title="Flagship — Shiksha Mahakumbh"
      description="DHE's national summit convening educators, policymakers, scientists, and institutions."
      variant="navy"
      className="relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-4">
            {p1}
          </p>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3">
            {p2}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/programs/shiksha-mahakumbh" className="dhe-btn-primary text-sm">
              Explore SMK program
            </Link>
            {smkSiteUrl ? (
              <a
                href={smkSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dhe-btn-ghost-light text-sm"
              >
                Official RASE portal ↗
              </a>
            ) : null}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              SMK 6.0
            </p>
            <p className="mt-2 text-2xl font-bold text-white">NIT Hamirpur</p>
            <p className="mt-1 text-sm text-gray-300">9–11 October 2026</p>
            <ul className="mt-5 space-y-2 text-sm text-gray-300" role="list">
              <li className="flex gap-2">
                <span className="text-orange-400" aria-hidden>●</span>
                500+ institutions engaged
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400" aria-hidden>●</span>
                1,200+ research papers
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400" aria-hidden>●</span>
                14+ states &amp; UTs represented
              </li>
            </ul>
          </div>
        </div>
      </div>
    </HomeSectionShell>
  );
}
