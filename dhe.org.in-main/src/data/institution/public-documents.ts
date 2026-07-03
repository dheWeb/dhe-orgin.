/** Public PDFs served from /public/documents and /public/accounts */

export const publicDocuments = {
  trustDeed: {
    label: "VBITR Trust Deed",
    path: "/documents/trust-deed-vbitr.pdf",
  },
  dheEnglishOlympiad: {
    label: "DHE English Olympiad (inaugural edition)",
    path: "/documents/dhe-english-olympiad.pdf",
  },
  ideaOfEnterprisesWorkshop: {
    label: "From Idea to Enterprise — workshop brochure",
    path: "/documents/idea-of-enterprises-workshop.pdf",
  },
  entrepreneurshipWorkshopMay2024: {
    label: "Innovation & Entrepreneurship Workshop (May 2024)",
    path: "/documents/entrepreneurship-workshop-may-2024.pdf",
  },
} as const;
