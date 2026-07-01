import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { dheOfficialContact, dheOfficeAddress } from "@/data/institution";

export const metadata = createPageMetadata("privacyPolicy");

export default function PrivacyPolicyPage() {
  return (
    <div className="dhe-container py-10 max-w-3xl mx-auto prose prose-slate">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500">Last updated: 30 June 2026</p>

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

      <h2>Your rights</h2>
      <p>
        You may request access, correction, or deletion of your data by
        contacting{" "}
        <a href={`mailto:${dheOfficialContact.email}`}>
          {dheOfficialContact.email}
        </a>
        . We respond within 30 days where required by law.
      </p>

      <h2>Retention</h2>
      <p>
        Financial records are retained as required for tax and 80G compliance.
        Marketing data is deleted on request unless legally required.
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
