"use client";

import { useCallback, useState } from "react";
import Script from "next/script";
import toast from "react-hot-toast";

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (response: RazorpayHandlerResponse) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

type RazorpayDonateButtonProps = {
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose?: "donation" | "membership" | "registration";
  disabled?: boolean;
  metadata?: Record<string, string>;
};

export default function RazorpayDonateButton({
  name,
  email,
  phone,
  amount,
  purpose = "donation",
  disabled,
  metadata,
}: RazorpayDonateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    receiptNumber?: string;
    message: string;
  } | null>(null);
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  const handlePay = useCallback(async () => {
    if (!keyId) {
      toast.error("Payment gateway is not configured.");
      return;
    }

    if (!name || !email || !phone || !amount || amount < 1) {
      toast.error("Please fill name, email, phone, and amount (min ₹1).");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Payment script is still loading. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose,
          amount,
          name,
          email,
          phone,
          metadata,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Could not create order.");
      }

      const rzp = new window.Razorpay({
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Department of Holistic Education",
        description: "Donation to DHE",
        order_id: orderData.orderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#ea580c" },
        handler: async (response: RazorpayHandlerResponse) => {
          const verifyRes = await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            const receipt = verifyData.donation?.receipt_number as string | undefined;
            setPaymentSuccess({
              receiptNumber: receipt,
              message:
                "Thank you! Payment received. Your official receipt will be emailed within a few minutes.",
            });
            toast.success("Payment successful!");
          } else {
            toast.error(verifyData.error || "Payment verification failed.");
          }
        },
      });

      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Payment could not start.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [amount, email, keyId, metadata, name, phone, purpose]);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />
      <button
        type="button"
        onClick={handlePay}
        disabled={disabled || loading || !scriptReady || Boolean(paymentSuccess)}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-color transition duration-300 mt-2 w-full min-h-11 disabled:opacity-60"
      >
        {paymentSuccess
          ? "Payment complete"
          : loading
            ? "Processing…"
            : "Pay securely with Razorpay"}
      </button>
      {paymentSuccess && (
        <div
          className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-900"
          role="status"
        >
          <p className="font-semibold">Donation successful</p>
          <p className="mt-2">{paymentSuccess.message}</p>
          {paymentSuccess.receiptNumber && (
            <p className="mt-2">
              Receipt No.: <strong>{paymentSuccess.receiptNumber}</strong>
            </p>
          )}
          <p className="mt-2 text-green-800">
            Check your inbox (and spam folder). Contact {email} if no receipt
            arrives within 15 minutes.
          </p>
        </div>
      )}
    </>
  );
}
