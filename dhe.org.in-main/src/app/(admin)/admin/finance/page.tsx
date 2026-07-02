import Link from "next/link";

const modules = [
  {
    href: "/admin/finance/donations",
    label: "Donations",
    desc: "View donations, export CSV, resend receipts",
  },
  {
    href: "/admin/memberships",
    label: "Memberships",
    desc: "Applications and CSV export",
  },
  {
    href: "/admin/finance/workshops",
    label: "Workshop registrations",
    desc: "Workshop sign-up list",
  },
] as const;

export default function AdminFinanceHubPage() {
  return (
    <div className="dhe-container py-10 max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Admin hub
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">Finance</h1>
      <p className="text-sm text-gray-600 mb-8">
        Donations, memberships, and paid registrations.
      </p>
      <ul className="space-y-3">
        {modules.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-orange-400"
            >
              <span className="font-medium text-gray-900">{item.label}</span>
              <span className="block text-sm text-gray-600 mt-1">{item.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
