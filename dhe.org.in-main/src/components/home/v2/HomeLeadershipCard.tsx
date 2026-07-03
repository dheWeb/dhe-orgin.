import Link from "next/link";
import { leadership, nationalImpact } from "@/data/home/content";
import HomeSectionShell from "./HomeSectionShell";

type Props = {
  nationalImpactBody?: string;
  nationalImpactHighlights?: string[];
  leadershipCms?: {
    bodyPrefix?: string;
    leaderName?: string;
    leaderUrl?: string;
    bodySuffix?: string;
    visionQuote?: string;
  };
  visionBody?: string;
};

export default function HomeLeadershipCard({
  nationalImpactBody,
  nationalImpactHighlights,
  leadershipCms,
  visionBody,
}: Props) {
  const impactBody = nationalImpactBody || nationalImpact.body;
  const highlights =
    nationalImpactHighlights?.length ? nationalImpactHighlights : nationalImpact.highlights;
  const leader = {
    bodyPrefix: leadershipCms?.bodyPrefix || leadership.bodyPrefix,
    leaderName: leadershipCms?.leaderName || leadership.leaderName,
    leaderUrl: leadershipCms?.leaderUrl || leadership.leaderUrl,
    bodySuffix: leadershipCms?.bodySuffix || leadership.bodySuffix,
    visionQuote: leadershipCms?.visionQuote || leadership.visionQuote,
  };

  return (
    <HomeSectionShell
      id="leadership-impact-heading"
      title="Leadership & National Impact"
      variant="muted"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-dhe-sm">
          <h3 className="text-lg font-semibold text-gray-900">{nationalImpact.title}</h3>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-4">{impactBody}</p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-xs sm:text-sm text-gray-700 rounded-lg bg-orange-50/50 px-3 py-2"
              >
                <span className="text-orange-500 shrink-0" aria-hidden>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-dhe-sm">
          <h3 className="text-lg font-semibold text-gray-900">{leadership.title}</h3>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {leader.bodyPrefix}{" "}
            <a
              href={leader.leaderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange-700 hover:underline"
            >
              {leader.leaderName}
            </a>
            {leader.bodySuffix}
          </p>
          <blockquote className="mt-4 rounded-xl bg-gray-50 border-l-4 border-orange-500 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">
              {leadership.visionTitle}
            </p>
            <p className="mt-2 text-sm text-gray-600 italic leading-relaxed line-clamp-4">
              {leader.visionQuote}
            </p>
          </blockquote>
          <p className="mt-4">
            <Link
              href="/messages"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Read Director&apos;s message →
            </Link>
          </p>
        </article>
      </div>
      {visionBody ? (
        <p className="mt-6 text-sm text-gray-600 max-w-3xl leading-relaxed">{visionBody}</p>
      ) : null}
    </HomeSectionShell>
  );
}
