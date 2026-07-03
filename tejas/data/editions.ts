import type { Edition } from "@/types";

export const editions: Edition[] = [
  {
    year: 2027,
    slug: "apj-abdul-kalam",
    name: "Dr APJ Abdul Kalam Edition",
    subtitle: "Igniting Young Minds",
    bio: "Honouring India's Missile Man — a visionary scientist, teacher, and President who inspired generations to dream big and serve the nation through science and innovation.",
    theme: "Dream. Discover. Deliver.",
    status: "current",
    imageAccent: "#E85D04",
  },
  {
    year: 2028,
    slug: "savitribai-phule",
    name: "Savitribai Phule Edition",
    subtitle: "Education for All",
    bio: "Celebrating India's first woman teacher and a pioneer of social reform who opened the doors of education to girls and marginalised communities.",
    theme: "Learn. Lead. Liberate.",
    status: "upcoming",
    imageAccent: "#059669",
  },
  {
    year: 2029,
    slug: "srinivasa-ramanujan",
    name: "Srinivasa Ramanujan Edition",
    subtitle: "The Spirit of Pure Mathematics",
    bio: "Honouring the mathematical genius whose intuitive brilliance continues to inspire problem-solvers and researchers worldwide.",
    theme: "Intuition. Insight. Infinity.",
    status: "upcoming",
    imageAccent: "#1E3A5F",
  },
  {
    year: 2030,
    slug: "kalpana-chawla",
    name: "Kalpana Chawla Edition",
    subtitle: "Reach for the Stars",
    bio: "Remembering India's daughter who reached for the cosmos — inspiring students in STEM, aerospace, and fearless exploration.",
    theme: "Aspire. Achieve. Ascend.",
    status: "upcoming",
    imageAccent: "#6366F1",
  },
  {
    year: 2031,
    slug: "rabindranath-tagore",
    name: "Rabindranath Tagore Edition",
    subtitle: "Where Mind is Without Fear",
    bio: "Celebrating the Nobel laureate poet, philosopher, and founder of Visva-Bharati — champion of holistic education and creative freedom.",
    theme: "Create. Connect. Contribute.",
    status: "upcoming",
    imageAccent: "#D4A017",
  },
];

export const previousEditions: Edition[] = [
  {
    year: 2026,
    slug: "cv-raman",
    name: "Sir CV Raman Edition",
    subtitle: "Light of Indian Science",
    bio: "The inaugural TEJAS edition honouring Nobel laureate Sir CV Raman and the spirit of scientific discovery.",
    theme: "Observe. Question. Illuminate.",
    status: "past",
    imageAccent: "#1E3A5F",
  },
  {
    year: 2025,
    slug: "pilot-edition",
    name: "Pilot Edition",
    subtitle: "Foundation Year",
    bio: "The pilot launch establishing TEJAS as India's national talent assessment platform under DHE.",
    theme: "Begin. Build. Belong.",
    status: "past",
    imageAccent: "#E85D04",
  },
];

export function getCurrentEdition() {
  return editions.find((e) => e.status === "current") ?? editions[0];
}
