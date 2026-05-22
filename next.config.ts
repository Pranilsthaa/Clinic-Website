import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.2'],
  images: {
    remotePatterns: [
      new URL('https://lh3.googleusercontent.com/**'),
    ],
  },
};

export default nextConfig;
