const { prisma } = require('../config/database');

async function run() {
  const settings = await prisma.siteSetting.findMany();
  console.log(JSON.stringify(settings, null, 2));
  await prisma.$disconnect();
}

run().catch(console.error);
