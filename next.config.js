/** @type {import('next').NextConfig} */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  experimental: {
    appDir: true,
    optimizeCss: true,
    },
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 5,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src');

    if (!dev) {
      // polyfill IE11
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./assets/polyfills.js')
        ) {
          entries['main.js'].unshift('./assets/polyfills.js');
        }
        return entries;
      };
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: 6,
              warnings: false,
              output: {
                comments: false,
              },
              compress: {
                drop_console: true, // remove console
              },
              ie8: false,
            },
          }),
          new CssMinimizerPlugin({
            parallel: true,
            minify: [
              CssMinimizerPlugin.cssnanoMinify,
              CssMinimizerPlugin.cleanCssMinify,
            ],
          }),
        ],
      };
      config.module.rules.push({
        test: /\.tsx$/,
        include: path.resolve(__dirname, './src'),
        options: {
          workers: 2,

          // number of jobs a worker processes in parallel
          // defaults to 20
          workerParallelJobs: 50,

          // additional node.js arguments
          workerNodeArgs: ['--max-old-space-size=1024'],

          // Allow to respawn a dead worker pool
          // respawning slows down the entire compilation
          // and should be set to false for development
          poolRespawn: false,

          // timeout for killing the worker processes when idle
          // defaults to 500 (ms)
          // can be set to Infinity for watching builds to keep workers alive
          poolTimeout: 2000,

          // number of jobs the poll distributes to the workers
          // defaults to 200
          // decrease of less efficient but more fair distribution
          poolParallelJobs: 50,

          // name of the pool
          // can be used to create different pools with elsewise identical options
          name: 'my-pool',
        },
        loader: 'thread-loader',
      });
      config.devtool = isServer ? false : 'source-map';
    } else {
      config.plugins.push(
        new ESLintWebpackPlugin({
          context: path.resolve(__dirname, './src'),
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true,
          quiet: false,
          extensions: [`tsx`],
          exclude: [`node_modules`],
        })
      );
    }
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|svg|jpg)$/i,
      use: [
        {
          loader: `img-optimize-loader`,
          options: {
            compress: {
              // This will transform your png/jpg into webp.
              webp: true,
              disableOnDevelopment: true,
              publicPath: 'auto',
            },
          },
        },
      ],
    });
    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    rootDir: path.join(__dirname, './'),
    PORT: isDev ? 3000 : process.env.PORT || 8688,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public',
    isDev, // Pass through env variables
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' || 'http',
        hostname: '**',
      },
    ],
  },
};
module.exports = withBundleAnalyzer(nextConfig);
