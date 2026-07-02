import Link from "next/link";
import AdvisoryCouncil2 from "@/components/sections/DesAdvisory";
import { getAdvisoryMembers } from "@/lib/cms/people-content";

export default async function Advisory() {
  const advisoryMembers2 = await getAdvisoryMembers();

  return (
    <>
      <div className="dhe-container pt-8 pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color text-center">
          Advisory Council
        </h1>
        <p className="mt-3 text-sm text-gray-600 text-center max-w-2xl mx-auto">
          Institutional advisors supporting DHE. For outreach, contact the{" "}
          <Link href="/contact" className="text-orange-700 underline">
            DHE office
          </Link>
          .
        </p>
      </div>
      <AdvisoryCouncil2 title="Advisory Council Members" members={advisoryMembers2} />
    </>
  );
}
