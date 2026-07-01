"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import toast from "react-hot-toast";
import RecaptchaField from "@/components/forms/RecaptchaField";

function VisitorCountSpinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600"
      role="status"
      aria-label="Loading visitor count"
    />
  );
}

const BottomView: React.FC = () => {
  const footerRef = React.useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const [dailyVisitors, setDailyVisitors] = useState<number | null>(null);
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [visitorsActive, setVisitorsActive] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisitorsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisitorsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visitorsActive) return;

    let cancelled = false;

    const syncVisitors = async () => {
      try {
        await fetch("/api/visitors", { method: "POST" });
        const res = await fetch("/api/visitors");
        const data = await res.json();
        if (!cancelled) {
          setTotalVisitors(data.total ?? 0);
          setDailyVisitors(data.daily ?? 0);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) setLoading(false);
      }
    };

    syncVisitors();
    return () => {
      cancelled = true;
    };
  }, [visitorsActive]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, recaptchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Message Sent Successfully");
      setEmail("");
      setMessage("");
      setRecaptchaToken("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  const ecosystem = [
    {
      name: "DHE",
      image: "/logo.webp",
      link: "https://www.dhe.org.in/",
    },
    {
      name: "Shiksha Mahakumbh",
      image: "/logos/rase.webp",
      link: "https://www.rase.co.in/",
    },
    {
      name: "Vidya Bharti",
      image: "/logos/vidyabharti.webp",
      link: "https://vidyabharti.net/",
    },
    {
      name: "Sarvatra",
      image: "/logos/sarvatr.webp",
      link: "https://www.sarvatr.co.in/",
    },
    {
      name: "Tredul",
      image: "/logos/tre-dul.webp",
      link: "https://tredul.in/",
    },
    {
      name: "Jobs 360°",
      image: "/logos/job360.webp",
      link: "https://jobs360degree.com/",
    },
    {
      name: "Swadeshi Bazaar",
      image: "/logos/swadeshibazar.webp",
      link: "https://www.swadeshibazaar.co.in/",
    },
    {
      name: "Poojawala",
      image: "/logos/poojawala.webp",
      link: "https://poojawala.in/",
    },
    {
      name: "TuDu",
      image: "/Tudu.webp",
      link: "https://tudu.co.in/",
    },
    {
      name: "Viksit India",
      image: "/vi.webp",
      link: "https://vi.rase.co.in/",
    },
    {
      name: "Punjab Super 100",
      image: "/logos/pb100.webp",
      link: "https://punjabsuper100.com/",
    },
    {
      name: "ITR Chandigarh",
      image: "/logo 2.webp",
      link: "https://www.itrchandigarh.org/",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-[#07111f] text-white border-t border-orange-200"
    >

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-14">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-gray-700">

          {/* LEFT SECTION */}
          <div className="lg:col-span-4">

            {/* LOGO */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white rounded-full p-2 shadow-xl">
                <Image
                  src="/logo.webp"
                  alt="DHE Logo"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold leading-tight">
                  Department of
                  <span className="block text-orange-400">
                    Holistic Education
                  </span>
                </h2>

                <p className="text-sm text-gray-300 mt-1">
                  National Educational Transformation Platform
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 leading-8 text-sm">
              Advancing Bharat’s educational ecosystem through
              innovation, leadership, skill development,
              research, publications, technology-driven
              platforms, and holistic learning aligned with
              the vision of NEP 2020 and Viksit Bharat.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-5 mt-8">

              <a
                href="https://www.facebook.com/profile.php?id=100090170940886&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/department-of-holistic-education/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/dhebharat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </a>

              <a
                href="https://twitter.com/DHEBharat1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
              </a>

              <a
                href="https://www.youtube.com/@DepartmentofHolisticEducation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition duration-300"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
              </a>
            </div>

            {/* VISITORS */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5">
                <p className="text-gray-300 text-xs uppercase tracking-wider mb-2">
                  Daily Visitors
                </p>

                <h2 className="text-3xl font-bold text-orange-400">
                  {loading ? <VisitorCountSpinner /> : dailyVisitors}
                </h2>
              </div>

              <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5">
                <p className="text-gray-300 text-xs uppercase tracking-wider mb-2">
                  Total Visitors
                </p>

                <h2 className="text-3xl font-bold text-orange-400">
                  {loading ? <VisitorCountSpinner /> : totalVisitors}
                </h2>
              </div>
            </div>
          </div>

          {/* CENTER SECTION */}
          <div className="lg:col-span-5">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-orange-300">
                  DHE Ecosystem
                </h3>

                <p className="text-sm text-gray-300 mt-1">
                  Integrated Educational & Innovation Network
                </p>
              </div>
            </div>

            {/* ECOSYSTEM GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

              {ecosystem.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    bg-gradient-to-br
                    from-white
                    to-orange-50
                    rounded-2xl
                    border
                    border-orange-100
                    p-4
                    hover:-translate-y-1
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex items-center justify-center h-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="object-contain max-h-14 w-auto"
                    />
                  </div>

                  <p
                    className="
                      text-center
                      text-[11px]
                      sm:text-xs
                      font-bold
                      text-gray-700
                      mt-3
                      leading-5
                      group-hover:text-orange-600
                      transition
                    "
                  >
                    {item.name}
                  </p>
                </a>
              ))}
            </div>

            {/* ECOSYSTEM INFO */}
            <div className="mt-8 bg-[#111827] border border-gray-700 rounded-3xl p-6">

              <h4 className="text-orange-300 font-bold text-lg mb-3">
                National Educational Ecosystem
              </h4>

              <p className="text-sm text-gray-300 leading-8">
                DHE integrates educational leadership,
                innovation, skill development, research,
                entrepreneurship, publications, digital
                transformation, and institutional collaboration
                into one unified ecosystem empowering Bharat
                towards becoming a global knowledge leader.
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-3">

            <h3 className="text-2xl font-bold text-orange-300 mb-6">
              Connect With Us
            </h3>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <label htmlFor="footer-contact-email" className="sr-only">
                Your email address
              </label>
              <input
                id="footer-contact-email"
                type="email"
                name="email"
                placeholder="Your Email Address"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  bg-[#111827]
                  border
                  border-gray-700
                  rounded-2xl
                  px-4
                  py-4
                  text-sm
                  focus:outline-none
                  focus:border-orange-500
                "
              />

              <label htmlFor="footer-contact-message" className="sr-only">
                Your message
              </label>
              <textarea
                id="footer-contact-message"
                name="message"
                rows={5}
                placeholder="Write Your Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="
                  w-full
                  bg-[#111827]
                  border
                  border-gray-700
                  rounded-2xl
                  px-4
                  py-4
                  text-sm
                  focus:outline-none
                  focus:border-orange-500
                "
              />

              <RecaptchaField onToken={setRecaptchaToken} />

              <button
                type="submit"
                className="
                  w-full
                  bg-gradient-to-r
                  from-orange-600
                  to-orange-500
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:scale-[1.02]
                  transition
                  duration-300
                "
              >
                Send Message
              </button>
            </form>

            {/* MAP */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-700 shadow-2xl">
              <iframe
                className="w-full h-72"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.6604613704103!2d76.70609037438652!3d30.699827987224253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef39a32ed3c1%3A0x9ff15a51ad5117e9!2sDepartment%20of%20Holistic%20Education!5e0!3m2!1sen!2sin!4v1708812880069!5m2!1sen!2sin"
              ></iframe>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-300 text-center lg:text-left">
            © 2026 Department of Holistic Education.
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">

            <Link
              href="/privacy-policy"
              className="hover:text-orange-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-orange-400 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/contact"
              className="hover:text-orange-400 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomView;
