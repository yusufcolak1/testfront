const fs = require('fs');
const path = require('path');
// Since I don't want to install extra packages, I'll just check if there's a simple way.
// Actually, Prisma can generate the schema. I'll try to fix the Prisma command.
// Maybe the issue was the redirection in the shell.
// But the user also wants the system.

console.log("Generating SQL schema using Prisma...");
const { execSync } = require('child_process');
try {
    const output = execSync('npx prisma migrate diff --from-empty --to-schema server/prisma/schema.prisma --script', { encoding: 'utf8' });
    fs.writeFileSync('server/prisma/full_schema.sql', output);
    console.log("SQL schema generated successfully in server/prisma/full_schema.sql");
} catch (error) {
    console.error("Error generating SQL schema:", error.message);
    if (error.stdout) console.log("STDOUT:", error.stdout);
    if (error.stderr) console.log("STDERR:", error.stderr);
}
