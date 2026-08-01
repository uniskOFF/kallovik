/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===== Output =====
  output: 'export',
  trailingSlash: true,

  // ===== Images =====
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ===== Base Path =====
  basePath: '/kallovik',
  assetPrefix: '/kallovik/',

  // ===== Performance =====
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // ===== HTTP Agent =====
  httpAgentOptions: {
    keepAlive: true,
  },

  // ===== Turbopack (Next.js 16+) =====
  turbopack: {},

  // ===== Experimental =====
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'motion',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
}

export default nextConfig