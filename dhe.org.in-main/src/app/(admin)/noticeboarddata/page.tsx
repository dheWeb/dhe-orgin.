"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

type NoticeRow = {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
};

async function adminFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(path, { ...init, credentials: "same-origin" });
}

const NoticeBoardAdmin: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<NoticeRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showManageEvents, setShowManageEvents] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadNoticeImage = async (
    file: File,
    onUrl: (url: string) => void
  ) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await adminFetch("/api/admin/upload", {
        method: "POST",
        body,
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
          published_at: string;
          image_path?: string;
        }) => ({
          id: n.id,
          title: n.title,
          date: n.published_at?.slice(0, 10) ?? "",
          imageUrl: n.image_path ?? undefined,
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

  const handleAddDocument = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          published_at: date ? new Date(date).toISOString() : new Date().toISOString(),
          image_path: imageUrl || null,
          status: "published",
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add notice");
      }
      setTitle("");
      setDate("");
      setImageUrl("");
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
          date: editDate,
          imageUrl: editImageUrl || null,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setEditEventId(null);
      setEditTitle("");
      setEditDate("");
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

  return (
    <motion.div
      className="text-primary border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl border-gray-100 bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-center text-sm text-gray-600 mb-4">
        Protected by site admin login. Add notices stored in Supabase.
      </p>

      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            setEditEventId(null);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition mx-2"
        >
          Add Notice
        </button>
        <button
          type="button"
          onClick={() => setShowManageEvents(!showManageEvents)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition mx-2"
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
            <label className="block text-lg font-medium mb-2" htmlFor="date">
              Date
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
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>Date: {event.date}</p>
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
                    setEditDate(event.date);
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
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
          />
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
    </motion.div>
  );
};

export default NoticeBoardAdmin;
