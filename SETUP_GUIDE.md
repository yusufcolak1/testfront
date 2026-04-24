# 🚀 TAKASON - Setup Guide

## Supabase Database Setup

The Supabase connection string in `n.env` appears to have issues. Follow these steps:

### Option 1: Execute SQL Migration in Supabase (Recommended)

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **SQL Editor**
4. Copy the contents of `server/prisma/migrations/manual_migration.sql`
5. Paste and execute the SQL
6. Verify the connection string in Supabase:
   - Go to **Project Settings** > **Database**
   - Copy the **Connection Pooling** string (Transaction mode)
   - Update `server/.env` with the correct connection string

### Option 2: Use Local PostgreSQL for Development

1. Install PostgreSQL locally
2. Create a database: `createdb takason_dev`
3. Update `server/.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/takason_dev"
   DIRECT_URL="postgresql://postgres:password@localhost:5432/takason_dev"
   ```
4. Run: `npm run prisma:push`

## Backend Setup

```bash
cd server
npm install
npm run prisma:generate

# After database is set up:
npm run prisma:push  # or execute manual_migration.sql
npm run dev
```

Server will run on: http://localhost:5000

## Frontend Setup

```bash
cd react-app
npm install
npm run dev
```

Frontend will run on: http://localhost:5173

## Environment Variables

Make sure `server/.env` has:
- ✅ DATABASE_URL (Supabase or local PostgreSQL)
- ✅ DIRECT_URL (for migrations)
- ✅ JWT_SECRET
- ✅ JWT_REFRESH_SECRET
- ✅ ALLOWED_ORIGINS

## Testing the API

Once the server is running:

1. Health check: http://localhost:5000/api/health
2. Register: POST http://localhost:5000/api/auth/register
3. Login: POST http://localhost:5000/api/auth/login
4. Items: GET http://localhost:5000/api/items

## Next Steps

1. ✅ Fix Supabase connection or use local PostgreSQL
2. ✅ Execute database migration
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Test authentication flow
6. ✅ Test item creation and listing
7. ✅ Test trade functionality
8. ✅ Test real-time messaging with Socket.io
