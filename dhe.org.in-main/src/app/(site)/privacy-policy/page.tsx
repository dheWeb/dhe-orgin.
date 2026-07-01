import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { dheOfficialContact, dheOfficeAddress } from "@/data/institution";

export const metadata = createPageMetadata("privacyPolicy");

export default function PrivacyPolicyPage() {
  return (
    <div className="dhe-container py-10 max-w-3xl mx-auto prose prose-slate">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-600">Last updated: 30 June 2026</p>

      <p>
        The Department of Holistic Education (DHE), a unit of Vidya Bharti
        Institute of Training and Research Trust, respects your privacy. This
        policy explains how we collect, use, and protect personal information on{" "}
        <strong>www.dhe.org.in</strong>.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you submit (name, email, phone) via forms</li>
        <li>Donation and membership payment metadata via Razorpay</li>
        <li>Technical logs (IP, browser) for security and analytics</li>
        <li>Cookies when you consent to non-essential scripts</li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>Process registrations, donations, and membership</li>
        <li>Send receipts and official communications</li>
        <li>Improve website security and performance</li>
        <li>Comply with applicable law</li>
      </ul>

      <h2>Data sharing</h2>
      <p>
        We use trusted processors: Razorpay (payments), Brevo (email), Vercel
        (hosting), Supabase (database), Google (reCAPTCHA, optional AdSense),
        and Botpress (chat, only after cookie consent).
      </p>

      <h2>Your rights (India DPDP Act &amp; general privacy)</h2>
      <p>
        You may request access, correction, erasure, or grievance redressal by
        emailing{" "}
        <a href={`mailto:${dheOfficialContact.email}`}>
          {dheOfficialContact.email}
        </a>
        . We respond within 30 days where required by law.
      </p>

      <h2>Third-party embeds</h2>
      <p>
        Google Maps on the contact page, Botpress chat (after cookie consent),
        and Google AdSense (after consent) may collect usage data per their
        policies. Disable non-essential cookies to limit this processing.
      </p>

      <h2>Retention</h2>
      <p>
        Donation and 80G records: retained for 8 years per Income Tax rules.
        Workshop and contact form data: up to 3 years unless you request
        deletion sooner. Payment metadata is retained per Razorpay and statutory
        requirements.
      </p>

      <h2>Contact</h2>
      <p>
        {dheOfficeAddress.full}
        <br />
        Phone: {dheOfficialContact.phone}
        <br />
        Email: {dheOfficialContact.email}
      </p>

      <p>
        <Link href="/terms">Terms of Use</Link> · <Link href="/contact">Contact</Link>
      </p>
    </div>
  );
}
