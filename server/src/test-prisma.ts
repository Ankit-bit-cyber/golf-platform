import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma connection...');
  try {
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
  } catch (err: any) {
    console.error('Prisma connection failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
