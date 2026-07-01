import React from "react";
import Link from "next/link";

interface ContactInfo {
  name: string;
  title: string;
  organization: string;
  address: string;
  emails: string[];
  phones: string[];
  website: string;
}

const contactData: ContactInfo = {
  name: "Thakur Ramendra Pratap Singh Rana",
  title: "Project Manager",
  organization: "Department of Holistic Education",
  address: "Vidya Bharti\nPlot No. 1, Sector 71, SAS Nagar (Mohali) – 160071",
  emails: ["director@dhe.org.in"],
  phones: ["7903431900"],
  website: "https://www.dhe.org.in",
};

const whyContactCards = [
  {
    title: "Academic Collaboration",
    description:
      "Connect with DHE on school–university partnerships, curriculum dialogue, and initiatives aligned with NEP 2020 and holistic learning.",
  },
  {
    title: "Research & Innovation",
    description:
      "Inquire about research cells, innovation platforms, and educational technology initiatives advanced through the Department.",
  },
  {
    title: "Cell Activities",
    description:
      "Reach out regarding specialized cells—from events and publications to skills, leadership, and community-focused programs.",
  },
  {
    title: "Workshops & Events",
    description:
      "Ask about workshops, Shiksha Mahakumbh-related programs, past and upcoming events, and institutional participation.",
  },
  {
    title: "Membership Support",
    description:
      "Questions about joining DHE, membership categories, fees, and how to complete registration through official channels.",
  },
] as const;

const assistanceLinks = [
  { href: "/contribute", label: "Membership", description: "Join DHE and explore membership benefits" },
  { href: "/feedback", label: "Feedback", description: "Share your experience with DHE programs" },
  { href: "/donation", label: "Donation", description: "Support holistic education initiatives" },
  { href: "/upcomingevent", label: "Upcoming Events", description: "View upcoming programs and conferences" },
  { href: "/noticeboard", label: "DHE Notice Board", description: "Official notices and program updates" },
  { href: "/people", label: "Cell Co-ordinators", description: "Coordinator contacts by cell" },
] as const;

const ContactUs: React.FC = () => {
  const addressLines = contactData.address.split("\n");

  return (
    <div className="bg-white min-w-0">
      <div className="dhe-container py-6 sm:py-10 space-y-10 sm:space-y-12">
        <header className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Contact the Department of Holistic Education
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Official contact page for the Department of Holistic Education (DHE),
            a national platform advancing holistic learning, innovation, and
            educational transformation in alignment with NEP 2020.
          </p>
        </header>

        <section aria-labelledby="get-in-touch-heading">
          <h2
            id="get-in-touch-heading"
            className="text-xl sm:text-2xl font-semibold text-primary-color"
          >
            Get in Touch with DHE
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl">
            <p>
              This page helps educators, institutions, students, partners, and
              well-wishers connect with DHE for legitimate institutional
              purposes. You may use the contact details below for formal
              correspondence related to the Department&apos;s programs and cells.
            </p>
            <p>
              Common reasons to contact DHE include educational collaborations,
              membership inquiries, participation in workshops and national
              conferences such as Shiksha Mahakumbh, research and innovation
              partnerships, and general institutional support.
            </p>
            <ul className="list-disc pl-5 space-y-2" role="list">
              <li>Educational collaborations with schools and institutions</li>
              <li>Membership and volunteer engagement through official registration</li>
              <li>Workshops, residential camps, and national event participation</li>
              <li>Research, innovation, and cell-level initiatives</li>
              <li>Partnerships supporting holistic education and outreach</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="why-contact-heading">
          <h2
            id="why-contact-heading"
            className="text-xl sm:text-2xl font-semibold text-primary-color"
          >
            Why Contact DHE
          </h2>
          <ul
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            role="list"
          >
            {whyContactCards.map((card) => (
              <li
                key={card.title}
                className="rounded-lg border border-orange-100 bg-orange-50/40 p-4 min-h-[8rem]"
              >
                <h3 className="text-base font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="assistance-heading">
          <h2
            id="assistance-heading"
            className="text-xl sm:text-2xl font-semibold text-primary-color"
          >
            Need Immediate Assistance?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl">
            For common requests, you can also visit these official pages on the
            DHE website.
          </p>
          <ul
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
            role="list"
          >
            {assistanceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col min-h-11 rounded-lg border border-gray-200 p-4 hover:border-orange-400 hover:bg-orange-50/50 motion-safe:transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  <span className="font-semibold text-orange-700">
                    {item.label}
                  </span>
                  <span className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="official-contact-heading"
          className="max-w-2xl"
        >
          <h2
            id="official-contact-heading"
            className="text-xl sm:text-2xl font-semibold text-primary-color"
          >
            Official Contact Details
          </h2>
          <div className="mt-4 p-6 rounded-lg shadow-lg border border-gray-100 bg-white text-gray-900">
            <p>
              <strong>{contactData.name}</strong>
              <br />
              {contactData.title}
              <br />
              {contactData.organization}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Address:</span>
              <br />
              {addressLines.map((line) => (
                <React.Fragment key={line}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Email:</span>
              <br />
              {contactData.emails.map((email) => (
                <React.Fragment key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-orange-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                  >
                    {email}
                  </a>
                  <br />
                </React.Fragment>
              ))}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Mobile / WhatsApp:</span>
              <br />
              {contactData.phones.map((phone) => (
                <React.Fragment key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="text-orange-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                  >
                    {phone}
                  </a>
                  <br />
                </React.Fragment>
              ))}
            </p>
            <p className="mt-4">
              <span className="font-semibold">Website:</span>{" "}
              <a
                href={contactData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              >
                www.dhe.org.in
              </a>
            </p>
          </div>
          <nav
            className="mt-6 flex flex-wrap gap-3 text-sm"
            aria-label="Related institutional pages"
          >
            <Link
              href="/messages"
              className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
            >
              Director&apos;s Message
            </Link>
            <Link
              href="/structure"
              className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
            >
              Cells &amp; Structure
            </Link>
            <Link
              href="/accountdetails"
              className="text-orange-700 hover:underline min-h-11 inline-flex items-center"
            >
              Official account details
            </Link>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
