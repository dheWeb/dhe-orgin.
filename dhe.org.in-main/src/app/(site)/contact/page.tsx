import ContactUs from "@/components/forms/ContactForm";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("contact");

export default function ContactPage() {
  return <ContactUs />;
}
