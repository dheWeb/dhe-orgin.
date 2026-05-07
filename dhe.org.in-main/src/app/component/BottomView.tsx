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

import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";
import { Spin } from "antd";
import { db } from "@/app/firebase";

const BottomView: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [dailyVisitors, setDailyVisitors] = useState<number | null>(null);
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const totalDocRef = doc(db, "visitors", "total");
    const dailyDocRef = doc(db, "visitors", "daily");

    const today = new Date().toISOString().split("T")[0];

    const updateVisitorCount = async () => {
      try {
        const totalDocSnap = await getDoc(totalDocRef);
        const dailyDocSnap = await getDoc(dailyDocRef);

        if (!totalDocSnap.exists()) {
          await setDoc(totalDocRef, { count: 0 });
        }

        if (!dailyDocSnap.exists()) {
          await setDoc(dailyDocRef, {
            count: 0,
            date: today,
          });
        }

        await updateDoc(totalDocRef, {
          count: increment(1),
        });

        await updateDoc(dailyDocRef, {
          count: increment(1),
        });
      } catch (error) {
        console.error(error);
      }
    };

    updateVisitorCount();

    const unsubscribeTotal = onSnapshot(totalDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setTotalVisitors(docSnap.data().count);
        setLoading(false);
      }
    });

    const unsubscribeDaily = onSnapshot(dailyDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setDailyVisitors(docSnap.data().count);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeTotal();
      unsubscribeDaily();
    };
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "contactMessages"), {
        email,
        message,
        timestamp: new Date(),
      });

      toast.success("Message Sent Successfully");

      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  const ecosystem = [
    {
      name: "DHE",
      image: "/logo.png",
      link: "https://www.dhe.org.in/",
    },
    {
      name: "Shiksha Mahakumbh",
      image: "/logos/rase.png",
      link: "https://www.rase.co.in/",
    },
    {
      name: "Vidya Bharti",
      image: "/vidyabharti.png",
      link: "https://vidyabharti.net/",
    },
    {
      name: "Sarvatra",
      image: "/sarvatra.png",
      link: "https://www.sarvatr.co.in/",
    },
    {
      name: "Tredul",
      image: "/tre-dul.png",
      link: "https://tredul.in/",
    },
    {
      name: "Jobs 360°",
      image: "/job360.png",
      link: "https://jobs360degree.com/",
    },
    {
      name: "Swadeshi Bazaar",
      image: "/sb.png",
      link: "https://www.swadeshibazaar.co.in/",
    },
    {
      name: "Poojawala",
      image: "/pooja.png",
      link: "https://poojawala.in/",
    },
    {
      name: "TuDu",
      image: "/Tudu.png",
      link: "https://tudu.co.in/",
    },
    {
      name: "Viksit India",
      image: "/vi.png",
      link: "https://vi.rase.co.in/",
    },
    {
      name: "Punjab Super 100",
      image: "/pb100.png",
      link: "https://punjabsuper100.com/",
    },
    {
      name: "ITR Chandigarh",
      image: "/logo 2.png",
      link: "https://www.itrchandigarh.org/",
    },
  ];

  return (
    <footer className="bg-[#07111f] text-white border-t border-orange-200">

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
                  src="/logo.png"
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

                <p className="text-sm text-gray-400 mt-1">
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
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>

              <a
                href="https://www.linkedin.com/company/department-of-holistic-education/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>

              <a
                href="https://www.instagram.com/dhebharat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>

              <a
                href="https://twitter.com/DHEBharat1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>

              <a
                href="https://www.youtube.com/@DepartmentofHolisticEducation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition duration-300"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>

            {/* VISITORS */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Daily Visitors
                </p>

                <h2 className="text-3xl font-bold text-orange-400">
                  {loading ? <Spin /> : dailyVisitors}
                </h2>
              </div>

              <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                  Total Visitors
                </p>

                <h2 className="text-3xl font-bold text-orange-400">
                  {loading ? <Spin /> : totalVisitors}
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

                <p className="text-sm text-gray-400 mt-1">
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

              <input
                type="email"
                placeholder="Your Email Address"
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

              <textarea
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

          <p className="text-sm text-gray-400 text-center lg:text-left">
            © 2026 Department of Holistic Education.
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">

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
