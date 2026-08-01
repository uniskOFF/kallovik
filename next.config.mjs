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

  // ===== HTTP Headers =====
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/:path*.{css,js,woff,woff2,ttf,svg,png,jpg,jpeg,gif,webp,avif}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },

  // ===== HTTP Agent =====
  httpAgentOptions: {
    keepAlive: true,
  },

  // ===== Webpack =====
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
              const packageName = match ? match[1] : 'unknown'
              return `npm.${packageName.replace('@', '')}`
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module, chunks) {
              return `shared.${chunks.map((c) => c.name).join('.')}`
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
        maxInitialRequests: 25,
        minSize: 20000,
      },
    }

    return config
  },

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

  // ===== Error Handling =====
  onError: (err, req, res) => {
    console.error('Next.js error:', err)
    if (res && !res.headersSent) {
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  },

  // ===== Redirects =====
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig