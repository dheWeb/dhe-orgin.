import HomeStatGrid from "./HomeStatGrid";
import HomePillarCards from "./HomePillarCards";
import HomeProgramCards from "./HomeProgramCards";
import HomeSmkFeature from "./HomeSmkFeature";
import HomeJourneyTimeline from "./HomeJourneyTimeline";
import HomeIndiaMap from "./HomeIndiaMap";
import HomeCellsGrid from "./HomeCellsGrid";
import HomeDigitalGrid from "./HomeDigitalGrid";
import HomeLeadershipCard from "./HomeLeadershipCard";
import HomePartnersStrip from "./HomePartnersStrip";
import HomeParticipationStrip from "./HomeParticipationStrip";
import WaveDivider from "./WaveDivider";

type Props = {
  visionBody?: string;
  nationalImpactBody?: string;
  nationalImpactHighlights?: string[];
  leadership?: {
    bodyPrefix?: string;
    leaderName?: string;
    leaderUrl?: string;
    bodySuffix?: string;
    visionQuote?: string;
  };
  shiksha?: { paragraph1?: string; paragraph2?: string };
  digitalDescription?: string;
  smkSiteUrl?: string;
};

/** Homepage body — card-first sections in conversion-optimized order */
export default function HomeMainSections({
  visionBody,
  nationalImpactBody,
  nationalImpactHighlights,
  leadership,
  shiksha,
  digitalDescription,
  smkSiteUrl,
}: Props) {
  return (
    <>
      <HomeStatGrid />
      <HomePillarCards />
      <WaveDivider />
      <HomeProgramCards />
      <HomeSmkFeature
        paragraph1={shiksha?.paragraph1}
        paragraph2={shiksha?.paragraph2}
        smkSiteUrl={smkSiteUrl}
      />
      <WaveDivider flip />
      <HomeJourneyTimeline />
      <HomeIndiaMap />
      <HomeCellsGrid />
      <HomeDigitalGrid digitalDescription={digitalDescription} />
      <HomeLeadershipCard
        visionBody={visionBody}
        nationalImpactBody={nationalImpactBody}
        nationalImpactHighlights={nationalImpactHighlights}
        leadershipCms={leadership}
      />
      <HomePartnersStrip />
      <HomeParticipationStrip />
    </>
  );
}
