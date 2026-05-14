import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const failures = [];

function ruleBody(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`, 'm'));
  return match ? match[1] : '';
}

const skyBase = ruleBody('.sky-bg');

if (!skyBase.includes('clock-kingdom-map-bg-v2.png')) {
  failures.push('Base .sky-bg must include the PNG map image so the background is visible before JS sets screen-state classes.');
}

if (/body\.(?:home-active|level-world-active)\s+\.sky-bg/.test(html)) {
  failures.push('Map background must not depend on home-active/level-world-active body classes.');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Background image guard passed.');
