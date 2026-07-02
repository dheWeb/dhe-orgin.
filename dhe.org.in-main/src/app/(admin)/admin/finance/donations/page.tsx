import { redirect } from "next/navigation";

export default function LegacyDonationAdminRedirect() {
  redirect("/admin/finance/donations");
}
