import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/site-metadata";

export const runtime = "edge";
export const alt = `${siteConfig.shortName} — ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #07111f 0%, #002D62 45%, #f97316 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            DHE
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1 }}>
              Department of Holistic Education
            </span>
            <span style={{ fontSize: 26, opacity: 0.9, marginTop: 8 }}>DHE Bharat</span>
          </div>
        </div>
        <p style={{ fontSize: 28, maxWidth: 920, lineHeight: 1.45, opacity: 0.88 }}>
          National platform for holistic education — 25 cells, Olympiads, publications, CSR, and
          Viksit Bharat
        </p>
        <p style={{ fontSize: 20, marginTop: "auto", opacity: 0.65 }}>{siteConfig.url}</p>
      </div>
    ),
    { ...size }
  );
}
