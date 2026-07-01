import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { HomeIcon } from "@/components/home/HomeIcons";
import {
  homeStats,
  visionFoundation,
  nationalImpact,
  leadership,
  shikshaMahakumbh,
  digitalEcosystem,
  homeCellLinks,
  topicClusterLinks,
} from "@/data/home/content";
import ParticipationPathways from "@/components/sections/ParticipationPathways";

const DepartmentInfo: React.FC<{
  visionBody?: string;
  nationalImpactBody?: string;
  nationalImpactHighlights?: string[];
  leadership?: {
    bodyPrefix?: string;
    leaderName?: string;
    leaderUrl?: string;
    bodySuffix?: string;
    visionQuote?: string;
  };
  shiksha?: { paragraph1?: string; paragraph2?: string };
  digitalDescription?: string;
}> = ({
  visionBody,
  nationalImpactBody,
  nationalImpactHighlights,
  leadership: leadershipCms,
  shiksha: shikshaCms,
  digitalDescription,
}) => {
  const impactBody = nationalImpactBody || nationalImpact.body;
  const impactHighlights =
    nationalImpactHighlights?.length ? nationalImpactHighlights : nationalImpact.highlights;
  const leader = {
    bodyPrefix: leadershipCms?.bodyPrefix || leadership.bodyPrefix,
    leaderName: leadershipCms?.leaderName || leadership.leaderName,
    leaderUrl: leadershipCms?.leaderUrl || leadership.leaderUrl,
    bodySuffix: leadershipCms?.bodySuffix || leadership.bodySuffix,
    visionQuote: leadershipCms?.visionQuote || leadership.visionQuote,
  };
  const shikshaCopy = {
    paragraph1: shikshaCms?.paragraph1 || shikshaMahakumbh.paragraph1,
    paragraph2: shikshaCms?.paragraph2 || shikshaMahakumbh.paragraph2,
  };
  const ecosystemDescription = digitalDescription || digitalEcosystem.description;

  return (
    <div className="min-w-0 text-gray-800 space-y-0">
      {/* Institutional overview + statistics */}
      <section
        aria-labelledby="overview-heading"
        className="dhe-section-py border-b border-gray-200"
      >
        <h2 id="overview-heading" className="sr-only">
          Institutional overview and milestones
        </h2>
        <ul
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6"
          role="list"
        >
          {homeStats.map((stat, i) => (
            <li
              key={stat.label}
              className={`min-w-0 py-2 ${i > 0 ? "lg:border-l lg:border-gray-200 lg:pl-4" : ""}`}
            >
              <p className="text-xl sm:text-2xl font-semibold text-orange-600 tabular-nums leading-none">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-gray-600 leading-snug">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
        <SectionHeading
          id="vision-foundation-heading"
          title={visionFoundation.title}
        />
        <p className="text-sm leading-relaxed text-gray-600 max-w-4xl -mt-1">
          {visionBody || visionFoundation.body}
        </p>
      </section>

      {/* Achievements & recognition */}
      <section
        aria-labelledby="achievements-heading"
        className="dhe-section-py border-b border-gray-200"
      >
        <h2 id="achievements-heading" className="sr-only">
          Achievements and leadership
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:divide-x divide-gray-200">
          <div className="lg:pr-6 pb-6 lg:pb-0 border-b lg:border-b-0 border-gray-100 min-w-0">
            <SectionHeading
              id="national-impact-heading"
              title={nationalImpact.title}
            />
            <p className="text-sm leading-relaxed text-gray-600 -mt-2">
              {impactBody}
            </p>
            <ul className="mt-3 space-y-1.5" role="list">
              {impactHighlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-gray-700 leading-snug"
                >
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-500"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-6 pt-6 lg:pt-0 min-w-0">
            <SectionHeading
              id="leadership-heading"
              title={leadership.title}
            />
            <p className="text-sm leading-relaxed text-gray-600 -mt-2">
              {leader.bodyPrefix}{" "}
              <a
                href={leader.leaderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-orange-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              >
                {leader.leaderName}
              </a>
              {leader.bodySuffix}
            </p>
            <blockquote className="mt-3 border-l-2 border-orange-500 pl-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-700">
                {leadership.visionTitle}
              </p>
              <p className="mt-1.5 text-sm text-gray-600 leading-relaxed italic">
                {leader.visionQuote}
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Cells & digital ecosystem */}
      <section
        aria-labelledby="cells-ecosystem-heading"
        className="dhe-section-py border-b border-gray-200"
      >
        <SectionHeading
          id="cells-ecosystem-heading"
          title="Cells, Departments & Digital Ecosystem"
          description={ecosystemDescription}
        />
        <nav
          className="flex flex-wrap gap-2 mb-5"
          aria-label="Featured DHE cells"
        >
          {homeCellLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-700 bg-gray-50 min-h-9 inline-flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/structure"
            className="text-xs font-semibold px-2.5 py-1.5 text-orange-600 hover:text-orange-700 min-h-9 inline-flex items-center"
          >
            View full organizational structure
          </Link>
        </nav>
        <p className="text-xs text-gray-600 mb-3">
          Explore connected areas: research, innovation, entrepreneurship,
          publications, events, and community outreach.
        </p>
        <nav
          className="flex flex-wrap gap-2 mb-5"
          aria-label="DHE topic cluster cells"
        >
          {topicClusterLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium px-2.5 py-1.5 rounded-md border border-orange-100 text-orange-800 bg-orange-50/60 hover:bg-orange-100 min-h-9 inline-flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" role="list">
          {digitalEcosystem.cards.map((item) => (
            <li
              key={item.title}
              className="min-w-0 flex gap-3 py-3 border-t border-gray-100 first:border-t-0 sm:first:border-t"
            >
              <span className="shrink-0 mt-0.5 text-orange-600" aria-hidden>
                <HomeIcon name={item.icon} className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-600 leading-snug">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ParticipationPathways className="dhe-section-py border-b border-gray-200" />

      {/* Programs & activities */}
      <section
        aria-labelledby="shiksha-mahakumbh-heading"
        className="dhe-section-py border-b border-gray-200 bg-orange-50/40"
      >
        <SectionHeading
          id="shiksha-mahakumbh-heading"
          title={shikshaMahakumbh.title}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 max-w-5xl">
          <p className="text-sm leading-relaxed text-gray-700">
            {shikshaCopy.paragraph1}
          </p>
          <p className="text-sm leading-relaxed text-gray-700">
            {shikshaCopy.paragraph2}
          </p>
        </div>
        <p className="mt-4">
          <a
            href="https://www.rase.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 min-h-10 inline-flex items-center"
          >
            Learn about Shiksha Mahakumbh →
          </a>
        </p>
      </section>
    </div>
  );
};

export default DepartmentInfo;
