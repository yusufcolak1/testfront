const path = require('path');
const { PrismaClient } = require('../prisma/generated-sqlite-client');
const dbPath = path.resolve(__dirname, '../prisma/dev.db');
const c = new PrismaClient({ datasources: { db: { url: 'file:' + dbPath } } });

async function run() {
  try {
    const chatRoomCols = await c.$queryRawUnsafe('PRAGMA table_info(chat_rooms)');
    console.log('chat_rooms sütunları:', JSON.stringify(chatRoomCols.map(r => r.name)));

    const msgCols = await c.$queryRawUnsafe('PRAGMA table_info(messages)');
    console.log('messages sütunları:', JSON.stringify(msgCols.map(r => r.name)));

    const interCols = await c.$queryRawUnsafe('PRAGMA table_info(user_interactions)');
    console.log('user_interactions sütunları:', JSON.stringify(interCols.map(r => r.name)));

    const chatRoomUsers = await c.$queryRawUnsafe('SELECT * FROM "_ChatRoomToUser" LIMIT 5');
    console.log('_ChatRoomToUser örnek:', JSON.stringify(chatRoomUsers));
  } catch (e) {
    console.error('HATA:', e.message);
  } finally {
    await c.$disconnect();
  }
}
run();
