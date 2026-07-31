/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // basePath: '/kallovik',  // ← ЗАКОММЕНТИРУЙ ЭТУ СТРОКУ
  // assetPrefix: '/kallovik/', // ← И ЭТУ ТОЖЕ
}

export default nextConfig