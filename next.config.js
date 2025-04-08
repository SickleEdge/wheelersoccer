/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/wheelersoccer',
  assetPrefix: '/wheelersoccer/',
  trailingSlash: true,
}

module.exports = nextConfig 