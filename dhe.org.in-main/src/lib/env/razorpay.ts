/**
 * Server-only Razorpay configuration.
 */

export type RazorpayConfig = {
  keyId: string;
  keySecret: string;
  webhookSecret: string;
};

function firstEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function getRazorpayConfig(): RazorpayConfig | null {
  const keyId = firstEnv("RAZORPAY_KEY_ID_NEW", "RAZORPAY_KEY_ID");
  const keySecret = firstEnv("RAZORPAY_KEY_SECRET_NEW", "RAZORPAY_KEY_SECRET");
  const webhookSecret = firstEnv(
    "RAZORPAY_WEBHOOK_SECRET_NEW",
    "RAZORPAY_WEBHOOK_SECRET"
  );

  if (!keyId || !keySecret || !webhookSecret) {
    return null;
  }

  return { keyId, keySecret, webhookSecret };
}

/** Public checkout key — must match server key id. */
export function getPublicRazorpayKeyId(): string | undefined {
  const serverKey = getRazorpayConfig()?.keyId;
  const candidates = [
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    process.env.RAZORPAY_KEY_ID_NEW,
    process.env.RAZORPAY_KEY_ID,
  ]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));

  if (serverKey && candidates.includes(serverKey)) {
    return serverKey;
  }
  return candidates[0];
}

export function isRazorpayConfigured(): boolean {
  return getRazorpayConfig() !== null;
}
