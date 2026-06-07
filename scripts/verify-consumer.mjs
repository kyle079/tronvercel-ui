#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = process.cwd();
const tempRoot = mkdtempSync(join(tmpdir(), 'tronvercel-ui-pack-'));

try {
  const manifestPath = join(root, 'package.json');
  const { name, version } = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const packageStem = name.startsWith('@') ? name.slice(1).replace('/', '-') : name;
  const tarball = join(root, `${packageStem}-${version}.tgz`);

  if (existsSync(tarball)) {
    rmSync(tarball, { force: true });
  }

  const packJson = execFileSync('npm', ['pack', '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  const [{ filename }] = JSON.parse(packJson);
  const unpackDir = join(tempRoot, 'unpacked');
  const packedTarball = join(root, filename);

  execFileSync('mkdir', ['-p', unpackDir], { cwd: root });
  execFileSync('tar', ['-xzf', packedTarball, '-C', unpackDir], { cwd: root });

  const manifest = JSON.parse(
    readFileSync(join(unpackDir, 'package', 'package.json'), 'utf8'),
  );

  const requiredExports = ['.', './styles', './tokens', './package.json'];
  for (const key of requiredExports) {
    if (!(key in manifest.exports)) {
      throw new Error(`missing export ${key}`);
    }
  }

  const packedFiles = new Set(
    execFileSync('find', ['package', '-type', 'f'], {
      cwd: unpackDir,
      encoding: 'utf8',
    })
      .trim()
      .split('\n')
      .filter(Boolean),
  );

  const requiredFiles = [
    'package/dist/tronvercel-ui.js',
    'package/dist/tronvercel-ui.cjs',
    'package/dist/index.d.ts',
    'package/dist/style.css',
    'package/dist/tokens.css',
  ];

  for (const file of requiredFiles) {
    if (!packedFiles.has(file)) {
      throw new Error(`missing packaged file ${file}`);
    }
  }

  for (const file of packedFiles) {
    if (file.startsWith('package/src/')) {
      throw new Error(`unexpected source file in tarball: ${file}`);
    }
  }

  console.log('✓ Consumer package contract verified');
} finally {
  const manifestPath = join(root, 'package.json');
  const { name, version } = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const packageStem = name.startsWith('@') ? name.slice(1).replace('/', '-') : name;
  rmSync(join(root, `${packageStem}-${version}.tgz`), { force: true });
  rmSync(tempRoot, { recursive: true, force: true });
}
