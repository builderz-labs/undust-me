/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media.giphy.com', 
      'storage.googleapis.com', 
      'arweave.net', 
      'shdw-drive.genesysgo.net', 
      'www.arweave.net',
      'images.unsplash.com'
    ],
  },
  webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback.fs = false;
  }
  return config;
},

}

module.exports = nextConfig

