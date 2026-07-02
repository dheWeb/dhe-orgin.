import { getRazorpayConfig, isRazorpayConfigured } from "@/lib/env/razorpay";
import { getRazorpayClient } from "@/lib/razorpay/client";
import { getRazorpayKeyMismatch } from "@/lib/razorpay/errors";
import { isSupabaseAdminConfigured, getSupabaseAdmin } from "@/lib/supabase/admin";

export type PaymentsHealth = {
  configured: boolean;
  keysAligned: boolean;
  keyMismatch: string | null;
  ordersTableReady: boolean;
  membershipReceiptColumnsReady: boolean;
  razorpayAuthOk: boolean;
  errors: string[];
};

/** Non-secret payment subsystem checks for /api/health and admin diagnostics. */
export async function getPaymentsHealth(): Promise<PaymentsHealth> {
  const errors: string[] = [];
  const configured = isRazorpayConfigured() && isSupabaseAdminConfigured();
  const keyMismatch = getRazorpayKeyMismatch();
  const keysAligned = keyMismatch === null;

  if (keyMismatch) {
    errors.push(keyMismatch);
  }

  let ordersTableReady = false;
  let membershipReceiptColumnsReady = false;
  let razorpayAuthOk = false;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("payment_orders").select("id").limit(1);
    ordersTableReady = !error;
    if (error) {
      errors.push(
        error.code === "42P01"
          ? "payment_orders table missing — run supabase migration 20260630120000_payments.sql"
          : `payment_orders check failed: ${error.message}`
      );
    }

    const { error: membershipColError } = await supabase
      .from("membership_applications")
      .select("receipt_number, metadata")
      .limit(1);
    membershipReceiptColumnsReady = !membershipColError;
    if (membershipColError) {
      errors.push(
        membershipColError.code === "42703"
          ? "membership_applications.receipt_number missing — run 20260703220000_membership_receipt.sql"
          : `membership_applications check failed: ${membershipColError.message}`
      );
    }
  } else {
    errors.push("Supabase service role not configured");
  }

  const razorpay = getRazorpayClient();
  if (razorpay && configured && keysAligned) {
    try {
      await razorpay.orders.all({ count: 1 });
      razorpayAuthOk = true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Razorpay auth check failed";
      errors.push(msg);
    }
  } else if (!getRazorpayConfig()) {
    errors.push("Razorpay env incomplete (KEY_ID, KEY_SECRET, WEBHOOK_SECRET)");
  }

  return {
    configured,
    keysAligned,
    keyMismatch,
    ordersTableReady,
    membershipReceiptColumnsReady,
    razorpayAuthOk,
    errors,
  };
}
