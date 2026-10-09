import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }
    return [
      {
        source: "/api/contact",
        destination: "http://127.0.0.1:8788/api/contact",
      },
      {
        source: "/api/careers/apply",
        destination: "http://127.0.0.1:8788/api/careers/apply",
      },
    ];
  },
};

export default nextConfig;
