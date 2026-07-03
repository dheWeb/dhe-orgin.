"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveNoticeImageUrl } from "@/services/notices/resolve-image-url";

type Event = {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
};

type NoticeBoardProps = {
  embedded?: boolean;
  initialNotices?: Event[];
  embeddedHeader?: {
    title: string;
    viewAllHref: string;
  };
};

const FALLBACK_NOTICE_IMAGE = "/logo.webp";

function NoticeImage({
  event,
  onOpen,
}: {
  event: Event;
  onOpen: (url: string) => void;
}) {
  const resolvedSrc = resolveNoticeImageUrl(event.imageUrl);
  const [imageSrc, setImageSrc] = useState(resolvedSrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImageSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <div className="relative w-1/3 shrink-0">
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10 rounded-md"
          aria-hidden
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600" />
        </div>
      )}
      <button
        type="button"
        className="block w-full text-left"
        onClick={() => onOpen(imageSrc)}
        aria-label={`View image for ${event.title}`}
      >
        <Image
          src={imageSrc}
          alt={event.title}
          width={160}
          height={120}
          sizes="120px"
          className="h-auto w-full object-cover rounded-md border border-gray-100"
          onLoad={() => setLoading(false)}
          onError={() => {
            setImageSrc(FALLBACK_NOTICE_IMAGE);
            setLoading(false);
          }}
        />
      </button>
    </div>
  );
}

function NoticeList({
  items,
  embedded,
  onImageOpen,
}: {
  items: Event[];
  embedded: boolean;
  onImageOpen: (url: string) => void;
}) {
  if (items.length === 0) {
    return <p className="text-xs text-gray-600 py-2">No notices available.</p>;
  }

  return (
    <ul className="divide-y divide-gray-100" role="list">
      {items.map((event) => (
        <li
          key={event.id}
          className={
            embedded
              ? "py-3 flex items-start gap-3"
              : "py-4 flex items-start gap-3 border-b border-gray-200 last:border-0"
          }
        >
          <div className="flex-grow min-w-0 pr-2">
            <p
              className={
                embedded
                  ? "text-sm font-medium text-gray-900 leading-snug line-clamp-3"
                  : "text-sm font-semibold text-gray-900 leading-snug"
              }
            >
              {event.title}
            </p>
            <time
              className="text-xs text-gray-600 mt-1 block"
              dateTime={event.date}
            >
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>
          <NoticeImage event={event} onOpen={onImageOpen} />
        </li>
      ))}
    </ul>
  );
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({
  embedded = false,
  initialNotices = [],
  embeddedHeader,
}) => {
  const [events, setEvents] = useState<Event[]>(initialNotices);
  const [loading, setLoading] = useState(initialNotices.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/notices");
      const data = await res.json();
      const eventsData: Event[] = (data.notices ?? []).map(
        (n: { id: string; title: string; date: string; imageUrl: string }) => ({
          id: n.id,
          title: n.title,
          date: n.date,
          imageUrl: n.imageUrl,
        })
      );
      setEvents(eventsData);
    } catch {
      setError("Error fetching notices. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialNotices.length > 0) return;
    fetchEvents();
  }, [fetchEvents, initialNotices.length]);

  const sorted = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentNotices = sorted.slice(0, 5);
  const pastNotices = sorted.slice(5);
  const visible = activeTab === "current" ? currentNotices : pastNotices.slice(0, 5);

  const refreshButton = (
    <button
      type="button"
      onClick={fetchEvents}
      className="text-sm text-orange-600 hover:text-orange-700 min-h-10 min-w-10 px-2"
      aria-label="Refresh notices"
    >
      ↻
    </button>
  );

  const inactiveTabClass = embedded ? "text-gray-500" : "text-gray-700";

  const tabs = (
    <div>
      <div
        className="flex border-b border-gray-200 mb-2"
        role="tablist"
        aria-label="Notice categories"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "current"}
          className={`px-3 py-2 text-sm font-medium min-h-10 ${
            activeTab === "current"
              ? "text-orange-600 border-b-2 border-orange-600"
              : inactiveTabClass
          }`}
          onClick={() => setActiveTab("current")}
        >
          {embedded ? "Current" : "Current Notices"}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "past"}
          className={`px-3 py-2 text-sm font-medium min-h-10 ${
            activeTab === "past"
              ? "text-orange-600 border-b-2 border-orange-600"
              : inactiveTabClass
          }`}
          onClick={() => setActiveTab("past")}
        >
          {embedded ? "Past" : "Past Notices"}
        </button>
      </div>

      <div
        role="tabpanel"
        className={`max-h-60 overflow-y-auto dhe-scroll-thin ${embedded ? "pr-1" : ""}`}
      >
        {loading ? (
          <div className="space-y-3 py-2" aria-busy="true">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse bg-gray-100 rounded" />
            ))}
          </div>
        ) : (
          <NoticeList
            items={visible}
            embedded={embedded}
            onImageOpen={setModalSrc}
          />
        )}
      </div>

      {!embedded && visible.length > 0 && (
        <div className="text-center mt-3">
          <Link
            href="/noticeboard"
            className="text-sm text-orange-600 hover:underline min-h-10 inline-flex items-center"
          >
            View full notice board
          </Link>
        </div>
      )}
    </div>
  );

  const modal =
    modalSrc &&
    (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Notice image preview"
        onClick={() => setModalSrc(null)}
        onKeyDown={(e) => e.key === "Escape" && setModalSrc(null)}
      >
        <div
          className="relative max-w-4xl w-full bg-white rounded-lg p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-2 right-2 z-10 bg-white rounded-full px-2 py-1 text-sm shadow min-h-10 min-w-10"
            onClick={() => setModalSrc(null)}
            aria-label="Close preview"
          >
            ✕
          </button>
          <Image
            src={modalSrc}
            alt="Notice preview"
            width={960}
            height={720}
            sizes="(max-width: 768px) 100vw, 80vw"
            className="w-full h-auto object-contain max-h-[80vh]"
            onError={() => setModalSrc(FALLBACK_NOTICE_IMAGE)}
          />
        </div>
      </div>
    );

  if (embedded) {
    return (
      <div className="min-w-0">
        {embeddedHeader ? (
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
            <h3 className="text-sm font-semibold text-gray-900 m-0">
              {embeddedHeader.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Link
                href={embeddedHeader.viewAllHref}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 min-h-10 inline-flex items-center px-2"
              >
                View all →
              </Link>
              {refreshButton}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end mb-1">{refreshButton}</div>
        )}
        {error && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 mb-2" role="alert">
            {error}
          </p>
        )}
        {tabs}
        {modal}
      </div>
    );
  }

  return (
    <div className="p-6 text-primary w-full">
      <div
        className="bg-white shadow-lg rounded-lg max-w-lg mx-auto"
        role="region"
        aria-label="Notice listings"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold m-0">Current and past notices</h2>
          {refreshButton}
        </div>
        {error && (
          <p className="m-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2" role="alert">
            {error}
          </p>
        )}
        <div className="p-4">{tabs}</div>
      </div>
      {modal}
    </div>
  );
};

export default NoticeBoard;
