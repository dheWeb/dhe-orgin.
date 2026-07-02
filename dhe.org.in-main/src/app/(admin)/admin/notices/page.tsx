import { redirect } from "next/navigation";

export default function LegacyNoticeAdminRedirect() {
  redirect("/admin/notices");
}
