// Path: next.config.js
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    "@typescript-eslint/no-explicit-any": ["off"]
  },
};

module.exports = {
  ...nextConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '/degenesis',
  assetPrefix: '/degenesis',
};