"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
    fetch("/api/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      }),
    }).catch(() => undefined);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Application error</h1>
          <p className="text-gray-600 mb-6">
            Something went wrong. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-orange-600 text-white rounded-md"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
