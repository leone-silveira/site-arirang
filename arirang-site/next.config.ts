import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/arirang-site',
  serverExternalPackages: ['@prisma/client'],
}

export default nextConfig     