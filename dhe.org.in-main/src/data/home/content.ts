/** Homepage copy — preserved for i18n and SEO consistency */

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
  { value: "NEP", label: "Aligned Vision", icon: "academic" as const },
  { value: "India", label: "National Reach", icon: "flag" as const },
];

export const visionFoundation = {
  title: "Vision & Foundation",
  body: "Inspired by the transformative educational philosophy of Vidya Bharti, DHE was established as a catalyst for educational reform, innovation, and thought leadership in India. Founded in 2021 under Vidya Bharti Punjab and scaled nationally in 2023 under the Vidya Bharti Institute of Training & Research (VBITR) Trust, DHE has rapidly evolved into an action-oriented national platform advancing holistic education, skill development, leadership, innovation, and Bharatiya values.",
};

export const nationalImpact = {
  title: "National Impact",
  body: "DHE functions as the intellectual and operational nerve center for advancing educational discourse and implementation across Bharat. Through policy dialogue, institutional collaboration, leadership development, research initiatives, conferences, and digital platforms, DHE empowers educators, institutions, students, policymakers, and communities.",
  highlights: [
    "National Educational Conferences & Summits",
    "Innovation & Entrepreneurship Ecosystem",
    "Digital Educational Platforms & Solutions",
    "Leadership & Skill Development Initiatives",
  ],
};

export const leadership = {
  title: "Leadership & Thought Direction",
  bodyPrefix: "At the helm of DHE is",
  leaderName: "Dr. Thakur S. K. R.",
  leaderUrl: "http://www.drthakurskr.com",
  bodySuffix:
    ", senior scientist at ISRO and pioneer in educational experimentation. His vision promotes character, competence, creativity, leadership, innovation, and globally relevant education rooted in Bharatiya civilization ethos.",
  visionTitle: "Vision Statement",
  visionQuote:
    "“Education must empower every learner to become innovative, ethical, skilled, socially responsible, and globally competent while remaining deeply rooted in Bharat’s cultural and spiritual wisdom.”",
};

export const shikshaMahakumbh = {
  title: "Shiksha Mahakumbh Abhiyan",
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
      title: "Tredul",
      desc: "Experiential learning & educational tourism platform",
      icon: "travel" as const,
    },
    {
      title: "Sarvatra",
      desc: "Unified school resource & data management ecosystem",
      icon: "data" as const,
    },
    {
      title: "Swadeshi Bazaar",
      desc: "Empowering local entrepreneurship & innovation",
      icon: "shop" as const,
    },
    {
      title: "Jobs 360°",
      desc: "Career readiness & employment ecosystem",
      icon: "career" as const,
    },
    {
      title: "TuDu",
      desc: "Integrated event & initiative management platform",
      icon: "events" as const,
    },
    {
      title: "Viksit Bharat & Viksit India",
      desc: "Quarterly educational research & policy journals",
      icon: "journal" as const,
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
      "The Department of Holistic Education (DHE) is a national educational transformation platform dedicated to building Bharat as a global knowledge leader through value-based education, innovation, research, entrepreneurship, and holistic human development aligned with NEP 2020.",
  },
  {
    question: "What is Shiksha Mahakumbh Abhiyan?",
    answer:
      "Shiksha Mahakumbh Abhiyan is a transformative national movement by DHE that brings together educators, policymakers, scientists, industry leaders, institutions, researchers, and youth for collaborative educational reform, policy innovation, research dissemination, and leadership building.",
  },
  {
    question: "When is Shiksha Mahakumbh 6th Edition?",
    answer:
      "The 6th Edition of Shiksha Mahakumbh Abhiyan will be held at NIT Hamirpur from 9th October to 11th October 2026.",
  },
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
  { href: "/messages", label: "Director's Message" },
  { href: "/people", label: "Cell Co-ordinators" },
  { href: "/upcomingevent", label: "Upcoming Events" },
  { href: "/pastevent", label: "Past Events" },
  { href: "/noticeboard", label: "Notice Board" },
  { href: "/contribute", label: "Join DHE — Membership" },
  { href: "/contact", label: "Contact DHE" },
];

export const homeHeroCtas = [
  {
    href: "https://www.rase.co.in/",
    label: "Shiksha Mahakumbh",
    external: true,
    primary: true,
  },
  { href: "/structure", label: "Cells & Structure", external: false, primary: false },
  { href: "/contribute", label: "Join DHE", external: false, primary: false },
] as const;

/** Quick links for cells / departments strip on homepage */
export const homeCellLinks = [
  { href: "/structure", label: "Organizational Structure" },
  { href: "/cells/rd", label: "R & D Cell" },
  { href: "/cells/atl", label: "ATL Cell" },
  { href: "/cells/udyam", label: "Udyam Cell" },
  { href: "/cells/publication", label: "Publication Cell" },
  { href: "/cells/event", label: "Event Management Cell" },
  { href: "/cells/csr", label: "CSR Cell" },
  { href: "/cells/hei", label: "HEI Cell" },
] as const;
