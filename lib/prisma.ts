import { PrismaClient } from "@prisma/client/edge";
import { PrismaD1 } from "@prisma/adapter-d1";

const prismaClientSingleton = () => {
  // Check if we're in a Cloudflare environment with D1
  if (typeof globalThis.hubDatabase === 'function') {
    try {
      // Use NuxtHub's hubDatabase for D1 connection
      const d1Database = globalThis.hubDatabase();
      const adapter = new PrismaD1(d1Database);
      return new PrismaClient({ 
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
      } as any);
    } catch (error) {
      console.warn('Failed to connect to D1, falling back to default:', error);
    }
  }
  
  // Default client for development
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
  hubDatabase?: () => any;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
