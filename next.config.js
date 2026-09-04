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
  poweredByHeader: false,
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src');
    config.resolve.alias['@assets'] = path.resolve(__dirname, './public/assets');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};
module.exports = withBundleAnalyzer(nextConfig);
