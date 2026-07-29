import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Android-এ sharp সাপোর্টেড না, তাই unoptimized চালু
    unoptimized: true,
  },
  // লোকাল বিল্ডের জন্য TypeScript ও ESLint চেক অফ (শুধু টেস্টের জন্য)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
