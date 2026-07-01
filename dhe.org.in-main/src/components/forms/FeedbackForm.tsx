"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import RecaptchaField from "@/components/forms/RecaptchaField";

const FeedbackForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [event, setEvent] = useState("");
  const [experience, setExperience] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !mobile || !affiliation || !event) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/forms/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          mobile,
          affiliation,
          event,
          experience,
          suggestions,
          recaptchaToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      router.push("/feedback/thank-you");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something broke while submitting the feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="text-primary border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl border-gray-100 bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-center text-2xl font-medium mb-4">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <motion.div
          className="mb-4 moving-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </motion.div>

        <motion.div
          className="mb-4 moving-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </motion.div>

        <motion.div
          className="mb-4 moving-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
            Mobile<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </motion.div>

        <motion.div
          className="mb-4 moving-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <label
            htmlFor="affiliation"
            className="block text-gray-700 font-medium mb-2"
          >
            Affiliation<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </motion.div>

        <motion.div
          className="mb-4 moving-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <label htmlFor="event" className="block text-gray-700 font-medium mb-2">
            Select the event you participated in
            <span className="text-red-500">*</span>
          </label>
          <select
            id="event"
            name="event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Select event</option>
            <option value="shiksha-kumbh-2023">शिक्षा कुंभ 2023</option>
            <option value="shiksha-kumbh-2024">शिक्षा कुंभ 2024</option>
            <option value="shiksha-mahakumbh-2023">शिक्षा महाकुंभ 2023</option>
            <option value="shiksha-mahakumbh-2024">शिक्षा महाकुंभ 2024</option>
          </select>
        </motion.div>

        <motion.div
          className="mb-4 moving-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <label
            htmlFor="experience"
            className="block text-gray-700 font-medium mb-2"
          >
            Write Your Experience
          </label>
          <textarea
            id="experience"
            name="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            rows={5}
            required
          />
        </motion.div>

        <motion.div
          className="mb-4 moving-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <label
            htmlFor="suggestions"
            className="block text-gray-700 font-medium mb-2"
          >
            Provide Your Suggestions to Make This Abhiyan a World Class
          </label>
          <textarea
            id="suggestions"
            name="suggestions"
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            rows={5}
          />
        </motion.div>

        <RecaptchaField onToken={setRecaptchaToken} />

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
