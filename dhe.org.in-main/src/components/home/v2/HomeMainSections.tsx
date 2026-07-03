import HomeStatGrid from "./HomeStatGrid";
import HomePillarCards from "./HomePillarCards";
import HomeProgramCards from "./HomeProgramCards";
import HomeSmkFeature from "./HomeSmkFeature";
import HomeJourneyTimeline from "./HomeJourneyTimeline";
import HomeIndiaMap from "./HomeIndiaMap";
import HomeCellsGrid from "./HomeCellsGrid";
import HomeDigitalGrid from "./HomeDigitalGrid";
import HomeLeadershipCard from "./HomeLeadershipCard";
import HomeTestimonials from "./HomeTestimonials";
import HomePartnersStrip from "./HomePartnersStrip";
import HomeParticipationStrip from "./HomeParticipationStrip";
import HomeReveal from "./HomeReveal";
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
      <HomeReveal>
        <HomePillarCards />
      </HomeReveal>
      <WaveDivider />
      <HomeReveal>
        <HomeProgramCards />
      </HomeReveal>
      <HomeSmkFeature
        paragraph1={shiksha?.paragraph1}
        paragraph2={shiksha?.paragraph2}
        smkSiteUrl={smkSiteUrl}
      />
      <WaveDivider flip />
      <HomeReveal>
        <HomeJourneyTimeline />
      </HomeReveal>
      <HomeReveal>
        <HomeIndiaMap />
      </HomeReveal>
      <HomeReveal>
        <HomeCellsGrid />
      </HomeReveal>
      <HomeReveal>
        <HomeDigitalGrid digitalDescription={digitalDescription} />
      </HomeReveal>
      <HomeReveal>
        <HomeLeadershipCard
          visionBody={visionBody}
          nationalImpactBody={nationalImpactBody}
          nationalImpactHighlights={nationalImpactHighlights}
          leadershipCms={leadership}
        />
      </HomeReveal>
      <HomeTestimonials />
      <HomePartnersStrip />
      <HomeParticipationStrip />
    </>
  );
}
