"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { useQRCode } from "next-qrcode";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import toast, { Toaster } from "react-hot-toast";

// Define the WorkshopData interface
interface WorkshopData {
  serial: number;
  name: string;
  Address: string;
  email: string;
  PhoneNumber: string;
}

type QRCodeErrorCorrectionLevel = "L" | "M" | "Q" | "H";

const downloadAsPDF = async (formDataList: WorkshopData[]) => {
  const doc = new jsPDF("p", "pt", "letter");

  const qrCodeOptions = {
    errorCorrectionLevel: "M" as QRCodeErrorCorrectionLevel,
    margin: 3,
    scale: 4,
  };

  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const qrHeight = 50;
  const qrWidth = 50;
  let currentY = margin;

  for (let i = 0; i < formDataList.length; i++) {
    const formData = formDataList[i];
    const entryHeight = 5 * 20; // 5 lines of text, assuming 20px per line

    // Check if there's enough space for the current entry and QR code
    if (currentY + entryHeight + qrHeight + margin > pageHeight && i !== 0) {
      doc.addPage();
      currentY = margin;
    }

    // Add table data
    const tableData = [
      [
        formData.serial.toString(),
        formData.name,
        formData.Address,
        formData.email,
        formData.PhoneNumber,
      ],
    ];

    autoTable(doc, {
      head: [["Sr. No.", "Name", "Address", "Email", "Contact Number"]],
      body: tableData,
      startY: currentY,
      theme: "grid",
    });

    // Add QR code
    const qrCanvas = document.createElement("canvas");
    await QRCode.toCanvas(
      qrCanvas,
      JSON.stringify(formData),
      qrCodeOptions
    );
    const qrDataUrl = qrCanvas.toDataURL("image/png");
    doc.addImage(
      qrDataUrl,
      "PNG",
      margin,
      currentY + entryHeight + margin,
      qrWidth,
      qrHeight
    );

    // Update current Y position for the next entry
    currentY += entryHeight + qrHeight + 2 * margin;
  }

  doc.save("workshop_data.pdf");
};

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { Canvas } = useQRCode();
  const [formDataList, setFormDataList] = useState<WorkshopData[]>([]);
  const [emailsSent, setEmailsSent] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "Workshop");
        const querySnapshot = await getDocs(colRef);

        const dataList: WorkshopData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as WorkshopData;
          dataList.push(data);
        });

        const dataListWithSerial = dataList.map((data, index) => ({
          ...data,
          serial: index + 1,
        }));

        setFormDataList(dataListWithSerial);
        setLoading(false);
        setEmailsSent(Array(dataListWithSerial.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sendEmail = async (
    email: string,
    qrCodeData: string,
    index: number
  ) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      await axios.post("/api/sendMail", { email, qrCodeData });
      toast.success(`Email sent to ${email}`);
      const updatedEmailsSent = [...emailsSent];
      updatedEmailsSent[index] = true;
      setEmailsSent(updatedEmailsSent);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(`Failed to send email to ${email}`);
    }
  };

  const sendAllEmails = async () => {
    formDataList.forEach(async (formData, index) => {
      if (!emailsSent[index]) {
        await sendEmail(formData.email, JSON.stringify(formData), index);
      }
    });
  };

  const exportToExcel = () => {
    const filteredData = formDataList.map(
      ({ serial, name, Address, email, PhoneNumber }) => ({
        "Sr. No.": serial,
        Name: name,
        Address: Address,
        Email: email,
        "Contact Number": PhoneNumber,
      })
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Workshop Data");

    XLSX.writeFile(workbook, "workshop_data.xlsx");
  };

  // Function to download data as PDF
  const downloadPDF = () => {
    // Use the provided downloadAsPDF function
    downloadAsPDF(formDataList);
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
          <h2 className="text-primary text-xl font-bold">Workshop Data</h2>
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
                  Address
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Email
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Contact Number
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  QR
                </th>
                <th className="border bg-primary text-white font-bold text-base p-3">
                  Email Send
                </th>
              </tr>
            </thead>
            <tbody>
              {formDataList.map((formData, index) => (
                <tr key={formData.serial} className="border">
                  <td className="border text-black p-3">{formData.serial}</td>
                  <td className="border text-black p-3">{formData.name}</td>
                  <td className="border text-black p-3">{formData.Address}</td>
                  <td className="border text-black p-3">{formData.email}</td>
                  <td className="border text-black p-3">
                    {formData.PhoneNumber}
                  </td>
                  <td className="border text-black p-3">
                    {formData.name ? (
                      <Canvas
                        text={JSON.stringify(formData)}
                        options={{
                          errorCorrectionLevel: "M",
                          margin: 3,
                          scale: 4,
                          width: 200,
                          color: {
                            dark: "#000000",
                            light: "#e8f0f0",
                          },
                        }}
                      />
                    ) : (
                      <span>No data available</span>
                    )}
                  </td>
                  <td className="border text-black p-3">
                    <button
                      onClick={() =>
                        sendEmail(
                          formData.email,
                          JSON.stringify(formData),
                          index
                        )
                      }
                      className={`bg-primary text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer ${
                        emailsSent[index] ? "bg-gray-400 cursor-not-allowed" : ""
                      }`}
                      disabled={emailsSent[index]}
                    >
                      Send Mail
                    </button>
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
          <button
            onClick={downloadPDF}
            className="bg-primary text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
          >
            Export to PDF
          </button>
          <button
            onClick={sendAllEmails}
            className="bg-primary text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
          >
            Send Mails to All
          </button>
        </div>
      )}
    </>
  );
};

export default Page;
