import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import AdvisoryCouncil from "@/components/sections/AdvisoryCouncil";
import ParticipationPathways from "@/components/sections/ParticipationPathways";
import { getCoordinators } from "@/lib/cms/people-content";

export const metadata = createPageMetadata("people");

export default async function People() {
  const advisoryMembers = await getCoordinators();

  return (
    <div className="bg-white min-w-0">
      <div className="dhe-container py-6 sm:py-10 space-y-8">
        <header className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
            Cell Co-ordinators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Contact directory for DHE national cell co-ordinators. See the{" "}
            <Link
              href="/messages"
              className="text-orange-700 font-medium hover:underline"
            >
              Director&apos;s Message
            </Link>{" "}
            and{" "}
            <Link
              href="/structure"
              className="text-orange-700 font-medium hover:underline"
            >
              organizational structure
            </Link>{" "}
            for institutional context.
          </p>
        </header>
        <AdvisoryCouncil
          title="Coordinator directory"
          members={advisoryMembers}
        />
        <ParticipationPathways
          variant="compact"
          className="max-w-3xl mx-auto border-t border-gray-200 pt-8"
        />
      </div>
    </div>
  );
}
