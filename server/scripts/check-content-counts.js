require('dotenv').config();
const { PrismaClient } = require('../prisma/generated-client');

async function main() {
  const p = new PrismaClient();
  const counts = {
    faq: await p.fAQ.count(),
    help: await p.helpCategory.count(),
    perks: await p.premiumPerk.count(),
    plans: await p.premiumPlan.count(),
    steps: await p.safeSwapStep.count(),
    settings: await p.siteSetting.count(),
  };
  console.log(JSON.stringify(counts, null, 2));
  await p.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
