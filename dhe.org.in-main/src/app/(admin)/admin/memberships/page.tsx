"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { downloadRowsAsCsv } from "@/lib/export/download-csv";
import toast from "react-hot-toast";

type MembershipRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  membership_category: string;
  membership_type: string;
  fee_amount_paise: number | null;
  payment_status: string;
  created_at: string;
};

export default function MembershipAdminPage() {
  const [rows, setRows] = useState<MembershipRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/memberships?limit=500", {
          credentials: "same-origin",
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        setRows(json.applications ?? []);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Load failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const exportCsv = () => {
    downloadRowsAsCsv(
      rows.map((r, i) => ({
        "Sr. No.": i + 1,
        Name: r.name,
        Email: r.email,
        Phone: r.phone,
        Address: r.address ?? "",
        Category: r.membership_category,
        Type: r.membership_type,
        "Fee (INR)": r.fee_amount_paise ? r.fee_amount_paise / 100 : "",
        "Payment status": r.payment_status,
        "Applied at": r.created_at,
      })),
      "membership_applications.csv"
    );
  };

  return (
    <div className="dhe-container py-8 max-w-5xl mx-auto">
      <p className="text-sm mb-4">
        <Link href="/admin" className="text-orange-700 underline">
          ← Admin hub
        </Link>
      </p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Membership applications
      </h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <caption className="sr-only">
                DHE membership applications with payment status
              </caption>
              <thead>
                <tr className="bg-primary text-white">
                  <th scope="col" className="border p-2 text-left">Name</th>
                  <th scope="col" className="border p-2 text-left">Email</th>
                  <th scope="col" className="border p-2 text-left">Phone</th>
                  <th scope="col" className="border p-2 text-left">Category</th>
                  <th scope="col" className="border p-2 text-left">Type</th>
                  <th scope="col" className="border p-2 text-left">Payment</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="border p-2">{r.name}</td>
                    <td className="border p-2">{r.email}</td>
                    <td className="border p-2">{r.phone}</td>
                    <td className="border p-2">{r.membership_category}</td>
                    <td className="border p-2">{r.membership_type}</td>
                    <td className="border p-2">{r.payment_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </>
      )}
    </div>
  );
}
