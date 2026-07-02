import Link from "next/link";

const CMS_KEYS = [
  {
    key: "site_contact",
    label: "Official phone, email, address",
    desc: "Used in footer, contact page, and receipts",
  },
  {
    key: "footer_mission",
    label: "Footer mission text",
    desc: "Short blurb below the DHE logo in the footer",
  },
  {
    key: "marquee_items",
    label: "Home marquee ticker",
    desc: "Announcement links on the homepage",
  },
] as const;

export default function AdminSettingsPage() {
  return (
    <div className="dhe-container py-10 max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Admin hub
      </Link>
      <h1 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">Site settings</h1>
      <p className="text-sm text-gray-600 mb-8">
        Institution contact and global snippets are edited in the CMS. Full relational{" "}
        <code className="text-xs">site_settings</code> table is planned for a later phase.
      </p>
      <ul className="space-y-3 mb-8">
        {CMS_KEYS.map((item) => (
          <li key={item.key}>
            <Link
              href={`/admin/cms#${item.key}`}
              className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-orange-400"
            >
              <span className="font-medium text-gray-900">{item.label}</span>
              <span className="block text-sm text-gray-600 mt-1">{item.desc}</span>
              <span className="block text-xs text-gray-400 mt-1">CMS key: {item.key}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-600">
        <Link href="/admin/cms" className="text-orange-700 hover:underline">
          Open full CMS editor →
        </Link>
      </p>
      <p className="mt-6 text-xs text-gray-500">
        Environment toggles (maintenance mode, AdSense, Botpress) remain in Vercel env vars
        until the relational settings table ships.
      </p>
    </div>
  );
}
