/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://i.pinimg.com/**")],
  },
};

export default nextConfig;
