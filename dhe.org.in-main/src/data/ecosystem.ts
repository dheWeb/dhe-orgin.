/**
 * Canonical DHE ecosystem partners — shared by footer logo strip and homepage digital grid.
 * Keep URLs in sync across the site from this file only.
 */

export type EcosystemPartner = {
  id: string;
  name: string;
  href: string;
  image?: string;
  /** Monogram fallback when no dedicated logo asset */
  abbr?: string;
  color?: string;
  description?: string;
  /** Homepage digital grid icon key (HomeIcons) */
  icon?:
    | "digital"
    | "summit"
    | "travel"
    | "data"
    | "shop"
    | "career"
    | "events"
    | "journal";
  showOnHomeDigital?: boolean;
  showInFooter?: boolean;
};

export const dheEcosystemPartners: EcosystemPartner[] = [
  {
    id: "dhe",
    name: "dhe.org.in",
    href: "https://www.dhe.org.in",
    image: "/logo.webp",
    description: "National DHE portal — cells, programs, and institutional hub",
    icon: "digital",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "rase",
    name: "Shiksha Mahakumbh (RASE)",
    href: "https://www.rase.co.in",
    image: "/logos/rase.webp",
    description: "Flagship national summit — editions 1.0–6.0",
    icon: "summit",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "vidya-bharati",
    name: "Vidya Bharati",
    href: "https://vidyabharti.net",
    image: "/logos/vidyabharti.webp",
    abbr: "VB",
    color: "#ea580c",
    showInFooter: true,
  },
  {
    id: "tredul",
    name: "Tredul",
    href: "https://tredul.com",
    image: "/logos/tre-dul.webp",
    description: "Experiential learning & educational tourism platform",
    icon: "travel",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "sarvatra",
    name: "Sarvatra",
    href: "https://sarvatr.co.in",
    image: "/logos/sarvatr.webp",
    description: "Unified school resource & data management ecosystem",
    icon: "data",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "swadeshi",
    name: "Swadeshi Bazaar",
    href: "https://swadeshibazaar.in",
    image: "/logos/swadeshibazar.webp",
    description: "Empowering local entrepreneurship & innovation",
    icon: "shop",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "jobs360",
    name: "Jobs 360°",
    href: "https://jobs360.co.in",
    image: "/logos/job360.webp",
    description: "Career readiness & employment ecosystem",
    icon: "career",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "tudu",
    name: "TuDu",
    href: "https://tudu.app",
    image: "/Tudu.webp",
    description: "Integrated event & initiative management platform",
    icon: "events",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "pub",
    name: "pub.dhe.org.in",
    href: "https://pub.dhe.org.in",
    abbr: "PUB",
    color: "#be123c",
    description: "Viksit Bharat & Viksit India research journals",
    icon: "journal",
    showOnHomeDigital: true,
    showInFooter: true,
  },
  {
    id: "poojawala",
    name: "Poojawala",
    href: "https://poojawala.in",
    image: "/logos/poojawala.webp",
    showInFooter: true,
  },
  {
    id: "viksit-india",
    name: "Viksit India",
    href: "https://vi.rase.co.in",
    image: "/vi.webp",
    showInFooter: true,
  },
  {
    id: "super100",
    name: "Punjab Super 100",
    href: "https://punjabsuper100.com",
    image: "/logos/pb100.webp",
    showInFooter: true,
  },
  {
    id: "itr",
    name: "ITR Chandigarh",
    href: "https://www.itrchandigarh.org",
    abbr: "ITR",
    color: "#0369a1",
    showInFooter: true,
  },
];

export const footerEcosystemPartners = dheEcosystemPartners.filter((p) => p.showInFooter);

export const homeDigitalEcosystemPartners = dheEcosystemPartners.filter(
  (p) => p.showOnHomeDigital && p.icon && p.description
);
