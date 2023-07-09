/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && '/portfolio/next-ver',
  output: 'export',
  distDir: 'next-ver',
}

module.exports = nextConfig
