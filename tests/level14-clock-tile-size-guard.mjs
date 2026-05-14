import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const failures = [];

const tileSizeMatch = html.match(/buildClockTileSVG\(ch,\s*cm,\s*(\d+)\)/);
const tileSize = tileSizeMatch ? Number(tileSizeMatch[1]) : 0;

if (tileSize < 140) {
  failures.push(`Level 14 clock-choice SVGs should be at least 140px wide; found ${tileSize || 'none'}.`);
}

const minHeightMatch = html.match(/min-height:calc\(var\(--play-w\) \* ([\d.]+)\)/);
const minHeightRatio = minHeightMatch ? Number(minHeightMatch[1]) : 0;

if (minHeightRatio < 0.42) {
  failures.push(`Level 14 clock-choice buttons should reserve at least 42% of --play-w height; found ${minHeightRatio || 'none'}.`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Level 14 clock tile size guard passed.');
