import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@golfplatform.com' },
    update: {},
    create: {
      email: 'admin@golfplatform.com',
      name: 'Admin User',
      password_hash: adminPassword,
      role: 'ADMIN',
      charity_pct: 10,
    },
  });

  console.log('Admin user seeded:', admin.email);

  const charities = [
    { name: 'Red Cross', description: 'Humanitarian aid organization', events: [] },
    { name: 'WWF', description: 'Wildlife conservation', events: [] },
    { name: 'UNICEF', description: 'Childrens fund', events: [] },
    { name: 'Doctors Without Borders', description: 'Medical relief', events: [] },
    { name: 'Greenpeace', description: 'Environmental organization', events: [] },
    { name: 'Habitat for Humanity', description: 'Shelter building', events: [] },
  ];

  for (const charity of charities) {
    const existing = await prisma.charity.findFirst({ where: { name: charity.name } });
    if (!existing) {
      await prisma.charity.create({ data: charity });
    }
  }
  
  console.log('6 charities seeded');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
