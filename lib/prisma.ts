import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL ?? '',
  });
  return new PrismaClient({ adapter });
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrisma();
  }
  return globalForPrisma.prisma;
}

if (process.env.NODE_ENV !== 'production') {
  // cache para hot‑reload no dev
  globalForPrisma.prisma ??= createPrisma();
}