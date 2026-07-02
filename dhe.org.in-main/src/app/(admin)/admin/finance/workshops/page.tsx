import { redirect } from "next/navigation";

export default function LegacyWorkshopAdminRedirect() {
  redirect("/admin/finance/workshops");
}
