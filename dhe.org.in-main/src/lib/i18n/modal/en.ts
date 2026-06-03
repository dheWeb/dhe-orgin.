export type ModalMessages = {
  close: string;
  closeAriaLabel: string;
  backdropAriaLabel: string;
  homePromo: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    location: string;
    dateRange: string;
    from: string;
    visitWebsite: string;
    continue: string;
  };
};

export const modalMessagesEn: ModalMessages = {
  close: "Close",
  closeAriaLabel: "Close dialog",
  backdropAriaLabel: "Close dialog by clicking backdrop",
  homePromo: {
    badge: "National Educational Movement",
    title: "शिक्षा महाकुंभ अभियान",
    titleHighlight: "6th Edition",
    description: "Join the national educational movement at",
    location: "NIT Hamirpur",
    dateRange: "9th October to 11th October 2026",
    from: "from",
    visitWebsite: "Visit Website",
    continue: "Continue",
  },
};
