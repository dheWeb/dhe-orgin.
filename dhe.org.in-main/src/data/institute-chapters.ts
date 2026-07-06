export type InstituteChapter = {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  description: string;
};

export const INSTITUTE_CHAPTERS: Record<string, InstituteChapter> = {
  nitsri: {
    slug: "nitsri",
    name: "NIT Srinagar",
    shortName: "NIT Srinagar",
    location: "Jammu & Kashmir",
    description:
      "DHE chapter at the National Institute of Technology, Srinagar — advancing holistic education and Viksit Bharat initiatives in the Kashmir region.",
  },
  nitkkr: {
    slug: "nitkkr",
    name: "NIT Kurukshetra",
    shortName: "NIT Kurukshetra",
    location: "Haryana",
    description:
      "DHE chapter at NIT Kurukshetra — connecting academic excellence with Bharatiya values and national education transformation.",
  },
  nitj: {
    slug: "nitj",
    name: "NIT Jalandhar",
    shortName: "NIT Jalandhar",
    location: "Punjab",
    description:
      "DHE chapter at Dr. B. R. Ambedkar National Institute of Technology, Jalandhar — fostering innovation in holistic education.",
  },
  iitrpr: {
    slug: "iitrpr",
    name: "IIT Ropar",
    shortName: "IIT Ropar",
    location: "Punjab",
    description:
      "DHE chapter at the Indian Institute of Technology Ropar — integrating research-driven education with national holistic education goals.",
  },
};

export function getInstituteChapter(slug: string): InstituteChapter | undefined {
  return INSTITUTE_CHAPTERS[slug];
}
