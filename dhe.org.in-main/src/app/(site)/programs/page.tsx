import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("programs");

const programs = [
  {
    title: "Shiksha Mahakumbh",
    href: "/upcomingevent",
    description: "National holistic education gatherings and Shiksha Mahakumbh editions.",
  },
  {
    title: "Workshops & Training",
    href: "/workshop",
    description: "Faculty development, institutional workshops, and registration.",
  },
  {
    title: "Residential Camps",
    href: "/residentialcamps",
    description: "Immersive camps for students and educators.",
  },
  {
    title: "Membership",
    href: "/contribute",
    description: "Join DHE as a member and contribute to national programs.",
  },
  {
    title: "Research & Innovation Cell",
    href: "/cells/research",
    description: "Research-led initiatives aligned with NEP 2020.",
  },
  {
    title: "Publications",
    href: "https://pub.dhe.org.in",
    description: "Journals, proceedings, and knowledge outputs.",
  },
] as const;

export default function ProgramsPage() {
  return (
    <div className="dhe-container py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
        DHE Programs
      </h1>
      <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
        Flagship programs and cells advancing holistic education across Bharat.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
        {programs.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="block h-full rounded-lg border border-gray-200 p-5 hover:border-orange-400 transition"
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="font-semibold text-gray-900">{item.title}</span>
              <span className="mt-2 block text-sm text-gray-600">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
