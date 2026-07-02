"use client"
import React, { useEffect, useState } from "react";
import { downloadRowsAsXlsx } from "@/lib/export/download-xlsx";
import { downloadRowsAsCsv } from "@/lib/export/download-csv";
import toast, { Toaster } from "react-hot-toast";

interface DonationData {
  id: string;
  serial: number;
  name: string;
  email: string;
  PhoneNumber: string;
  address: string;
  Amount: string;
  receiptNumber: string;
}

const PAGE_SIZE = 50;

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [formDataList, setFormDataList] = useState<DonationData[]>([]);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offset = page * PAGE_SIZE;
        const res = await fetch(
          `/api/admin/donations?limit=${PAGE_SIZE}&offset=${offset}`
        );
        const json = await res.json();
        const dataList: DonationData[] = (json.donations ?? []).map(
          (d: {
            id: string;
            donor_name: string;
            donor_email: string;
            donor_phone: string;
            donor_address?: string;
            amount_paise: number;
            receipt_number: string;
          }, index: number) => ({
            id: d.id,
            name: d.donor_name ?? "",
            email: d.donor_email ?? "",
            PhoneNumber: d.donor_phone ?? "",
            address: d.donor_address ?? "",
            Amount: String((d.amount_paise ?? 0) / 100),
            receiptNumber: d.receipt_number ?? "",
            serial: offset + index + 1,
          })
        );

        setFormDataList(dataList);
        setTotal(json.total ?? dataList.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const resendReceipt = async (row: DonationData) => {
    setResendingId(row.id);
    try {
      const res = await fetch(`/api/admin/donations/${row.id}/receipt`, {
        method: "POST",
        credentials: "same-origin",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send receipt");
      }
      toast.success(`Receipt emailed to ${row.email}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Email failed");
    } finally {
      setResendingId(null);
    }
  };

  const exportToExcel = async () => {
    await exportRows(formDataList, "donation_data.xlsx", true);
  };

  const exportToCsv = () => {
    exportRows(formDataList, "donation_data.csv", false);
  };

  const exportAllCsv = async () => {
    try {
      const res = await fetch("/api/admin/donations?export=all", {
        credentials: "same-origin",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Export failed");
      const rows: DonationData[] = (json.donations ?? []).map(
        (d: {
          id: string;
          donor_name: string;
          donor_email: string;
          donor_phone: string;
          donor_address?: string;
          amount_paise: number;
          receipt_number: string;
        }, index: number) => ({
          id: d.id,
          name: d.donor_name ?? "",
          email: d.donor_email ?? "",
          PhoneNumber: d.donor_phone ?? "",
          address: d.donor_address ?? "",
          Amount: String((d.amount_paise ?? 0) / 100),
          receiptNumber: d.receipt_number ?? "",
          serial: index + 1,
        })
      );
      exportRows(rows, "donation_data_all.csv", false);
      toast.success(`Exported ${rows.length} donations`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export failed");
    }
  };

  const exportRows = async (
    list: DonationData[],
    filename: string,
    xlsx: boolean
  ) => {
    const filteredData = list.map(
      ({ serial, name, email, PhoneNumber, address, Amount, receiptNumber }) => ({
        "Sr. No.": serial,
        Name: name,
        Email: email,
        "Contact Number": PhoneNumber,
        Address: address,
        Amount: Amount,
        "Receipt No.": receiptNumber,
      })
    );
    if (xlsx) {
      await downloadRowsAsXlsx(filteredData, filename, "Donation Data");
    } else {
      downloadRowsAsCsv(filteredData, filename);
    }
  };

  return (
    <>
      <Toaster />
      {loading && (
        <div className="min-h-screen flex flex-col justify-center items-center mt-4 text-black ">
          Loading...
        </div>
      )}
      {!loading && (
        <div className="bg-white min-h-screen flex flex-col justify-center items-center mt-4">
          <h2 className="text-primary text-xl font-bold">Donation Data</h2>
          <table className="border-collapse border m-6">
            <caption className="sr-only">
              Donation records with receipt numbers and contact details
            </caption>
            <thead>
              <tr>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Sr. No.
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Name
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Email
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Contact Number
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Address
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Amount
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Receipt
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {formDataList.map((formData, index) => (
                <tr key={formData.serial} className="border">
                  <td className="border text-black p-3">{formData.serial}</td>
                  <td className="border text-black p-3">{formData.name}</td>
                  <td className="border text-black p-3">{formData.email}</td>
                  <td className="border text-black p-3">{formData.PhoneNumber}</td>
                  <td className="border text-black p-3 max-w-[12rem] truncate" title={formData.address}>
                    {formData.address || "—"}
                  </td>
                  <td className="border text-black p-3">{formData.Amount}</td>
                  <td className="border text-black p-3">{formData.receiptNumber || "—"}</td>
                  <td className="border text-black p-3 space-x-2">
                    {formData.receiptNumber ? (
                      <>
                        <a
                          href={`/api/receipts/${formData.id}/pdf`}
                          className="text-orange-600 underline"
                          download
                        >
                          PDF
                        </a>
                        <button
                          type="button"
                          onClick={() => resendReceipt(formData)}
                          disabled={resendingId === formData.id || !formData.email}
                          className="text-orange-600 underline disabled:opacity-50"
                        >
                          {resendingId === formData.id ? "Sending…" : "Email receipt"}
                        </button>
                      </>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page + 1} of {Math.max(1, Math.ceil(total / PAGE_SIZE))} ({total}{" "}
              total)
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={(page + 1) * PAGE_SIZE >= total}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
          <button
            onClick={exportToExcel}
            className="bg-primary text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Export to Excel
          </button>
          <button
            type="button"
            onClick={exportToCsv}
            className="border border-primary text-primary font-bold py-2 px-4 rounded cursor-pointer"
          >
            Export page CSV
          </button>
          <button
            type="button"
            onClick={exportAllCsv}
            className="border border-gray-700 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer"
          >
            Export all CSV
          </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
