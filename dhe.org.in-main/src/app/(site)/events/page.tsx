import Link from "next/link";
import { getSiteContent } from "@/lib/cms/site-content";
import { parseUpcomingEvents } from "@/lib/cms/cms-parsers";
import { getPastEvents } from "@/lib/cms/past-events-content";

export const revalidate = 300;

export default async function EventsHubPage() {
  const content = await getSiteContent(["upcoming_events"]);
  const upcoming = parseUpcomingEvents(content.upcoming_events);
  const past = await getPastEvents();

  return (
    <div className="dhe-container py-10 max-w-3xl mx-auto space-y-12">
      <header className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
          Events
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          Upcoming and past programs of the Department of Holistic Education.
        </p>
        <p className="mt-2 text-sm">
          <Link href="/feed.xml" className="text-orange-700 hover:underline">
            RSS feed
          </Link>
        </p>
      </header>

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-600">No upcoming events listed.</p>
        ) : (
          <ul className="space-y-4">
            {upcoming.map((event) => (
              <li
                key={event.title}
                className="rounded-lg border border-gray-200 p-4 bg-white"
              >
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {event.date} · {event.venue}
                </p>
                {event.href && (
                  <Link
                    href={event.href}
                    className="inline-block mt-2 text-sm text-orange-700 hover:underline min-h-10"
                    {...(event.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {event.statusLabel ?? "Details"}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <h2 id="past-heading" className="text-xl font-semibold text-gray-900 mb-4">
          Past events
        </h2>
        <ul className="space-y-3">
          {past.map((event) => (
            <li key={`${event.title}-${event.date}`} className="text-sm">
              <strong>{event.title}</strong>
              <span className="text-gray-600">
                {" "}
                — {event.date}, {event.venue}
              </span>
              {event.link && (
                <>
                  {" "}
                  <Link href={event.link} className="text-orange-700 hover:underline">
                    Archive
                  </Link>
                </>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/pastevent" className="text-orange-700 hover:underline">
            Full past events page
          </Link>
        </p>
      </section>
    </div>
  );
}
