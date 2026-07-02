"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

type NoticeStatus = "draft" | "published" | "archived";

type NoticeRow = {
  id: string;
  title: string;
  body?: string;
  date: string;
  expiresAt?: string;
  imageUrl?: string;
  status: NoticeStatus;
  isPinned: boolean;
};

async function adminFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(path, { ...init, credentials: "same-origin" });
}

function toDateInput(iso?: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

const NoticeBoardAdmin: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [status, setStatus] = useState<NoticeStatus>("published");
  const [isPinned, setIsPinned] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<NoticeRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showManageEvents, setShowManageEvents] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editExpiresAt, setEditExpiresAt] = useState("");
  const [editStatus, setEditStatus] = useState<NoticeStatus>("published");
  const [editIsPinned, setEditIsPinned] = useState(false);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadNoticeImage = async (
    file: File,
    onUrl: (url: string) => void
  ) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await adminFetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      const data = await res.json();
      onUrl(data.url as string);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const fetchEvents = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/notices");
      if (!res.ok) throw new Error("Failed to load notices");
      const data = await res.json();
      const rows: NoticeRow[] = (data.notices ?? []).map(
        (n: {
          id: string;
          title: string;
          body?: string;
          published_at: string;
          expires_at?: string;
          image_path?: string;
          status?: NoticeStatus;
          is_pinned?: boolean;
        }) => ({
          id: n.id,
          title: n.title,
          body: n.body ?? "",
          date: toDateInput(n.published_at),
          expiresAt: toDateInput(n.expires_at),
          imageUrl: n.image_path ?? undefined,
          status: n.status ?? "published",
          isPinned: Boolean(n.is_pinned),
        })
      );
      setEvents(rows);
    } catch {
      toast.error("Error fetching notices.");
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const resetAddForm = () => {
    setTitle("");
    setBody("");
    setDate("");
    setExpiresAt("");
    setStatus("published");
    setIsPinned(false);
    setImageUrl("");
  };

  const handleAddDocument = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body: body || null,
          published_at: date ? new Date(date).toISOString() : new Date().toISOString(),
          expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
          image_path: imageUrl || null,
          status,
          is_pinned: isPinned,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add notice");
      }
      resetAddForm();
      setShowForm(false);
      await fetchEvents();
      toast.success("Notice added successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error adding notice."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async () => {
    if (!editEventId) return;
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/notices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editEventId,
          title: editTitle,
          body: editBody || null,
          date: editDate,
          expires_at: editExpiresAt ? new Date(editExpiresAt).toISOString() : null,
          imageUrl: editImageUrl || null,
          status: editStatus,
          is_pinned: editIsPinned,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditEventId(null);
      setEditTitle("");
      setEditBody("");
      setEditDate("");
      setEditExpiresAt("");
      setEditStatus("published");
      setEditIsPinned(false);
      setEditImageUrl("");
      setShowForm(false);
      await fetchEvents();
      toast.success("Notice updated successfully!");
    } catch {
      toast.error("Error updating notice.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const res = await adminFetch(`/api/admin/notices?id=${eventId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchEvents();
      toast.success("Notice deleted successfully!");
    } catch {
      toast.error("Error deleting notice.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) {
      toast.error("Please complete title and date.");
      return;
    }
    await handleAddDocument();
  };

  const statusBadge = (s: NoticeStatus) => {
    const colors: Record<NoticeStatus, string> = {
      draft: "bg-amber-100 text-amber-800",
      published: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-700",
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded ${colors[s]}`}>{s}</span>
    );
  };

  return (
    <div className="text-primary border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl border-gray-100 bg-slate-50">
      <p className="text-center text-sm text-gray-600 mb-4">
        Protected by site admin login. Add notices stored in Supabase.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            setEditEventId(null);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition"
        >
          Add Notice
        </button>
        <button
          type="button"
          onClick={() => setShowManageEvents(!showManageEvents)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition"
        >
          Manage Notices
        </button>
      </div>

      {showForm && !editEventId && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-center text-2xl font-medium">Add Notice</h2>
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="body">
              Body (optional)
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="date">
                Publish date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="expiresAt">
                Expires (optional)
              </label>
              <input
                type="date"
                id="expiresAt"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as NoticeStatus)}
                className="border rounded-lg p-2 w-full"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                />
                Pin to top
              </label>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="imageUrl">
              Image URL or path
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/notice/example.jpg or https://..."
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2 block w-full text-sm"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadNoticeImage(file, setImageUrl);
              }}
            />
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title ? `Preview for ${title}` : "Notice preview"}
                width={640}
                height={360}
                unoptimized
                className="mt-4 max-w-full h-auto"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Adding…" : "Add Notice"}
          </button>
        </form>
      )}

      {showManageEvents && (
        <div className="space-y-4 mt-6">
          {events.length === 0 && (
            <p className="text-center text-gray-500">No notices yet.</p>
          )}
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                {statusBadge(event.status)}
                {event.isPinned && (
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    pinned
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Published: {event.date}
                {event.expiresAt ? ` · Expires: ${event.expiresAt}` : ""}
              </p>
              {event.body && (
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                  {event.body}
                </p>
              )}
              {event.imageUrl && (
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={640}
                  height={360}
                  unoptimized
                  className="mt-4 max-w-full h-auto"
                />
              )}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditEventId(event.id);
                    setEditTitle(event.title);
                    setEditBody(event.body ?? "");
                    setEditDate(event.date);
                    setEditExpiresAt(event.expiresAt ?? "");
                    setEditStatus(event.status);
                    setEditIsPinned(event.isPinned);
                    setEditImageUrl(event.imageUrl || "");
                    setShowForm(true);
                    setShowManageEvents(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editEventId && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateEvent();
          }}
          className="space-y-4 mt-6"
        >
          <h2 className="text-center text-2xl font-medium">Edit Notice</h2>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="border rounded-lg p-2 w-full"
            required
          />
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            placeholder="Body (optional)"
            rows={4}
            className="border rounded-lg p-2 w-full"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="date"
              value={editExpiresAt}
              onChange={(e) => setEditExpiresAt(e.target.value)}
              placeholder="Expires"
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as NoticeStatus)}
              className="border rounded-lg p-2 w-full"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editIsPinned}
                onChange={(e) => setEditIsPinned(e.target.checked)}
              />
              Pin to top
            </label>
          </div>
          <input
            type="text"
            value={editImageUrl}
            onChange={(e) => setEditImageUrl(e.target.value)}
            placeholder="Image URL or path"
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadNoticeImage(file, setEditImageUrl);
            }}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Updating…" : "Update Notice"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NoticeBoardAdmin;
