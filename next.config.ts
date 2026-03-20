import type { NextConfig } from "next";

const repositoryName = "2026_Keeper_Mentoring";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repositoryName}` : undefined,
  assetPrefix: isProduction ? `/${repositoryName}/` : undefined,
};

export default nextConfig;
