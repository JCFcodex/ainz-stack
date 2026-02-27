import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: remove X-Powered-By header
  poweredByHeader: false,

  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
