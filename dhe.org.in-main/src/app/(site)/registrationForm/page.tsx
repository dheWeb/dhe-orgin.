import { createPageMetadata } from "@/lib/seo/build-metadata";
import WorkshopRegistrationForm from "@/components/forms/WorkshopRegistrationForm";

export const metadata = createPageMetadata("registrationForm");

export default function RegistrationFormPage() {
  return (
    <div className="dhe-container py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary-color mb-2">
        Workshop registration
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Register your interest for upcoming DHE workshops. For the May 2024
        archive, see{" "}
        <a href="/workshop" className="text-orange-700 underline">
          workshop page
        </a>
        .
      </p>
      <WorkshopRegistrationForm />
    </div>
  );
}
