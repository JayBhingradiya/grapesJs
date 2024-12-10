import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storagemedia.corporategear.com",
      },
    ],
  },
};

export default nextConfig;
