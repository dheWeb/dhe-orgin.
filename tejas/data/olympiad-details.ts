import type { OlympiadDetail } from "@/types";
import { getOlympiadBySlug } from "./olympiads";

const baseDetail = (slug: string): OlympiadDetail | null => {
  const olympiad = getOlympiadBySlug(slug);
  if (!olympiad) return null;

  return {
    ...olympiad,
    eligibility: [
      "Students enrolled in recognised schools across India",
      `Grade range: ${olympiad.grades}`,
      "Valid school registration or individual enrollment",
      "One attempt per edition per subject",
    ],
    examPattern: [
      { section: "Objective MCQs", questions: olympiad.questions - 5, marks: olympiad.questions - 5 },
      { section: "Logical Reasoning", questions: 5, marks: 10 },
    ],
    syllabus: [
      "Grade-appropriate curriculum aligned with NCERT and major state boards",
      "Higher-order thinking and application-based questions",
      "Previous edition question trends and competency frameworks",
      "Sample papers and official preparation guides",
    ],
    resources: [
      {
        id: `${slug}-sample-1`,
        title: "Sample Paper — Set A",
        type: "pdf",
        subject: olympiad.name,
        description: "Official sample paper with answer key.",
        href: "#",
      },
      {
        id: `${slug}-video-1`,
        title: "Preparation Masterclass",
        type: "video",
        subject: olympiad.name,
        description: "Expert-led strategy session for top performers.",
        href: "#",
      },
    ],
    books: [
      {
        title: `TEJAS ${olympiad.name} Workbook`,
        author: "DHE Academic Council",
        publisher: "TEJAS Publications",
      },
      {
        title: "Previous Years Collection",
        author: "TEJAS Editorial Board",
        publisher: "TEJAS Publications",
      },
    ],
    awards: [
      { level: "National Top 100", description: "Gold medal, certificate, and scholarship eligibility" },
      { level: "State Top 50", description: "Silver medal and state recognition certificate" },
      { level: "School Top 10", description: "Bronze medal and school champion badge" },
      { level: "All Participants", description: "Digital participation certificate with verification QR" },
    ],
    faqs: [
      {
        question: `When is the ${olympiad.name} Olympiad conducted?`,
        answer: `The ${olympiad.name} Olympiad is scheduled as part of the current TEJAS edition. Check the edition timeline for exact dates.`,
      },
      {
        question: "Is there negative marking?",
        answer: "No negative marking in Phase 0 demo. Official rules will be published before registration opens.",
      },
      {
        question: "Can I attempt a free mock test?",
        answer: "Yes. Visit the Prepare Hub for subject-wise mock tests and practice sets.",
      },
    ],
  };
};

export function getOlympiadDetail(slug: string): OlympiadDetail | null {
  return baseDetail(slug);
}

export function getAllOlympiadSlugs(): string[] {
  return [
    "mathematics",
    "science",
    "technology",
    "english",
    "hindi",
    "sanskrit",
    "general-knowledge",
    "ai",
    "coding",
    "innovation",
  ];
}
