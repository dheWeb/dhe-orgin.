import { vbitrTrust } from "@/data/institution";

export const transparencyTrustCards = [
  {
    title: "80G approval certificate",
    description: `Certificate No. ${vbitrTrust.approval80G.number} — AY ${vbitrTrust.approval80G.validAssessmentYears.join(", ")}`,
    href: vbitrTrust.approval80G.documentPath,
    stat: "PDF",
    external: true,
  },
  {
    title: "12A registration",
    description: "VBITR Trust registration under Section 12A",
    href: vbitrTrust.registration12A.documentPath,
    stat: "PDF",
    external: true,
  },
  {
    title: "VBITR Trust Deed",
    description: `Registered ${vbitrTrust.registrationDate}`,
    href: vbitrTrust.trustDeed.documentPath,
    stat: "PDF",
    external: true,
  },
  {
    title: "Bank & UPI details",
    description: "Official account information for donations",
    href: "/accountdetails",
    stat: "Accounts",
  },
] as const;

export const transparencyProgramCards = [
  {
    title: "DHE English Olympiad",
    description: "Inaugural edition brochure — 10,040+ students",
    href: "/documents/dhe-english-olympiad.pdf",
    stat: "PDF",
    external: true,
  },
  {
    title: "Idea to Enterprise",
    description: "IPR & entrepreneurship workshop brochure",
    href: "/documents/idea-of-enterprises-workshop.pdf",
    stat: "PDF",
    external: true,
  },
  {
    title: "Entrepreneurship Workshop",
    description: "Innovation workshop — May 2024",
    href: "/documents/entrepreneurship-workshop-may-2024.pdf",
    stat: "PDF",
    external: true,
  },
] as const;

export const transparencyPolicyCards = [
  {
    title: "Refund & cancellation",
    description: "Donation and program refund policy",
    href: "/refund-policy",
  },
  {
    title: "Privacy policy",
    description: "Data handling and third-party services",
    href: "/privacy-policy",
  },
  {
    title: "Verify donation receipt",
    description: "Check receipt number and donor details",
    href: "/receipt/verify",
  },
  {
    title: "Donate with 80G",
    description: "Razorpay donations to VBITR Trust",
    href: "/donation",
  },
] as const;
