import { createPageMetadata } from "@/lib/seo/build-metadata";
import AdvisoryCouncil from "@/components/sections/AdvisoryCouncil";
import {
  lmcCurrentMembers,
  lmcCurrentPatrons,
  lmcDocuments,
} from "@/data/institution";
import Link from "next/link";

export const metadata = createPageMetadata("committee");

const currentDoc = lmcDocuments.find((d) => d.isCurrent && d.id === "letter-12");

export default function Committee() {
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
      {currentDoc && (
        <div className="dhe-container pt-6 text-sm text-gray-600">
          <p>
            Local Management Committee per{" "}
            <strong>Letter No. {currentDoc.refNo}</strong> ({currentDoc.term.from} –{" "}
            {currentDoc.term.to}).{" "}
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
