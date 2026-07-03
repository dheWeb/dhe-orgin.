import Link from "next/link";
import { dheOfficialContact, dheOfficeAddress } from "@/data/institution";

type Props = {
  phone?: string;
  email?: string;
  officeAddress?: string;
};

export default function FooterConnect({
  phone = dheOfficialContact.phone,
  email = dheOfficialContact.email,
  officeAddress = dheOfficeAddress.full,
}: Props) {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Department+of+Holistic+Education+Sunny+Enclave+SAS+Nagar";

  return (
    <div>
      <h3 className="text-lg font-bold text-orange-200">Connect</h3>
      <ul className="mt-4 space-y-3 text-sm text-gray-300">
        <li>
          <span className="block text-xs uppercase tracking-wide text-gray-500">Email</span>
          <a href={`mailto:${email}`} className="text-orange-300 hover:underline font-medium">
            {email}
          </a>
        </li>
        <li>
          <span className="block text-xs uppercase tracking-wide text-gray-500">Phone / WhatsApp</span>
          <a href={`tel:${phone}`} className="text-orange-300 hover:underline font-medium">
            +91 {phone}
          </a>
        </li>
        <li>
          <span className="block text-xs uppercase tracking-wide text-gray-500">Office</span>
          <span className="leading-relaxed">{officeAddress}</span>
        </li>
      </ul>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link href="/contact" className="dhe-btn-primary text-sm text-center flex-1">
          Contact DHE
        </Link>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dhe-btn-ghost-light text-sm text-center flex-1"
        >
          View on map ↗
        </a>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        For institutional inquiries use the official contact page — maps opens externally.
      </p>
    </div>
  );
}
