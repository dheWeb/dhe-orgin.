"use client";

import { useCallback, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
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

import { trackGaEvent } from "@/lib/analytics/ga-events";

type RazorpayDonateButtonProps = {
  name: string;
  email: string;
  phone: string;
  amount: number;
  pan?: string;
  address?: string;
  purpose?: "donation" | "membership" | "registration";
  disabled?: boolean;
  metadata?: Record<string, string>;
  thankYouPath?: string;
};

export default function RazorpayDonateButton({
  name,
  email,
  phone,
  amount,
  pan,
  address,
  purpose = "donation",
  disabled,
  metadata,
  thankYouPath,
}: RazorpayDonateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    receiptNumber?: string;
    message: string;
  } | null>(null);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const handlePay = useCallback(async () => {
    if (!name || !email || !phone || !amount || amount < 1) {
      toast.error("Please fill name, email, phone, and amount (min ₹1).");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Payment script is still loading. Please try again.");
      return;
    }

    setLoading(true);
    setPaymentFailed(false);

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
          pan: pan?.trim() || undefined,
          address: address?.trim() || undefined,
          metadata,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Could not create order.");
      }

      const checkoutKey =
        (orderData.keyId as string | undefined) ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!checkoutKey) {
        throw new Error("Payment gateway is not configured.");
      }

      const rzp = new window.Razorpay({
        key: checkoutKey,
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
            const receipt =
              (verifyData.donation?.receipt_number as string | undefined) ??
              (verifyData.membership?.receipt_number as string | undefined);
            const emailSent = verifyData.emailSent as boolean | undefined;
            const emailError = verifyData.emailError as string | undefined;
            const successLabel =
              purpose === "membership" ? "Membership payment successful" : "Donation successful";
            trackGaEvent("purchase", {
              transaction_id: response.razorpay_payment_id,
              value: amount,
              currency: "INR",
              item_category: purpose,
            });
            toast.success(successLabel);
            if (thankYouPath) {
              const params = receipt ? `?receipt=${encodeURIComponent(receipt)}` : "";
              router.push(`${thankYouPath}${params}`);
              return;
            }
            setPaymentSuccess({
              receiptNumber: receipt,
              message: emailSent
                ? "Thank you! Payment received. Your official receipt has been emailed."
                : emailError
                  ? `Thank you! Payment received (Receipt ${receipt ?? "pending"}). Email delivery is delayed — check spam or verify at /receipt/verify.`
                  : "Thank you! Payment received. Your official receipt will be emailed within a few minutes.",
            });
          } else {
            setPaymentFailed(true);
            toast.error(verifyData.error || "Payment verification failed.");
          }
        },
      });

      rzp.on("payment.failed", () => {
        setPaymentFailed(true);
        toast.error("Payment failed. You can retry below.");
      });

      trackGaEvent("begin_checkout", {
        value: amount,
        currency: "INR",
        item_category: purpose,
      });

      rzp.open();
    } catch (error) {
      setPaymentFailed(true);
      const message =
        error instanceof Error ? error.message : "Payment could not start.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [address, amount, email, metadata, name, pan, phone, purpose, router, thankYouPath]);

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
            : paymentFailed
              ? "Retry payment with Razorpay"
              : "Pay securely with Razorpay"}
      </button>
      {paymentSuccess && (
        <div
          className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-900"
          role="status"
        >
          <p className="font-semibold">
            {purpose === "membership" ? "Membership payment successful" : "Donation successful"}
          </p>
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
      {paymentFailed && !paymentSuccess && (
        <div
          className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
          role="alert"
        >
          <p className="font-semibold">Payment not completed</p>
          <p className="mt-2">
            No charge was confirmed. Check your UPI or card app, then tap{" "}
            <strong>Pay securely with Razorpay</strong> to try again. For help,
            email {email || "director@dhe.org.in"} with your name and amount.
          </p>
        </div>
      )}
    </>
  );
}
