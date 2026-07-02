import Link from "next/link";
import AdminSystemStatus from "./AdminSystemStatus";

const links = [
  {
    href: "/admin/notices",
    label: "Manage notices",
    desc: "Add, edit, delete notice board items",
  },
  {
    href: "/admin/finance/donations",
    label: "Donation records",
    desc: "View donations, export, email receipts",
  },
  {
    href: "/admin/inbox",
    label: "Form inbox",
    desc: "Feedback and contact messages",
  },
  {
    href: "/admin/cms",
    label: "Site content (CMS)",
    desc: "Edit all site snippets and JSON registries",
  },
  {
    href: "/admin/settings",
    label: "Site settings",
    desc: "Contact, footer, and global snippets (CMS shortcuts)",
  },
  {
    href: "/admin/finance/workshops",
    label: "Workshop registrations",
    desc: "View workshop sign-ups",
  },
  {
    href: "/admin/memberships",
    label: "Membership applications",
    desc: "View and export membership sign-ups",
  },
  {
    href: "/admin/finance",
    label: "Finance hub",
    desc: "Donations, memberships, workshops",
  },
  {
    href: "/contribute",
    label: "Public membership page",
    desc: "Public membership registration",
  },
] as const;

export default function AdminHubPage() {
  return (
    <div className="dhe-container py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">DHE Admin</h1>
      <p className="text-sm text-gray-600 mb-4">
        Signed in via Basic Auth or Supabase (allowlisted email). Choose a module below.
      </p>
      <p className="text-sm mb-4">
        <a
          href="/api/admin/auth/logout?redirect=/admin/login"
          className="text-orange-700 hover:underline"
        >
          Sign out (Supabase session)
        </a>
      </p>
      <AdminSystemStatus />
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-orange-400 transition"
            >
              <span className="font-medium text-gray-900">{item.label}</span>
              <span className="block text-sm text-gray-600 mt-1">{item.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-gray-600">
        API monitoring: <code className="text-xs">GET /api/health</code>
        {" · "}
        <code className="text-xs">GET /api/admin/payments/diagnostics</code>
        {" · "}
        <code className="text-xs">GET /api/admin/email/diagnostics</code>
      </p>
    </div>
  );
}
