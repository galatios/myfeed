import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.zenfs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.yimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.investing.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'csv-storage.forexpros.com',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    // This is needed to allow the Next.js dev server to accept requests from the
    // Firebase Studio development environment.
    allowedDevOrigins: ["*.cloudworkstations.dev"],
  },
};

export default nextConfig;
