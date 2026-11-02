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

// A compact closing divider and native links; all lettering is outlined.
const greeting = 'Say hello';
const greetingSize = 32;
const greetingWidth = serif.layout(greeting).positions.reduce((width, p) => width + p.xAdvance, 0) * greetingSize / serif.unitsPerEm;
const greetingX = (760 - greetingWidth) / 2;
const contactOut = path.join(out, 'contact');
await mkdir(contactOut, { recursive: true });
const linkedIn = await readFile(path.join(source, 'linkedin.svg'), 'utf8');
const linkedInGlyph = linkedIn.match(/<path d="[^"]+"\s*\/>/)?.[0];
if (!linkedInGlyph) throw new Error('The existing LinkedIn glyph is missing.');

for (const [name, c] of Object.entries(themes)) {
  const heading = [
    '<defs><linearGradient id="coral"><stop stop-color="' + c.coral + '" stop-opacity=".16"/><stop offset=".5" stop-color="' + c.coral + '" stop-opacity=".75"/><stop offset="1" stop-color="' + c.coral + '" stop-opacity=".16"/></linearGradient></defs>',
    '<g fill="none" stroke="url(#coral)" stroke-width="1.2" stroke-linecap="round"><path d="M8 28 H' + (greetingX - 18) + ' M' + (greetingX + greetingWidth + 18) + ' 28 H530 C553 28 563 17 586 22 C610 26 624 28 646 28 H752"/><path d="M541 33 C562 32 577 17 596 20 C611 22 620 26 627 27" stroke-width=".8"/></g>',
    '<image x="20" y="0" width="84" height="56" xlink:href="data:image/webp;base64,' + plane + '"/>',
    lettering(greeting, greetingX, 39, greetingSize, serif, c.ink),
  ].join('');
  await writeFile(path.join(out, 'contact-heading-' + name + '.svg'), svg(760, 56, greeting, heading));

  const dark = name === 'dark';
  const ink = dark ? '#e6edf3' : '#24292f';
  const border = dark ? '#3d444d' : '#d1d9e0';
  const fill = dark ? '#161b22' : '#f6f8fa';
  const icons = {
    portfolio: '<g fill="none" stroke="' + ink + '" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><rect x="10.5" y="9.5" width="16" height="13" rx="2"/><path d="M11 13.5 H26"/><path d="M14 11.5 H14.1 M17 11.5 H17.1"/></g>',
    linkedin: '<rect x="10" y="8" width="16" height="16" rx="1.5" fill="#fff"/><g transform="translate(10 8) scale(.6666667)" fill="#0a66c2">' + linkedInGlyph + '</g>',
    email: '<g fill="none" stroke="' + ink + '" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><rect x="10.5" y="10" width="16" height="12" rx="2"/><path d="M11 11 L18.5 17 L26 11"/></g>',
  };
  for (const [slug, label, width] of [['portfolio', 'Portfolio', 98], ['linkedin', 'LinkedIn', 98], ['email', 'Email', 78]]) {
    const button = [
      '<rect x=".5" y=".5" width="' + (width - 1) + '" height="31" rx="5" fill="' + fill + '" stroke="' + border + '"/>',
      icons[slug],
      lettering(label, 33, 20.5, 13, bold, ink),
    ].join('');
    await writeFile(path.join(contactOut, slug + '-' + name + '.svg'), svg(width, 32, label, button));
  }
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

console.log('Built profile artwork, headers, drawer, dividers, and contact links.');
