const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@takason.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { 
      passwordHash: hashedPassword,
      role: 'ADMIN' 
    },
    create: {
      email,
      passwordHash: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'Takason',
          city: 'İstanbul',
          country: 'Turkey',
          bio: 'Sistem Yöneticisi'
        }
      }
    }
  });

  console.log(`Admin user reset/created: ${email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
