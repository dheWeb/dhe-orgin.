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
  cellSlug?: string;
};

export const PROGRAMS: ProgramDefinition[] = [
  {
    slug: "shiksha-mahakumbh",
    title: "Shiksha Mahakumbh",
    summary: "National holistic education gatherings and Shiksha Mahakumbh editions.",
    body: "Shiksha Mahakumbh Abhiyan is DHE's flagship national movement bringing together educators, policymakers, scientists, and institutions for collaborative educational reform. Register for upcoming editions and explore archives of past programs.",
    href: "/programs/shiksha-mahakumbh",
    externalSiteUrl: "https://www.rase.co.in/",
    externalRegistrationUrl:
      "https://www.rase.co.in/registration/Single_Registration",
  },
  {
    slug: "workshops",
    title: "Workshops & Training",
    summary: "Faculty development, institutional workshops, and innovation programs.",
    body: "DHE conducts workshops on innovation, entrepreneurship, and holistic education for students, teachers, and ATL coordinators. View the workshop archive and upcoming training opportunities.",
    href: "/workshop",
  },
  {
    slug: "residential-camps",
    title: "Residential Camps",
    summary: "Immersive camps for students and educators.",
    body: "Residential camps provide immersive learning experiences aligned with holistic education and Bharatiya values. Program details and schedules are published on the residential camps page.",
    href: "/residentialcamps",
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
    summary: "R&D and ATL cells advancing NEP 2020 aligned research.",
    body: "The R&D and ATL cells coordinate research initiatives, innovation ecosystems, and institutional partnerships across Bharat.",
    cellSlug: "rd",
    href: "/cells/rd",
  },
  {
    slug: "publications",
    title: "Publications",
    summary: "Journals, proceedings, and knowledge outputs.",
    body: "DHE publishes journals including Viksit India and conference proceedings from Shiksha Mahakumbh and national programs. Explore books, journals, and the pub.dhe.org.in portal.",
    href: "/publications",
  },
];

export function getProgramBySlug(slug: string): ProgramDefinition | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function getAllProgramSlugs(): string[] {
  return PROGRAMS.map((p) => p.slug);
}
