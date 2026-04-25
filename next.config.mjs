/** @type {import('next').NextConfig} */
const repoName = 'nhom01_dulich_booking';

const nextConfig = {
  output: 'export',
basePath: `/${repoName}`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
