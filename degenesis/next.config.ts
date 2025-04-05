// import type { NextConfig } from "next";

interface WebpackConfig {
  externals: string[];
}

interface NextConfig {
  webpack: (config: WebpackConfig) => WebpackConfig;
}

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config: WebpackConfig): WebpackConfig => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
