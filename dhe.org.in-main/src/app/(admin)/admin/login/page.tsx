import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="dhe-container py-12 text-center text-gray-600">Loading…</div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
