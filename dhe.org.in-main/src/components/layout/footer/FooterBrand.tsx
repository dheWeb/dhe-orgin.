import Image from "next/image";
import Link from "next/link";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterVisitorStats from "./FooterVisitorStats";

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=100090170940886",
    label: "DHE on Facebook",
    icon: faFacebook,
    hover: "hover:text-blue-400",
  },
  {
    href: "https://www.linkedin.com/company/department-of-holistic-education/",
    label: "DHE on LinkedIn",
    icon: faLinkedin,
    hover: "hover:text-blue-300",
  },
  {
    href: "https://www.instagram.com/dhebharat",
    label: "DHE on Instagram",
    icon: faInstagram,
    hover: "hover:text-pink-400",
  },
  {
    href: "https://twitter.com/DHEBharat1",
    label: "DHE on X",
    icon: faXTwitter,
    hover: "hover:text-sky-400",
  },
  {
    href: "https://www.youtube.com/@DepartmentofHolisticEducation",
    label: "DHE on YouTube",
    icon: faYoutube,
    hover: "hover:text-red-500",
  },
] as const;

export default function FooterBrand({ mission }: { mission: string }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-white p-2 shadow-dhe-sm">
          <Image
            src="/logo.webp"
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 object-contain"
            aria-hidden
          />
        </div>
        <div>
          <p className="text-xl font-bold leading-tight">
            Department of
            <span className="block text-orange-300">Holistic Education</span>
          </p>
          <p className="text-sm text-gray-400 mt-0.5">
            National Educational Transformation Platform
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-md">{mission}</p>

      <div className="flex items-center gap-4 mt-6" role="list" aria-label="Social media">
        {socialLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`text-gray-300 ${item.hover} motion-safe:transition-colors min-h-11 min-w-11 inline-flex items-center justify-center`}
          >
            <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
          </a>
        ))}
      </div>

      <FooterVisitorStats />
    </div>
  );
}
