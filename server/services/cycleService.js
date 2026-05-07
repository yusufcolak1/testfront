const { prisma } = require('../config/database');

/**
 * TAKASON Multi-Swap Engine (Cycle Detection)
 * DFS algoritması ile ilanlar arası takas döngülerini bulur.
 */

// Yardımcı: JSON parse
function safeParseJSON(str) {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
}

/**
 * Belirli bir ilan için 3'lü takas döngülerini bulur.
 * Döngü: MyItem -> ItemB -> ItemC -> MyItem
 */
const findTradeCycles = async (itemId, maxDepth = 3) => {
  const myItem = await prisma.item.findUnique({
    where: { id: itemId },
    include: { category: true }
  });

  if (!myItem) return [];

  const myCategory = myItem.category?.name;
  const myWanted = safeParseJSON(myItem.wantedCategories);

  // 1. ADIM: MyItem'ın istediği kategoride olan ilanları bul (Potansiyel B adayları)
  const bCandidates = await prisma.item.findMany({
    where: {
      status: 'ACTIVE',
      userId: { not: myItem.userId },
      category: { name: { in: myWanted } }
    },
    include: { category: true, user: { include: { profile: true } }, images: { where: { isPrimary: true }, take: 1 } }
  });

  const cycles = [];

  // 2. ADIM: Her B adayı için, B'nin istediklerini verebilecek C adaylarını bul
  for (const itemB of bCandidates) {
    const bWanted = safeParseJSON(itemB.wantedCategories);
    if (bWanted.length === 0) continue;

    const cCandidates = await prisma.item.findMany({
      where: {
        status: 'ACTIVE',
        userId: { notIn: [myItem.userId, itemB.userId] },
        category: { name: { in: bWanted } }
      },
      include: { category: true, user: { include: { profile: true } }, images: { where: { isPrimary: true }, take: 1 } }
    });

    // 3. ADIM: Her C adayı için, C'nin istediği şey BENİM ilanımsa döngü tamamlanır!
    for (const itemC of cCandidates) {
      const cWanted = safeParseJSON(itemC.wantedCategories);
      
      // Eğer C'nin istediği kategori benim ilanıma uyuyorsa...
      if (cWanted.includes(myCategory)) {
        cycles.push({
          id: `${myItem.id}-${itemB.id}-${itemC.id}`,
          type: '3-WAY',
          steps: [
            { from: 'Siz', give: myItem.title, take: itemB.title, toUser: itemB.user?.profile?.firstName },
            { from: itemB.user?.profile?.firstName, give: itemB.title, take: itemC.title, toUser: itemC.user?.profile?.firstName },
            { from: itemC.user?.profile?.firstName, give: itemC.title, take: myItem.title, toUser: 'Siz' }
          ],
          items: [itemB, itemC]
        });
      }
    }
  }

  return cycles;
};

module.exports = { findTradeCycles };
