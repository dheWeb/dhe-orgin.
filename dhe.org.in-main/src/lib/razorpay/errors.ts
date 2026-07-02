type RazorpayApiError = {
  statusCode?: number;
  error?: {
    code?: string;
    description?: string;
    reason?: string;
  };
};

/** Map Razorpay SDK / API errors to a safe client message. */
export function getRazorpayErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Failed to create Razorpay order.";
  }

  const err = error as RazorpayApiError;
  const description = err.error?.description?.trim();

  if (err.statusCode === 401) {
    return "Payment gateway authentication failed. Please contact DHE — Razorpay keys may need to be updated.";
  }

  if (description) {
    if (/minimum amount/i.test(description)) {
      return "Amount is below the minimum allowed by the payment gateway. Try ₹10 or more.";
    }
    if (/authentication/i.test(description)) {
      return "Payment gateway authentication failed. Please contact DHE.";
    }
    return description;
  }

  return "Failed to create Razorpay order.";
}

export function getRazorpayErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;
  return (error as RazorpayApiError).error?.code;
}

/** Ensure checkout key matches server key (common misconfiguration after rotation). */
export function getRazorpayKeyMismatch(): string | null {
  const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
  const serverKey = process.env.RAZORPAY_KEY_ID?.trim();
  if (!publicKey || !serverKey) return null;
  if (publicKey !== serverKey) {
    return "NEXT_PUBLIC_RAZORPAY_KEY_ID does not match RAZORPAY_KEY_ID";
  }
  if (publicKey.startsWith("rzp_test_") && process.env.NODE_ENV === "production") {
    return "Test Razorpay key is set on production";
  }
  return null;
}
