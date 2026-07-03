import type { Scholarship } from "@/types";

export const scholarships: Scholarship[] = [
  {
    id: "national-excellence",
    title: "TEJAS National Excellence Scholarship",
    amount: "₹1,00,000",
    eligibility: "National Top 100 in any olympiad",
    deadline: "March 2027",
    description:
      "Merit scholarship for outstanding national performers, supporting higher education and advanced learning pathways.",
  },
  {
    id: "state-champion",
    title: "State Champion Grant",
    amount: "₹25,000",
    eligibility: "State Top 10 in any subject",
    deadline: "April 2027",
    description:
      "Recognition grant for state-level champions demonstrating consistent academic excellence.",
  },
  {
    id: "rural-talent",
    title: "Bharat Talent Rising Fund",
    amount: "₹10,000",
    eligibility: "Top performers from rural and aspirational districts",
    deadline: "May 2027",
    description:
      "Inclusive scholarship ensuring talent from every corner of India receives recognition and support.",
  },
  {
    id: "innovation",
    title: "TEJAS Innovation Fellowship",
    amount: "₹50,000 + Mentorship",
    eligibility: "Innovation Olympiad Top 25",
    deadline: "June 2027",
    description:
      "Fellowship for young innovators with mentorship from industry leaders and research institutions.",
  },
];
