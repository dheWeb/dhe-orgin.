import { siteConfig } from "@/lib/seo/site-metadata";
import { fetchPublishedNotices } from "@/services/notices/fetch-notices";
import { getSiteContent } from "@/lib/cms/site-content";
import { parseUpcomingEvents } from "@/lib/cms/cms-parsers";

export const revalidate = 300;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toRfc822(date: string): string {
  return new Date(date).toUTCString();
}

export async function GET() {
  const [notices, content] = await Promise.all([
    fetchPublishedNotices(25),
    getSiteContent(["upcoming_events"]),
  ]);
  const events = parseUpcomingEvents(content.upcoming_events);

  const noticeItems = notices.map((notice) => {
    const link = `${siteConfig.url}/noticeboard?highlight=${encodeURIComponent(notice.id)}`;
    return `
    <item>
      <title>${escapeXml(notice.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${escapeXml(notice.id)}</guid>
      <pubDate>${toRfc822(notice.date)}</pubDate>
      <description>${escapeXml(notice.title)}</description>
      <category>notice</category>
    </item>`;
  });

  const eventItems = events.map((event) => {
    const link = event.external
      ? event.href
      : `${siteConfig.url}${event.href.startsWith("/") ? event.href : `/${event.href}`}`;
    return `
    <item>
      <title>${escapeXml(event.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(`event-${event.title}`)}</guid>
      <description>${escapeXml(`${event.date} — ${event.venue} (${event.statusLabel})`)}</description>
      <category>event</category>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Notices &amp; Events</title>
    <link>${siteConfig.url}</link>
    <description>Official notices and upcoming events from the Department of Holistic Education (DHE).</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${noticeItems.join("\n")}
    ${eventItems.join("\n")}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
