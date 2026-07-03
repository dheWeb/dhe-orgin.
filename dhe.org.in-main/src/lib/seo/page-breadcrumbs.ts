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
  donation: [
    { name: "Home", path: "/" },
    { name: "Donation", path: "/donation" },
  ],
  leadership: [
    { name: "Home", path: "/" },
    { name: "Leadership & LMC", path: "/leadership" },
  ],
  transparency: [
    { name: "Home", path: "/" },
    { name: "Transparency", path: "/transparency" },
  ],
  publications: [
    { name: "Home", path: "/" },
    { name: "Publications", path: "/publications" },
  ],
  programs: [
    { name: "Home", path: "/" },
    { name: "DHE Programs", path: "/programs" },
  ],
  events: [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ],
  feedback: [
    { name: "Home", path: "/" },
    { name: "Feedback", path: "/feedback" },
  ],
  books: [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
  ],
  journals: [
    { name: "Home", path: "/" },
    { name: "Journals", path: "/journals" },
  ],
  privacyPolicy: [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ],
  terms: [
    { name: "Home", path: "/" },
    { name: "Terms of Use", path: "/terms" },
  ],
  accessibility: [
    { name: "Home", path: "/" },
    { name: "Accessibility", path: "/accessibility" },
  ],
  refundPolicy: [
    { name: "Home", path: "/" },
    { name: "Refund Policy", path: "/refund-policy" },
  ],
  advisory: [
    { name: "Home", path: "/" },
    { name: "Advisory Council", path: "/advisory" },
  ],
  noticeboard: [
    { name: "Home", path: "/" },
    { name: "Notice Board", path: "/noticeboard" },
  ],
  hindi: [
    { name: "Home", path: "/" },
    { name: "हिंदी", path: "/hi" },
  ],
  search: [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
  ],
  receiptVerify: [
    { name: "Home", path: "/" },
    { name: "Verify Donation Receipt", path: "/receipt/verify" },
  ],
  accountdetails: [
    { name: "Home", path: "/" },
    { name: "Account Details", path: "/accountdetails" },
  ],
  residentialcamps: [
    { name: "Home", path: "/" },
    { name: "Residential Camps", path: "/residentialcamps" },
  ],
  logos: [
    { name: "Home", path: "/" },
    { name: "Media & Logos", path: "/logos" },
  ],
} as const;

export type PageBreadcrumbKey = keyof typeof PAGE_BREADCRUMB_TRAILS;
