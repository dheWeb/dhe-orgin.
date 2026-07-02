import { getSiteContent } from "@/lib/cms/site-content";
import {
  dheOfficialContact,
  dheOfficeAddress,
} from "@/data/institution/receipt-and-lmc";

export type PublicContact = {
  phone: string;
  email: string;
  officeAddress: string;
  website: string;
};

const FALLBACK: PublicContact = {
  phone: dheOfficialContact.phone,
  email: dheOfficialContact.email,
  officeAddress: dheOfficeAddress.full,
  website: dheOfficialContact.website,
};

export async function getPublicContact(): Promise<PublicContact> {
  const content = await getSiteContent(["site_contact"]);
  const row = content.site_contact ?? {};

  return {
    phone: row.phone?.trim() || FALLBACK.phone,
    email: row.email?.trim() || FALLBACK.email,
    officeAddress:
      row.office_address?.trim() || dheOfficeAddress.full,
    website: FALLBACK.website,
  };
}
