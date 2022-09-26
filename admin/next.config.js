/** @type {import('next').NextConfig} */
const path = require('path');
path.resolve('./public/locales/');
module.exports = {
  basePath: '/admin',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true,
        basePath: false,
      },
    ];
  },
  compiler: {
    styledComponents: {
      ssr: false,
    },
  },
};
