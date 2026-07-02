import { createPageMetadata } from "@/lib/seo/build-metadata";
import ReceiptVerifyClient from "./ReceiptVerifyClient";

export const metadata = createPageMetadata("receiptVerify");

export default function ReceiptVerifyPage() {
  return <ReceiptVerifyClient />;
}
