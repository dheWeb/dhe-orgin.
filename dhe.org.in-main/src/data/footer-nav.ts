/** Footer navigation columns — aligned with homepage closing CTA paths */

export type FooterNavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type FooterNavColumn = {
  title: string;
  links: FooterNavLink[];
};

export const footerNavColumns: FooterNavColumn[] = [
  {
    title: "Programs",
    links: [
      { href: "/programs", label: "All programs" },
      { href: "/programs/shiksha-mahakumbh", label: "Shiksha Mahakumbh" },
      { href: "/programs/dhe-olympiads", label: "DHE Olympiads" },
      { href: "/programs/super-100", label: "Punjab Super 100" },
      { href: "/workshop", label: "Workshops" },
      { href: "/upcomingevent", label: "Upcoming events" },
    ],
  },
  {
    title: "Institution",
    links: [
      { href: "/structure", label: "Cells & structure" },
      { href: "/leadership", label: "Leadership & LMC" },
      { href: "/messages", label: "Director's message" },
      { href: "/publications", label: "Publications" },
      { href: "/people", label: "Cell co-ordinators" },
      { href: "/advisory", label: "Advisory council" },
    ],
  },
  {
    title: "Trust & legal",
    links: [
      { href: "/transparency", label: "Transparency" },
      { href: "/donation", label: "Donate (80G)" },
      { href: "/documents/trust-deed-vbitr.pdf", label: "Trust deed (PDF)", external: true },
      { href: "/accounts/80g-vbitr-trust.pdf", label: "80G certificate (PDF)", external: true },
      { href: "/receipt/verify", label: "Verify receipt" },
      { href: "/accountdetails", label: "Bank & UPI details" },
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms" },
      { href: "/refund-policy", label: "Refund policy" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "/contribute", label: "Join DHE — membership" },
      { href: "/contact", label: "Contact DHE" },
      { href: "/feedback", label: "Feedback" },
      { href: "/noticeboard", label: "Notice board" },
      { href: "/hi", label: "हिंदी" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];
