import Donation from "@/components/forms/DonationForm";
import { getSiteContent } from "@/lib/cms/site-content";

export default async function DonationPage() {
  const content = await getSiteContent(["donation_intro"]);
  const intro =
    content.donation_intro?.text?.trim() ||
    "Your contribution helps advance holistic education, national programs, and institutional initiatives led by DHE in service of educational transformation and Viksit Bharat.";

  return (
    <div>
      <Donation introText={intro} />
    </div>
  );
}
