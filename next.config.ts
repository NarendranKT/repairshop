// import { withSentryConfig } from '@sentry/nextjs';
// import { IgnorePlugin } from 'webpack';
// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   // Other Next.js configuration options can be added here
//   webpack: (config) => {
//     // Add IgnorePlugin to ignore unused dependencies
//     config.plugins.push(
//       new IgnorePlugin({
//         resourceRegExp:
//           /^(mysql|mysql2|sqlite3|react-native-sqlite-storage|sql.js|oracledb|pg-native|@sap\/hana-client|mongodb|redis|ioredis|better-sqlite3)$/,
//       })
//     );
//     return config;
//   },
// };

// export default withSentryConfig(nextConfig, {
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options

//   org: 'self-vkf',
//   project: 'repairshop',

//   // Only print logs for uploading source maps in CI
//   silent: !process.env.CI,

//   // For all available options, see:
//   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//   // Upload a larger set of source maps for prettier stack traces (increases build time)
//   widenClientFileUpload: true,

//   // Automatically annotate React components to show their full name in breadcrumbs and session replay
//   reactComponentAnnotation: {
//     enabled: true,
//   },

//   // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
//   // This can increase your server load as well as your hosting bill.
//   // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//   // side errors will fail.
//   tunnelRoute: '/monitoring',

//   // Hides source maps from generated client bundles
//   hideSourceMaps: true,

//   // Automatically tree-shake Sentry logger statements to reduce bundle size
//   disableLogger: true,

//   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//   // See the following for more information:
//   // https://docs.sentry.io/product/crons/
//   // https://vercel.com/docs/cron-jobs
//   automaticVercelMonitors: true,
// });

import { withSentryConfig } from '@sentry/nextjs';
import { IgnorePlugin } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Extend Next.js configurations
  webpack: (config, { isServer }) => {
    // Ignore unused database drivers and other unused modules
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp:
          /^(mysql|mysql2|sqlite3|react-native-sqlite-storage|sql.js|oracledb|pg-native|@sap\/hana-client|mongodb|redis|ioredis|better-sqlite3)$/,
      })
    );

    // Enable specific optimizations for server vs client builds if needed
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Example: Avoid 'fs' module errors on client-side
      };
    }

    // Add alias for 'typeorm' to resolve to the right module
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        typeorm: require.resolve('typeorm'), // Ensures TypeORM resolves correctly
      },
    };

    return config;
  },

  // Add other Next.js configurations here if necessary
  reactStrictMode: true,
  swcMinify: true, // Enable faster builds with SWC
};

export default withSentryConfig(nextConfig, {
  // Sentry-specific configurations
  org: 'self-vkf',
  project: 'repairshop',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
