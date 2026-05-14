/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['cdn.jsdelivr.net', 'avatars.githubusercontent.com'],
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
