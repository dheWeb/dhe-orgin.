import FooterBrand from "@/components/layout/footer/FooterBrand";
import FooterConnect from "@/components/layout/footer/FooterConnect";
import FooterEcosystemStrip from "@/components/layout/footer/FooterEcosystemStrip";
import FooterLegalBar from "@/components/layout/footer/FooterLegalBar";
import FooterNavColumns from "@/components/layout/footer/FooterNavColumns";
import FooterTrustStrip from "@/components/layout/footer/FooterTrustStrip";

const DEFAULT_FOOTER_MISSION =
  "DHE integrates educational leadership, innovation, skill development, research, entrepreneurship, publications, digital transformation, and institutional collaboration into one unified ecosystem empowering Bharat towards becoming a global knowledge leader.";

export type FooterSiteContact = {
  phone?: string;
  email?: string;
  officeAddress?: string;
};

type Props = {
  footerMission?: string;
  siteContact?: FooterSiteContact;
};

export default function BottomView({ footerMission, siteContact }: Props) {
  const mission = footerMission?.trim() || DEFAULT_FOOTER_MISSION;

  return (
    <div className="bg-dhe-navy-mid text-white">
      <FooterTrustStrip />
      <div className="dhe-container py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <FooterBrand mission={mission} />
          </div>
          <div className="lg:col-span-5">
            <FooterNavColumns />
          </div>
          <div className="lg:col-span-3">
            <FooterConnect
              phone={siteContact?.phone}
              email={siteContact?.email}
              officeAddress={siteContact?.officeAddress}
            />
          </div>
        </div>

        <FooterEcosystemStrip />
        <FooterLegalBar />
      </div>
    </div>
  );
}
