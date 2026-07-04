const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://cdn.botpress.cloud https://mediafiles.botpress.cloud https://www.google.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://*.supabase.co https://api.razorpay.com https://*.google.com https://www.google-analytics.com https://region1.google-analytics.com https://*.botpress.cloud wss://*.botpress.cloud https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
      "frame-src 'self' https://api.razorpay.com https://www.google.com https://www.youtube.com https://www.google.com/maps",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://api.razorpay.com",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "www.dhe.org.in" },
      { protocol: "https", hostname: "dhe.org.in" },
    ],
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/donate",
        destination: "/donation",
        permanent: true,
      },
      {
        source: "/Publication",
        destination: "/publications",
        permanent: true,
      },
      {
        source: "/Publications",
        destination: "/publications",
        permanent: true,
      },
      {
        source: "/join",
        destination: "/contribute",
        permanent: true,
      },
      {
        source: "/dhe-banner.jpg",
        destination: "/logo.png",
        permanent: true,
      },
      {
        source: "/VibhagRoute/:path*",
        destination: "https://www.dhe.org.in/VibhagRoute/:path*",
        permanent: false,
      },
      {
        source: "/cells/spiritual",
        destination: "/cells/spritual",
        permanent: true,
      },
      {
        source: "/Members",
        destination: "/contribute",
        permanent: true,
      },
      {
        source: "/committee",
        destination: "/leadership",
        permanent: true,
      },
      {
        source: "/noticeboarddata",
        destination: "/admin/notices",
        permanent: true,
      },
      {
        source: "/donationdatadekh",
        destination: "/admin/finance/donations",
        permanent: true,
      },
      {
        source: "/WD",
        destination: "/admin/finance/workshops",
        permanent: true,
      },
      {
        source: "/comingsoon",
        destination: "/structure",
        permanent: true,
      },
      {
        source: "/tentative_schedule.xlsx",
        destination: "/tentative_schdule.xlsx",
        permanent: true,
      },
      {
        source: "/admin/feedback",
        destination: "/admin/inbox",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "dhe.org.in" }],
        destination: "https://www.dhe.org.in/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "rase-co-in",
  project: process.env.SENTRY_PROJECT || "rase-monitoring-l1",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    treeshake: { removeDebugLogging: true },
    automaticVercelMonitors: true,
  },
});
