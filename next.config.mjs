/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui.shadcn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        pathname: "/**",
      },
    ],
  },
  /** Browsers / PWA heuristics often request these paths; assets live under `/icons/`. */
  async redirects() {
    return [
      {
        source: "/icon-192.png",
        destination: "/icons/android-chrome-192x192.png",
        permanent: false,
      },
      {
        source: "/icon-512.png",
        destination: "/icons/android-chrome-512x512.png",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
