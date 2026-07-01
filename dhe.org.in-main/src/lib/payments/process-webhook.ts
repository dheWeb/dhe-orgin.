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

export async function upsertDonationFromPayment(
  payment: RazorpayPaymentEntity,
  status: "captured" | "failed" | "authorized"
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

    const { data: orderRow } = await supabase
    .from("payment_orders")
    .select("id, purpose, payer_name, payer_email, payer_phone, metadata")
    .eq("razorpay_order_id", payment.order_id)
    .maybeSingle();

  const notes = payment.notes ?? {};
  const donorName =
    orderRow?.payer_name || notes.name || notes.donor_name || null;
  const donorEmail =
    orderRow?.payer_email || payment.email || notes.email || null;
  const donorPhone =
    orderRow?.payer_phone || payment.contact || notes.phone || null;

  if (status === "captured") {
    const { data: existing } = await supabase
      .from("donations")
      .select("id, receipt_number")
      .eq("razorpay_payment_id", payment.id)
      .maybeSingle();

    if (existing) {
      return;
    }

    const receiptNumber = await allocateReceiptNumber();

    const { data: inserted, error: donationError } = await supabase.from("donations").insert({
      payment_order_id: orderRow?.id ?? null,
      razorpay_payment_id: payment.id,
      razorpay_order_id: payment.order_id,
      amount_paise: payment.amount,
      donor_name: donorName,
      donor_email: donorEmail,
      donor_phone: donorPhone,
      receipt_number: receiptNumber,
      status: "captured",
      pan: (orderRow?.metadata as { pan?: string } | null)?.pan ?? notes.pan ?? null,
      metadata: {
        currency: payment.currency,
        notes,
      },
    }).select("id").single();

    if (donationError) {
      throw new Error(donationError.message);
    }

    if (donorEmail) {
      try {
        const { sendDonationReceiptEmail } = await import(
          "@/lib/email/send-donation-receipt"
        );
        const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dhe.org.in";
        const downloadUrl = inserted?.id
          ? `${site}/api/receipts/${inserted.id}/pdf?email=${encodeURIComponent(donorEmail)}`
          : undefined;
        await sendDonationReceiptEmail(
          {
            receiptNumber,
            donorName: donorName ?? "Donor",
            donorEmail,
            amountInr: payment.amount / 100,
            paymentId: payment.id,
            date: new Date().toLocaleDateString("en-IN"),
          },
          { downloadUrl }
        );
      } catch (emailError) {
        console.error("[webhook] receipt email failed", emailError);
      }
    }

    await supabase
      .from("payment_orders")
      .update({ status: "paid" })
      .eq("razorpay_order_id", payment.order_id);

    if (orderRow?.purpose === "membership") {
      const meta = (orderRow.metadata ?? {}) as Record<string, string>;
      const applicationId = meta.application_id ?? meta.applicationId;
      if (applicationId) {
        await supabase
          .from("membership_applications")
          .update({
            payment_status: "paid",
            razorpay_payment_id: payment.id,
          })
          .eq("id", applicationId);
      } else if (donorEmail) {
        await supabase
          .from("membership_applications")
          .update({
            payment_status: "paid",
            razorpay_payment_id: payment.id,
          })
          .eq("email", donorEmail)
          .eq("payment_status", "pending");
      }
    }
    return;
  }

  if (status === "failed") {
    await supabase.from("donations").upsert(
      {
        razorpay_payment_id: payment.id,
        razorpay_order_id: payment.order_id,
        amount_paise: payment.amount,
        donor_name: donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone,
        status: "failed",
        metadata: {
          error_code: payment.error_code,
          error_description: payment.error_description,
        },
      },
      { onConflict: "razorpay_payment_id" }
    );

    await supabase
      .from("payment_orders")
      .update({ status: "failed" })
      .eq("razorpay_order_id", payment.order_id);
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
        // Auto-capture flows finalize on payment.captured; no donation row yet.
        break;
      case "payment.failed":
        if (payment) {
          await upsertDonationFromPayment(payment, "failed");
        }
        break;
      case "order.paid": {
        const orderId = event.payload.order?.entity.id;
        if (orderId) {
          await supabase
            .from("payment_orders")
            .update({ status: "paid" })
            .eq("razorpay_order_id", orderId);
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
      metadata,
    },
  };
}
