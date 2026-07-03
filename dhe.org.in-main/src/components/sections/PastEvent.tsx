import React from "react";
import Link from "next/link";
import type { PastEventRow } from "@/lib/cms/past-events-content";

const PastEvent: React.FC<{ events: PastEventRow[] }> = ({ events }) => {

  const relatedLinks = [
    { href: "/upcomingevent", label: "Upcoming Events" },
    { href: "/workshop", label: "Workshop Archive (May 2024)" },
    { href: "/messages", label: "Director's Message" },
    { href: "/structure", label: "Cells & Structure" },
  ] as const;

  return (
    <div className="bg-white min-w-0 min-h-[70vh]">
      <div className="dhe-container py-6 sm:py-10 space-y-8">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
            Past Events and Academic Initiatives
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Archive of workshops, conferences, and academic programs organized or
            supported by the Department of Holistic Education (DHE), with venues,
            dates, and official program links where available.
          </p>
        </header>

        <section
          aria-labelledby="event-journey-heading"
          className="max-w-3xl mx-auto"
        >
          <h2
            id="event-journey-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Our Event Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            The Department of Holistic Education (DHE) advances holistic learning,
            innovation, leadership, and educational transformation aligned with
            NEP 2020. Through national and regional programs, DHE brings together
            educators, institutions, researchers, and partners for workshops,
            conferences, research discussions, and capacity-building activities
            that strengthen school and higher-education ecosystems across Bharat.
          </p>
          <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            Initiatives such as Shiksha Mahakumbh and collaborative workshops
            with institutions including NITs, CSIR-CSIO, and training bodies
            reflect DHE&apos;s role as an action-oriented national platform under
            the Vidya Bharti educational movement.
          </p>
        </section>

        <section aria-labelledby="past-events-table-heading">
          <h2
            id="past-events-table-heading"
            className="text-xl font-semibold text-primary-color text-center mb-4"
          >
            Event Archive
          </h2>
          <div className="overflow-x-auto mb-2">
            <table className="w-full min-w-[640px] table-auto py-2">
              <caption className="sr-only">
                Archive of past DHE and Shiksha Mahakumbh events with dates, venues, and links
              </caption>
              <thead>
                <tr className="bg-primary-color">
                  <th scope="col" className="px-2 py-2 border text-left text-white text-sm">
                    Title
                  </th>
                  <th scope="col" className="px-2 py-2 border text-left text-white text-sm">
                    Date
                  </th>
                  <th scope="col" className="px-2 py-2 border text-left text-white text-sm">
                    Venue
                  </th>
                  <th scope="col" className="px-2 py-2 border text-left text-white text-sm">
                    More Information
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 border text-left text-black text-sm">
                      {event.title}
                    </td>
                    <td className="px-2 py-2 border text-left text-black text-sm whitespace-nowrap">
                      {event.date}
                    </td>
                    <td className="px-2 py-2 border text-left text-black text-sm">
                      {event.venue}
                    </td>
                    <td className="px-2 py-2 border text-left text-black text-sm">
                      <Link
                        href={event.link}
                        className="text-orange-700 font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded min-h-11 inline-flex items-center"
                      >
                        View event program
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          aria-labelledby="why-events-heading"
          className="max-w-3xl mx-auto"
        >
          <h2
            id="why-events-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Why These Events Matter
          </h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed" role="list">
            <li>
              Academic collaboration among educators, institutions, and partners.
            </li>
            <li>
              Knowledge exchange on holistic education, innovation, and reform.
            </li>
            <li>
              Educational innovation through workshops, conferences, and forums.
            </li>
            <li>
              Research dialogue that connects practice with national educational vision.
            </li>
            <li>
              Capacity development for teachers, coordinators, and learners.
            </li>
            <li>
              Archived listings preserve historical reference for partners and participants.
            </li>
          </ul>
        </section>

        <nav
          className="max-w-3xl mx-auto pt-4 border-t border-gray-200"
          aria-label="Related event and institutional pages"
        >
          <h2 className="text-lg font-semibold text-primary-color mb-3">
            Explore Further
          </h2>
          <ul className="flex flex-wrap gap-3 text-sm" role="list">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-orange-700 hover:underline min-h-11 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contribute"
                className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
              >
                Join DHE — Membership
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
              >
                Contact DHE
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PastEvent;
