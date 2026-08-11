import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@aramon/ui", "@aramon/medium", "@aramon/tokens"],
};

export default nextConfig;
