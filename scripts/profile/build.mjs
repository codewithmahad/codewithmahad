// Local artwork build. The README needs no JavaScript or services on GitHub.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { out, source, serif, sans, bold, lettering, svg, themes } from './design.mjs';

await mkdir(out, { recursive: true });

// Web-sized derivatives; retain full-resolution originals and preserve alpha.
for (const name of ['workbench', 'backend', 'linux-notebook', 'community']) {
  await sharp(path.join(source, `${name}.png`))
    .resize({ width: name === 'workbench' ? 1100 : 520, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(path.join(out, `${name}.webp`));
}

const workbench = (await readFile(path.join(out, 'workbench.webp'))).toString('base64');
const art = (x, y, width, height) => `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="data:image/webp;base64,${workbench}"/>`;
const title = 'Hey, I’m Mahad. An illustrated workbench.';

for (const [name, c] of Object.entries(themes)) {
  const hero = [
    // Tighten the existing transparent cutout within the unchanged banner height.
    art(674, -5, 316, 211),
    lettering('Hey, I’m Mahad.', 16, 120, 72, serif, c.ink, -1.5),
    `<path d="M350 142 Q470 131 591 137" fill="none" stroke="${c.coral}" stroke-width="2.6" stroke-linecap="round"/>`,
  ].join('');
  const header = svg(1000, 200, title, hero);
  await writeFile(path.join(out, `masthead-${name}.svg`), header);

}

const loop = svg(1000, 12, '', `<defs><linearGradient id="fade"><stop stop-color="#c56f53" stop-opacity=".15"/><stop offset=".48" stop-color="#c56f53" stop-opacity=".8"/><stop offset="1" stop-color="#c56f53" stop-opacity=".15"/></linearGradient></defs><path d="M8 6.5 H400 C439 6.5 449 1.5 475 2 C504 3 477 11.5 461 8 C444 2.5 489 3 511 5 C539 8 550 6.5 592 6.5 H990" fill="none" stroke="url(#fade)" stroke-width="1.3" stroke-linecap="round"/>`);
await writeFile(path.join(out, 'divider-loop.svg'), loop);

// One row of social profiles, using original marks and brand accents.
const contactOut = path.join(out, 'contact');
await mkdir(contactOut, { recursive: true });
const embedMark = async (file, type, x, y, width, height) => {
  const data = (await readFile(file)).toString('base64');
  return '<image x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '" xlink:href="data:' + type + ';base64,' + data + '"/>';
};
const linkedIn = await readFile(path.join(source, 'linkedin.svg'), 'utf8');
const linkedInGlyph = linkedIn.match(/<path d="[^"]+"\s*\/>/)?.[0];
if (!linkedInGlyph) throw new Error('The existing LinkedIn glyph is missing.');
const [leetcodeMark, codolioMark] = await Promise.all([
  embedMark(path.join(out, 'practice/leetcode-original.png'), 'image/png', 9, 8, 24, 24),
  embedMark(path.join(out, 'practice/codolio-original.svg'), 'image/svg+xml', 10, 8, 24, 24),
]);
// Match the other labels while retaining HackerRank's green terminal square.
const hackerRankSize = 14;
const hackerRankWidth = sans.layout('HackerRank').positions.reduce((width, p) => width + p.xAdvance, 0) * hackerRankSize / sans.unitsPerEm;
const hackerRankX = (126 - hackerRankWidth - 14) / 2;
const hackerRankMark = lettering('HackerRank', hackerRankX, 25, hackerRankSize, sans, '#fff')
  + '<rect x="' + (hackerRankX + hackerRankWidth + 4) + '" y="15" width="10" height="10" fill="#20d761"/>';
const brandSize = 15;
const brandWidth = bold.layout('mahad').positions.reduce((width, p) => width + p.xAdvance, 0) * brandSize / bold.unitsPerEm;
const cards = [
  ['portfolio-card', 'mahad.dev - Portfolio', 146, '#f5f6f8', '#d4dae5', [
    '<rect x="10" y="9" width="22" height="22" rx="6" fill="#155dfc"/>',
    lettering('M', 14.5, 25.3, 15, bold, '#fff'),
    lettering('mahad', 41, 25.2, brandSize, bold, '#000000'),
    lettering('.dev', 41 + brandWidth, 25.2, brandSize, bold, '#6b7280'),
  ].join('')],
  ['linkedin-brand', 'LinkedIn', 108, '#0a66c2', '#0a66c2', [
    '<g transform="translate(11 11) scale(.75)" fill="#fff">' + linkedInGlyph + '</g>',
    lettering('LinkedIn', 39, 25, 14, sans, '#fff'),
  ].join('')],
  ['mail-brand', 'Mail', 80, '#b3433d', '#b3433d', [
    '<g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="11.5" y="13.5" width="18" height="13" rx="2"/><path d="M12 15 L20.5 21.5 L29 15"/></g>',
    lettering('Mail', 39, 25, 14, sans, '#fff'),
  ].join('')],
  ['leetcode-brand', 'LeetCode', 110, '#282828', '#282828', leetcodeMark + lettering('LeetCode', 38, 25, 14, sans, '#f5f5f5')],
  ['hackerrank-brand', 'HackerRank', 126, '#14633c', '#14633c', hackerRankMark],
  ['codolio-brand', 'Codolio', 104, '#f57c06', '#f57c06', codolioMark + lettering('Codolio', 41, 25, 14, sans, '#fff')],
];
for (const [slug, label, width, fill, stroke, content] of cards) {
  const frame = '<rect x=".5" y=".5" width="' + (width - 1) + '" height="39" rx="8" fill="' + fill + '" stroke="' + stroke + '"/>';
  await writeFile(path.join(contactOut, slug + '.svg'), svg(width, 40, label, frame + content));
}

// Inline profile shortcut: original keyboard geometry, using charcoal and yellow.
const practiceOut = path.join(out, 'practice');
await mkdir(practiceOut, { recursive: true });
const typingProfile = [
  '<rect x=".5" y=".5" width="159" height="19" rx="4" fill="#323437" stroke="#646669"/>',
  '<g fill="none" stroke="#e2b714" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="7.5" y="5.5" width="14" height="9" rx="1.5"/><path d="M10 8 H11 M14 8 H15 M18 8 H19 M10 11 H11 M14 11 H19"/></g>',
  lettering('My Monkeytype profile', 28, 13.8, 11.5, bold, '#d1d0c5'),
].join('');
await writeFile(path.join(practiceOut, 'monkeytype-profile-inline.svg'), svg(160, 20, 'My Monkeytype profile', typingProfile));

console.log('Built profile artwork, headers, divider, connection buttons, and typing shortcut.');
