import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Default is 1mb
    },
  },
  // This is required for Genkit video generation to work in dev mode.
  // In a real app you might want to use a more robust solution for handling large file uploads.
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.ignoreWarnings = (config.ignoreWarnings || []).concat([
        /body-size-limit/,
      ]);
    }
    return config;
  },
  allowedDevOrigins: [
    'https://6000-firebase-studio-1759172386497.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
