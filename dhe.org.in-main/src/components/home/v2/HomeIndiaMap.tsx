import { homeNationalMapPoints } from "@/data/home/redesign-content";
import HomeSectionShell from "./HomeSectionShell";

const DOT_RADIUS = { sm: 2.2, md: 2.8, lg: 3.4 } as const;

/** Simplified India silhouette + program presence dots */
export default function HomeIndiaMap() {
  return (
    <HomeSectionShell
      id="national-presence-heading"
      title="National Presence"
      description="DHE programs, Olympiads, and institutional partnerships span 14+ states and union territories — with growing reach across Bharat."
      variant="muted"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 relative">
          <svg
            viewBox="0 0 100 100"
            className="w-full max-w-lg mx-auto text-orange-100"
            role="img"
            aria-labelledby="india-map-title india-map-desc"
          >
            <title id="india-map-title">India map showing DHE national presence</title>
            <desc id="india-map-desc">
              Stylized map of India with markers indicating states and regions where DHE operates
            </desc>
            {/* Simplified India outline */}
            <path
              fill="currentColor"
              stroke="#fdba74"
              strokeWidth="0.4"
              d="M28,8 L38,6 L44,10 L48,8 L52,14 L58,12 L64,18 L70,16 L74,22 L76,28 L72,34 L68,38 L62,36 L58,42 L54,48 L56,54 L52,60 L48,68 L44,76 L40,84 L36,90 L32,88 L30,80 L28,72 L26,64 L22,58 L18,52 L16,44 L14,36 L16,28 L20,22 L24,16 Z"
            />
            {homeNationalMapPoints.map((point, i) => (
              <g key={point.id}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={DOT_RADIUS[point.size] + 1.5}
                  fill="#f97316"
                  opacity="0.25"
                  className="motion-safe:animate-pulse"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={DOT_RADIUS[point.size]}
                  fill="#ea580c"
                  stroke="#fff"
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="lg:col-span-5">
          <p className="text-3xl sm:text-4xl font-bold text-orange-600 tabular-nums">14+</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">States &amp; Union Territories</p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            From Punjab and Himachal Pradesh to national conclaves at IITs, NITs, and partner
            institutions — DHE connects educators and students across Bharat.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Regions with DHE presence">
            {homeNationalMapPoints.map((point) => (
              <li key={point.id}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden />
                  {point.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeSectionShell>
  );
}
