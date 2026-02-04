import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-df49b92619834eb2b1abef487ceb4a09.r2.dev",
      },
      {
        protocol: "https",
        hostname: "image.hafizhkh.site",
      },
    ],
  },
};

export default nextConfig;
