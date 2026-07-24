import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // sharp নেটিভ মডিউল এড়াতে
    unoptimized: true,
  },
  // TypeScript এরর ইগনোর করুন (শুধু বিল্ডের জন্য)
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint ইগনোর (যদি থাকে)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
