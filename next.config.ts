import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // ❌ unoptimized: true – সরিয়ে দিন; Next.js Sanity অ্যাসেট অপটিমাইজ করবে
  },
  // ❌ typescript.ignoreBuildErrors: true – সরিয়ে দিন
};

export default nextConfig;
