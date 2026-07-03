import AdvisoryCouncil from "@/components/sections/AdvisoryCouncil";
import LmcTimeline from "@/components/sections/LmcTimeline";
import Link from "next/link";
import { getSiteContent } from "@/lib/cms/site-content";
import { getLmcMembers, getLmcPatrons } from "@/lib/cms/lmc-content";
import { lmcDocuments } from "@/data/institution";
import PageHero from "@/components/ui/PageHero";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";

const DEFAULT_INTRO =
  "Patrons and members of the Local Management Committee (LMC) governing the Department of Holistic Education.";

export default async function LeadershipPage() {
  const [content, patrons, members] = await Promise.all([
    getSiteContent(["leadership_intro"]),
    getLmcPatrons(),
    getLmcMembers(),
  ]);
  const intro = content.leadership_intro?.text?.trim() || DEFAULT_INTRO;
  const currentDoc = lmcDocuments.find((d) => d.isCurrent && d.id === "letter-12");

  return (
    <>
      <PageHero title="Leadership & Local Management Committee" description={intro}>
        {currentDoc ? (
          <p className="mt-4 text-sm text-gray-600 max-w-2xl">
            LMC per <strong>Letter No. {currentDoc.refNo}</strong> ({currentDoc.term.from} –{" "}
            {currentDoc.term.to}).{" "}
            <Link
              href={currentDoc.path}
              className="text-orange-700 font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View official PDF ↗
            </Link>
          </p>
        ) : null}
      </PageHero>

      <AdvisoryCouncil title="LMC Patrons" members={patrons} />
      <AdvisoryCouncil title="LMC Members" members={members} />
      <LmcTimeline />

      <section
        aria-labelledby="lmc-archive-heading"
        className="dhe-container py-10 sm:py-12 max-w-6xl mx-auto"
      >
        <h2
          id="lmc-archive-heading"
          className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
        >
          LMC nomination letters
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-2xl">
          Official PDF archive of Local Management Committee nomination letters.
        </p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
          {lmcDocuments.map((doc) => (
            <li key={doc.id}>
              <HomeFeatureCard
                href={doc.path}
                external
                title={doc.title}
                description={`Ref. ${doc.refNo}${
                  "term" in doc && doc.term ? ` · ${doc.term.from} – ${doc.term.to}` : ""
                }${doc.isCurrent ? " · Current" : ""}`}
                stat={doc.isCurrent ? "Current" : "Archive"}
              />
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/messages" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            Director&apos;s Message →
          </Link>
        </p>
      </section>
    </>
  );
}
