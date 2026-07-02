/** Public receipt verification URL for QR codes and email links. */
export function buildReceiptVerifyUrl(
  receiptNumber: string,
  donorEmail: string
): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dhe.org.in";
  const params = new URLSearchParams({
    receipt_number: receiptNumber,
    email: donorEmail,
  });
  return `${site}/receipt/verify?${params.toString()}`;
}
