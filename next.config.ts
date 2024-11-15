import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API: process.env.URL,
  },
};

export default nextConfig;
