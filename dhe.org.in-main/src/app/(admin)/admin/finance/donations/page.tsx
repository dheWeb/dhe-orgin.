"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type DonationRow = {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  donor_phone: string | null;
  amount_paise: number;
  receipt_number: string | null;
  razorpay_payment_id: string;
  pan: string | null;
  status: string;
  created_at: string;
};

function formatInr(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(paise / 100);
}

function escapeCsv(val: string) {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export default function AdminDonationsPage() {
  const [rows, setRows] = useState<DonationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [resendingId, setResendingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/donations?limit=200", {
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Could not load donations.");
        return;
      }
      const data = (await res.json()) as {
        donations: DonationRow[];
        total: number;
      };
      setRows(data.donations ?? []);
      setTotal(data.total ?? 0);
    } catch {
      toast.error("Could not load donations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const exportCsv = async () => {
    try {
      const res = await fetch("/api/admin/donations?export=all", {
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Export failed.");
        return;
      }
      const data = (await res.json()) as { donations: DonationRow[] };
      const header =
        "Date,Donor,Email,Phone,Amount INR,Receipt,Payment ID,PAN,Status";
      const lines = (data.donations ?? []).map((r) =>
        [
          r.created_at,
          escapeCsv(r.donor_name ?? ""),
          escapeCsv(r.donor_email ?? ""),
          escapeCsv(r.donor_phone ?? ""),
          (r.amount_paise / 100).toFixed(2),
          escapeCsv(r.receipt_number ?? ""),
          escapeCsv(r.razorpay_payment_id),
          escapeCsv(r.pan ?? ""),
          r.status,
        ].join(",")
      );
      const blob = new Blob([[header, ...lines].join("\n")], {
        type: "text/csv;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dhe-donations-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Export failed.");
    }
  };

  const resendReceipt = async (id: string) => {
    setResendingId(id);
    try {
      const res = await fetch(`/api/admin/donations/${id}/receipt`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(body.error ?? "Could not resend receipt.");
        return;
      }
      toast.success("Receipt email sent.");
    } catch {
      toast.error("Could not resend receipt.");
    } finally {
      setResendingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-sm text-gray-600 mt-1">
            Razorpay donations with receipt numbers ({total} total)
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void exportCsv()}
            className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-600">No donations recorded yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Donor</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Receipt</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {new Date(row.created_at).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">{row.donor_name ?? "—"}</td>
                  <td className="px-4 py-3">{row.donor_email ?? "—"}</td>
                  <td className="px-4 py-3 font-medium">
                    {formatInr(row.amount_paise)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {row.receipt_number ?? "—"}
                  </td>
                  <td className="px-4 py-3">{row.status}</td>
                  <td className="px-4 py-3">
                    {row.donor_email ? (
                      <button
                        type="button"
                        disabled={resendingId === row.id}
                        onClick={() => void resendReceipt(row.id)}
                        className="text-orange-700 hover:underline disabled:opacity-50 text-xs font-medium"
                      >
                        {resendingId === row.id ? "Sending…" : "Resend receipt"}
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
