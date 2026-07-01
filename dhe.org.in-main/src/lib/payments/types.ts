export type PaymentPurpose = "donation" | "membership" | "registration";

export type RazorpayWebhookEvent = {
  entity: string;
  account_id: string;
  event: string;
  contains: string[];
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity;
    };
    order?: {
      entity: RazorpayOrderEntity;
    };
  };
  created_at: number;
};

export type RazorpayPaymentEntity = {
  id: string;
  entity: "payment";
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string>;
  error_code?: string | null;
  error_description?: string | null;
};

export type RazorpayOrderEntity = {
  id: string;
  entity: "order";
  amount: number;
  amount_paid: number;
  currency: string;
  status: string;
  notes?: Record<string, string>;
};

export type CreateOrderRequest = {
  purpose: PaymentPurpose;
  /** Amount in INR rupees (not paise). */
  amount: number;
  name: string;
  email: string;
  phone: string;
  pan?: string;
  metadata?: Record<string, string>;
};

export type VerifyPaymentRequest = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
