/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.giphy.com', 'storage.googleapis.com', 'arweave.net'],
  },
}

module.exports = nextConfig