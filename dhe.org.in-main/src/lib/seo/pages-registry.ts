/**
 * Central SEO registry — paths must match App Router URLs exactly (case-sensitive).
 */
export type PageSeoEntry = {
  path: string;
  title: string;
  description: string;
  /** Exclude from sitemap (admin/internal) */
  noIndex?: boolean;
};

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  home: {
    path: "/",
    title: "Holistic Educational Transformation of Bharat",
    description:
      "Department of Holistic Education (DHE) — national platform for holistic learning, Shiksha Mahakumbh, NEP 2020, innovation, leadership, and Viksit Bharat.",
  },
  messages: {
    path: "/messages",
    title: "Director's Message",
    description:
      "Message from the Director of the Department of Holistic Education (DHE) on holistic education and national transformation.",
  },
  structure: {
    path: "/structure",
    title: "Cells & Organizational Structure",
    description:
      "Explore the organizational structure and cells of the Department of Holistic Education (DHE).",
  },
  advisory: {
    path: "/advisory",
    title: "Advisory Council",
    description:
      "Meet the Advisory Council guiding the Department of Holistic Education (DHE).",
  },
  committee: {
    path: "/leadership",
    title: "Leadership & LMC",
    description:
      "Local Management Committee and leadership of the Department of Holistic Education (DHE).",
  },
  leadership: {
    path: "/leadership",
    title: "Leadership & LMC",
    description:
      "Local Management Committee and leadership of the Department of Holistic Education (DHE).",
  },
  programs: {
    path: "/programs",
    title: "DHE Programs",
    description:
      "Flagship programs, workshops, camps, and cells of the Department of Holistic Education (DHE).",
  },
  people: {
    path: "/people",
    title: "Cell Co-ordinators",
    description:
      "Cell co-ordinators and leadership across DHE initiatives and programs.",
  },
  contact: {
    path: "/contact",
    title: "Contact Us",
    description:
      "Contact the Department of Holistic Education (DHE) for inquiries, partnerships, and support.",
  },
  feedback: {
    path: "/feedback",
    title: "Feedback",
    description:
      "Share your feedback with the Department of Holistic Education (DHE).",
  },
  donation: {
    path: "/donation",
    title: "Donation",
    description:
      "Support the Department of Holistic Education (DHE) through donations for holistic education initiatives.",
  },
  contribute: {
    path: "/contribute",
    title: "Join DHE — Membership",
    description:
      "Become a member of the Department of Holistic Education (DHE) and join the holistic education movement.",
  },
  Members: {
    path: "/Members",
    title: "Membership Directory",
    description:
      "Authorized DHE membership directory for administrators.",
    noIndex: true,
  },
  privacyPolicy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "Privacy policy for the Department of Holistic Education (DHE) website.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use",
    description:
      "Terms of use for the Department of Holistic Education (DHE) website.",
  },
  accountdetails: {
    path: "/accountdetails",
    title: "Account Details",
    description:
      "Official account and banking details for the Department of Holistic Education (DHE).",
  },
  logos: {
    path: "/logos",
    title: "Media & Logos",
    description:
      "Download official DHE logos, media assets, and brand resources.",
  },
  books: {
    path: "/books",
    title: "Books & Publications",
    description:
      "Books and publications from the Department of Holistic Education (DHE).",
  },
  journals: {
    path: "/journals",
    title: "Journals",
    description:
      "Academic and educational journals associated with DHE.",
  },
  pastevent: {
    path: "/pastevent",
    title: "Past Events",
    description:
      "Archive of past events, Shiksha Mahakumbh editions, and DHE programs.",
  },
  upcomingevent: {
    path: "/upcomingevent",
    title: "Upcoming Events",
    description:
      "Upcoming events and programs by the Department of Holistic Education (DHE).",
  },
  workshop: {
    path: "/workshop",
    title: "Workshops",
    description:
      "Educational workshops organized by the Department of Holistic Education (DHE).",
  },
  residentialcamps: {
    path: "/residentialcamps",
    title: "Residential Camps",
    description:
      "Residential camps and immersive learning programs by DHE.",
  },
  noticeboard: {
    path: "/noticeboard",
    title: "Notice Board",
    description:
      "Latest notices and announcements from the Department of Holistic Education (DHE).",
  },
  noticeboarddata: {
    path: "/noticeboarddata",
    title: "Notice Board Administration",
    description: "Internal notice management for authorized DHE administrators.",
    noIndex: true,
  },
  donationdatadekh: {
    path: "/donationdatadekh",
    title: "Donation Records",
    description: "Internal donation records for authorized DHE staff.",
    noIndex: true,
  },
  WD: {
    path: "/WD",
    title: "Workshop Data",
    description: "Workshop registration data for authorized DHE staff.",
    noIndex: true,
  },
  comingsoon: {
    path: "/comingsoon",
    title: "Coming Soon",
    description:
      "New sections and features coming soon on the DHE website.",
    noIndex: true,
  },
  registrationForm: {
    path: "/registrationForm",
    title: "Registration Form",
    description:
      "Register for DHE programs, events, and initiatives.",
    noIndex: true,
  },
  accessibility: {
    path: "/accessibility",
    title: "Accessibility Statement",
    description:
      "Accessibility commitment and contact for the Department of Holistic Education (DHE) website.",
  },
  contactThankYou: {
    path: "/contact/thank-you",
    title: "Message Received",
    description: "Thank you for contacting DHE.",
    noIndex: true,
  },
  feedbackThankYou: {
    path: "/feedback/thank-you",
    title: "Feedback Received",
    description: "Thank you for your feedback to DHE.",
    noIndex: true,
  },
  receiptVerify: {
    path: "/receipt/verify",
    title: "Verify Donation Receipt",
    description:
      "Verify an official DHE donation receipt and download the PDF for 80G records.",
  },
  publications: {
    path: "/publications",
    title: "Publications Hub",
    description:
      "Books, journals, proceedings, and knowledge outputs from DHE programs.",
  },
  refundPolicy: {
    path: "/refund-policy",
    title: "Refund & Cancellation Policy",
    description:
      "Refund and cancellation terms for DHE donations, membership, and registrations.",
  },
};

import { CELLS, getCellSeoTitle, getCellBySlug } from "@/data/cells";
import { getAllProgramSlugs } from "@/data/programs/registry";

export function getCellSeoEntry(slug: string): PageSeoEntry {
  const title = getCellSeoTitle(slug);
  const cell = getCellBySlug(slug);
  const objective =
    cell?.blocks?.[0]?.objective?.slice(0, 155) ??
    `${title} initiatives at the Department of Holistic Education (DHE).`;
  return {
    path: `/cells/${slug}`,
    title,
    description: `${objective}… Programs aligned with NEP 2020 and holistic education.`,
  };
}

export function getAllPublicPaths(): string[] {
  const base = Object.values(PAGE_SEO)
    .filter((p) => !p.noIndex)
    .map((p) => p.path);

  const cells = CELLS.map((cell) => `/cells/${cell.slug}`);
  const programs = getAllProgramSlugs().map((slug) => `/programs/${slug}`);

  return Array.from(new Set([...base, ...cells, ...programs]));
}
