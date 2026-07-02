import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { dheOfficialContact, vbitrTrust } from "@/data/institution";

export const metadata = createPageMetadata("refundPolicy");

export default function RefundPolicyPage() {
  return (
    <div className="dhe-container py-10 max-w-3xl mx-auto prose prose-slate">
      <h1>Refund &amp; Cancellation Policy</h1>
      <p className="text-sm text-gray-600">Last updated: 30 June 2026</p>

      <p>
        This policy applies to online payments made on{" "}
        <strong>www.dhe.org.in</strong> through Razorpay for donations,
        membership, and event registrations processed by{" "}
        <strong>{vbitrTrust.legalName}</strong> on behalf of the Department of
        Holistic Education (DHE).
      </p>

      <h2>Donations</h2>
      <p>
        Voluntary donations are generally non-refundable once payment is
        captured, as funds are allocated to ongoing educational programs.
        If you believe a payment was made in error or without authorization,
        contact us within <strong>7 calendar days</strong> with your Razorpay
        payment ID and receipt number (if issued). Verified duplicate or
        fraudulent transactions will be refunded to the original payment method
        within 10–15 business days.
      </p>

      <h2>Membership &amp; registrations</h2>
      <p>
        Membership fees and event registration fees may be refundable when a
        program is cancelled by DHE or when cancellation is requested at least{" "}
        <strong>14 days</strong> before the event start date, subject to
        administrative review. Late cancellations or no-shows are not eligible
        for refund unless required by applicable law.
      </p>

      <h2>Processing</h2>
      <ul>
        <li>Approved refunds are initiated via Razorpay to the original payer.</li>
        <li>Bank settlement timelines vary (typically 5–10 business days).</li>
        <li>80G receipts issued for refunded donations are voided.</li>
      </ul>

      <h2>How to request a refund</h2>
      <p>
        Email{" "}
        <a href={`mailto:${dheOfficialContact.email}`}>
          {dheOfficialContact.email}
        </a>{" "}
        or call{" "}
        <a href={`tel:${dheOfficialContact.phone}`}>{dheOfficialContact.phone}</a>{" "}
        with your name, payment ID, amount, and reason. For donation receipts,
        you may also use the{" "}
        <Link href="/receipt/verify">receipt verification</Link> page.
      </p>

      <p>
        See also our <Link href="/terms">Terms of Use</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </div>
  );
}
