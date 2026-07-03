export type ProgramDefinition = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  href?: string;
  /** External registration (e.g. SMK on RASE) — editable via CMS programs_json */
  externalRegistrationUrl?: string;
  /** External program home */
  externalSiteUrl?: string;
  external?: boolean;
  /** Primary owning cell */
  cellSlug?: string;
  /** Joint ownership (e.g. Bal Shodh Patrika → Udyam + Publications) */
  cellSlugs?: string[];
  /** Appears on Shiksha Mahakumbh national stage */
  smkConvergence?: boolean;
};

export const PROGRAMS: ProgramDefinition[] = [
  {
    slug: "shiksha-mahakumbh",
    title: "Shiksha Mahakumbh Abhiyan",
    summary:
      "Flagship national summit convened by Event Management Cell — editions 1.0–6.0 across NITs and universities.",
    body: "Shiksha Mahakumbh Abhiyan is DHE's annual national movement bringing together educators, policymakers, scientists, industry leaders, and institutions. It is owned by the Event Management Cell and converges programs from Olympiad, ATL, Publications, HEI, Industry, and other cells on a national stage — while those programs also run year-round between editions.",
    href: "/programs/shiksha-mahakumbh",
    cellSlug: "event",
    smkConvergence: true,
    externalSiteUrl: "https://www.rase.co.in/",
    externalRegistrationUrl:
      "https://www.rase.co.in/registration/Single_Registration",
  },
  {
    slug: "dhe-olympiads",
    title: "DHE Olympiads",
    summary:
      "English, Maths, Tech, and Sanskriti olympiads — 10,040+ students in the inaugural English Olympiad (2025).",
    body: "The Olympiad Cell conducts national DHE Olympiads for school students. The 1st DHE English Olympiad (Oct 2025) engaged 10,040 participants across 25 schools in Punjab, Haryana, and Chandigarh, with felicitation at SMK 5.0. SMK 6.0 expands English 2.0, Maths, Tech, and Sanskriti streams.",
    href: "/programs/dhe-olympiads",
    cellSlug: "olympiad",
    smkConvergence: true,
  },
  {
    slug: "super-100",
    title: "Punjab Super 100",
    summary:
      "Meritorious-student coaching for competitive exams — ~700 active students via Super 100 Cell.",
    body: "The Super 100 Cell runs Punjab Super 100 and related coaching for meritorious students from Grades 5–10 through Vidya Bharati networks, with CSR pipeline support for scaling competitive-exam preparation.",
    href: "https://punjabsuper100.com",
    external: true,
    cellSlug: "super100",
  },
  {
    slug: "bharat-pratibha-kosh",
    title: "Bharat Pratibha Kosh",
    summary:
      "Talent pipeline for Class 11 students with 90%+ in Class 10 — entrepreneurship and IPR with INIs.",
    body: "The IPR Cell's Bharat Pratibha Kosh nurtures high-achieving students through entrepreneurship, IPR awareness, career counselling, and mentorship with IIT/IIM/NIT/CSIR partners.",
    href: "/programs/bharat-pratibha-kosh",
    cellSlug: "ipr",
  },
  {
    slug: "ipr-entrepreneurship",
    title: "IPR & Entrepreneurship Workshops",
    summary:
      "From Idea to Enterprise with CSIR–CSIO; patents, design registration, and Startup India pathways.",
    body: "The IPR Cell organises workshops on patent drafting, design registration, and enterprise formation in collaboration with CSIR–CSIO and higher-education institutions, building an IPR culture across schools.",
    href: "/programs/ipr-entrepreneurship",
    cellSlug: "ipr",
  },
  {
    slug: "student-projects",
    title: "Student Projects & ATL",
    summary:
      "School and college innovation projects showcased at Shiksha Mahakumbh.",
    body: "The ATL Cell coordinates student projects (Classes 6–10 and UG/PG) and ATL Innovation Mission labs, with middle-school innovation and SMK exhibition convergence.",
    href: "/programs/student-projects",
    cellSlug: "atl",
    smkConvergence: true,
  },
  {
    slug: "bal-shodh-patrika",
    title: "Bal Shodh Patrika",
    summary:
      "Research journal for Classes 9–12 — joint initiative of Udyam and Publications cells.",
    body: "Bal Shodh Patrika publishes student research from Classes 9–12, jointly advanced by the Udyam Cell and Publications & Promotions Cell.",
    href: "/programs/bal-shodh-patrika",
    cellSlugs: ["udyam", "publication"],
    smkConvergence: true,
  },
  {
    slug: "model-couple-program",
    title: "Model Couple Program",
    summary:
      "Parenting Cell initiative bridging home and school for holistic student development.",
    body: "The Parenting Cell's Model Couple Program strengthens family-school partnership and values-based parenting aligned with holistic education.",
    href: "/programs/model-couple-program",
    cellSlug: "parenting",
  },
  {
    slug: "donations-csr",
    title: "Donations & CSR",
    summary:
      "CSR Cell — mobile science labs, e-vehicle labs, art studios, and 80G-eligible trust donations.",
    body: "The CSR Cell channels donations and corporate partnerships toward mobile science labs, e-vehicle labs, art studios, Punjab Super 100, and other DHE initiatives. Eligible donations to VBITR Trust may qualify under Section 80G — see the donation page for details.",
    href: "/donation",
    cellSlug: "csr",
  },
  {
    slug: "publications",
    title: "Publications & Journals",
    summary:
      "Viksit India, Viksit Bharat, proceedings, souvenirs, and MTC — pub.dhe.org.in.",
    body: "The Publications & Promotions Cell publishes Viksit India and Viksit Bharat journals (EN/HI), SMK proceedings and souvenirs, Multi-Track Conference outputs, and open-access research aligned with DHE programs.",
    href: "/publications",
    cellSlug: "publication",
    smkConvergence: true,
  },
  {
    slug: "digital-platforms",
    title: "Digital Platforms",
    summary:
      "IT Cell — Sarvatra, TuDu, Tredul, dhe.org.in, rase.co.in, pub.dhe.org.in, and school sites.",
    body: "The IT Cell builds and maintains DHE's digital ecosystem including learning platforms, school websites, event systems, and national portals that scale holistic education programs.",
    href: "/programs/digital-platforms",
    cellSlug: "it",
  },
  {
    slug: "academic-conclaves",
    title: "Academic Conclaves",
    summary:
      "Seven thematic conclaves at SMK — coordinated by HEI and Industry cells.",
    body: "HEI Coordination and Industry Coordination cells convene academic conclaves connecting vice-chancellors, principals, scientists, startup leaders, and CSR partners at Shiksha Mahakumbh and allied forums.",
    href: "/programs/academic-conclaves",
    cellSlugs: ["hei", "industry"],
    smkConvergence: true,
  },
  {
    slug: "workshops",
    title: "Workshops & Training",
    summary: "Faculty development, IPR, spoken English, and innovation workshops.",
    body: "DHE cells conduct workshops on innovation, entrepreneurship, IPR, and holistic education for students, teachers, and institutions. View the workshop archive and upcoming training opportunities.",
    href: "/workshop",
  },
  {
    slug: "residential-camps",
    title: "Residential Camps",
    summary: "Immersive camps for students and educators at partner institutions.",
    body: "Residential camps provide immersive learning experiences aligned with holistic education and Bharatiya values, coordinated by Event Management and leadership cells.",
    href: "/residentialcamps",
    cellSlug: "event",
  },
  {
    slug: "membership",
    title: "DHE Membership",
    summary: "Join DHE and support national holistic education programs.",
    body: "Membership connects institutions and individuals to DHE's national network of cells, events, and publications. Complete registration and payment through the official membership page.",
    href: "/contribute",
  },
  {
    slug: "research-innovation",
    title: "Research & Innovation",
    summary: "R&D Cell — edtech, recycling, solar, FMCG pilots, and school products.",
    body: "The R&D Cell coordinates research initiatives, pilot projects, and innovation ecosystems including Surbhi products, recycling programs, and Viksit Bharat 2047 school models.",
    cellSlug: "rd",
    href: "/cells/rd",
  },
];

export function getProgramBySlug(slug: string): ProgramDefinition | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function getAllProgramSlugs(): string[] {
  return PROGRAMS.map((p) => p.slug);
}

/** Programs owned by a cell (primary or joint). */
export function getProgramsForCell(cellSlug: string): ProgramDefinition[] {
  return PROGRAMS.filter(
    (p) =>
      p.cellSlug === cellSlug ||
      (p.cellSlugs?.includes(cellSlug) ?? false)
  );
}

export function getProgramCellSlugs(program: ProgramDefinition): string[] {
  if (program.cellSlugs?.length) return program.cellSlugs;
  if (program.cellSlug) return [program.cellSlug];
  return [];
}
