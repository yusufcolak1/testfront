const { prisma } = require('../config/database');

async function main() {
  const settings = await prisma.siteSetting.findMany({
    where: { isPublic: true }
  });
  console.log(JSON.stringify(settings, null, 2));
}

main().finally(() => prisma.$disconnect());
