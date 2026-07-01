import type { RazorpayPaymentEntity } from "@/lib/payments/types";

/** Map Razorpay REST payment object to webhook entity shape. */
export function mapRazorpayPayment(raw: Record<string, unknown>): RazorpayPaymentEntity {
  return {
    id: String(raw.id),
    entity: "payment",
    amount: Number(raw.amount),
    currency: String(raw.currency ?? "INR"),
    status: String(raw.status),
    order_id: String(raw.order_id),
    email: raw.email ? String(raw.email) : undefined,
    contact: raw.contact ? String(raw.contact) : undefined,
    notes:
      raw.notes && typeof raw.notes === "object"
        ? (raw.notes as Record<string, string>)
        : undefined,
    error_code: raw.error_code ? String(raw.error_code) : null,
    error_description: raw.error_description
      ? String(raw.error_description)
      : null,
  };
}
