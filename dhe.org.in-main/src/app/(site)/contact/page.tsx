import ContactUs from "@/components/forms/ContactForm";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { getPublicContact } from "@/lib/cms/public-contact";

export const metadata = createPageMetadata("contact");

export default async function ContactPage() {
  const contact = await getPublicContact();
  return <ContactUs contact={contact} />;
}
