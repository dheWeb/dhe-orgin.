"use client";

import React from "react";
import Link from "next/link";
import type { PublicContact } from "@/lib/cms/public-contact";
import { dheOfficeAddress, dheOfficialContact } from "@/data/institution/receipt-and-lmc";
import PageHero from "@/components/ui/PageHero";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";
import { HomeIcon } from "@/components/home/HomeIcons";

interface ContactInfo {
  name: string;
  title: string;
  organization: string;
  address: string;
  emails: string[];
  phones: string[];
  website: string;
}

function buildContactData(contact?: PublicContact): ContactInfo {
  const phone = contact?.phone ?? dheOfficialContact.phone;
  const email = contact?.email ?? dheOfficialContact.email;
  const office = contact?.officeAddress ?? dheOfficeAddress.full;

  return {
    name: "Department of Holistic Education",
    title: "Official Contact Office",
    organization: "Department of Holistic Education",
    address: `Vidya Bharti\n${office.replace(/, /g, "\n")}`,
    emails: [email],
    phones: [phone],
    website: contact?.website ?? dheOfficialContact.website,
  };
}

const whyContactCards = [
  {
    title: "Academic Collaboration",
    description:
      "School–university partnerships, curriculum dialogue, and NEP 2020 initiatives.",
    icon: "academic" as const,
  },
  {
    title: "Research & Innovation",
    description: "Research cells, innovation platforms, and educational technology.",
    icon: "innovation" as const,
  },
  {
    title: "Cell Activities",
    description: "Events, publications, skills, leadership, and community programs.",
    icon: "events" as const,
  },
  {
    title: "Workshops & Events",
    description: "Shiksha Mahakumbh, workshops, and institutional participation.",
    icon: "summit" as const,
  },
  {
    title: "Membership Support",
    description: "Join DHE, membership categories, and registration guidance.",
    icon: "leadership" as const,
  },
] as const;

const assistanceLinks = [
  { href: "/contribute", label: "Membership", description: "Join DHE" },
  { href: "/feedback", label: "Feedback", description: "Share your experience" },
  { href: "/donation", label: "Donation", description: "Support DHE (80G)" },
  { href: "/upcomingevent", label: "Upcoming Events", description: "Programs & conferences" },
  { href: "/noticeboard", label: "Notice Board", description: "Official updates" },
  { href: "/people", label: "Cell Co-ordinators", description: "Contacts by cell" },
] as const;

const ContactUs: React.FC<{ contact?: PublicContact }> = ({ contact }) => {
  const contactData = buildContactData(contact);
  const addressLines = contactData.address.split("\n");

  return (
    <div className="bg-white min-w-0">
      <PageHero
        eyebrow="Official correspondence"
        title="Contact DHE"
        description="Connect with the Department of Holistic Education for institutional collaboration, membership, events, research, and cell-level programs."
      />

      <div className="dhe-container py-10 sm:py-12 space-y-10 max-w-6xl mx-auto">
        <section aria-labelledby="why-contact-heading">
          <h2 id="why-contact-heading" className="text-xl font-bold text-gray-900">
            Why contact DHE
          </h2>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {whyContactCards.map((card) => (
              <li key={card.title}>
                <HomeFeatureCard
                  title={card.title}
                  description={card.description}
                  icon={<HomeIcon name={card.icon} className="w-5 h-5" />}
                />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="assistance-heading">
          <h2 id="assistance-heading" className="text-xl font-bold text-gray-900">
            Quick links
          </h2>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {assistanceLinks.map((item) => (
              <li key={item.href}>
                <HomeFeatureCard
                  href={item.href}
                  title={item.label}
                  description={item.description}
                />
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="official-contact-heading"
          className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8 shadow-dhe-sm max-w-2xl"
        >
          <h2 id="official-contact-heading" className="text-xl font-bold text-gray-900">
            Official contact details
          </h2>
          <div className="mt-4 space-y-4 text-sm text-gray-700">
            <p>
              <strong>{contactData.name}</strong>
              <br />
              {contactData.title}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Address</span>
              <br />
              {addressLines.map((line) => (
                <React.Fragment key={line}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Email</span>
              <br />
              {contactData.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="text-orange-700 hover:underline"
                >
                  {email}
                </a>
              ))}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Phone / WhatsApp</span>
              <br />
              {contactData.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="text-orange-700 hover:underline">
                  {phone}
                </a>
              ))}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Website</span>{" "}
              <a
                href={contactData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:underline"
              >
                www.dhe.org.in
              </a>
            </p>
          </div>
          <nav className="mt-6 flex flex-wrap gap-4 text-sm" aria-label="Related pages">
            <Link href="/messages" className="text-orange-700 font-medium hover:underline">
              Director&apos;s Message
            </Link>
            <Link href="/structure" className="text-orange-700 font-medium hover:underline">
              Cells &amp; Structure
            </Link>
            <Link href="/accountdetails" className="text-orange-700 font-medium hover:underline">
              Account details
            </Link>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
