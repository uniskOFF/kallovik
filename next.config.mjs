/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Создаёт статические файлы для GitHub Pages
  images: {
    unoptimized: true, // Отключаем оптимизацию изображений (не нужна на статике)
  },
  // Если твой репозиторий называется НЕ username.github.io, РАСКОММЕНТИРУЙ строки ниже
  // и укажи название твоего репозитория:
  // basePath: '/aesbau-labs',
  // assetPrefix: '/aesbau-labs/',
  trailingSlash: true, // Добавляет / в конце URL (нужно для GitHub Pages)
}

export default nextConfig