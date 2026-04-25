/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      { protocol: "https", hostname: "toplist.vn" },
      { protocol: "https", hostname: "ticotravel.com.vn" },
      { protocol: "https", hostname: "lavyon.com" },
      { protocol: "https", hostname: "toquoc.mediacdn.vn" },
      { protocol: "https", hostname: "res.klook.com" },
      { protocol: "https", hostname: "th.bing.com" },
      { protocol: "https", hostname: "static.vinwonders.com" },
      { protocol: "https", hostname: "tiniworld.com" },
      { protocol: "https", hostname: "passionate-travel.com" },
      { protocol: "https", hostname: "peacetour.com.vn" },
      { protocol: "https", hostname: "impresstravel.com" },
      { protocol: "https", hostname: "galatravel.vn" },
      { protocol: "https", hostname: "www.damsenwaterpark.com.vn" },
      { protocol: "https", hostname: "mythuattanviet.com" },
      { protocol: "https", hostname: "www.commercialinteriordesign.com" },
      { protocol: "https", hostname: "dulichvuivn.com" },
      { protocol: "https", hostname: "statics.vinpearl.com" },
      { protocol: "https", hostname: "image.vietgoing.com" },
    ],
  },
};

export default nextConfig;
