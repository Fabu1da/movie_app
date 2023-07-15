/** @type {import('next').NextConfig} */
const nextConfig = {
  // stop rendering the component twice
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

module.exports = nextConfig;
