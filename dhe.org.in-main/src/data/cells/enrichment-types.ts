export type CellEnrichmentLink = {
  href: string;
  label: string;
};

export type CellFaq = {
  question: string;
  answer: string;
};

export type CellActivityGroup = {
  heading: string;
  items: string[];
};

export type CellEnrichmentContent = {
  aboutParagraphs: string[];
  activityGroups: CellActivityGroup[];
  studentOpportunities: string[];
  institutionalDevelopment: string[];
  relatedInitiatives: CellEnrichmentLink[];
  relatedCells: CellEnrichmentLink[];
  faqs: CellFaq[];
};
