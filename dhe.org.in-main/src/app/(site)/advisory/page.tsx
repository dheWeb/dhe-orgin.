import { createPageMetadata } from "@/lib/seo/build-metadata";
import AdvisoryCouncil2 from "@/components/sections/DesAdvisory";

export const metadata = createPageMetadata("advisory");

const advisoryMembers2 = [
  {
    name: "Mr. Vijay Kumar Nadda",
    des2: "Organising Secretary, Vidya Bharti (North Region)",
    designation: "Member, Advisory Council",
    contact: "9417257310",
  },
  {
    name: "Prof. Rajeev Ahuja",
    des2: "Director, IIT Ropar",
    designation: "Member, Advisory Council",
    contact: "",
  },
  {
    name: "Prof. Binod Kumar Kanaujia",
    des2: "Director, NIT Jalandhar",
    designation: "Member, Advisory Council",
    contact: "9868795834",
  },
  {
    name: "Mr. Manoj Singhal",
    des2: "Scientific Advisor",
    designation: "Member, Advisory Council",
    contact: "9872994017",
  },
];

export default function Advisory() {
  return (
    <>
      <div className="dhe-container pt-8 pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color text-center">
          Advisory Council
        </h1>
        <p className="mt-3 text-sm text-gray-600 text-center max-w-2xl mx-auto">
          Institutional advisors supporting DHE. For outreach, contact the{" "}
          <a href="/contact" className="text-orange-700 underline">
            DHE office
          </a>
          .
        </p>
      </div>
      <AdvisoryCouncil2 title="Advisory Council Members" members={advisoryMembers2} />
    </>
  );
}
