import { redirect } from "next/navigation";

/** Legacy URL — canonical page is /leadership */
export default function CommitteeRedirect() {
  redirect("/leadership");
}
