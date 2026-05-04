#!/usr/bin/env node

/**
 * Veeva CLM Pack Script
 *
 * Takes the Vite build output (dist/) and repackages it into a
 * Veeva-compatible zip structure where each slide is a separate
 * folder with its own index.html that loads the shared SPA bundle.
 *
 * Output structure:
 *   veeva-pack/
 *   ├── shared/
 *   │   ├── assets/          ← JS, CSS, fonts from dist/assets/
 *   │   └── index.html       ← SPA shell (copied from dist/index.html)
 *   ├── 01-cover/
 *   │   └── index.html       ← redirects to shared/index.html#/0
 *   ├── 02-pillars/
 *   │   └── index.html
 *   └── ...
 *
 * Usage: node scripts/veeva-pack.js
 */

import { mkdirSync, cpSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const packDir = join(root, 'veeva-pack');
const zipFile = join(root, 'veeva-clm.zip');

const slides = [
  { id: '01-cover', title: 'Cover' },
  { id: '02-overview', title: 'Overview Menu' },
  { id: '03-pillars', title: 'Three Pillars' },
  { id: '04-timeline', title: 'Career Timeline' },
  { id: '05-stack', title: 'Tech Stack' },
  { id: '06-case-domru', title: 'Case Dom.ru' },
  { id: '07-architecture', title: 'Architecture Interactive' },
  { id: '08-skills', title: 'Tooling Spectrum' },
  { id: '09-contact', title: 'Contact' },
];

// Clean
if (existsSync(packDir)) rmSync(packDir, { recursive: true });
if (existsSync(zipFile)) rmSync(zipFile);

// Check dist exists
if (!existsSync(distDir)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

// 1. Copy shared assets
const sharedDir = join(packDir, 'shared');
mkdirSync(join(sharedDir, 'assets'), { recursive: true });
cpSync(join(distDir, 'assets'), join(sharedDir, 'assets'), { recursive: true });
cpSync(join(distDir, 'index.html'), join(sharedDir, 'index.html'));

console.log('✓ shared/ created');

// 2. Create per-slide folders
// Each slide gets an index.html that loads the SPA with a hash to navigate to the right slide
slides.forEach((slide, i) => {
  const slideDir = join(packDir, slide.id);
  mkdirSync(slideDir, { recursive: true });

  // Find actual CSS and JS filenames from dist/assets
  const assets = readdirSync(join(distDir, 'assets'));
  const cssFile = assets.find(f => f.endsWith('.css'));
  const jsFile = assets.find(f => f.endsWith('.js'));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1024, initial-scale=1.0">
<title>${slide.title} · CLM Vyacheslav Kovalev</title>
<link rel="stylesheet" href="../shared/assets/${cssFile}">
</head>
<body>
<div id="app"></div>
<script>window.__CLM_START_SLIDE__ = ${i};</script>
<script type="module" src="../shared/assets/${jsFile}"></script>
</body>
</html>`;

  writeFileSync(join(slideDir, 'index.html'), html);
  console.log(`  ✓ ${slide.id}/`);
});

// 3. Create zip
try {
  execSync(`cd "${packDir}" && zip -r "${zipFile}" . -x ".*"`, { stdio: 'pipe' });
  console.log(`\n✓ veeva-clm.zip created (${Math.round(statSync(zipFile).size / 1024)} KB)`);
} catch {
  console.log('\n⚠ zip command not available — veeva-pack/ directory is ready for manual zipping');
}

console.log('\nDone. Upload veeva-clm.zip to Veeva Vault.');
