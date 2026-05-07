const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'test@takason.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: hashedPassword },
    create: {
      email,
      passwordHash: hashedPassword,
      role: 'USER',
      status: 'ACTIVE',
      profile: {
        create: {
          firstName: 'Test',
          lastName: 'User',
          city: 'İstanbul',
          country: 'Turkey',
          bio: 'Test hesabı'
        }
      }
    }
  });

  console.log(`Test user created/updated: ${email}`);
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
