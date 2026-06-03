"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import toast from "react-hot-toast";

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
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const handleAddDocument = async (downloadURL: string | null) => {
    try {
      const docRef = await addDoc(collection(db, "Donation"), {
        ...formData,
        Attachments: downloadURL || "",
      });
      console.log("Document added with ID:", docRef.id);
      setLoading(false);
      setFormData(initialFormData);
      toast.success(
        "Thank you for your generous donation! Your support means a lot to us."
      );
    } catch (error) {
      setLoading(false);
      toast.error("Something broke while processing your donation");
      console.error("Error adding document:", error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.PhoneNumber ||
        !formData.Amount
      ) {
        throw new Error("Please fill in all required fields.");
      }

      if (!image) {
        throw new Error("Please upload a donation receipt.");
      }

      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);

      await addDoc(collection(db, "Donation"), {
        ...formData,
        Attachments: downloadURL || "",
      });

      setLoading(false);
      setFormData(initialFormData);
      toast.success(
        "Thank you for your generous donation! Your support means a lot to us."
      );
    } catch (error) {
      setLoading(false);
      toast.error("Please fill all feilds");
      console.error("Error adding document:", error);
    }
  };

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

        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10 mb-8 sm:mb-10">
          <section aria-labelledby="why-support-heading">
            <h2
              id="why-support-heading"
              className="text-xl font-semibold text-primary-color"
            >
              Why Support DHE
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
              The Department of Holistic Education (DHE) is dedicated to building
              Bharat as a knowledge-driven society through value-based education,
              innovation, research, entrepreneurship, and holistic human
              development aligned with NEP 2020. Contributions support
              institutional work across cells, national movements such as
              Shiksha Mahakumbh, and programs that strengthen educators,
              institutions, and learners.
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700" role="list">
              <li>Holistic education initiatives in schools and institutions</li>
              <li>Educational research and innovation-oriented activities</li>
              <li>Student development and leadership-oriented programs</li>
              <li>Academic events, conferences, and collaborative forums</li>
              <li>Capacity-building for teachers, coordinators, and partners</li>
            </ul>
          </section>

          <section aria-labelledby="transparency-heading">
            <h2
              id="transparency-heading"
              className="text-xl font-semibold text-primary-color"
            >
              Transparency &amp; Accountability
            </h2>
            <ul className="mt-3 space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed" role="list">
              <li>
                Use only official payment channels listed on the{" "}
                <Link
                  href="/accountdetails"
                  className="text-orange-700 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                >
                  account details page
                </Link>{" "}
                or the verified donation link below.
              </li>
              <li>
                Donation information submitted through this form is recorded for
                institutional purposes along with your uploaded receipt.
              </li>
              <li>
                Contributors should retain their bank or payment confirmation
                for their own records.
              </li>
              <li>
                For questions about a contribution, contact DHE through the{" "}
                <Link
                  href="/contact"
                  className="text-orange-700 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                >
                  contact page
                </Link>
                .
              </li>
            </ul>
          </section>

          <section aria-labelledby="how-helps-heading">
            <h2
              id="how-helps-heading"
              className="text-xl font-semibold text-primary-color"
            >
              How Your Contribution Helps
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
              Contributions strengthen DHE&apos;s ability to carry out
              mission-aligned activities across the country, including:
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700" role="list">
              {contributionAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section
          aria-labelledby="donation-form-heading"
          className="shadow-md rounded-md max-w-md mx-auto pt-6 sm:pt-8 bg-white text-black border border-gray-100"
        >
          <h2
            id="donation-form-heading"
            className="text-primary text-center text-lg sm:text-xl font-semibold px-4"
          >
            Support a Cause That Matters
          </h2>
          <p className="text-center text-sm text-gray-600 px-4 mt-2 pb-2">
            Complete payment through official channels, then submit your details
            and receipt below.
          </p>
          <form onSubmit={handleSubmit} className="bg-white p-4">
            <div className="mb-4">
              <label
                htmlFor="donation-name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                id="donation-name"
                type="text"
                name="name"
                placeholder="*Your full name*"
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
                placeholder="*your@example.com*"
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
                placeholder="*1234567890*"
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
                Amount
              </label>
              <input
                id="donation-amount"
                type="number"
                name="Amount"
                value={formData.Amount}
                placeholder="*Amount*"
                onChange={handleInputChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black min-h-11"
                required
              />
            </div>

            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-600">
                Donate Now
              </span>
              <a
                href="https://pay.jodo.in/pages/KFEUFQRASGBHzBk2"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-2 block text-center min-h-11 leading-[2.75rem]"
              >
                Donate Now
              </a>
            </div>

            <div className="mb-4">
              <label
                htmlFor="donation-receipt"
                className="block text-sm font-medium text-gray-600"
              >
                Upload Donation Receipt
              </label>
              <input
                id="donation-receipt"
                type="file"
                name="Attachments"
                accept=".pdf, .png, .jpg"
                onChange={handleImageChange}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 text-black bg-white min-h-11"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-4 w-full min-h-11 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Submitting…" : "Submit"}
            </button>
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
