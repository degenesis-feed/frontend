/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export', // Enables static export
  // Optional configurations:
  // trailingSlash: true, // Adds trailing slashes to URLs
  distDir: 'dist', // Changes the output directory from 'out' to 'dist'
};

module.exports = nextConfig;
