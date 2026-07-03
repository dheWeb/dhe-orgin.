import Link from "next/link";
import { vbitrTrust } from "@/data/institution";

const trustItems = [
  { href: "/transparency", label: "Transparency" },
  { href: vbitrTrust.trustDeed.documentPath, label: "VBITR Trust Deed", external: true },
  { href: vbitrTrust.approval80G.documentPath, label: "80G certificate", external: true },
  { href: "/donation", label: "Donate with 80G" },
  { href: "/receipt/verify", label: "Verify receipt" },
] as const;

export default function FooterTrustStrip() {
  return (
    <div className="border-b border-gray-700/80 bg-[#0a1628]">
      <div className="dhe-container py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
          Institutional trust
        </p>
        <ul className="flex flex-wrap gap-2" role="list">
          {trustItems.map((item) => (
            <li key={item.href}>
              {"external" in item && item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-200 hover:bg-orange-500/20 motion-safe:transition-colors"
                >
                  {item.label} ↗
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-200 hover:bg-orange-500/20 motion-safe:transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
