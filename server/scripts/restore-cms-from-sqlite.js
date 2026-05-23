// CMS içeriğini SQLite (dev.db) → Supabase PostgreSQL
// Kullanıcılar, ilanlar, takaslar dokunulmaz.

require('dotenv').config();
const path = require('path');
const { PrismaClient: SQLiteClient } = require('../prisma/generated-sqlite-client');
const { PrismaClient: PgClient } = require('../prisma/generated-client');

const dbPath = path.resolve(__dirname, '../prisma/dev.db');
const sqlite = new SQLiteClient({ datasources: { db: { url: `file:${dbPath}` } } });
const pg = new PgClient();

function toBool(v) {
  return v === 1 || v === true || v === 'true';
}

async function countSqlite(table) {
  const rows = await sqlite.$queryRawUnsafe(`SELECT COUNT(*) as c FROM ${table}`);
  return Number(rows[0]?.c ?? 0);
}

async function restoreFaqs() {
  const rows = await sqlite.$queryRawUnsafe('SELECT * FROM faqs ORDER BY "order" ASC, created_at ASC');
  if (!rows.length) return 0;
  await pg.fAQ.deleteMany({});
  let n = 0;
  for (const r of rows) {
    await pg.fAQ.create({
      data: {
        id: r.id,
        question: r.question,
        answer: r.answer,
        category: r.category,
        order: r.order ?? 0,
        isActive: toBool(r.is_active ?? 1),
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        updatedAt: r.updated_at ? new Date(r.updated_at) : undefined,
      },
    });
    n++;
  }
  return n;
}

async function restoreHelpCategories() {
  const rows = await sqlite.$queryRawUnsafe('SELECT * FROM help_categories ORDER BY "order" ASC');
  if (!rows.length) return 0;
  await pg.helpCategory.deleteMany({});
  let n = 0;
  for (const r of rows) {
    await pg.helpCategory.create({
      data: {
        id: r.id,
        title: r.title,
        description: r.description,
        icon: r.icon || 'HelpCircle',
        order: r.order ?? 0,
        isActive: toBool(r.is_active ?? 1),
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        updatedAt: r.updated_at ? new Date(r.updated_at) : undefined,
      },
    });
    n++;
  }
  return n;
}

async function restorePremiumPerks() {
  const rows = await sqlite.$queryRawUnsafe('SELECT * FROM premium_perks ORDER BY "order" ASC');
  if (!rows.length) return 0;
  await pg.premiumPerk.deleteMany({});
  let n = 0;
  for (const r of rows) {
    await pg.premiumPerk.create({
      data: {
        id: r.id,
        title: r.title,
        value: r.value,
        description: r.description,
        icon: r.icon || 'Sparkles',
        color: r.color || 'text-amber-500',
        order: r.order ?? 0,
        isActive: toBool(r.is_active ?? 1),
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        updatedAt: r.updated_at ? new Date(r.updated_at) : undefined,
      },
    });
    n++;
  }
  return n;
}

async function restorePremiumPlans() {
  const rows = await sqlite.$queryRawUnsafe('SELECT * FROM premium_plans ORDER BY "order" ASC');
  if (!rows.length) return 0;
  await pg.premiumPlan.deleteMany({});
  let n = 0;
  for (const r of rows) {
    await pg.premiumPlan.create({
      data: {
        id: r.id,
        name: r.name,
        price: parseFloat(r.price),
        period: r.period || 'MONTHLY',
        description: r.description,
        features: r.features,
        order: r.order ?? 0,
        isActive: toBool(r.is_active ?? 1),
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        updatedAt: r.updated_at ? new Date(r.updated_at) : undefined,
      },
    });
    n++;
  }
  return n;
}

async function restoreSafeSwapSteps() {
  const rows = await sqlite.$queryRawUnsafe('SELECT * FROM safe_swap_steps ORDER BY "order" ASC');
  if (!rows.length) return 0;
  await pg.safeSwapStep.deleteMany({});
  let n = 0;
  for (const r of rows) {
    await pg.safeSwapStep.create({
      data: {
        id: r.id,
        title: r.title,
        description: r.description,
        icon: r.icon || 'Shield',
        order: r.order ?? 0,
        isActive: toBool(r.is_active ?? 1),
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        updatedAt: r.updated_at ? new Date(r.updated_at) : undefined,
      },
    });
    n++;
  }
  return n;
}

async function restoreSiteSettings() {
  const rows = await sqlite.$queryRawUnsafe('SELECT * FROM site_settings ORDER BY "group", key');
  if (!rows.length) return 0;
  let n = 0;
  for (const r of rows) {
    await pg.siteSetting.upsert({
      where: { key: r.key },
      update: {
        value: r.value,
        type: r.type || 'STRING',
        group: r.group || 'general',
        description: r.description,
        isPublic: toBool(r.is_public),
      },
      create: {
        id: r.id,
        key: r.key,
        value: r.value,
        type: r.type || 'STRING',
        group: r.group || 'general',
        description: r.description,
        isPublic: toBool(r.is_public),
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        updatedAt: r.updated_at ? new Date(r.updated_at) : undefined,
      },
    });
    n++;
  }
  return n;
}

async function main() {
  console.log('📦 SQLite:', dbPath);
  await pg.$connect();

  const sqliteCounts = {
    faqs: await countSqlite('faqs'),
    help_categories: await countSqlite('help_categories'),
    premium_perks: await countSqlite('premium_perks'),
    premium_plans: await countSqlite('premium_plans'),
    safe_swap_steps: await countSqlite('safe_swap_steps'),
    site_settings: await countSqlite('site_settings'),
  };
  console.log('SQLite kayıtları:', sqliteCounts);

  const restored = {
    faqs: await restoreFaqs(),
    help_categories: await restoreHelpCategories(),
    premium_perks: await restorePremiumPerks(),
    premium_plans: await restorePremiumPlans(),
    safe_swap_steps: await restoreSafeSwapSteps(),
    site_settings: await restoreSiteSettings(),
  };

  console.log('Supabase\'e aktarılan:', restored);

  const pgCounts = {
    faqs: await pg.fAQ.count(),
    help_categories: await pg.helpCategory.count(),
    premium_perks: await pg.premiumPerk.count(),
    premium_plans: await pg.premiumPlan.count(),
    safe_swap_steps: await pg.safeSwapStep.count(),
    site_settings: await pg.siteSetting.count(),
  };
  console.log('Supabase son durum:', pgCounts);
}

main()
  .catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await sqlite.$disconnect();
    await pg.$disconnect();
  });
