import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    unoptimized: true, // Android-এ Sharp সাপোর্টেড না
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ লোকাল বিল্ডের জন্য TypeScript চেক বন্ধ
  },
};

export default nextConfig;
