import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import AdvisoryCouncil from "@/components/sections/AdvisoryCouncil";
import ParticipationPathways from "@/components/sections/ParticipationPathways";

export const metadata = createPageMetadata("people");

const advisoryMembers = [
  { name: "Dr. Neeraj Naithani", designation: "Coordinator, IT Cell", contact: "9995678372" },
  { name: "Col. K. K. Kakkar", designation: "Coordinator, Event Management Cell", contact: "8697730065" },
  { name: "Ms. Maninder Kakkar", designation: "Coordinator, Punjab Super 100", contact: "9419248487" },
  { name: "Dr. Neelesh Kumar", designation: "Coordinator, IPR Cell", contact: "9478515278" },
  { name: "Dr. Karan Goel", designation: "Coordinator, Industry Co-ordination Cell", contact: "9915087986" },
  { name: "Dr. Htet Ne Oo", designation: "Coordinator, HEI Co-ordination Cell", contact: "9041120510" },
  { name: "Mr. Sachin Tiwari", designation: "Coordinator, E-commerce Cell", contact: "8729012133" },
  { name: "Dr. Mohit Verma", designation: "Coordinator, TMS Cell", contact: "9872003823" },
  { name: "Mr. Arsh Agarwal", designation: "Coordinator, Udyam Cell", contact: "7986327876" },
  { name: "Shri Saurav Kumar", designation: "Coordinator, Foreign Language Cell", contact: "9023519487" },
  { name: "Ms. Sonu Sharma", designation: "Coordinator, Olympiad Cell", contact: "9988690588" },
  { name: "Ms. Neeru", designation: "Coordinator, LMS Cell", contact: "9467733337" },
  { name: "Dr. Girish Bali", designation: "Coordinator, CSR Cell", contact: "9530703711" },
  { name: "Dr. Neeraj Pant", designation: "Co-coordinator, CSR Cell", contact: "9815298846" },
  { name: "Dr. Praveen Sharma", designation: "Coordinator, R & D Cell", contact: "9988625485" },
  { name: "Dr. Ramit Vasudev", designation: "Coordinator, Art Cell", contact: "9463310838" },
  { name: "Mr. Krishan Kumar", designation: "Coordinator, ATL & Publication and Promotion Cells", contact: "9995565850" },
  { name: "Dr. Chaman Chandel", designation: "Coordinator, Astrology Cell", contact: "8146000152" },
  { name: "Mr. Om Parkash", designation: "Coordinator, Environment Cell", contact: "7696277109" },
  { name: "Adv. Ruchita Garg", designation: "Coordinator, Parenting Cell", contact: "9463588899" },
  { name: "Adv. Vikram Verma", designation: "Coordinator, Premium School Cell", contact: "9855400094" },
  { name: "Mrs. Shyam Priya", designation: "Coordinator, Health Wisdom Cell", contact: "9318440221" },
  { name: "Dr. Gurbachan Singh", designation: "Coordinator, Sports Cell", contact: "9781998278" },
  { name: "Adv. Niharika Kamal", designation: "Coordinator, Spiritual Cell", contact: "7508638699" },
  { name: "Mr. Anuj Kumar", designation: "Co-coordinator, Spiritual Cell", contact: "7508638699" },
  { name: "Adv. Poonam Thakur", designation: "Coordinator, Grievance Redressal Cell", contact: "7508337539" },
];


export default function People() {
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
