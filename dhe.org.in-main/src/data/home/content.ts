/** Homepage copy — preserved for i18n and SEO consistency */

import type { CellDefinition } from "@/data/cells/types";
import cellRegistry from "@/data/cells/registry.json";

export const homeIntro = {
  badge: "Transforming Education for Viksit Bharat",
  titleLine1: "Department of",
  titleLine2: "Holistic Education",
  description:
    "The Department of Holistic Education (DHE) is a national educational transformation platform dedicated to building Bharat as a global knowledge leader through value-based education, innovation, research, entrepreneurship, and holistic human development aligned with NEP 2020.",
};

export const homeStats = [
  { value: "2021", label: "Founded", icon: "calendar" as const },
  { value: "2023", label: "National Expansion", icon: "globe" as const },
  { value: "25", label: "National Cells", icon: "academic" as const },
  { value: "NEP", label: "Aligned Vision", icon: "flag" as const },
];

/** Quantified outcomes from DHE programs (brochure + SMK editions) */
export const homeImpactStats = [
  { value: "500+", label: "Institutions engaged" },
  { value: "1,200+", label: "Research papers (SMK editions cumulative)" },
  { value: "10,040", label: "DHE English Olympiad students" },
  { value: "14+", label: "States & UTs represented" },
] as const;

export const visionFoundation = {
  title: "Vision & Foundation",
  body: "Inspired by the transformative educational philosophy of Vidya Bharti, DHE was established as a catalyst for educational reform, innovation, and thought leadership in India. Founded in 2021 under Vidya Bharti Punjab and scaled nationally in 2023 under the Vidya Bharti Institute of Training & Research (VBITR) Trust, DHE has rapidly evolved into an action-oriented national platform advancing holistic education, skill development, leadership, innovation, and Bharatiya values.",
};

export const nationalImpact = {
  title: "National Impact",
  body: "DHE functions as the intellectual and operational nerve center for advancing educational discourse and implementation across Bharat. Through policy dialogue, institutional collaboration, leadership development, research initiatives, conferences, and digital platforms, DHE empowers educators, institutions, students, policymakers, and communities.",
  highlights: [
    "500+ institutions and 1,200+ research papers across SMK editions",
    "DHE English Olympiad — 10,040 students (2025 inaugural edition)",
    "Digital platforms: Tredul, Sarvatra, Jobs 360°, TuDu, Swadeshi Bazaar",
    "25 national cells delivering year-round programs beyond annual summits",
  ],
};

export const leadership = {
  title: "Leadership & Thought Direction",
  bodyPrefix: "At the helm of DHE is",
  leaderName: "Dr. Thakur S. K. R.",
  leaderUrl: "https://www.drthakurskr.com",
  bodySuffix:
    ", senior scientist at ISRO and pioneer in educational experimentation. His vision promotes character, competence, creativity, leadership, innovation, and globally relevant education rooted in Bharatiya civilization ethos.",
  visionTitle: "Vision Statement",
  visionQuote:
    "“Education must empower every learner to become innovative, ethical, skilled, socially responsible, and globally competent while remaining deeply rooted in Bharat’s cultural and spiritual wisdom.”",
};

export const shikshaMahakumbh = {
  title: "Flagship Program — Shiksha Mahakumbh Abhiyan",
  paragraph1:
    "Through the Shiksha Mahakumbh Abhiyan, DHE has created a transformative national movement that brings together educators, policymakers, scientists, industry leaders, social reformers, institutions, startups, researchers, and youth from across Bharat and beyond.",
  paragraph2:
    "More than a conference, it is a dynamic platform for collaborative educational reform, policy innovation, research dissemination, entrepreneurship development, leadership building, and societal transformation.",
};

export const digitalEcosystem = {
  title: "Digital Innovation Ecosystem",
  description:
    "DHE actively develops impact-driven digital platforms that transform educational vision into practical, scalable, and sustainable systems.",
  cards: [
    {
      title: "dhe.org.in",
      desc: "National DHE portal — cells, programs, and institutional hub",
      icon: "digital" as const,
      href: "https://www.dhe.org.in",
    },
    {
      title: "Shiksha Mahakumbh (RASE)",
      desc: "Flagship national summit — editions 1.0–6.0",
      icon: "summit" as const,
      href: "https://www.rase.co.in",
    },
    {
      title: "Tredul",
      desc: "Experiential learning & educational tourism platform",
      icon: "travel" as const,
      href: "https://tredul.com",
    },
    {
      title: "Sarvatra",
      desc: "Unified school resource & data management ecosystem",
      icon: "data" as const,
      href: "https://sarvatr.co.in",
    },
    {
      title: "Swadeshi Bazaar",
      desc: "Empowering local entrepreneurship & innovation",
      icon: "shop" as const,
      href: "https://swadeshibazaar.in",
    },
    {
      title: "Jobs 360°",
      desc: "Career readiness & employment ecosystem",
      icon: "career" as const,
      href: "https://jobs360.co.in",
    },
    {
      title: "TuDu",
      desc: "Integrated event & initiative management platform",
      icon: "events" as const,
      href: "https://tudu.app",
    },
    {
      title: "Viksit Bharat & Viksit India",
      desc: "Quarterly educational research & policy journals",
      icon: "journal" as const,
      href: "https://pub.dhe.org.in",
    },
  ],
};

export const closingCta = {
  titleLine1: "Building Bharat as a",
  titleLine2: "Global Knowledge Leader",
  body: "Through educational transformation, leadership development, innovation ecosystems, research, technology integration, entrepreneurship, and Bharatiya knowledge systems, DHE is committed to shaping the future of education and empowering Bharat’s journey toward becoming a Vishwa Guru.",
};

/** Visible homepage FAQ — must match getHomeFaqSchema() in structured-data.ts */
export const homeFaq = [
  {
    question: "What is the Department of Holistic Education (DHE)?",
    answer:
      "The Department of Holistic Education (DHE) is a national educational transformation platform under the Vidya Bharti Institute of Training and Research Trust, advancing holistic learning, innovation, leadership, research, entrepreneurship, and Bharatiya values aligned with NEP 2020 and Viksit Bharat 2047.",
  },
  {
    question: "What programs does DHE run beyond Shiksha Mahakumbh?",
    answer:
      "DHE runs year-round programs through 25 national cells — including DHE Olympiads, Punjab Super 100, IPR and entrepreneurship workshops, publications and journals, CSR donations, student innovation projects, residential camps, and digital platforms. Explore dhe.org.in/programs for the full hub.",
  },
  {
    question: "How can I join DHE or donate with tax benefit?",
    answer:
      "Membership is at dhe.org.in/contribute. Donations to Vidya Bharti Institute of Training and Research Trust may qualify under Section 80G for eligible assessment years — see dhe.org.in/donation and account details for VBITR Trust banking and certificates.",
  },
  {
    question: "What is Shiksha Mahakumbh Abhiyan?",
    answer:
      "Shiksha Mahakumbh Abhiyan is DHE's flagship national summit, owned by the Event Management Cell. It convenes educators, policymakers, scientists, and institutions — while Olympiads, publications, conclaves, and other cell programs also operate independently between editions.",
  },
  {
    question: "When is Shiksha Mahakumbh 6th Edition?",
    answer:
      "The 6th Edition of Shiksha Mahakumbh Abhiyan will be held at NIT Hamirpur from 9th October to 11th October 2026. Register on the official RASE portal linked from dhe.org.in/programs/shiksha-mahakumbh.",
  },
  {
    question: "How are DHE's 25 national cells organized?",
    answer:
      "DHE advances holistic education through 25 national cells — from R&D, ATL, and Udyam to Publications, Event Management, CSR, Olympiad, and more. Explore the organizational chart and cell pages at dhe.org.in/structure.",
  },
  {
    question: "Where can I find publications and transparency documents?",
    answer:
      "Journals, proceedings, and souvenirs are at dhe.org.in/publications and pub.dhe.org.in. Trust deed, 80G/12A certificates, and program PDFs are on dhe.org.in/transparency.",
  },
  {
    question: "Does DHE engage internationally?",
    answer:
      "DHE convenes educators, researchers, and institutions across India and welcomes global academic collaboration aligned with NEP 2020 and Viksit Bharat. International partners may contact director@dhe.org.in or use the contact form at dhe.org.in/contact.",
  },
] as const;

/** Featured programs for homepage strip */
export const homeProgramHighlights = [
  { slug: "dhe-olympiads", title: "DHE Olympiads", stat: "10,040+ students" },
  { slug: "ipr-entrepreneurship", title: "IPR & Entrepreneurship", stat: "CSIR–CSIO workshops" },
  { slug: "super-100", title: "Punjab Super 100", stat: "~700 active scholars" },
  { slug: "publications", title: "Journals & Proceedings", stat: "pub.dhe.org.in" },
  { slug: "e-cycle", title: "E-Cycle Initiative", stat: "Udyam Cell pilots" },
  { slug: "residential-camps", title: "Residential Camps", stat: "Immersive learning" },
  { slug: "donations-csr", title: "Donate (80G eligible)", stat: "VBITR Trust" },
  { slug: "multi-track-conference", title: "Multi-Track Conference", stat: "15 research tracks" },
  { slug: "shiksha-mahakumbh", title: "Shiksha Mahakumbh", stat: "Flagship summit" },
] as const;

/** Research → innovation → entrepreneurship → publications → events → community */
export const topicClusterLinks = [
  { href: "/cells/rd", label: "R & D Cell" },
  { href: "/cells/atl", label: "ATL Cell" },
  { href: "/cells/udyam", label: "Udyam Cell" },
  { href: "/cells/publication", label: "Publications and Promotions Cell" },
  { href: "/cells/event", label: "Event Management Cell" },
  { href: "/cells/csr", label: "CSR Cell" },
] as const;

export const participationPathways = {
  title: "Participation and institutional engagement",
  intro:
    "DHE publishes programs through the notice board and events pages. Schools, educators, and institutions may follow official announcements, explore membership, or contact coordinators when initiatives are open.",
  links: [
    {
      href: "/programs",
      label: "DHE Programs",
      description: "Olympiads, Super 100, publications, SMK, and more",
    },
    {
      href: "/noticeboard",
      label: "DHE Notice Board",
      description: "Official notices and program updates",
    },
    {
      href: "/upcomingevent",
      label: "Upcoming Events",
      description: "Planned and archived event listings",
    },
    {
      href: "/contribute",
      label: "Join DHE — Membership",
      description: "Membership information and registration",
    },
    {
      href: "/contact",
      label: "Contact DHE",
      description: "Institutional inquiries",
    },
  ],
} as const;

export const relatedLinks = [
  { href: "/structure", label: "Cells & Structure" },
  { href: "/programs", label: "All Programs" },
  { href: "/publications", label: "Publications" },
  { href: "/leadership", label: "Leadership & LMC" },
  { href: "/transparency", label: "Transparency" },
  { href: "/messages", label: "Director's Message" },
  { href: "/people", label: "Cell Co-ordinators" },
  { href: "/upcomingevent", label: "Upcoming Events" },
  { href: "/noticeboard", label: "Notice Board" },
  { href: "/contribute", label: "Join DHE — Membership" },
  { href: "/hi", label: "हिंदी" },
  { href: "/contact", label: "Contact DHE" },
];

export const homeHeroCtas = [
  { href: "/programs", label: "Explore Programs", external: false, primary: true },
  { href: "/structure", label: "Cells & Structure", external: false, primary: false },
  { href: "/programs/shiksha-mahakumbh", label: "Shiksha Mahakumbh", external: false, primary: false },
  { href: "/contribute", label: "Join DHE", external: false, primary: false },
] as const;

/** Quick links — all 25 national cells */
export const homeCellLinks = (cellRegistry as CellDefinition[]).map((cell) => ({
  href: `/cells/${cell.slug}`,
  label: cell.displayTitle.trim(),
}));
