const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src 'self';
  style-src 'self' *.googleapis.com;
  font-src 'self' *.gstatic.com; 
  img-src 'self' https://* data:;
  media-src 'self' https://* data:;
`;

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log("test : ", process.env.SALT_PASSWORD);

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const urlBE = process.env.BE_URL

  return withBundleAnalyzer({
    async headers() {
      return [
        {
          // Apply these headers to all routes in your application.
          source: "/:path*",
          headers: securityHeaders,
        },
      ];
    },
    swcMinify: false,
    reactStrictMode: false, // disabled in dev to prevent Fast Refresh loop
    output: 'standalone',
    experimental: {
      proxyTimeout: 3600000
    },
    compiler: isProd
      ? {
        styledComponents: true,
        removeConsole: {
          exclude: ["error"],
        },
      }
      : {},
  });
};
