import ParticipationPathways from "@/components/sections/ParticipationPathways";
import NoticeBoard from "@/components/notices/NoticeBoard";
import { fetchPublishedNotices } from "@/services/notices/fetch-notices";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("noticeboard");

export const revalidate = 300;

export default async function NoticeboardPage() {
  const initialNotices = await fetchPublishedNotices();

  return (
    <div className="dhe-container py-6 sm:py-10 space-y-10 max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color text-center">
          DHE Notice Board
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 text-center leading-relaxed max-w-xl mx-auto">
          Official notices from the Department of Holistic Education (DHE). Current
          and past listings are published here when available.
        </p>
      </header>

      <noscript>
        <section aria-label="Notices list">
          <ul className="divide-y divide-gray-200">
            {initialNotices.map((notice) => (
              <li key={notice.id} className="py-3">
                <p className="font-medium text-gray-900">{notice.title}</p>
                <time dateTime={notice.date} className="text-sm text-gray-600">
                  {new Date(notice.date).toLocaleDateString("en-IN")}
                </time>
              </li>
            ))}
          </ul>
        </section>
      </noscript>

      <NoticeBoard initialNotices={initialNotices} />
      <ParticipationPathways
        variant="compact"
        className="border-t border-gray-200 pt-8"
      />
    </div>
  );
}
