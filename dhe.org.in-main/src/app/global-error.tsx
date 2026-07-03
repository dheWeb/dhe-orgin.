"use client";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body className="bg-white text-gray-900 antialiased">
        <div className="dhe-container py-20 text-center max-w-lg mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Application error</h1>
          <p className="text-gray-600 mb-6">
            DHE could not render this page. Please try again or return to the home page.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 min-h-11"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 min-h-11 inline-flex items-center"
            >
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
