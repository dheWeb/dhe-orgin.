"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

type ContentItem = {
  key: string;
  label: string;
  value: Record<string, string>;
  updated_at?: string;
};

async function adminFetch(path: string, init?: RequestInit) {
  return fetch(path, { ...init, credentials: "same-origin" });
}

export default function CmsAdminPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/cms");
      if (!res.ok) throw new Error("Failed to load CMS");
      const data = await res.json();
      setItems(
        (data.items ?? []).map((row: ContentItem) => ({
          ...row,
          value: (row.value ?? {}) as Record<string, string>,
        }))
      );
    } catch {
      toast.error("Could not load site content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateField = (key: string, field: string, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, value: { ...item.value, [field]: value } }
          : item
      )
    );
  };

  const saveItem = async (item: ContentItem) => {
    setSavingKey(item.key);
    try {
      const res = await adminFetch("/api/admin/cms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: item.key, value: item.value }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      toast.success(`Saved ${item.label}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="dhe-container py-10 max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Admin hub
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">Site content (CMS)</h1>
      <p className="text-sm text-gray-600 mb-8">
        Edit public-facing snippets. Changes appear via <code>/api/content</code>.
      </p>

      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : (
        <ul className="space-y-6">
          {items.map((item) => (
            <li
              key={item.key}
              className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
            >
              <h2 className="font-medium text-gray-900">{item.label}</h2>
              <p className="text-xs text-gray-500">Key: {item.key}</p>
              {Object.entries(item.value).map(([field, val]) => (
                <label key={field} className="block text-sm">
                  <span className="text-gray-700 capitalize">{field}</span>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                    value={val}
                    onChange={(e) => updateField(item.key, field, e.target.value)}
                  />
                </label>
              ))}
              <button
                type="button"
                onClick={() => saveItem(item)}
                disabled={savingKey === item.key}
                className="bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded disabled:opacity-50"
              >
                {savingKey === item.key ? "Saving…" : "Save"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
