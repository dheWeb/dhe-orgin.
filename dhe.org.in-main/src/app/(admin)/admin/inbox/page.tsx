"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type FeedbackRow = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  affiliation: string | null;
  event: string | null;
  experience: string | null;
  suggestions: string | null;
  created_at: string;
};

type ContactRow = {
  id: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminInboxPage() {
  const [tab, setTab] = useState<"feedback" | "contact">("feedback");
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [contact, setContact] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/inbox?limit=100", {
          credentials: "same-origin",
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load inbox");
        setFeedback(json.feedback ?? []);
        setContact(json.contact ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load failed");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="dhe-container py-10 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Form inbox</h1>
          <p className="text-sm text-gray-600 mt-1">
            Feedback and footer contact messages from dhe.org.in
          </p>
        </div>
        <Link href="/admin" className="text-sm text-orange-700 hover:underline min-h-11 inline-flex items-center">
          ← Admin hub
        </Link>
      </div>

      <div className="flex gap-2 mb-6" role="tablist" aria-label="Inbox categories">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "feedback"}
          onClick={() => setTab("feedback")}
          className={`px-4 py-2 rounded-md text-sm font-medium min-h-11 ${
            tab === "feedback"
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Feedback ({feedback.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "contact"}
          onClick={() => setTab("contact")}
          className={`px-4 py-2 rounded-md text-sm font-medium min-h-11 ${
            tab === "contact"
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Contact ({contact.length})
        </button>
      </div>

      {loading && <p className="text-sm text-gray-600">Loading…</p>}
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && tab === "feedback" && (
        <ul className="space-y-4" role="list">
          {feedback.length === 0 ? (
            <li className="text-sm text-gray-600">No feedback submissions yet.</li>
          ) : (
            feedback.map((row) => (
              <li key={row.id} className="rounded-lg border border-gray-200 p-4 bg-white">
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <strong>{row.name}</strong>
                  <time className="text-gray-500">{formatDate(row.created_at)}</time>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  <a href={`mailto:${row.email}`} className="text-orange-700 hover:underline">
                    {row.email}
                  </a>
                  {" · "}
                  <a href={`tel:${row.mobile}`} className="text-orange-700 hover:underline">
                    {row.mobile}
                  </a>
                </p>
                <p className="text-sm mt-2">
                  <span className="text-gray-500">Event:</span> {row.event}
                </p>
                {row.affiliation ? (
                  <p className="text-sm">
                    <span className="text-gray-500">Affiliation:</span> {row.affiliation}
                  </p>
                ) : null}
                {row.experience ? (
                  <p className="text-sm mt-2 text-gray-700">{row.experience}</p>
                ) : null}
                {row.suggestions ? (
                  <p className="text-sm mt-2 text-gray-700 italic">{row.suggestions}</p>
                ) : null}
              </li>
            ))
          )}
        </ul>
      )}

      {!loading && !error && tab === "contact" && (
        <ul className="space-y-4" role="list">
          {contact.length === 0 ? (
            <li className="text-sm text-gray-600">No contact messages yet.</li>
          ) : (
            contact.map((row) => (
              <li key={row.id} className="rounded-lg border border-gray-200 p-4 bg-white">
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <a href={`mailto:${row.email}`} className="font-semibold text-orange-700 hover:underline">
                    {row.email}
                  </a>
                  <time className="text-gray-500">{formatDate(row.created_at)}</time>
                </div>
                <p className="text-sm mt-2 text-gray-700 whitespace-pre-wrap">{row.message}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
