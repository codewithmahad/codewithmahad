// Local artwork build. The README needs no JavaScript or services on GitHub.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { out, source, serif, sans, bold, lettering, svg, themes } from './design.mjs';

await mkdir(out, { recursive: true });

// Web-sized derivatives; retain full-resolution originals and preserve alpha.
for (const name of ['workbench', 'backend', 'linux-notebook', 'community', 'signoff-plane']) {
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
  const drawer = [
    `<rect x="1" y="1" width="758" height="130" rx="12" fill="${c.terminal}" stroke="${c.rule}"/>`,
    `<circle cx="24" cy="21" r="3.5" fill="${c.coral}"/><circle cx="40" cy="21" r="3.5" fill="${c.sage}"/><circle cx="56" cy="21" r="3.5" fill="${c.rule}"/>`,
    lettering('~/the-bottom-drawer', 78, 26, 13, sans, c.muted),
    lettering('$ ls -a', 22, 66, 19, bold, c.coral),
    lettering('a tiny penguin. a spare key. a note.', 22, 108, 28, serif, c.ink),
    `<g transform="translate(659 23) scale(.72)" stroke="${c.sage}" stroke-width="2" fill="none" stroke-linecap="round"><path d="M21 60 C4 7 77 2 75 60 L81 101 Q48 122 14 101 Z"/><path d="M28 55 Q47 32 66 55 L67 91 Q46 108 27 91 Z"/><path d="M14 61 L1 83 M76 60 L91 80"/><path d="M40 50 L47 57 L54 50 Z" stroke="${c.coral}"/><path d="M27 109 L18 119 M63 109 L74 119" stroke="${c.coral}"/><circle cx="34" cy="38" r="1.5"/><circle cx="59" cy="38" r="1.5"/></g>`,
  ].join('');
  const drawerImage = svg(760, 132, 'You found the bottom drawer. A tiny penguin, a spare key, and a note.', drawer);
  await writeFile(path.join(out, `drawer-compact-${name}.svg`), drawerImage);
}

const loop = svg(1000, 12, '', `<defs><linearGradient id="fade"><stop stop-color="#c56f53" stop-opacity=".15"/><stop offset=".48" stop-color="#c56f53" stop-opacity=".8"/><stop offset="1" stop-color="#c56f53" stop-opacity=".15"/></linearGradient></defs><path d="M8 6.5 H400 C439 6.5 449 1.5 475 2 C504 3 477 11.5 461 8 C444 2.5 489 3 511 5 C539 8 550 6.5 592 6.5 H990" fill="none" stroke="url(#fade)" stroke-width="1.3" stroke-linecap="round"/>`);
// The plane sits on the closing line, keeping the artwork and divider in one row.
const plane = (await readFile(path.join(out, 'signoff-plane.webp'))).toString('base64');
await writeFile(path.join(out, 'divider-loop.svg'), loop);

// The contact title interrupts the line; the larger plane overlaps its left end.
const greeting = 'Say hello';
const greetingSize = 44;
const greetingWidth = serif.layout(greeting).positions.reduce((width, p) => width + p.xAdvance, 0) * greetingSize / serif.unitsPerEm;
const greetingX = (900 - greetingWidth) / 2;
const contactOut = path.join(out, 'contact');
await mkdir(contactOut, { recursive: true });
const linkedIn = await readFile(path.join(source, 'linkedin.svg'), 'utf8');
const linkedInGlyph = linkedIn.match(/<path d="[^"]+"\s*\/>/)?.[0];
if (!linkedInGlyph) throw new Error('The existing LinkedIn glyph is missing.');

for (const [name, c] of Object.entries(themes)) {
  const heading = [
    `<defs><linearGradient id="coral"><stop stop-color="${c.coral}" stop-opacity=".16"/><stop offset=".5" stop-color="${c.coral}" stop-opacity=".75"/><stop offset="1" stop-color="${c.coral}" stop-opacity=".16"/></linearGradient></defs>`,
    `<g fill="none" stroke="url(#coral)" stroke-width="1.5" stroke-linecap="round"><path d="M8 46 H${greetingX - 22} M${greetingX + greetingWidth + 22} 46 H620 C651 46 667 32 700 37 C733 42 750 46 780 46 H892"/><path d="M635 52 C663 50 681 31 710 34 C728 36 739 41 747 44" stroke-width="1"/></g>`,
    `<image x="24" y="1" width="135" height="90" xlink:href="data:image/webp;base64,${plane}"/>`,
    lettering(greeting, greetingX, 61, greetingSize, serif, c.ink, 0),
  ].join('');
  await writeFile(path.join(out, `contact-heading-${name}.svg`), svg(900, 92, greeting, heading));

  const dark = name === 'dark';
  const ink = dark ? '#e6edf3' : '#24292f';
  const muted = dark ? '#8995a4' : '#657181';
  const violet = dark ? '#b4a1ff' : '#7654ce';
  const mail = dark ? '#bcc9d8' : '#526476';
  const icons = {
    linkedin: `<rect x="3" y="9" width="33.6" height="33.6" rx="2.5" fill="#fff"/><g transform="translate(3 9) scale(1.4)" fill="#0a66c2">${linkedInGlyph}</g>`,
    portfolio: `<g fill="none" stroke="${violet}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="10" width="34" height="28" rx="5"/><path d="M2 18 H36 M20 33 L29 24 M22 24 H29 V31"/></g><g fill="${violet}"><circle cx="8" cy="14" r="1"/><circle cx="12" cy="14" r="1"/></g>`,
    email: `<g fill="none" stroke="${mail}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="13" width="34" height="25" rx="4"/><path d="M3 15 L19 27 L35 15 M3 36 L12 27 M35 36 L26 27"/></g><circle cx="34" cy="12" r="5" fill="${dark ? '#e9c575' : '#ba882c'}"/>`,
  };
  for (const [slug, label] of [['linkedin', 'LinkedIn'], ['portfolio', 'Portfolio'], ['email', 'Email']]) {
    const link = [
      icons[slug],
      lettering(label, 49, 31, 16, bold, ink),
      `<path d="M149 30 L158 21 M151 21 H158 V28" fill="none" stroke="${muted}" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>`,
    ].join('');
    await writeFile(path.join(contactOut, `${slug}-${name}.svg`), svg(172, 52, label, link));
  }
}
console.log('Built profile artwork, headers, drawer, dividers, and contact links.');
