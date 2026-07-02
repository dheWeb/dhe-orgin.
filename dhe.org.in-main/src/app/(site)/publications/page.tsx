import Link from "next/link";

const hubs = [
  {
    title: "Books",
    href: "/books",
    description: "DHE books and curated reading aligned with holistic education.",
  },
  {
    title: "Journals",
    href: "/journals",
    description: "Viksit India and allied journals from DHE programs.",
  },
  {
    title: "pub.dhe.org.in",
    href: "https://pub.dhe.org.in",
    description: "Official publications portal for proceedings and digital outputs.",
    external: true,
  },
  {
    title: "Shiksha Mahakumbh archives",
    href: "/pastevent",
    description: "Past conference materials and event archives.",
  },
  {
    title: "Notice Board",
    href: "/noticeboard",
    description: "Latest circulars and publication announcements.",
  },
] as const;

export default function PublicationsPage() {
  return (
    <div className="dhe-container py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
        Publications Hub
      </h1>
      <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
        Books, journals, proceedings, and knowledge outputs from the Department
        of Holistic Education and partner institutions.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
        {hubs.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="block h-full rounded-lg border border-gray-200 p-5 hover:border-orange-400 transition"
              {...("external" in item && item.external
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
