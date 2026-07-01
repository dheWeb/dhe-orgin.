import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { dheOfficialContact, vbitrTrust } from "@/data/institution";

export const metadata = createPageMetadata("terms");

export default function TermsPage() {
  return (
    <div className="dhe-container py-10 max-w-3xl mx-auto prose prose-slate">
      <h1>Terms of Use</h1>
      <p className="text-sm text-gray-500">Last updated: 30 June 2026</p>

      <p>
        By using <strong>www.dhe.org.in</strong>, you agree to these terms. The
        site is operated by the Department of Holistic Education (DHE), a unit
        of {vbitrTrust.legalName}.
      </p>

      <h2>Use of the website</h2>
      <ul>
        <li>Content is for informational and official DHE purposes only.</li>
        <li>Do not misuse forms, attempt unauthorized access, or scrape PII.</li>
        <li>Donations are voluntary and processed via Razorpay.</li>
      </ul>

      <h2>Donations &amp; 80G</h2>
      <p>
        Eligible donations may qualify for deduction under Section 80G of the
        Income Tax Act, subject to {vbitrTrust.legalName} provisional approval
        (Certificate No. {vbitrTrust.approval80G.number}). Receipts are issued
        electronically after successful payment.
      </p>

      <h2>Intellectual property</h2>
      <p>
        DHE logos, publications, and site content remain the property of DHE /
        VBITR Trust unless otherwise credited. Reuse requires written
        permission.
      </p>

      <h2>Disclaimer</h2>
      <p>
        We strive for accuracy but do not warrant that all content is complete
        or current. External links are provided for convenience.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at Punjab shall have jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href={`mailto:${dheOfficialContact.email}`}>
          {dheOfficialContact.email}
        </a>
      </p>

      <p>
        <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
        <Link href="/contact">Contact</Link>
      </p>
    </div>
  );
}
