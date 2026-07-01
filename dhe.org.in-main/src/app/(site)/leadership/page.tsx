import { createPageMetadata } from "@/lib/seo/build-metadata";
import AdvisoryCouncil from "@/components/sections/AdvisoryCouncil";
import {
  lmcCurrentMembers,
  lmcCurrentPatrons,
  lmcDocuments,
} from "@/data/institution";
import Link from "next/link";

export const metadata = createPageMetadata("leadership");

const currentDoc = lmcDocuments.find((d) => d.isCurrent && d.id === "letter-12");

export default function LeadershipPage() {
  const patrons = lmcCurrentPatrons.map((m) => ({
    name: m.name,
    designation: m.designation,
    contact: m.contact,
  }));

  const members = lmcCurrentMembers.map((m) => ({
    name: m.name,
    designation: m.designation,
    contact: m.contact,
  }));

  return (
    <>
      <div className="dhe-container pt-8 pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color text-center">
          Leadership &amp; Local Management Committee
        </h1>
        <p className="mt-3 text-sm text-gray-600 text-center max-w-2xl mx-auto">
          Patrons and members of the Local Management Committee (LMC) governing
          the Department of Holistic Education.
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
    </>
  );
}
