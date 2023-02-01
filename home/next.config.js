/** @type {import('next').NextConfig} */
const { NEXT_PUBLIC_ADMIN_URL } = process.env;
const nextTranslate = require('next-translate');
const path = require('path');
const nextConfig = {
  reactStrictMode: false,
  webpack: function (config, options) {
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/admin',
        destination: `${NEXT_PUBLIC_ADMIN_URL}/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `${NEXT_PUBLIC_ADMIN_URL}/admin/:path*`,
      },
    ];
  },
};

module.exports = nextTranslate(nextConfig);
