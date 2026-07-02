"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type VerifyResult = {
  valid: boolean;
  receiptNumber?: string;
  donorName?: string;
  amountInr?: number;
  status?: string;
  date?: string;
  pdfUrl?: string;
  error?: string;
};

export default function ReceiptVerifyClient() {
  const [receiptNumber, setReceiptNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const params = new URLSearchParams({
        receipt_number: receiptNumber.trim(),
        email: email.trim(),
      });
      const res = await fetch(`/api/receipts/verify?${params.toString()}`);
      const data = (await res.json()) as VerifyResult;

      if (!res.ok) {
        setResult({ valid: false, error: data.error ?? "Verification failed." });
        return;
      }

      setResult(data);
    } catch {
      setResult({ valid: false, error: "Unable to verify receipt. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dhe-container py-10 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color text-center">
        Verify donation receipt
      </h1>
      <p className="mt-3 text-sm text-gray-600 text-center leading-relaxed">
        Enter the receipt number from your email and the donor email address used
        during payment to confirm your 80G-eligible donation record.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="receipt-number" className="block text-sm font-medium text-gray-700">
            Receipt number
          </label>
          <input
            id="receipt-number"
            type="text"
            required
            placeholder="DHE-2025-26-00001"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-11"
          />
        </div>
        <div>
          <label htmlFor="receipt-email" className="block text-sm font-medium text-gray-700">
            Donor email
          </label>
          <input
            id="receipt-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-11"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="dhe-btn-primary w-full min-h-11 disabled:opacity-60"
        >
          {loading ? "Verifying…" : "Verify receipt"}
        </button>
      </form>

      {result && !result.valid && (
        <p className="mt-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3" role="alert">
          {result.error}
        </p>
      )}

      {result?.valid && (
        <section
          aria-labelledby="verify-result-heading"
          className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 space-y-2 text-sm"
        >
          <h2 id="verify-result-heading" className="font-semibold text-green-900">
            Receipt verified
          </h2>
          <p>
            <span className="text-gray-600">Receipt No.:</span>{" "}
            <strong>{result.receiptNumber}</strong>
          </p>
          <p>
            <span className="text-gray-600">Donor:</span> {result.donorName}
          </p>
          <p>
            <span className="text-gray-600">Amount:</span> ₹{result.amountInr}
          </p>
          <p>
            <span className="text-gray-600">Date:</span> {result.date}
          </p>
          <p>
            <span className="text-gray-600">Status:</span> {result.status}
          </p>
          {result.pdfUrl ? (
            <a
              href={result.pdfUrl}
              className="inline-flex mt-2 text-orange-700 font-semibold hover:underline min-h-11 items-center"
            >
              Download PDF receipt
            </a>
          ) : null}
        </section>
      )}

      <p className="mt-8 text-center text-sm text-gray-600">
        <Link href="/donation" className="text-orange-700 hover:underline">
          Make a donation
        </Link>
        {" · "}
        <Link href="/contact" className="text-orange-700 hover:underline">
          Contact DHE
        </Link>
      </p>
    </div>
  );
}
