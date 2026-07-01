/** Breadcrumb labels and paths for JSON-LD (must match page titles where applicable). */
export const PAGE_BREADCRUMB_TRAILS = {
  messages: [
    { name: "Home", path: "/" },
    { name: "Director's Message", path: "/messages" },
  ],
  structure: [
    { name: "Home", path: "/" },
    { name: "Cells & Organizational Structure", path: "/structure" },
  ],
  pastevent: [
    { name: "Home", path: "/" },
    { name: "Past Events and Academic Initiatives", path: "/pastevent" },
  ],
  upcomingevent: [
    { name: "Home", path: "/" },
    { name: "Upcoming Events", path: "/upcomingevent" },
  ],
  workshop: [
    { name: "Home", path: "/" },
    { name: "Workshop Archive", path: "/workshop" },
  ],
  contribute: [
    { name: "Home", path: "/" },
    { name: "Join DHE — Membership", path: "/contribute" },
  ],
  contact: [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact" },
  ],
  people: [
    { name: "Home", path: "/" },
    { name: "Cell Co-ordinators", path: "/people" },
  ],
} as const;

export type PageBreadcrumbKey = keyof typeof PAGE_BREADCRUMB_TRAILS;
