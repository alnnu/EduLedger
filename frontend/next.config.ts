import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/ipfs/:path*",
        destination: `${process.env.NEXT_PUBLIC_IPFS_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
