/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/**',
        // Allow any query string for local images by omitting `search`
      },
    ],
  },
};

export default nextConfig;
