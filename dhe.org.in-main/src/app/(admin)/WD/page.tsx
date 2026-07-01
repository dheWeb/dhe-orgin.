"use client"
import React, { useEffect, useState } from "react";
import { downloadRowsAsXlsx } from "@/lib/export/download-xlsx";
import toast, { Toaster } from "react-hot-toast";

interface WorkshopData {
  serial: number;
  name: string;
  Address: string;
  email: string;
  PhoneNumber: string;
}

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [formDataList, setFormDataList] = useState<WorkshopData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/workshops");
        const json = await res.json();
        const dataList: WorkshopData[] = (json.workshops ?? []).map(
          (r: {
            name: string;
            email: string;
            phone: string;
            address: string;
          }) => ({
            name: r.name ?? "",
            email: r.email ?? "",
            PhoneNumber: r.phone ?? "",
            Address: r.address ?? "",
          })
        );
        setFormDataList(
          dataList.map((data, index) => ({ ...data, serial: index + 1 }))
        );
      } catch {
        toast.error("Failed to load workshop registrations.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const exportToExcel = async () => {
    const rows = formDataList.map(
      ({ serial, name, Address, email, PhoneNumber }) => ({
        "Sr. No.": serial,
        Name: name,
        Address: Address,
        Email: email,
        Phone: PhoneNumber,
      })
    );
    await downloadRowsAsXlsx(rows, "workshop_registrations.xlsx", "Workshops");
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <div className="min-h-screen flex justify-center items-center text-black">
          Loading…
        </div>
      ) : (
        <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4">
          <h1 className="text-primary text-xl font-bold mb-4">
            Workshop Registrations
          </h1>
          <div className="overflow-x-auto w-full max-w-5xl">
            <table className="border-collapse border w-full text-sm">
              <thead>
                <tr>
                  {["Sr.", "Name", "Address", "Email", "Phone"].map((h) => (
                    <th
                      key={h}
                      className="border bg-primary text-white p-2 text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formDataList.map((row) => (
                  <tr key={row.serial}>
                    <td className="border p-2">{row.serial}</td>
                    <td className="border p-2">{row.name}</td>
                    <td className="border p-2">{row.Address}</td>
                    <td className="border p-2">{row.email}</td>
                    <td className="border p-2">{row.PhoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={exportToExcel}
            className="bg-primary text-white font-bold py-2 px-4 rounded mt-6"
          >
            Export to Excel
          </button>
        </div>
      )}
    </>
  );
};

export default Page;
