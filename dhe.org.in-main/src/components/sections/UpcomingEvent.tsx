import React from "react";
import Link from "next/link";
import {
  DEFAULT_UPCOMING_EVENTS,
  type UpcomingEventRow,
} from "@/lib/cms/cms-parsers";

type EventStatus = "completed" | "planned" | "external";

type UpcomingRow = UpcomingEventRow & { status: EventStatus };

const stayConnectedLinks = [
  { href: "/noticeboard", label: "DHE Notice Board", description: "Latest official notices" },
  { href: "/pastevent", label: "Past Events", description: "Archive of DHE programs" },
  { href: "/contribute", label: "Join DHE — Membership", description: "Membership and engagement" },
  { href: "/contact", label: "Contact DHE", description: "Institutional inquiries" },
] as const;

const UpcomingEvent: React.FC<{ rows?: UpcomingEventRow[] }> = ({
  rows = DEFAULT_UPCOMING_EVENTS,
}) => {
  const upcomingRows: UpcomingRow[] = (rows.length ? rows : DEFAULT_UPCOMING_EVENTS) as UpcomingRow[];
  return (
    <div className="bg-white min-w-0 min-h-[70vh]">
      <div className="dhe-container py-6 sm:py-10 space-y-8">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
            Upcoming Events &amp; Programs
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Planned and archived programs associated with the Department of
            Holistic Education (DHE) and Shiksha Mahakumbh. Each row shows venue,
            dates where known, and status (planned, archived, or awaiting
            confirmation on the official event site).
          </p>
        </header>

        <section
          aria-labelledby="freshness-notice-heading"
          className="max-w-3xl mx-auto rounded-lg border border-blue-100 bg-blue-50/60 p-4 sm:p-5"
        >
          <h2
            id="freshness-notice-heading"
            className="text-lg font-semibold text-blue-900"
          >
            Event Listings &amp; Freshness
          </h2>
          <p className="mt-2 text-sm sm:text-base text-blue-950 leading-relaxed">
            This page combines forward-looking programs and retained listings
            that may refer to dates already announced or passed. Each row
            includes a status label. For historical programs, visit{" "}
            <Link
              href="/pastevent"
              className="font-semibold text-orange-800 hover:underline"
            >
              past events
            </Link>{" "}
            or the{" "}
            <Link
              href="/workshop"
              className="font-semibold text-orange-800 hover:underline"
            >
              workshop archive
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="upcoming-table-heading">
          <h2
            id="upcoming-table-heading"
            className="text-xl font-semibold text-primary-color text-center mb-4"
          >
            Program Listings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] table-auto">
              <thead>
                <tr className="bg-primary-color">
                  <th scope="col" className="px-2 py-2 border text-left text-white text-sm">
                    Status
                  </th>
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
                {upcomingRows.map((row) => (
                  <tr key={row.title}>
                    <td className="px-2 py-2 border text-left text-sm align-top">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          row.status === "completed"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                        aria-label={`Status: ${row.statusLabel}`}
                      >
                        {row.statusLabel}
                      </span>
                      {row.statusNote && (
                        <p className="mt-2 text-xs text-gray-600 leading-snug max-w-[140px]">
                          {row.statusNote}
                        </p>
                      )}
                    </td>
                    <td className="px-2 py-2 border text-left text-black text-sm align-top">
                      {row.title}
                    </td>
                    <td className="px-2 py-2 border text-left text-black text-sm align-top whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="px-2 py-2 border text-left text-black text-sm align-top">
                      {row.venue}
                    </td>
                    <td className="px-2 py-2 border text-left text-sm align-top">
                      {row.external ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-700 font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded min-h-11 inline-flex items-center"
                        >
                          Official site
                        </a>
                      ) : (
                        <Link
                          href={row.href}
                          className="text-orange-700 font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded min-h-11 inline-flex items-center"
                        >
                          View program details
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <nav
          className="max-w-3xl mx-auto flex flex-wrap gap-3 text-sm border-t border-gray-100 pt-6"
          aria-label="Related event pages"
        >
          <Link
            href="/pastevent"
            className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
          >
            Past Events
          </Link>
          <Link
            href="/workshop"
            className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
          >
            Workshop Archive
          </Link>
          <Link
            href="/messages"
            className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
          >
            Director&apos;s Message
          </Link>
        </nav>

        <section
          aria-labelledby="stay-connected-heading"
          className="max-w-3xl mx-auto pt-4"
        >
          <h2
            id="stay-connected-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Stay Connected
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            For the latest notices, inquiries, and membership information:
          </p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3" role="list">
            {stayConnectedLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-gray-200 p-4 hover:border-orange-400 min-h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  <span className="font-semibold text-orange-700">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs text-gray-600">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UpcomingEvent;
