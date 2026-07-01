/**
 * Institution record — trust, receipt headers, LMC letters, and official contact.
 * Used later for LMC section, donation/membership receipts, and 80G disclosures.
 *
 * Source documents: public/lmc/*.pdf, 12A/80G certificates, trust deed.
 * Last recorded: 2026-06-30
 */

/** Official contact — do not use 7627888222 */
export const dheOfficialContact = {
  phone: "7903431900",
  email: "director@dhe.org.in",
  website: "https://www.dhe.org.in",
  webLabel: "dhe.org.in",
} as const;

export const dheOfficeAddress = {
  line1: "E-7, Orchid Towers, Sector 125, Sunny Enclave",
  city: "SAS Nagar",
  state: "Punjab",
  pincode: "140301",
  /** Full single-line format for receipts */
  full: "E-7, Orchid Towers, Sector 125, Sunny Enclave, SAS Nagar, Punjab-140301",
} as const;

export const vbitrTrust = {
  legalName: "VIDYA BHARTI INSTITUTE OF TRAINING AND RESEARCH TRUST",
  shortName: "VBITR Trust",
  registrationNumber: "6401",
  registrationDate: "10-11-2023",
  pan: "AAETV1652K",
  /** Registered office per trust deed / 12A / 80G certificates */
  registeredOffice:
    "Lajjaram Tomar Bhawan, Gita Niketan Parisar, Salarpur Road, Kurukshetra-136118 (Haryana)",
  trustEmail: "vidyabhartiinstituteoftraining@gmail.com",
  trustPhone: "01744-259941",
  registration12A: {
    number: "AAETV1652KE20231",
    orderDate: "23-03-2024",
    validAssessmentYears: ["2024-25", "2025-26", "2026-27"] as const,
    documentPath: "/accounts/12a-vbitr-trust.pdf",
  },
  approval80G: {
    number: "AAETV1652KF20241",
    orderDate: "23-03-2024",
    validAssessmentYears: ["2024-25", "2025-26", "2026-27"] as const,
    documentPath: "/accounts/80g-vbitr-trust.pdf",
  },
} as const;

/**
 * Standard header for registration and donation receipts (PDF/print).
 * Logo asset: /logo.png or /dhe.png
 */
export const receiptHeader = {
  logoPath: "/logo.webp",
  registrationLine: `Regd. No. ${vbitrTrust.registrationNumber} Date: ${vbitrTrust.registrationDate}`,
  panLine: `PAN: ${vbitrTrust.pan}`,
  departmentTitle: "DEPARTMENT OF HOLISTIC EDUCATION",
  unitLine: "A UNIT OF",
  trustLine: vbitrTrust.legalName,
  addressLine: dheOfficeAddress.full,
  contactLine: `Web. ${dheOfficialContact.webLabel}, E-mail: ${dheOfficialContact.email}`,
  phoneLine: `Tel: ${dheOfficialContact.phone}`,
} as const;

export type ReceiptType = "registration" | "donation";

export const receiptTitles: Record<ReceiptType, string> = {
  registration: "Registration Receipt / पंजीकरण रसीद",
  donation: "Donation Receipt / दान रसीद",
};

/** LMC nomination letters on file (public PDFs) */
export const lmcDocuments = [
  {
    id: "letter-12",
    refNo: "VBITRT/12",
    date: "03-12-2025",
    title: "LMC nomination — Update 2 (current)",
    filename: "letter-12-lmc-update-2.pdf",
    path: "/lmc/letter-12-lmc-update-2.pdf",
    term: { from: "03.12.2025", to: "03.12.2028" },
    officeAddress:
      "E-7, Orchid Towers, Sector 125, Sunny Enclave, Kharar, Punjab-140301",
    isCurrent: true,
  },
  {
    id: "letter-04",
    refNo: "VBITRT/04",
    date: "07-12-2023",
    title: "LMC nomination — Department of Holistic Education",
    filename: "letter-04-lmc-dhe.pdf",
    path: "/lmc/letter-04-lmc-dhe.pdf",
    term: { from: "01.12.2023", to: "30.11.2026" },
    officeAddress: "Plot No.1, Sector-71, Mohali",
    isCurrent: false,
  },
  {
    id: "letter-455",
    refNo: "455",
    date: "28-08-2023",
    title: "LMC nomination — Mohali (E-10037)",
    filename: "letter-455-lmc-mohali.pdf",
    path: "/lmc/letter-455-lmc-mohali.pdf",
    term: { from: "01.10.2023", to: "31.08.2026" },
    officeAddress: "Plot No.1, Sec-71, Mohali",
    isCurrent: false,
  },
  {
    id: "letter-01",
    refNo: "VBITRT/01",
    date: "28-01-2025",
    title: "Coordinator appointment — Sonu Sharma (LMS Cell)",
    filename: "letter-01-dhe-sonu-sharma-coordinator.pdf",
    path: "/lmc/letter-01-dhe-sonu-sharma-coordinator.pdf",
    isCurrent: true,
    note: "Hindi letter appointing coordinator for DHE unit at Sector-71 Mohali",
  },
] as const;

export type LmcMember = {
  srNo?: number;
  name: string;
  designation: string;
  contact: string;
  address?: string;
  details?: string;
};

/** Current LMC per Letter No. 12 (03-12-2025) — for future /committee page sync */
export const lmcCurrentPatrons: LmcMember[] = [
  {
    name: "Sh. Mahavir Kaushik IAS (Retd.)",
    designation: "Patron",
    contact: "8968859000",
    address: "H.No. 1603, Sector-7C, Chandigarh",
  },
  {
    name: "Smt. Pratibha Gupta",
    designation: "Patron",
    contact: "9814738016",
    address: "#2144, Sector 35-C, Chandigarh",
    details: "Retd. Principal, Govt. College",
  },
];

export const lmcCurrentMembers: LmcMember[] = [
  {
    srNo: 1,
    name: "Smt. Sonu Agnihotri Sharma",
    designation: "President",
    contact: "9988690588",
    address: "Flat N. 2149, Jal Vayu Vihar, Sec-67 Mohali-160062, Punjab",
    details: "Instructor, Chinese language",
  },
  {
    srNo: 2,
    name: "Dr. Jatinder Garg",
    designation: "Vice President",
    contact: "9501956000",
    address:
      "#B-XI/933, Street No. 5, Katcha College Road, Barnala-148101 (Punjab)",
    details: "COE, Central University of Himachal Pradesh",
  },
  {
    srNo: 3,
    name: "Dr. Shamsher Singh",
    designation: "Manager",
    contact: "9463231250",
    address:
      "H.No. 34 Ram Nagar, Neer Nature Park Dalhousie Road, Pathankot 145001",
    details: "System Administrator, A.B. College, Pathankot",
  },
  {
    srNo: 4,
    name: "Sh. Chander Has Gupta",
    designation: "Organisation Representative",
    contact: "9417050631",
    address: "841, Sector 12 Rd, Budanpur, Panchkula, Haryana 134112",
    details: "Secretary, Vidya Bharti North Zone",
  },
  {
    srNo: 5,
    name: "Mrs. Meenu",
    designation: "Treasurer",
    contact: "9988207300",
    address: "Block A-1, 8, Jamuna Apartment, Kharar (Mohali)",
    details: "Retd. Principal, Vidya Bharti",
  },
  {
    srNo: 6,
    name: "Sh. Anil Kumar Jindal",
    designation: "Member",
    contact: "9896928917",
    address: "House No-1615 Sector-79, Mohali",
    details: "Businessman",
  },
  {
    srNo: 7,
    name: "Dr. Pooja Sharma",
    designation: "Member",
    contact: "7837907516",
    address: "T-210, Technology Block CSIR-CSIO, Sec-30C, Chandigarh",
    details: "Sr. Pr. Scientist, CSIR-CSIO",
  },
  {
    srNo: 8,
    name: "Aarti Sharma",
    designation: "Member",
    contact: "8527933391",
    address: "H.No.119, Sec.-11/A, Chandigarh",
    details: "Advocate",
  },
  {
    srNo: 9,
    name: "Shri Anil Sheoran",
    designation: "Member",
    contact: "9814405004",
    address: "House No. 846, Sector 25, Panchkula (HR) - 134109",
    details: "Software Businessman",
  },
  {
    srNo: 10,
    name: "Prof. (Dr.) Vishal Sharma",
    designation: "Member",
    contact: "9317782111",
    address: "H.No. T-II, 71, Sector-25, Panjab University, Chandigarh-160014",
    details: "Professor, Panjab University, Chandigarh",
  },
  {
    srNo: 11,
    name: "Dr. Jitesh Pandey",
    designation: "Member",
    contact: "9779622020",
    address: "H.No. 12-D, Shivalik Vihar Nayagaon Distt. SAS Nagar, Punjab",
    details: "Manager HR, PMIDC",
  },
  {
    srNo: 12,
    name: "Dr. Deepika Singh",
    designation: "Member",
    contact: "9419157568",
    address:
      "H.No. 15 Type V, NIPER Mohali, Sec-67, Phase 10, S.A.S. Nagar - 160062, Punjab",
    details: "Associate Professor, NIPER Mohali",
  },
  {
    srNo: 13,
    name: "Dr. Chaman Chandel",
    designation: "Member",
    contact: "8146000152",
    address: "H.No.-146A, Sector-42A Chandigarh",
    details: "Scientist F, Jt Director DRDO",
  },
  {
    srNo: 14,
    name: "Sh. Anurag Biala",
    designation: "Member",
    contact: "9814808323",
    address: "1247, Sector-90, Chandigarh",
    details: "Secretary, Chandigarh Vibhag, Vidya Bharti Punjab",
  },
];

/** Bank signatories per Letter 12: any two of President, Manager, Treasurer */
export const lmcBankSignatories = [
  "President",
  "Manager",
  "Treasurer",
] as const;

export function formatReceiptHeaderLines(): string[] {
  return [
    receiptHeader.registrationLine,
    receiptHeader.panLine,
    "",
    receiptHeader.departmentTitle,
    receiptHeader.unitLine,
    receiptHeader.trustLine,
    "",
    receiptHeader.addressLine,
    `${receiptHeader.contactLine}`,
    receiptHeader.phoneLine,
  ];
}
