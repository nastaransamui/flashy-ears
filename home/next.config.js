/** @type {import('next').NextConfig} */
const { NEXT_PUBLIC_ADMIN_URL } = process.env;
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig;
