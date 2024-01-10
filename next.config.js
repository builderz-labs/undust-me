/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.giphy.com', 'storage.googleapis.com', 'arweave.net'],
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config; // Add this line
  },
}

module.exports = nextConfig