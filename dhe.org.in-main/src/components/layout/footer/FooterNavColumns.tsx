import Link from "next/link";
import { footerNavColumns } from "@/data/footer-nav";

export default function FooterNavColumns() {
  return (
    <nav
      aria-label="Footer site navigation"
      className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6"
    >
      {footerNavColumns.map((column) => (
        <div key={column.title}>
          <h3 className="text-sm font-bold uppercase tracking-wide text-orange-300">
            {column.title}
          </h3>
          <ul className="mt-3 space-y-2" role="list">
            {column.links.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-white hover:underline underline-offset-2 min-h-9 inline-flex items-center"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white hover:underline underline-offset-2 min-h-9 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
