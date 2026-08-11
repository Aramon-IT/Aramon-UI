import type { NextConfig } from "next";

const siteBasePath = process.env.ARAMON_SITE_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath: siteBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: siteBasePath,
  },
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@aramon/ui", "@aramon/medium", "@aramon/prompts", "@aramon/tokens"],
};

export default nextConfig;
