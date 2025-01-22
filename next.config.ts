import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Desactiva ESLint durante la construcción
  },
};

export default nextConfig;
