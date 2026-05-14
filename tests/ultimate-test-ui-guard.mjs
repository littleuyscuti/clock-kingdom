import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const failures = [];

if (!html.includes('#screen-game.is-ultimate-test .progress-dots')) {
  failures.push('Ultimate Test should hide the normal finite-question progress dots.');
}

if (!html.includes("gameScreen.classList.toggle('is-ultimate-test', n === 17)")) {
  failures.push('Game screen must mark L17 with is-ultimate-test so its HUD can use score-attack styling.');
}

if (!html.includes('if (currentLevel === 17) return;')) {
  failures.push('updateProgressDots should not render fake finite dots for Ultimate Test.');
}

if (!html.includes('qc.textContent = `Q${i + 1}`;')) {
  failures.push('Ultimate Test question counter should show Q1/Q2/etc., not 1 / 5.');
}

if (!html.includes('const isCurrent = n === currentLvl && !perfect;')) {
  failures.push('Completed levels, including Ultimate Test after score > 0, should not keep the current-level tile style.');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Ultimate Test UI guard passed.');
