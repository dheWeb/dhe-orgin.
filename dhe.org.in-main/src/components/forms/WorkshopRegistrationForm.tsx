"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import RecaptchaField from "@/components/forms/RecaptchaField";

export default function WorkshopRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast.error("Please complete reCAPTCHA.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/forms/workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          recaptchaToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      toast.success("Registration received. We will contact you shortly.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-lg border border-green-300 bg-green-50 p-6 text-green-900"
        role="status"
      >
        <p className="font-semibold">Thank you for registering interest.</p>
        <p className="mt-2 text-sm">
          DHE will contact you at {email} with workshop details when the next
          program opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div>
        <label htmlFor="ws-name" className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          id="ws-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 min-h-11"
        />
      </div>
      <div>
        <label htmlFor="ws-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="ws-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 min-h-11"
        />
      </div>
      <div>
        <label htmlFor="ws-phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          id="ws-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 min-h-11"
        />
      </div>
      <div>
        <label htmlFor="ws-address" className="block text-sm font-medium text-gray-700">
          School / institution / address
        </label>
        <textarea
          id="ws-address"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
        />
      </div>
      <RecaptchaField onToken={setRecaptchaToken} />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded-md min-h-11 disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Register interest for next workshop"}
      </button>
    </form>
  );
}
