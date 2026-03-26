/**
 * One-off: generates favicon PNG sizes + favicon.ico from assets/favicons/icon-512.png
 * Run: npm install && node scripts/generate-favicons.mjs (from craigmillar-final)
 */
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dir = join(root, 'assets', 'favicons');
const src = join(dir, 'icon-512.png');

const out = [
  [32, 'favicon-32x32.png'],
  [180, 'apple-touch-icon.png'],
  [192, 'icon-192.png'],
];

for (const [size, name] of out) {
  await sharp(src).resize(size, size).png().toFile(join(dir, name));
  console.log('wrote', name);
}

const buf16 = await sharp(src).resize(16, 16).png().toBuffer();
const buf32 = await sharp(src).resize(32, 32).png().toBuffer();
const ico = await pngToIco([buf16, buf32]);
writeFileSync(join(dir, 'favicon.ico'), ico);
console.log('wrote favicon.ico');
