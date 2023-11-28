/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['shikimori.one'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
