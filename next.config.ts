import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Enable support for subdomains in development
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3001", "*.localhost:3001"],
    },
  },

  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.hehehihi.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
