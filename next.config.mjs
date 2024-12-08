// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://finstar-assignment-backend.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
