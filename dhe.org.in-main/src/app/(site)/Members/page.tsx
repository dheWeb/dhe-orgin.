import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("Members");

export default function MembersPage() {
  return (
    <div className="dhe-container py-16 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-semibold text-primary-color mb-4">
        Membership Directory
      </h1>
      <p className="text-gray-600">
        This directory is restricted to authorized DHE administrators. If you
        need membership information, please contact{" "}
        <a
          href="mailto:director@dhe.org.in"
          className="text-orange-700 underline"
        >
          director@dhe.org.in
        </a>
        .
      </p>
    </div>
  );
}
