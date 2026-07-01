"use client"
import React, { useEffect, useState } from "react";
import { downloadRowsAsXlsx } from "@/lib/export/download-xlsx";
import toast, { Toaster } from "react-hot-toast";

interface DonationData {
  id: string;
  serial: number;
  name: string;
  email: string;
  PhoneNumber: string;
  Amount: string;
  receiptNumber: string;
}

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [formDataList, setFormDataList] = useState<DonationData[]>([]);
  const [resendingId, setResendingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/donations");
        const json = await res.json();
        const dataList: DonationData[] = (json.donations ?? []).map(
          (d: {
            id: string;
            donor_name: string;
            donor_email: string;
            donor_phone: string;
            amount_paise: number;
            receipt_number: string;
          }) => ({
            id: d.id,
            name: d.donor_name ?? "",
            email: d.donor_email ?? "",
            PhoneNumber: d.donor_phone ?? "",
            Amount: String((d.amount_paise ?? 0) / 100),
            receiptNumber: d.receipt_number ?? "",
          })
        );

        const dataListWithSerial = dataList.map((data, index) => ({
          ...data,
          serial: index + 1,
        }));

        setFormDataList(dataListWithSerial);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    const filteredData = formDataList.map(
      ({ serial, name, email, PhoneNumber, Amount, receiptNumber }) => ({
        "Sr. No.": serial,
        Name: name,
        Email: email,
        "Contact Number": PhoneNumber,
        Amount: Amount,
        "Receipt No.": receiptNumber,
      })
    );

    await downloadRowsAsXlsx(filteredData, "donation_data.xlsx", "Donation Data");
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
          <button
            onClick={exportToExcel}
            className="bg-primary text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
          >
            Export to Excel
          </button>
        </div>
      )}
    </>
  );
};

export default Page;
