import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storagemedia.corporategear.com",
      },
      {
        protocol: "https",
        hostname: "amber-theme-demo.myshopify.com",
      },
    ],
  },
};

export default nextConfig;
