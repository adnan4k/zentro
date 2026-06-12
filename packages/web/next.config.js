// STATIC_EXPORT=1 builds a fully static site (for cPanel & co.):
// no rewrites, every route exported as a folder with index.html.
const isStaticExport = !!process.env.STATIC_EXPORT;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
      }
    : {
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: `${process.env.API_URL || 'http://localhost:3001'}/api/:path*`,
            },
          ];
        },
      }),
};

module.exports = nextConfig;
