# PostgreSQL Installation Guide for Windows

## Option 1: Manual Installation (Recommended)

1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer as Administrator
3. During installation:
   - Set password for postgres user: `postgres`
   - Port: `5432` (default)
   - Install pgAdmin 4 (GUI tool)
4. After installation, open pgAdmin or command prompt and create database:
   ```sql
   CREATE DATABASE takason_dev;
   ```

## Option 2: Using Docker (Alternative)

If you have Docker Desktop installed:

```bash
docker run --name takason-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=takason_dev -p 5432:5432 -d postgres:16
```

## Option 3: Use SQLite for Quick Development

If you want to skip PostgreSQL installation for now:

1. Update `server/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. Update `server/.env`:
   ```
   DATABASE_URL="file:./dev.db"
   ```

3. Run:
   ```bash
   npm run prisma:push
   npm run dev
   ```

## Verify PostgreSQL Installation

After installation, test the connection:

```bash
psql -U postgres -d takason_dev
```

If successful, you'll see the PostgreSQL prompt. Type `\q` to exit.

## Next Steps

Once PostgreSQL is installed and the database is created:

```bash
cd server
npm run prisma:push
npm run dev
```
