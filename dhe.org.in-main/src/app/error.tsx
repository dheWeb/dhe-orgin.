"use client";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function Error({
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
        path: window.location.pathname,
      }),
    }).catch(() => undefined);
  }, [error]);

  return (
    <div className="dhe-container py-20 text-center max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">
        We could not load this page. Please try again or return home.
      </p>
      {process.env.NODE_ENV === "development" && (
        <p className="text-xs text-red-600 mb-4 break-all">{error.message}</p>
      )}
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
