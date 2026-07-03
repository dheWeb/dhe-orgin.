export type HomeSlide = {
  src: string;
  alt: string;
  legend?: string;
};

/** DHE-first order — SMK imagery after institutional & program slides */
export const homeSlides: HomeSlide[] = [
  {
    src: "/12.webp",
    alt: "Department of Holistic Education — national educational transformation platform",
    legend: "Education • Innovation • Leadership",
  },
  {
    src: "/R1.webp",
    alt: "DHE signed MoU with INST Mohali",
    legend: "Research & Institutional Partnerships",
  },
  {
    src: "/k3.webp",
    alt: "Educational leadership and innovation program",
    legend: "Leadership & Innovation",
  },
  {
    src: "/sm1.webp",
    alt: "Students and educators at a DHE program",
    legend: "Empowering Future Bharat",
  },
  {
    src: "/2024K/k1.webp",
    alt: "DHE holistic education initiative",
    legend: "Holistic Educational Transformation",
  },
  {
    src: "/sm2.webp",
    alt: "National educational ecosystem partners",
    legend: "Building Viksit Bharat",
  },
  {
    src: "/2024K/k6.webp",
    alt: "Invitation to Hon'ble President of Bharat for Shiksha Mahakumbh 2024",
    legend: "Shiksha Mahakumbh — national movement",
  },
  {
    src: "/2024K/up_cm.webp",
    alt: "Shiksha Mahakumbh team with Hon'ble Chief Minister of Uttar Pradesh",
    legend: "National collaboration",
  },
  {
    src: "/2024K/k4.webp",
    alt: "Shiksha Mahakumbh national educational dialogue",
    legend: "Flagship summit",
  },
];

/** Gallery preview indices — diverse DHE + SMK highlights for mosaic layout */
export const homeGalleryPreviewIndices = [0, 1, 2, 4, 5, 6] as const;
