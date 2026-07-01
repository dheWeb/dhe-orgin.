import type { CellDefinition } from "./types";
import type {
  CellActivityGroup,
  CellEnrichmentContent,
  CellEnrichmentLink,
} from "./enrichment-types";
import { shikshaMahakumbh } from "@/data/home/content";

const DHE_PLATFORM_LINE =
  "DHE is a national educational transformation platform advancing holistic learning, innovation, research, entrepreneurship, and value-based education aligned with NEP 2020.";

/** Shared institutional links on every cell page */
const RELATED_INITIATIVES_BASE: CellEnrichmentLink[] = [
  { href: "/messages", label: "Director's Message" },
  { href: "/structure", label: "Cells & Organizational Structure" },
  { href: "/pastevent", label: "Past Events and Academic Initiatives" },
  { href: "/upcomingevent", label: "Upcoming Events" },
  { href: "/contribute", label: "Join DHE — Membership" },
  { href: "/contact", label: "Contact DHE" },
];

const WORKSHOP_LINK: CellEnrichmentLink = {
  href: "/workshop",
  label: "Workshop Archive",
};

/** Cross-links between cells (theme adjacency from registry mandates) */
const RELATED_CELLS_BY_SLUG: Record<string, CellEnrichmentLink[]> = {
  art: [
    { href: "/cells/event", label: "Event Management Cell" },
    { href: "/cells/ecommerce", label: "E-Commerce Cell" },
    { href: "/cells/rd", label: "R & D Cell" },
  ],
  astrology: [
    { href: "/cells/health", label: "Health Wisdom Cell" },
    { href: "/cells/spritual", label: "Spiritual Cell" },
    { href: "/cells/parenting", label: "Parenting Cell" },
  ],
  atl: [
    { href: "/cells/rd", label: "R & D Cell" },
    { href: "/cells/udyam", label: "Udyam Cell" },
    { href: "/cells/industry", label: "Industry Co-ordination Cell" },
  ],
  csr: [
    { href: "/cells/event", label: "Event Management Cell" },
    { href: "/cells/environment", label: "Environment Cell" },
    { href: "/cells/industry", label: "Industry Co-ordination Cell" },
  ],
  ecommerce: [
    { href: "/cells/udyam", label: "Udyam Cell" },
    { href: "/cells/industry", label: "Industry Co-ordination Cell" },
    { href: "/cells/art", label: "Art Cell" },
  ],
  environment: [
    { href: "/cells/csr", label: "CSR Cell" },
    { href: "/cells/parenting", label: "Parenting Cell" },
    { href: "/cells/health", label: "Health Wisdom Cell" },
  ],
  event: [
    { href: "/cells/publication", label: "Publications and Promotions Cell" },
    { href: "/cells/csr", label: "CSR Cell" },
    { href: "/cells/rd", label: "R & D Cell" },
  ],
  foreign: [
    { href: "/cells/hei", label: "HEI Coordination Cell" },
    { href: "/cells/olympiad", label: "Olympiad Cell" },
    { href: "/cells/super100", label: "Super 100" },
  ],
  grievance: [
    { href: "/cells/tms", label: "TMS Cell" },
    { href: "/cells/premiumschool", label: "Premium School Cell" },
    { href: "/cells/parenting", label: "Parenting Cell" },
  ],
  health: [
    { href: "/cells/parenting", label: "Parenting Cell" },
    { href: "/cells/sports", label: "Sports Cell" },
    { href: "/cells/environment", label: "Environment Cell" },
  ],
  hei: [
    { href: "/cells/rd", label: "R & D Cell" },
    { href: "/cells/event", label: "Event Management Cell" },
    { href: "/cells/foreign", label: "Foreign Language Cell" },
  ],
  industry: [
    { href: "/cells/atl", label: "ATL Cell" },
    { href: "/cells/udyam", label: "Udyam Cell" },
    { href: "/cells/ecommerce", label: "E-Commerce Cell" },
  ],
  ipr: [
    { href: "/cells/rd", label: "R & D Cell" },
    { href: "/cells/publication", label: "Publications and Promotions Cell" },
    { href: "/cells/it", label: "IT Cell" },
  ],
  it: [
    { href: "/cells/lms", label: "LMS Cell" },
    { href: "/cells/rd", label: "R & D Cell" },
    { href: "/cells/ipr", label: "IPR Cell" },
  ],
  lms: [
    { href: "/cells/it", label: "IT Cell" },
    { href: "/cells/rd", label: "R & D Cell" },
    { href: "/cells/olympiad", label: "Olympiad Cell" },
  ],
  olympiad: [
    { href: "/cells/super100", label: "Super 100" },
    { href: "/cells/lms", label: "LMS Cell" },
    { href: "/cells/foreign", label: "Foreign Language Cell" },
  ],
  parenting: [
    { href: "/cells/health", label: "Health Wisdom Cell" },
    { href: "/cells/grievance", label: "Grievance Redressal Cell" },
    { href: "/cells/spritual", label: "Spiritual Cell" },
  ],
  premiumschool: [
    { href: "/cells/tms", label: "TMS Cell" },
    { href: "/cells/grievance", label: "Grievance Redressal Cell" },
    { href: "/cells/hei", label: "HEI Coordination Cell" },
  ],
  publication: [
    { href: "/cells/event", label: "Event Management Cell" },
    { href: "/cells/ipr", label: "IPR Cell" },
    { href: "/cells/rd", label: "R & D Cell" },
  ],
  rd: [
    { href: "/cells/publication", label: "Publications and Promotions Cell" },
    { href: "/cells/atl", label: "ATL Cell" },
    { href: "/cells/it", label: "IT Cell" },
  ],
  sports: [
    { href: "/cells/health", label: "Health Wisdom Cell" },
    { href: "/cells/event", label: "Event Management Cell" },
    { href: "/cells/olympiad", label: "Olympiad Cell" },
  ],
  spritual: [
    { href: "/cells/parenting", label: "Parenting Cell" },
    { href: "/cells/astrology", label: "Astrology Cell" },
    { href: "/cells/health", label: "Health Wisdom Cell" },
  ],
  super100: [
    { href: "/cells/olympiad", label: "Olympiad Cell" },
    { href: "/cells/foreign", label: "Foreign Language Cell" },
    { href: "/cells/hei", label: "HEI Coordination Cell" },
  ],
  tms: [
    { href: "/cells/premiumschool", label: "Premium School Cell" },
    { href: "/cells/grievance", label: "Grievance Redressal Cell" },
    { href: "/cells/hei", label: "HEI Coordination Cell" },
  ],
  udyam: [
    { href: "/cells/ecommerce", label: "E-Commerce Cell" },
    { href: "/cells/atl", label: "ATL Cell" },
    { href: "/cells/industry", label: "Industry Co-ordination Cell" },
  ],
};

const DEFAULT_RELATED_CELLS: CellEnrichmentLink[] = [
  { href: "/cells/rd", label: "R & D Cell" },
  { href: "/cells/event", label: "Event Management Cell" },
  { href: "/cells/publication", label: "Publications and Promotions Cell" },
];

const EVENT_ECOSYSTEM_SLUGS = new Set([
  "event",
  "rd",
  "atl",
  "publication",
  "hei",
  "olympiad",
  "super100",
]);

function cleanTitle(displayTitle: string): string {
  return displayTitle.trim().replace(/\s+/g, " ");
}

function cleanFootnote(footnote: string): string {
  return footnote.trim().replace(/^["']|["']$/g, "");
}

function getRelatedInitiatives(slug: string): CellEnrichmentLink[] {
  if (EVENT_ECOSYSTEM_SLUGS.has(slug)) {
    return [...RELATED_INITIATIVES_BASE, WORKSHOP_LINK];
  }
  return RELATED_INITIATIVES_BASE;
}

function getEntityClosingParagraph(
  cell: CellDefinition,
  title: string
): string {
  const related = RELATED_CELLS_BY_SLUG[cell.slug] ?? DEFAULT_RELATED_CELLS;
  const peerNames = related.map((r) => r.label).join(", ");
  return `Within DHE's interconnected areas—research, innovation, entrepreneurship, publications, events, community outreach, and academic quality—the ${title} relates to peer cells including ${peerNames}, as linked under Related DHE Initiatives on this page.`;
}

function buildAboutParagraphs(
  cell: CellDefinition,
  title: string,
  objective: string,
  footnote: string
): string[] {
  const obj = objective.trim();
  const note = cleanFootnote(footnote);
  const paragraphs: string[] = [
    `The ${title} is a national cell of the Department of Holistic Education (DHE). ${DHE_PLATFORM_LINE}`,
    obj,
    `Across Vidya Bharati schools and partner institutions, the ${title} carries out this mandate through school coordinators and programs announced on the notice board and events pages.`,
    `Guiding focus: ${note}. This supports holistic development alongside academic and vocational growth within DHE's national cell network.`,
  ];

  if (cell.slug === "event") {
    paragraphs.push(
      `National programs such as ${shikshaMahakumbh.title} illustrate how DHE convenes educators, institutions, and youth for collaborative reform. ${shikshaMahakumbh.paragraph1} ${shikshaMahakumbh.paragraph2}`,
      `Student and school participation in event-related initiatives is typically organized through coordinators when programs are announced on the notice board, upcoming events page, and past events archive. Visual documentation on this page reflects education-related gatherings coordinated through the Event Management Cell.`
    );
  } else if (cell.slug === "rd") {
    paragraphs.push(
      `The R & D Cell's focus on Edtech, AR/VR, AI, LMS, TMS, recycling initiatives, herbal gardens, and related school-based products connects research activity with innovation cells such as ATL and digital platforms coordinated through IT and LMS cells.`,
      `Schools engage with R & D themes when coordinators announce projects aligned with the cell objective. Updates appear through DHE's notice board, events pages, and membership channels rather than ad-hoc informal channels.`
    );
  } else if (["atl", "udyam", "ecommerce", "industry"].includes(cell.slug)) {
    paragraphs.push(
      `Innovation and entrepreneurship are interconnected themes across DHE: Atal Tinkering Labs, Udyam enterprise development, E-Commerce outreach for school products, and industry coordination for skillful education form a linked knowledge area within the cell network.`,
      `Students may encounter these themes through school laboratories, startup projects, and skill initiatives when schools participate in programs communicated through official DHE channels.`
    );
  } else if (["tms", "premiumschool"].includes(cell.slug)) {
    paragraphs.push(
      `Quality of teaching, administrative excellence, and premium school frameworks support institutional standards described across DHE's cell structure and leadership messages.`,
      `Educators and institutions engage through training, coordination, and policy-aligned initiatives announced nationally through DHE.`
    );
  } else if (["csr", "environment", "parenting", "grievance"].includes(cell.slug)) {
    paragraphs.push(
      `Community-facing cells strengthen trust, environmental stewardship, family–school collaboration, and grievance redressal research—supporting a secure and participatory educational environment for stakeholders.`,
      `Participation pathways run through school coordinators and institutional communication, with announcements on the DHE notice board and events pages when programs are open.`
    );
  } else if (["hei", "foreign", "super100", "olympiad"].includes(cell.slug)) {
    paragraphs.push(
      `Academic pathways, competitive examination preparation, olympiad platforms, foreign language skills, and higher-education coordination address learner progression beyond the school classroom.`,
      `Students access these pathways when their schools participate in cell-coordinated programs listed on DHE's official pages.`
    );
  } else {
    paragraphs.push(
      `Learners and educators engage when DHE publishes calls on the notice board, events pages, and the membership pathway on the contribute page.`
    );
  }

  paragraphs.push(getEntityClosingParagraph(cell, title));

  return paragraphs.filter((p) => p.length > 0);
}

function buildInstitutionalDevelopment(
  title: string,
  objective: string,
  footnote: string,
  slug: string
): string[] {
  const note = cleanFootnote(footnote);
  const obj = objective.trim();
  const themes: string[] = [];

  if (/student|school|learner|curriculum/i.test(obj)) {
    themes.push(
      `Student growth: ${note} Programs under the ${title} aim to extend this focus through school-level initiatives described in the cell mandate.`
    );
  }
  if (/research|r\s*&\s*d|quality|excellence|premium|tms|teaching/i.test(obj) || ["rd", "tms", "premiumschool", "grievance", "olympiad", "super100"].includes(slug)) {
    themes.push(
      `Academic quality and research environment: ${obj.split(".")[0]}. The cell contributes to DHE's national impact areas including research initiatives and leadership development referenced in institutional materials.`
    );
  }
  if (/innov|entrepreneur|startup|laborator|atal|udyam|ecommerce|industry/i.test(obj) || ["atl", "udyam", "ecommerce", "industry", "ipr"].includes(slug)) {
    themes.push(
      `Innovation culture: DHE's innovation and entrepreneurship ecosystem connects school laboratories, enterprise cells, IPR awareness, and industry coordination so students can develop ideas in structured settings.`
    );
  }
  if (/outreach|awareness|csr|environment|parenting|community|grievance|holistic/i.test(obj) || ["csr", "environment", "parenting", "grievance", "event"].includes(slug)) {
    themes.push(
      `Community engagement: Stakeholder trust, environmental stewardship, family–school partnership, and event convenings strengthen institutional relationships described in the cell objective and footnote.`
    );
  }

  if (themes.length < 2) {
    themes.push(
      `Institutional role: The ${title} connects schools to DHE's national cells, events, and membership pathways. ${note}`
    );
  }

  return themes.slice(0, 3);
}

function deriveActivityGroups(
  objective: string,
  slug: string,
  title: string
): CellActivityGroup[] {
  const text = objective.toLowerCase();
  const groups: CellActivityGroup[] = [];

  const addGroup = (heading: string, items: string[]) => {
    const filtered = items.filter((i) => i.length > 10);
    if (filtered.length > 0) groups.push({ heading, items: filtered });
  };

  addGroup("Core mandate", [objective.trim()]);

  const workshops: string[] = [];
  if (/training|teaching|staff|tms|capacity|workshop/i.test(text) || slug === "tms") {
    workshops.push("Capacity-building for teaching and non-teaching staff as described for the TMS Cell");
  }
  if (slug === "atl") {
    workshops.push("Operational support for Atal Tinkering Labs established under the Atal Innovation Mission");
  }
  if (EVENT_ECOSYSTEM_SLUGS.has(slug)) {
    workshops.push("Coordination of workshops and academic initiatives referenced on DHE past events and workshop pages");
  }
  addGroup("Workshops and training", workshops);

  const research: string[] = [];
  if (/research|r\s*&\s*d|edtech|ar\/vr|ai|ml|recycl/i.test(text) || slug === "rd") {
    research.push("School-based research and product development in areas named in the R & D Cell mandate (Edtech, AR/VR, AI, LMS, TMS, recycling, herbal gardens, and related themes)");
  }
  if (/grievance|health wisdom|integrates/i.test(text)) {
    research.push("Research-oriented work referenced in the cell objective (e.g. grievance redressal or health education integration)");
  }
  if (slug === "sports") {
    research.push("Research on sports horizons and integration of ancient games within comprehensive sports programs");
  }
  addGroup("Research initiatives", research);

  const publications: string[] = [];
  if (/publish|publication|promot|inclusive education/i.test(text) || slug === "publication") {
    publications.push("Publications and promotion of educational outcomes, inclusive learning, and academic achievements as stated for the Publications and Promotions Cell");
  }
  if (slug === "ipr") {
    publications.push("IPR awareness and culture-building activities aligned with the IPR Cell objective");
  }
  addGroup("Publications and promotion", publications);

  const outreach: string[] = [];
  if (/awareness|sensitiz|environment|csr|funding/i.test(text)) {
    outreach.push(objective.trim());
  }
  if (slug === "csr") {
    outreach.push("CSR-linked project coordination for school education initiatives");
  }
  if (slug === "environment") {
    outreach.push("Environmental awareness and conservation education activities with school communities");
  }
  addGroup("Outreach and community engagement", outreach);

  const students: string[] = [];
  if (/student|school|learner|holistic|parent/i.test(text)) {
    students.push("Student-facing programs coordinated through schools when announced by DHE");
  }
  if (slug === "parenting") {
    students.push("Programs bridging school and home for collaborative parent–educator efforts");
  }
  if (slug === "olympiad" || slug === "super100") {
    students.push("National and international test platforms and competitive examination preparation pathways described in cell objectives");
  }
  addGroup("Student engagement", students);

  const industry: string[] = [];
  if (/industry|company|partnership|coordination|hei|higher education/i.test(text)) {
    industry.push(objective.trim());
  }
  addGroup("Industry and institutional interaction", industry);

  const innovation: string[] = [];
  if (/innov|entrepreneur|startup|laborator|atal|udyam|ecommerce|skill/i.test(text)) {
    innovation.push(objective.trim());
  }
  if (slug === "art") {
    innovation.push("Arts-based skills and startup exploration within schools as described for the Art Sale Cell");
  }
  addGroup("Innovation and entrepreneurship support", innovation);

  const quality: string[] = [];
  if (/excellence|premium|quality|grievance|teaching/i.test(text) || ["tms", "premiumschool", "grievance"].includes(slug)) {
    quality.push(objective.trim());
  }
  addGroup("Academic quality initiatives", quality);

  return groups.filter((g) => g.items.length > 0).slice(0, 7);
}

function deriveStudentOpportunities(
  objective: string,
  slug: string,
  title: string
): string[] {
  const text = objective.toLowerCase();
  const items: string[] = [];

  const add = (line: string) => {
    if (!items.includes(line)) items.push(line);
  };

  add(
    `Participation pathways: Schools affiliated with Vidya Bharati engage with the ${title} when coordinators share calls through the DHE notice board and events pages.`
  );

  if (/event|conference|mahakumbh/i.test(text) || slug === "event") {
    add("Event coordination and volunteer involvement may arise during national DHE programs such as Shiksha Mahakumbh Abhiyan when schools are invited to participate");
  }
  if (/research|r\s*&\s*d|atal|laborator/i.test(text) || slug === "rd" || slug === "atl") {
    add("Research and innovation engagement through school ATL or R & D initiatives where schools offer structured projects");
  }
  if (/entrepreneur|startup|udyam|ecommerce|skill/i.test(text)) {
    add("Entrepreneurship exposure through school startup, skill, and product initiatives linked to Udyam and E-Commerce cells");
  }
  if (/olympiad|competitive|super100|foreign|language/i.test(text)) {
    add("Academic enrichment through olympiad platforms, Super 100 competitive exam preparation, or foreign language programs when announced");
  }
  if (/parent|home|family/i.test(text) || slug === "parenting") {
    add("Family engagement through parenting programs that connect educators and parents for holistic student development");
  }
  if (/sport|health|spiritual/i.test(text)) {
    add("Holistic development pathways in sports, health education, or spiritual curriculum integration as per cell mandate");
  }
  if (/teacher|staff|tms/i.test(text) || slug === "tms") {
    add("Professional development for teaching and non-teaching staff through TMS-led quality and recruitment initiatives");
  }

  add("Leadership exposure through school coordinator roles and DHE membership listed on the contribute page");
  add("Cell co-ordinators on the people page are the primary institutional contacts for school-level engagement");

  return items.slice(0, 7);
}

function getParticipationFaqAnswer(
  slug: string,
  title: string
): string {
  if (slug === "event") {
    return "Students participate through schools when national programs such as Shiksha Mahakumbh Abhiyan are announced; event coordination roles may be shared through coordinators when programs are open.";
  }
  if (["rd", "atl"].includes(slug)) {
    return "Students may join school ATL or R & D projects when schools offer them; coordinators announce opportunities through official DHE channels.";
  }
  if (["udyam", "ecommerce", "industry", "art"].includes(slug)) {
    return "Students engage through school startup, skill, arts, or industry-linked projects described in the cell objective when coordinators announce participation.";
  }
  if (["olympiad", "super100", "foreign"].includes(slug)) {
    return "Students access competitions, language programs, or exam preparation when schools participate in cell-coordinated initiatives announced by DHE.";
  }
  if (["parenting", "health", "sports", "spritual", "astrology"].includes(slug)) {
    return "Students and families engage through holistic programs announced by schools—health, sports, spiritual curriculum, parenting, or related initiatives per the cell mandate.";
  }
  return `Students participate through Vidya Bharati schools when coordinators announce ${title} programs. Pathways follow the objective above; timing and eligibility are communicated on the notice board and events pages.`;
}

function getAnnouncementsFaqAnswer(slug: string): string {
  const base =
    "Official announcements appear on the DHE notice board, upcoming events, and past events.";
  if (EVENT_ECOSYSTEM_SLUGS.has(slug)) {
    return `${base} Workshop listings are on the workshop archive. The Director's message and organizational structure pages provide additional institutional context.`;
  }
  return `${base} The Director's message and organizational structure pages provide additional institutional context.`;
}

function buildFaqs(
  cell: CellDefinition,
  title: string,
  objective: string,
  footnote: string
): CellEnrichmentContent["faqs"] {
  const related = RELATED_CELLS_BY_SLUG[cell.slug] ?? DEFAULT_RELATED_CELLS;
  const relatedLabels = related.map((r) => r.label).join(", ");
  const note = cleanFootnote(footnote);

  return [
    {
      question: `What is the purpose of the ${title}?`,
      answer: objective.trim(),
    },
    {
      question: `What activities does the ${title} conduct?`,
      answer: `Activities align with the cell mandate—${note}. Programs are announced through the DHE notice board, past and upcoming events pages, and institutional updates when open for participation.`,
    },
    {
      question: `How can students participate through the ${title}?`,
      answer: getParticipationFaqAnswer(cell.slug, title),
    },
    {
      question: `How does the ${title} support DHE objectives?`,
      answer: `The ${title} advances NEP 2020–aligned holistic education within DHE's platform for innovation, research, entrepreneurship, and value-based learning, alongside ${relatedLabels}.`,
    },
    {
      question: "Where are announcements and events published?",
      answer: getAnnouncementsFaqAnswer(cell.slug),
    },
    {
      question: "How can institutions contact DHE about this cell?",
      answer:
        "Use the contact page for inquiries, the contribute page for membership, and the people page for cell co-ordinator details.",
    },
  ];
}

/**
 * Builds enrichment from registry objective/footnote and shared DHE institutional copy.
 * Does not invent statistics, partnerships, funding, or outcomes beyond existing content.
 */
export function getCellEnrichment(cell: CellDefinition): CellEnrichmentContent {
  const primary = cell.blocks[0];
  const objective = primary?.objective ?? "";
  const footnote = primary?.footnote ?? "";
  const title = cleanTitle(cell.displayTitle);

  return {
    aboutParagraphs: buildAboutParagraphs(cell, title, objective, footnote),
    activityGroups: deriveActivityGroups(objective, cell.slug, title),
    studentOpportunities: deriveStudentOpportunities(objective, cell.slug, title),
    institutionalDevelopment: buildInstitutionalDevelopment(
      title,
      objective,
      footnote,
      cell.slug
    ),
    relatedInitiatives: getRelatedInitiatives(cell.slug),
    relatedCells: RELATED_CELLS_BY_SLUG[cell.slug] ?? DEFAULT_RELATED_CELLS,
    faqs: buildFaqs(cell, title, objective, footnote),
  };
}
