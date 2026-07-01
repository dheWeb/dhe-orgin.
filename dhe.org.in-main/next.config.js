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
      "connect-src 'self' https://*.supabase.co https://api.razorpay.com https://*.google.com https://www.google-analytics.com https://*.botpress.cloud wss://*.botpress.cloud https://*.ingest.sentry.io",
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
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
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
        source: "/:path*",
        has: [{ type: "host", value: "dhe.org.in" }],
        destination: "https://www.dhe.org.in/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
