export type CellSlide = {
  src: string;
  alt: string;
};

export type CellContentBlock = {
  title?: string;
  objective: string;
  footnote: string;
};

export type CellDefinition = {
  slug: string;
  /** Visible page heading (h2 or CellInfo title) */
  displayTitle: string;
  seoTitle: string;
  blocks: CellContentBlock[];
  slides: CellSlide[];
  /** art & event used centered slideshow layout */
  layoutVariant: "slideshow" | "simple";
};
