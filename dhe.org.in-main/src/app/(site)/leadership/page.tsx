import { createPageMetadata } from "@/lib/seo/build-metadata";
import AdvisoryCouncil from "@/components/sections/AdvisoryCouncil";
import Link from "next/link";
import { getSiteContent } from "@/lib/cms/site-content";
import { getLmcMembers, getLmcPatrons } from "@/lib/cms/lmc-content";
import { lmcDocuments } from "@/data/institution";

export const metadata = createPageMetadata("leadership");

const currentDoc = lmcDocuments.find((d) => d.isCurrent && d.id === "letter-12");

const DEFAULT_INTRO =
  "Patrons and members of the Local Management Committee (LMC) governing the Department of Holistic Education.";

export default async function LeadershipPage() {
  const [content, patrons, members] = await Promise.all([
    getSiteContent(["leadership_intro"]),
    getLmcPatrons(),
    getLmcMembers(),
  ]);
  const intro = content.leadership_intro?.text?.trim() || DEFAULT_INTRO;

  return (
    <>
      <div className="dhe-container pt-8 pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color text-center">
          Leadership &amp; Local Management Committee
        </h1>
        <p className="mt-3 text-sm text-gray-600 text-center max-w-2xl mx-auto">
          {intro}
        </p>
      </div>
      {currentDoc && (
        <div className="dhe-container pt-2 text-sm text-gray-600">
          <p>
            Local Management Committee per{" "}
            <strong>Letter No. {currentDoc.refNo}</strong> ({currentDoc.term.from}{" "}
            – {currentDoc.term.to}).{" "}
            <Link
              href={currentDoc.path}
              className="text-orange-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View official PDF
            </Link>
          </p>
        </div>
      )}
      <AdvisoryCouncil title="LMC Patrons" members={patrons} />
      <AdvisoryCouncil title="LMC Members" members={members} />

      <section className="dhe-container py-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          LMC nomination letters (archive)
        </h2>
        <ul className="space-y-3 text-sm">
          {lmcDocuments.map((doc) => (
            <li key={doc.id} className="border border-gray-100 rounded-lg p-4">
              <p className="font-medium text-gray-900">{doc.title}</p>
              <p className="text-gray-600 mt-1">
                Ref. {doc.refNo}
                {"term" in doc && doc.term
                  ? ` · ${doc.term.from} – ${doc.term.to}`
                  : ""}
                {doc.isCurrent ? " · Current" : ""}
              </p>
              <Link
                href={doc.path}
                className="inline-block mt-2 text-orange-700 hover:underline min-h-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download PDF
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
