/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      },
};

export default nextConfig;
