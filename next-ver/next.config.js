/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && '/portfolio',
  output: 'export',
}

module.exports = nextConfig
