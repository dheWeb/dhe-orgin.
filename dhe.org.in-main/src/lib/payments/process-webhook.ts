import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type {
  RazorpayPaymentEntity,
  RazorpayWebhookEvent,
} from "@/lib/payments/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function paymentFromEvent(event: RazorpayWebhookEvent): RazorpayPaymentEntity | null {
  return event.payload.payment?.entity ?? null;
}

async function allocateReceiptNumber(): Promise<string> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase.rpc("next_receipt_number");
  if (error || !data) {
    throw new Error(error?.message || "Failed to allocate receipt number");
  }
  return data as string;
}

type OrderRow = {
  id: string;
  purpose: string;
  payer_name: string | null;
  payer_email: string | null;
  payer_phone: string | null;
  metadata: Record<string, unknown> | null;
};

async function loadOrderRow(orderId: string): Promise<OrderRow | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase
    .from("payment_orders")
    .select("id, purpose, payer_name, payer_email, payer_phone, metadata")
    .eq("razorpay_order_id", orderId)
    .maybeSingle();
  return data as OrderRow | null;
}

function payerFromPayment(payment: RazorpayPaymentEntity, orderRow: OrderRow | null) {
  const notes = payment.notes ?? {};
  return {
    name: orderRow?.payer_name || notes.name || notes.donor_name || "Member",
    email: orderRow?.payer_email || payment.email || notes.email || null,
    phone: orderRow?.payer_phone || payment.contact || notes.phone || null,
    meta: (orderRow?.metadata ?? {}) as Record<string, string>,
    pan: (orderRow?.metadata as { pan?: string })?.pan ?? notes.pan ?? null,
    address:
      (orderRow?.metadata as { address?: string })?.address ?? notes.address ?? null,
  };
}

async function processDonationCaptured(
  payment: RazorpayPaymentEntity,
  orderRow: OrderRow | null
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured");

  const { data: existing } = await supabase
    .from("donations")
    .select("id, receipt_number")
    .eq("razorpay_payment_id", payment.id)
    .maybeSingle();

  if (existing?.id) {
    const { sendDonationReceiptIfNeeded } = await import(
      "@/lib/email/send-donation-receipt-if-needed"
    );
    await sendDonationReceiptIfNeeded(existing.id);
    return;
  }

  const payer = payerFromPayment(payment, orderRow);
  const receiptNumber = await allocateReceiptNumber();

  const { data: inserted, error: donationError } = await supabase
    .from("donations")
    .insert({
      payment_order_id: orderRow?.id ?? null,
      razorpay_payment_id: payment.id,
      razorpay_order_id: payment.order_id,
      amount_paise: payment.amount,
      donor_name: payer.name,
      donor_email: payer.email,
      donor_phone: payer.phone,
      donor_address: payer.address,
      receipt_number: receiptNumber,
      status: "captured",
      pan: payer.pan,
      metadata: { currency: payment.currency, notes: payment.notes ?? {} },
    })
    .select("id")
    .single();

  if (donationError) throw new Error(donationError.message);

  if (inserted?.id) {
    const { sendDonationReceiptIfNeeded } = await import(
      "@/lib/email/send-donation-receipt-if-needed"
    );
    const result = await sendDonationReceiptIfNeeded(inserted.id);
    if (result.error && !result.skipped) {
      console.error("[webhook] donation receipt email failed", result.error);
    }
  }
}

async function processMembershipCaptured(
  payment: RazorpayPaymentEntity,
  orderRow: OrderRow | null
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase is not configured");

  const payer = payerFromPayment(payment, orderRow);
  const meta = payer.meta;
  const applicationId = meta.application_id ?? meta.applicationId;

  let membershipRow: {
    membership_category?: string;
    membership_type?: string;
  } | null = null;

  if (applicationId) {
    const { data } = await supabase
      .from("membership_applications")
      .update({
        payment_status: "paid",
        razorpay_payment_id: payment.id,
      })
      .eq("id", applicationId)
      .select("membership_category, membership_type")
      .maybeSingle();
    membershipRow = data;
  } else if (payer.email) {
    const { data } = await supabase
      .from("membership_applications")
      .update({
        payment_status: "paid",
        razorpay_payment_id: payment.id,
      })
      .eq("email", payer.email)
      .eq("payment_status", "pending")
      .select("membership_category, membership_type")
      .maybeSingle();
    membershipRow = data;
  }

  if (payer.email) {
    try {
      const receiptNumber = await allocateReceiptNumber();
      const { sendMembershipReceiptEmail } = await import(
        "@/lib/email/send-membership-receipt"
      );
      await sendMembershipReceiptEmail({
        receiptNumber,
        memberName: payer.name,
        memberEmail: payer.email,
        amountInr: payment.amount / 100,
        paymentId: payment.id,
        date: new Date().toLocaleDateString("en-IN"),
        membershipCategory: membershipRow?.membership_category,
        membershipType: membershipRow?.membership_type,
      });
    } catch (emailError) {
      console.error("[webhook] membership receipt email failed", emailError);
    }
  }
}

async function markOrderPaid(orderId: string, status: "paid" | "failed"): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase
    .from("payment_orders")
    .update({ status })
    .eq("razorpay_order_id", orderId);
}

export async function upsertDonationFromPayment(
  payment: RazorpayPaymentEntity,
  status: "captured" | "failed" | "authorized"
): Promise<void> {
  const orderRow = await loadOrderRow(payment.order_id);
  const purpose = orderRow?.purpose ?? "donation";

  if (status === "captured") {
    if (purpose === "membership") {
      await processMembershipCaptured(payment, orderRow);
    } else if (purpose !== "registration") {
      await processDonationCaptured(payment, orderRow);
    }
    await markOrderPaid(payment.order_id, "paid");
    return;
  }

  if (status === "failed") {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase is not configured");

    const payer = payerFromPayment(payment, orderRow);

    if (purpose === "membership" && payer.email) {
      await supabase
        .from("membership_applications")
        .update({ payment_status: "failed", razorpay_payment_id: payment.id })
        .eq("email", payer.email)
        .eq("payment_status", "pending");
    } else if (purpose === "donation") {
      await supabase.from("donations").upsert(
        {
          razorpay_payment_id: payment.id,
          razorpay_order_id: payment.order_id,
          amount_paise: payment.amount,
          donor_name: payer.name,
          donor_email: payer.email,
          donor_phone: payer.phone,
          status: "failed",
          metadata: {
            error_code: payment.error_code,
            error_description: payment.error_description,
          },
        },
        { onConflict: "razorpay_payment_id" }
      );
    }

    await markOrderPaid(payment.order_id, "failed");
  }
}

export async function processRazorpayWebhookEvent(
  event: RazorpayWebhookEvent,
  eventId: string
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data: existing } = await supabase
    .from("payment_webhook_events")
    .select("id, processed_at")
    .eq("razorpay_event_id", eventId)
    .maybeSingle();

  if (existing?.processed_at) {
    return;
  }

  if (!existing) {
    const { error: insertError } = await supabase
      .from("payment_webhook_events")
      .insert({
        razorpay_event_id: eventId,
        event_type: event.event,
        payload: event as unknown as Record<string, unknown>,
      });

    if (insertError && insertError.code !== "23505") {
      throw new Error(insertError.message);
    }
  }

  try {
    const payment = paymentFromEvent(event);

    switch (event.event) {
      case "payment.captured":
        if (payment) {
          await upsertDonationFromPayment(payment, "captured");
        }
        break;
      case "payment.authorized":
        break;
      case "payment.failed":
        if (payment) {
          await upsertDonationFromPayment(payment, "failed");
        }
        break;
      case "order.paid": {
        const orderId = event.payload.order?.entity.id;
        if (orderId) {
          await markOrderPaid(orderId, "paid");
        }
        break;
      }
      default:
        break;
    }

    await supabase
      .from("payment_webhook_events")
      .update({ processed_at: new Date().toISOString(), processing_error: null })
      .eq("razorpay_event_id", eventId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown webhook processing error";

    await supabase
      .from("payment_webhook_events")
      .update({ processing_error: message })
      .eq("razorpay_event_id", eventId);

    throw error;
  }
}

export function validateCreateOrderInput(body: unknown): {
  ok: true;
  data: {
    purpose: "donation" | "membership" | "registration";
    amountPaise: number;
    name: string;
    email: string;
    phone: string;
    pan?: string;
    address?: string;
    metadata?: Record<string, string>;
  };
} | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;
  const purpose = input.purpose;
  const amount = Number(input.amount);
  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  const pan =
    input.pan !== undefined && input.pan !== null
      ? String(input.pan).trim()
      : undefined;
  const address =
    input.address !== undefined && input.address !== null
      ? String(input.address).trim()
      : undefined;

  if (
    purpose !== "donation" &&
    purpose !== "membership" &&
    purpose !== "registration"
  ) {
    return { ok: false, error: "Invalid payment purpose." };
  }

  if (!Number.isFinite(amount) || amount < 1) {
    return { ok: false, error: "Amount must be at least ₹1." };
  }

  if (!name) {
    return { ok: false, error: "Name is required." };
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return { ok: false, error: "A valid email is required." };
  }

  if (!phone || phone.length < 10 || phone.length > 15) {
    return { ok: false, error: "A valid phone number is required." };
  }

  const metadata =
    input.metadata && typeof input.metadata === "object"
      ? (input.metadata as Record<string, string>)
      : undefined;

  return {
    ok: true,
    data: {
      purpose,
      amountPaise: Math.round(amount * 100),
      name,
      email,
      phone,
      pan,
      address,
      metadata: {
        ...(metadata ?? {}),
        ...(address ? { address } : {}),
        ...(pan ? { pan } : {}),
      },
    },
  };
}
