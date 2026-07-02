"use client";

import { useEffect, useState } from "react";

type HealthPayload = {
  status: string;
  payments?: {
    razorpayAuthOk: boolean;
    keysAligned: boolean;
    ordersTableReady: boolean;
  };
  email?: {
    configured: boolean;
    brevoAccountOk: boolean;
    fromAddress: string | null;
    errors: string[];
  };
};

export default function AdminSystemStatus() {
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: HealthPayload) => setHealth(data))
      .catch(() => setError("Could not load system status"));
  }, []);

  if (error) {
    return (
      <p className="mb-6 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
        {error}
      </p>
    );
  }

  if (!health) {
    return (
      <p className="mb-6 text-sm text-gray-600" aria-live="polite">
        Loading system status…
      </p>
    );
  }

  const ok = health.status === "ok";

  return (
    <div
      className={`mb-8 rounded-lg border p-4 text-sm ${
        ok
          ? "border-green-200 bg-green-50 text-green-950"
          : "border-amber-200 bg-amber-50 text-amber-950"
      }`}
      role="status"
    >
      <p className="font-semibold">
        System status: {ok ? "All core services OK" : "Needs attention"}
      </p>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        <li>
          Razorpay:{" "}
          {health.payments?.razorpayAuthOk ? "connected" : "check keys"}
        </li>
        <li>
          Receipt email (Brevo):{" "}
          {health.email?.configured ? "sending" : "not ready"}
        </li>
        <li>
          Donations table:{" "}
          {health.payments?.ordersTableReady ? "ready" : "migration needed"}
        </li>
      </ul>
      {health.email?.errors?.length ? (
        <p className="mt-2 text-xs">{health.email.errors.join(" ")}</p>
      ) : null}
      <p className="mt-3 text-xs">
        Diagnostics:{" "}
        <code>GET /api/admin/payments/diagnostics</code>
        {" · "}
        <code>GET /api/admin/email/diagnostics</code>
      </p>
    </div>
  );
}
