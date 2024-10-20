/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && '/portfolio-2023',
  output: 'export',
}

module.exports = nextConfig
