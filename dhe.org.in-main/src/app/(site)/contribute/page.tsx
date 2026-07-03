import MemberShipForm from "@/components/forms/MembershipForm";
import MembershipBenefits from "@/components/forms/MembershipBenefits";

export default function ContributePage() {
  return (
    <>
      <header className="dhe-container pt-8 pb-2 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
          Join DHE — Membership
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Support holistic education nationally through DHE membership — conferences,
          publications, workshops, and collaborative programs.
        </p>
      </header>
      <MembershipBenefits />
      <MemberShipForm />
    </>
  );
}
