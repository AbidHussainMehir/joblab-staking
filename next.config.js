/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    noEmitOnError: true,
  },
  reactStrictMode: false,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "images.unsplash.com",
      "shirshak-jobmarket-superio.vercel.app",
    ],
  },
  env: {
    NEXT_APP_API_URL: "https://api.joblab.ai",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

