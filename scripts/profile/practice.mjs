import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { root, out, svg } from './design.mjs';

const destination = path.join(out, 'practice');

function keyboard(theme) {
  const c = theme === 'dark'
    ? { edge: '#727f76', base: '#414e48', deck: '#c6cebf', key: '#eee9da', shade: '#aeb7a7', legend: '#657169', yellow: '#e8c94b' }
    : { edge: '#65726a', base: '#6b776c', deck: '#d5dacd', key: '#fffaf0', shade: '#adb8a5', legend: '#667568', yellow: '#e2b932' };
  const key = (x, y, width, fill = c.key, mark = true) => [
    `<rect x="${x}" y="${y + 2}" width="${width}" height="10" rx="2" fill="${c.shade}"/>`,
    `<rect x="${x}" y="${y}" width="${width}" height="10" rx="2" fill="${fill}"/>`,
    mark ? `<path d="M${x + 3} ${y + 3.5} h${Math.min(3, width - 6)}" stroke="${c.legend}" stroke-width=".8" stroke-linecap="round"/>` : '',
  ].join('');
  const keys = [];
  for (let i = 0; i < 10; i++) keys.push(key(21 + i * 12, 34, 10, i === 0 ? c.yellow : c.key));
  keys.push(key(141, 34, 19));
  keys.push(key(21, 47, 16));
  for (let i = 0; i < 10; i++) keys.push(key(39 + i * 12, 47, i === 9 ? 13 : 10));
  keys.push(key(21, 60, 20));
  for (let i = 0; i < 8; i++) keys.push(key(43 + i * 12, 60, 10));
  keys.push(key(139, 60, 21));
  keys.push(key(21, 73, 13), key(36, 73, 13), key(51, 73, 65, c.key, false), key(118, 73, 12), key(132, 73, 12), key(146, 73, 14));
  return svg(180, 105, 'A compact keyboard with cream keys and a yellow escape key.', [
    `<g transform="rotate(-5 90 58)">`,
    `<path d="M120 29 V17 Q120 10 129 10 H141" fill="none" stroke="${c.edge}" stroke-width="3" stroke-linecap="round"/>`,
    `<rect x="139" y="7.5" width="8" height="5" rx="1.5" fill="${c.edge}"/>`,
    `<rect x="12" y="29" width="156" height="65" rx="8" fill="${c.base}"/>`,
    `<rect x="12" y="24" width="156" height="65" rx="8" fill="${c.deck}" stroke="${c.edge}" stroke-width="1"/>`,
    `<path d="M19 28 H160" stroke="#ffffff" stroke-opacity=".5" stroke-linecap="round"/>`,
    ...keys,
    `<path d="M66 85 H100" stroke="${c.edge}" stroke-opacity=".4" stroke-linecap="round"/>`,
    `</g>`,
  ].join(''));
}

export async function buildPracticeAssets() {
  await mkdir(destination, { recursive: true });
  for (const theme of ['light', 'dark']) {
    await writeFile(path.join(destination, `keyboard-${theme}.svg`), keyboard(theme));
  }
  const profiles = [
    ['leetcode', 'LeetCode', '#FFA116'],
    ['hackerrank', 'HackerRank', '#00EA64'],
    ['geeksforgeeks', 'GeeksforGeeks', '#298D46'],
  ];
  for (const [file, label, accent] of profiles) {
    const original = await readFile(path.join(root, 'assets/socials', `${file}.svg`), 'utf8');
    const glyph = original.match(/<svg x="25"[^>]*>([\s\S]*?)<\/svg>/)?.[1].trim();
    if (!glyph) throw new Error(`Missing existing glyph for ${label}`);
    const body = `<rect x="2" y="2" width="36" height="36" rx="9" fill="#1d2329" stroke="${accent}" stroke-opacity=".75"/><svg x="10" y="10" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">${glyph}</svg>`;
    await writeFile(path.join(destination, `${file}.svg`), svg(40, 40, `${label} profile`, body));
  }
  const progress = `<rect x="2" y="2" width="36" height="36" rx="9" fill="#1d2329" stroke="#a598cf" stroke-opacity=".75"/><g stroke="#c4b5ed" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="m15 11-4 4 4 4 m10-8 4 4-4 4"/><path d="M12 29v-4 m8 4v-7 m8 7V19"/></g>`;
  await writeFile(path.join(destination, 'progress.svg'), svg(40, 40, 'Code and practice progress', progress));
}
