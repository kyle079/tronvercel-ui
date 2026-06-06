#!/usr/bin/env node
/**
 * Asserts every non-test component file in src/components/ui/ is re-exported
 * from src/index.ts. Run via: node scripts/check-exports.mjs
 */
import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const componentDir = join(root, 'src/components/ui');
const indexPath = join(root, 'src/index.ts');

const indexContent = readFileSync(indexPath, 'utf8');

// Collect all .tsx files in src/components/ui (non-recursive: top-level + auth/)
const files = [];
for (const entry of readdirSync(componentDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.tsx')) {
    files.push(entry.name.replace(/\.tsx$/, ''));
  } else if (entry.isDirectory()) {
    // subdirectory (e.g. auth) — check it's referenced as a whole
    files.push(entry.name);
  }
}

const missing = files.filter((name) => {
  const pattern = `./components/ui/${name}`;
  return !indexContent.includes(pattern);
});

if (missing.length > 0) {
  console.error('ERROR: The following component modules are NOT exported from src/index.ts:');
  missing.forEach((m) => console.error(`  - src/components/ui/${m}`));
  process.exit(1);
}

console.log(`✓ All ${files.length} component modules are exported from src/index.ts`);
