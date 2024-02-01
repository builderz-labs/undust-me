const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      '*',
      'media.giphy.com', 
      'storage.googleapis.com', 
      'arweave.net', 
      'shdw-drive.genesysgo.net', 
      'www.arweave.net',
      'images.unsplash.com',
      'img.hi-hi.vip',
      'bafybeig5kcc5ikci7cpycn2es2jfhinmkgnnsbuuciaprczzhuh7nt4sqy.ipfs.dweb.link'
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig