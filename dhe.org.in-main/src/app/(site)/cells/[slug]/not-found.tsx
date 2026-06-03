import Link from "next/link";

export default function CellNotFound() {
  return (
    <div className="dhe-container py-12 text-center min-w-0">
      <h1 className="text-2xl font-semibold text-gray-900">Cell not found</h1>
      <p className="mt-2 text-sm text-gray-600">
        The cell page you requested does not exist or may have moved.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/structure" className="dhe-btn-primary text-sm min-h-10">
          View cells & structure
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
