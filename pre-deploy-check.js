#!/usr/bin/env node

/**
 * PRE-DEPLOYMENT CHECK SCRIPT
 * Production'a göndermeden önce tüm kritik kontrolleri yapar
 */

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m';
const RESET = '\x1b[0m';

let errors = [];
let warnings = [];
let passed = 0;

console.log(`${BLUE}
╔═══════════════════════════════════════════╗
║   TAKASON PRE-DEPLOYMENT CHECK            ║
║   Production Hazırlık Kontrolü            ║
╚═══════════════════════════════════════════╝
${RESET}`);

// ============================================
// Helper Functions
// ============================================

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`${GREEN}✓${RESET} ${description}`);
    passed++;
    return true;
  } else {
    console.log(`${RED}✗${RESET} ${description}`);
    errors.push(`Missing file: ${filePath}`);
    return false;
  }
}

function checkEnvVariable(filePath, varName, description) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`^${varName}=.+`, 'm');
  
  if (regex.test(content)) {
    // Check if it's a placeholder
    const match = content.match(regex);
    if (match && (
      match[0].includes('CHANGE-THIS') || 
      match[0].includes('your_') || 
      match[0].includes('[PROJECT-REF]') ||
      match[0].includes('[PASSWORD]')
    )) {
      console.log(`${YELLOW}⚠${RESET} ${description} - Placeholder değer kullanılıyor!`);
      warnings.push(`${varName} in ${filePath} has placeholder value`);
      return false;
    }
    console.log(`${GREEN}✓${RESET} ${description}`);
    passed++;
    return true;
  } else {
    console.log(`${RED}✗${RESET} ${description}`);
    errors.push(`Missing env variable: ${varName} in ${filePath}`);
    return false;
  }
}

function checkPackageJson(filePath, description) {
  if (!fs.existsSync(filePath)) {
    console.log(`${RED}✗${RESET} ${description} - File not found`);
    errors.push(`Missing: ${filePath}`);
    return false;
  }
  
  try {
    const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!pkg.dependencies || Object.keys(pkg.dependencies).length === 0) {
      console.log(`${YELLOW}⚠${RESET} ${description} - No dependencies found`);
      warnings.push(`${filePath} has no dependencies`);
      return false;
    }
    
    console.log(`${GREEN}✓${RESET} ${description} (${Object.keys(pkg.dependencies).length} dependencies)`);
    passed++;
    return true;
  } catch (e) {
    console.log(`${RED}✗${RESET} ${description} - Invalid JSON`);
    errors.push(`Invalid JSON: ${filePath}`);
    return false;
  }
}

// ============================================
// 1. File Structure Check
// ============================================
console.log(`\n${BLUE}[1] Dosya Yapısı Kontrolü${RESET}`);

checkFile('server/server.js', 'Backend entry point');
checkFile('server/app.js', 'Express app configuration');
checkFile('server/package.json', 'Backend package.json');
checkFile('server/prisma/schema.prisma', 'Prisma schema');
checkFile('server/prisma/schema.production.prisma', 'Production Prisma schema');
checkFile('react-app/package.json', 'Frontend package.json');
checkFile('react-app/src/main.jsx', 'Frontend entry point');
checkFile('react-app/src/lib/api.js', 'API client');
checkFile('react-app/src/contexts/AuthContext.jsx', 'Auth context');

// ============================================
// 2. Environment Variables Check
// ============================================
console.log(`\n${BLUE}[2] Environment Variables Kontrolü${RESET}`);

// Backend
checkFile('server/.env.production', 'Backend production env file');
checkEnvVariable('server/.env.production', 'NODE_ENV', 'NODE_ENV variable');
checkEnvVariable('server/.env.production', 'DATABASE_URL', 'Database URL');
checkEnvVariable('server/.env.production', 'JWT_SECRET', 'JWT Secret');
checkEnvVariable('server/.env.production', 'JWT_REFRESH_SECRET', 'JWT Refresh Secret');
checkEnvVariable('server/.env.production', 'ALLOWED_ORIGINS', 'CORS Origins');

// Frontend
checkFile('react-app/.env.production', 'Frontend production env file');
checkEnvVariable('react-app/.env.production', 'VITE_API_URL', 'Frontend API URL');

// ============================================
// 3. Dependencies Check
// ============================================
console.log(`\n${BLUE}[3] Dependencies Kontrolü${RESET}`);

checkPackageJson('server/package.json', 'Backend dependencies');
checkPackageJson('react-app/package.json', 'Frontend dependencies');

// Check if node_modules exist
if (fs.existsSync('server/node_modules')) {
  console.log(`${GREEN}✓${RESET} Backend node_modules mevcut`);
  passed++;
} else {
  console.log(`${YELLOW}⚠${RESET} Backend node_modules bulunamadı - npm install gerekli`);
  warnings.push('Backend node_modules not found');
}

if (fs.existsSync('react-app/node_modules')) {
  console.log(`${GREEN}✓${RESET} Frontend node_modules mevcut`);
  passed++;
} else {
  console.log(`${YELLOW}⚠${RESET} Frontend node_modules bulunamadı - npm install gerekli`);
  warnings.push('Frontend node_modules not found');
}

// ============================================
// 4. Security Check
// ============================================
console.log(`\n${BLUE}[4] Güvenlik Kontrolü${RESET}`);

// Check for default passwords
const backendEnv = fs.existsSync('server/.env.production') 
  ? fs.readFileSync('server/.env.production', 'utf8') 
  : '';

if (backendEnv.includes('CHANGE-THIS')) {
  console.log(`${RED}✗${RESET} JWT secrets hala placeholder değerler içeriyor!`);
  errors.push('JWT secrets must be changed from placeholder values');
} else {
  console.log(`${GREEN}✓${RESET} JWT secrets güncellendi`);
  passed++;
}

if (backendEnv.includes('123456') || backendEnv.includes('password')) {
  console.log(`${RED}✗${RESET} Zayıf şifreler tespit edildi!`);
  errors.push('Weak passwords detected in environment variables');
} else {
  console.log(`${GREEN}✓${RESET} Zayıf şifre tespit edilmedi`);
  passed++;
}

// Check if .env files are in .gitignore
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  if (gitignore.includes('.env')) {
    console.log(`${GREEN}✓${RESET} .env dosyaları .gitignore'da`);
    passed++;
  } else {
    console.log(`${RED}✗${RESET} .env dosyaları .gitignore'a eklenmeli!`);
    errors.push('.env files should be in .gitignore');
  }
} else {
  console.log(`${YELLOW}⚠${RESET} .gitignore dosyası bulunamadı`);
  warnings.push('.gitignore file not found');
}

// ============================================
// 5. Code Quality Check
// ============================================
console.log(`\n${BLUE}[5] Kod Kalitesi Kontrolü${RESET}`);

// Check for console.log in production code (warning only)
const checkForConsoleLogs = (dir, fileExt) => {
  let count = 0;
  const files = fs.readdirSync(dir, { recursive: true });
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile() && filePath.endsWith(fileExt)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(/console\.(log|warn|error)/g);
      if (matches) count += matches.length;
    }
  }
  return count;
};

try {
  const backendLogs = checkForConsoleLogs('server', '.js');
  const frontendLogs = checkForConsoleLogs('react-app/src', '.jsx');
  
  if (backendLogs > 10 || frontendLogs > 10) {
    console.log(`${YELLOW}⚠${RESET} Çok fazla console.log tespit edildi (Backend: ${backendLogs}, Frontend: ${frontendLogs})`);
    warnings.push('Consider removing console.log statements for production');
  } else {
    console.log(`${GREEN}✓${RESET} Console.log kullanımı makul seviyede`);
    passed++;
  }
} catch (e) {
  console.log(`${YELLOW}⚠${RESET} Console.log kontrolü yapılamadı`);
}

// ============================================
// 6. Build Check
// ============================================
console.log(`\n${BLUE}[6] Build Kontrolü${RESET}`);

if (fs.existsSync('react-app/dist')) {
  console.log(`${GREEN}✓${RESET} Frontend build mevcut`);
  passed++;
} else {
  console.log(`${YELLOW}⚠${RESET} Frontend build bulunamadı - npm run build gerekli`);
  warnings.push('Frontend build not found - run npm run build');
}

// ============================================
// SUMMARY
// ============================================
console.log(`\n${BLUE}═══════════════════════════════════════════${RESET}`);
console.log(`${BLUE}ÖZET${RESET}`);
console.log(`${BLUE}═══════════════════════════════════════════${RESET}\n`);

console.log(`${GREEN}✓ Başarılı: ${passed}${RESET}`);
console.log(`${YELLOW}⚠ Uyarı: ${warnings.length}${RESET}`);
console.log(`${RED}✗ Hata: ${errors.length}${RESET}\n`);

if (errors.length > 0) {
  console.log(`${RED}KRİTİK HATALAR:${RESET}`);
  errors.forEach((err, i) => {
    console.log(`  ${i + 1}. ${err}`);
  });
  console.log('');
}

if (warnings.length > 0) {
  console.log(`${YELLOW}UYARILAR:${RESET}`);
  warnings.forEach((warn, i) => {
    console.log(`  ${i + 1}. ${warn}`);
  });
  console.log('');
}

// Final verdict
if (errors.length === 0) {
  console.log(`${GREEN}✓ Production'a hazır!${RESET}`);
  console.log(`\nSonraki adımlar:`);
  console.log(`  1. bash deploy.sh - Otomatik deployment`);
  console.log(`  2. PRODUCTION_DEPLOYMENT.md - Detaylı kılavuz\n`);
  process.exit(0);
} else {
  console.log(`${RED}✗ Production'a hazır değil!${RESET}`);
  console.log(`\nLütfen yukarıdaki hataları düzeltin ve tekrar çalıştırın:\n`);
  console.log(`  node pre-deploy-check.js\n`);
  process.exit(1);
}
