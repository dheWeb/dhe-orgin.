import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { dheOfficialContact, dheOfficeAddress } from "@/data/institution/receipt-and-lmc";

export const metadata = createPageMetadata("accessibility");

export default function AccessibilityPage() {
  return (
    <div className="dhe-container py-8 sm:py-12 max-w-3xl prose prose-gray">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color not-prose">
        Accessibility Statement
      </h1>
      <p className="text-gray-600 not-prose mt-3">
        Department of Holistic Education (DHE) is committed to making{" "}
        <Link href="/">dhe.org.in</Link> accessible to the widest possible
        audience, in line with WCAG 2.1 Level AA where practicable.
      </p>

      <h2>Measures we take</h2>
      <ul>
        <li>Skip link to main content on every page</li>
        <li>Semantic headings, landmarks, and form labels</li>
        <li>Keyboard focus indicators on interactive controls</li>
        <li>Reduced-motion support for marquee and promotional content</li>
        <li>Cookie consent before third-party analytics or chat scripts load</li>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <li>Some legacy PDFs may not be fully tagged for screen readers</li>
        <li>Third-party embeds (maps, payment checkout) follow their own accessibility profiles</li>
        <li>Hindi content in notices may appear without a separate language toggle</li>
      </ul>

      <h2>Feedback and assistance</h2>
      <p>
        If you encounter a barrier on this site, contact us at{" "}
        <a href={`mailto:${dheOfficialContact.email}`}>{dheOfficialContact.email}</a>{" "}
        or call{" "}
        <a href={`tel:${dheOfficialContact.phone}`}>{dheOfficialContact.phone}</a>.
        Office: {dheOfficeAddress.full}.
      </p>
      <p>
        See also our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </div>
  );
}
