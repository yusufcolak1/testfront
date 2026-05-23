require('dotenv').config();
const { PrismaClient } = require('../prisma/generated-client');

async function main() {
  const p = new PrismaClient();
  try {
    const r = await p.$queryRaw`SELECT 1 as ok`;
    console.log('DB_OK', JSON.stringify(r));
    const users = await p.user.count();
    console.log('USER_COUNT', users);
  } catch (e) {
    console.error('DB_FAIL', e.code || '', e.message);
    process.exitCode = 1;
  } finally {
    await p.$disconnect();
  }
}

main();
