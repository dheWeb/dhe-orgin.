"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import RazorpayDonateButton from "@/components/payments/RazorpayDonateButton";
import { vbitrTrust, dheOfficialContact } from "@/data/institution";

interface DonationData {
  name: string;
  email: string;
  PhoneNumber: string;
  Amount: string;
}

const contributionAreas = [
  "Educational outreach and awareness initiatives",
  "Workshops for students, teachers, and institutional coordinators",
  "National conferences and collaborative academic events",
  "Publications and knowledge-sharing through journals and proceedings",
  "Capacity-building aligned with holistic education and NEP 2020",
] as const;

const Donation = () => {
  const initialFormData: DonationData = {
    name: "",
    email: "",
    PhoneNumber: "",
    Amount: "",
  };

  const [formData, setFormData] = useState<DonationData>(initialFormData);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.PhoneNumber ||
      !formData.Amount
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast("Use the Razorpay button below to complete your donation.");
  };

  const amount = Number(formData.Amount);

  return (
    <div className="bg-white mb-5 min-w-0">
      <div className="dhe-container py-6 sm:py-10">
        <header className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary-color">
            Support the Department of Holistic Education
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Your contribution helps advance holistic education, national
            programs, and institutional initiatives led by DHE in service of
            educational transformation and Viksit Bharat.
          </p>
        </header>

        <section
          className="max-w-3xl mx-auto mb-8 rounded-lg border border-green-200 bg-green-50 p-4 sm:p-6 text-sm text-gray-800"
          aria-label="80G tax exemption information"
        >
          <h2 className="font-semibold text-green-900 mb-2">
            80G Tax Exemption (Provisional)
          </h2>
          <p>
            Donations are received by{" "}
            <strong>{vbitrTrust.legalName}</strong> (PAN: {vbitrTrust.pan}).
            Provisional approval under Section 80G — Certificate No.{" "}
            {vbitrTrust.approval80G.number}, valid for AY{" "}
            {vbitrTrust.approval80G.validAssessmentYears.join(", ")}.
          </p>
          <p className="mt-2">
            An official receipt will be emailed after successful payment. For
            queries: {dheOfficialContact.email} / {dheOfficialContact.phone}.
          </p>
        </section>

        <section className="max-w-3xl mx-auto mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Where your support goes
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            {contributionAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl mx-auto bg-slate-50 border border-gray-100 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-primary-color mb-6 text-center">
            Donation Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="donation-name"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                id="donation-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black min-h-11"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="donation-email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                id="donation-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black min-h-11"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="donation-phone"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                id="donation-phone"
                type="tel"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black min-h-11"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="donation-amount"
                className="block text-sm font-medium text-gray-600"
              >
                Amount (INR)
              </label>
              <input
                id="donation-amount"
                type="number"
                name="Amount"
                min={1}
                value={formData.Amount}
                onChange={handleInputChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black min-h-11"
                required
              />
            </div>

            <RazorpayDonateButton
              name={formData.name}
              email={formData.email}
              phone={formData.PhoneNumber}
              amount={amount}
              disabled={!formData.name || !formData.email || !amount}
            />
          </form>
        </section>

        <nav
          className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-4 text-sm"
          aria-label="Related contribution pages"
        >
          <Link
            href="/accountdetails"
            className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
          >
            Official account details
          </Link>
          <Link
            href="/contact"
            className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
          >
            Contact DHE
          </Link>
          <Link
            href="/contribute"
            className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
          >
            Membership
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Donation;
