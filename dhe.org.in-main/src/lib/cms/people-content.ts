import { getSiteContent } from "@/lib/cms/site-content";

export type CoordinatorMember = {
  name: string;
  designation: string;
  contact: string;
};

export type AdvisoryMember = {
  name: string;
  des2: string;
  designation: string;
  contact: string;
};

export const DEFAULT_COORDINATORS: CoordinatorMember[] = [
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

export const DEFAULT_ADVISORY: AdvisoryMember[] = [
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

function parseMembersJson<T>(raw: string | undefined, fallback: T[]): T[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.length ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export async function getCoordinators(): Promise<CoordinatorMember[]> {
  const content = await getSiteContent(["people_json"]);
  return parseMembersJson(content.people_json?.json, DEFAULT_COORDINATORS);
}

export async function getAdvisoryMembers(): Promise<AdvisoryMember[]> {
  const content = await getSiteContent(["advisory_json"]);
  return parseMembersJson(content.advisory_json?.json, DEFAULT_ADVISORY);
}
