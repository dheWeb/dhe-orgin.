/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // Hobby plan image optimization is limited (5K/mo); serve /public assets directly on Vercel.
    unoptimized: process.env.VERCEL === "1",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.dhe.org.in" },
      { protocol: "https", hostname: "dhe.org.in" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
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
    ];
  },
};

module.exports = nextConfig;
