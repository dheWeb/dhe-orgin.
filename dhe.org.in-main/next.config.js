/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduces duplicate Ant Design ref warnings in dev overlay (React 18 + Strict Mode)
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
