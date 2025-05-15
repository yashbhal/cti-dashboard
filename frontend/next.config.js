/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This is needed to make framer-motion work with Next.js 14
  // It prevents the "export *" error in client components
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = nextConfig;
