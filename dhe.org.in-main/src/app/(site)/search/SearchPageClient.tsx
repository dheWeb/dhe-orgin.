"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buildSiteSearchIndex } from "@/lib/search/site-search-index";

const SEARCH_INDEX = buildSiteSearchIndex();

export default function SearchPageClient() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_INDEX.slice(0, 32);
    return SEARCH_INDEX.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.path.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="dhe-container py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary-color mb-2">Search</h1>
      <p className="text-sm text-gray-600 mb-6">
        Search pages, programs, and cells on dhe.org.in. For notices, see the{" "}
        <Link href="/noticeboard" className="text-orange-700 underline">
          notice board
        </Link>
        .
      </p>
      <label htmlFor="site-search" className="sr-only">
        Search site
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Programs, cells, donation, leadership…"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-11 text-gray-900"
        autoComplete="off"
      />
      <p className="mt-2 text-xs text-gray-500" aria-live="polite">
        {query.trim()
          ? `${results.length} result${results.length === 1 ? "" : "s"}`
          : `Browsing ${SEARCH_INDEX.length} indexed entries`}
      </p>
      <ul className="mt-6 space-y-3" role="list">
        {results.map((page) => (
          <li key={page.path}>
            <Link
              href={page.path}
              className="block rounded-md border border-gray-100 p-3 hover:border-orange-300"
            >
              <span className="font-medium text-gray-900">{page.title}</span>
              <span className="block text-xs text-gray-600 mt-0.5">{page.path}</span>
              <span className="block text-sm text-gray-700 mt-1 line-clamp-2">
                {page.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {query && results.length === 0 && (
        <p className="mt-6 text-gray-700">No pages matched your search.</p>
      )}
    </div>
  );
}
