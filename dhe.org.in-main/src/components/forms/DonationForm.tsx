"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import RazorpayDonateButton from "@/components/payments/RazorpayDonateButton";
import { vbitrTrust, dheOfficialContact } from "@/data/institution";
import PageHero from "@/components/ui/PageHero";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";
import { HomeIcon } from "@/components/home/HomeIcons";

interface DonationData {
  name: string;
  email: string;
  PhoneNumber: string;
  Amount: string;
  pan: string;
  address: string;
}

const contributionAreas = [
  {
    title: "Educational outreach",
    description: "Awareness initiatives and institutional engagement across Bharat.",
    icon: "academic" as const,
  },
  {
    title: "Workshops & training",
    description: "Programs for students, teachers, and coordinators.",
    icon: "events" as const,
  },
  {
    title: "National conferences",
    description: "Shiksha Mahakumbh and collaborative academic events.",
    icon: "summit" as const,
  },
  {
    title: "Publications",
    description: "Journals, proceedings, and knowledge outputs.",
    icon: "journal" as const,
  },
  {
    title: "Capacity building",
    description: "Holistic education aligned with NEP 2020.",
    icon: "leadership" as const,
  },
] as const;

const trustQuickLinks = [
  {
    title: "80G certificate",
    href: vbitrTrust.approval80G.documentPath,
    external: true,
  },
  {
    title: "12A registration",
    href: vbitrTrust.registration12A.documentPath,
    external: true,
  },
  { title: "Verify receipt", href: "/receipt/verify" },
  { title: "Transparency hub", href: "/transparency" },
] as const;

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const Donation = ({ introText }: { introText?: string }) => {
  const initialFormData: DonationData = {
    name: "",
    email: "",
    PhoneNumber: "",
    Amount: "",
    pan: "",
    address: "",
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
      !formData.Amount ||
      !formData.pan
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const pan = formData.pan.trim().toUpperCase();
    if (!PAN_REGEX.test(pan)) {
      toast.error("Enter a valid PAN (e.g. ABCDE1234F) for your 80G receipt.");
      return;
    }
    toast("Use the Razorpay button below to complete your donation.");
  };

  const amount = Number(formData.Amount);
  const panValid = PAN_REGEX.test(formData.pan.trim().toUpperCase());

  return (
    <div className="bg-white mb-5 min-w-0">
      <PageHero
        eyebrow="Support DHE · Section 80G"
        title="Donate to VBITR Trust"
        description={
          introText ||
          "Your contribution helps advance holistic education, national programs, and institutional initiatives led by DHE in service of Viksit Bharat."
        }
      />

      <div className="dhe-container py-8 sm:py-10 max-w-3xl mx-auto">
        <section
          className="mb-8 rounded-2xl border border-green-200 bg-green-50/70 p-5 sm:p-6 text-sm text-gray-800"
          aria-label="80G tax exemption information"
        >
          <h2 className="font-bold text-green-900 mb-2">80G Tax Exemption</h2>
          <p>
            Donations to <strong>{vbitrTrust.legalName}</strong> (PAN: {vbitrTrust.pan}).
            Certificate No. {vbitrTrust.approval80G.number}, valid AY{" "}
            {vbitrTrust.approval80G.validAssessmentYears.join(", ")}.
          </p>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2" role="list">
            {trustQuickLinks.map((link) => (
              <li key={link.href}>
                {"external" in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-lg border border-green-200 bg-white px-2 py-2 text-xs font-semibold text-green-800 hover:bg-green-100 min-h-11"
                  >
                    {link.title} ↗
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-center rounded-lg border border-green-200 bg-white px-2 py-2 text-xs font-semibold text-green-800 hover:bg-green-100 min-h-11"
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            Queries: {dheOfficialContact.email} / {dheOfficialContact.phone}
          </p>
        </section>

        <section className="mb-10" aria-labelledby="contribution-areas-heading">
          <h2 id="contribution-areas-heading" className="text-lg font-bold text-gray-900 mb-4">
            Where your support goes
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
            {contributionAreas.map((area) => (
              <li key={area.title}>
                <HomeFeatureCard
                  title={area.title}
                  description={area.description}
                  icon={<HomeIcon name={area.icon} className="w-5 h-5" />}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-slate-50 p-6 sm:p-8 shadow-dhe-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Donation form
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

            <div className="mb-4">
              <label
                htmlFor="donation-pan"
                className="block text-sm font-medium text-gray-600"
              >
                PAN (required for 80G receipt)<span className="text-red-500">*</span>
              </label>
              <input
                id="donation-pan"
                type="text"
                name="pan"
                maxLength={10}
                value={formData.pan}
                onChange={handleInputChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black min-h-11 uppercase"
                placeholder="ABCDE1234F"
                required
                pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]"
                title="Enter a valid 10-character PAN"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="donation-address"
                className="block text-sm font-medium text-gray-600"
              >
                Postal address (optional, for 80G receipt)
              </label>
              <input
                id="donation-address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black min-h-11"
                autoComplete="street-address"
              />
            </div>

            <RazorpayDonateButton
              name={formData.name}
              email={formData.email}
              phone={formData.PhoneNumber}
              amount={amount}
              pan={formData.pan}
              address={formData.address}
              thankYouPath="/donation/thank-you"
              disabled={!formData.name || !formData.email || !amount || !panValid}
            />
          </form>
        </section>

        <nav
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
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
