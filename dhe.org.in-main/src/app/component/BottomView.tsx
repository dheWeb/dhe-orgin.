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
          await setDoc(dailyDocRef, { count: 0, date: today });
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

  const initiatives = [
    {
      name: "RASE",
      image: "/logos/rase.png",
      link: "https://www.rase.co.in/",
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
      name: "TuDu",
      image: "/Tudu.png",
      link: "https://tudu.co.in/",
    },
  ];

  return (
    <footer className="bg-[#0b1220] text-white pt-14 border-t border-orange-200">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-gray-700">
          
          {/* About DHE */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="DHE Logo"
                width={70}
                height={70}
                className="rounded-full bg-white p-1"
              />

              <div>
                <h2 className="text-xl font-bold text-white">
                  Department of Holistic Education
                </h2>

                <p className="text-sm text-orange-300">
                  Educational Transformation Platform
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-7 text-sm">
              Advancing Bharat’s educational ecosystem through
              innovation, leadership, research, and holistic
              learning aligned with NEP 2020.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              
              <a
                href="https://www.facebook.com/profile.php?id=100090170940886&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>

              <a
                href="https://www.linkedin.com/company/department-of-holistic-education/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>

              <a
                href="https://www.instagram.com/dhebharat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>

              <a
                href="https://twitter.com/DHEBharat1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>

              <a
                href="https://www.youtube.com/@DepartmentofHolisticEducation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-orange-300">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-300 text-sm">
              <Link href="/" className="hover:text-orange-400">
                Home
              </Link>

              <Link href="/structure" className="hover:text-orange-400">
                About DHE
              </Link>

              <Link href="/pastevent" className="hover:text-orange-400">
                Events
              </Link>

              <Link href="/contribute" className="hover:text-orange-400">
                Join DHE
              </Link>

              <Link href="/contact" className="hover:text-orange-400">
                Contact Us
              </Link>

              <Link
                href="/Recruitment-Policy.pdf"
                className="hover:text-orange-400"
              >
                Recruitment Policy
              </Link>
            </div>
          </div>

          {/* Initiatives */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-orange-300">
              DHE Initiatives
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {initiatives.map((item, index) => (
                <a
                  href={item.link}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-3 hover:scale-105 transition duration-300 shadow-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-contain mx-auto h-12"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-orange-300">
              Connect With Us
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <input
                type="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Visitor Stats + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 border-b border-gray-700">
          
          {/* Visitors */}
          <div>
            <h3 className="text-xl font-bold text-orange-300 mb-5">
              Visitor Insights
            </h3>

            <div className="flex flex-wrap gap-6">
              
              <div className="bg-[#111827] p-6 rounded-2xl border border-gray-700 min-w-[220px]">
                <p className="text-gray-400 text-sm mb-2">
                  Daily Visitors
                </p>

                <h2 className="text-3xl font-bold text-white">
                  {loading ? <Spin /> : dailyVisitors}
                </h2>
              </div>

              <div className="bg-[#111827] p-6 rounded-2xl border border-gray-700 min-w-[220px]">
                <p className="text-gray-400 text-sm mb-2">
                  Total Visitors
                </p>

                <h2 className="text-3xl font-bold text-white">
                  {loading ? <Spin /> : totalVisitors}
                </h2>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-xl font-bold text-orange-300 mb-5">
              Locate Us
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl">
              <iframe
                className="w-full h-72"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.6604613704103!2d76.70609037438652!3d30.699827987224253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef39a32ed3c1%3A0x9ff15a51ad5117e9!2sDepartment%20of%20Holistic%20Education!5e0!3m2!1sen!2sin!4v1708812880069!5m2!1sen!2sin"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          
          <p>
            © 2026 Department of Holistic Education. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-orange-400">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-orange-400">
              Terms & Conditions
            </Link>

            <Link href="/contact" className="hover:text-orange-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomView;
