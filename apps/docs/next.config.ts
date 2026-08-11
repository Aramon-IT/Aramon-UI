import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBasePath = process.env.GITHUB_ACTIONS === "true" && repository ? `/${repository}` : "";

const nextConfig: NextConfig = {
  basePath: githubPagesBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
  },
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@aramon/ui", "@aramon/medium", "@aramon/prompts", "@aramon/tokens"],
};

export default nextConfig;
