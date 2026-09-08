// Local artwork build. The README needs no JavaScript or services on GitHub.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { out, source, serif, sans, bold, lettering, svg, themes } from './design.mjs';

await mkdir(out, { recursive: true });

// Web-sized derivatives; retain full-resolution originals and preserve alpha.
for (const name of ['workbench', 'backend', 'linux-notebook', 'community', 'signoff-plane', 'copyright']) {
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
    art(695, 0, 300, 200),
    lettering('Hey, I’m Mahad.', 16, 120, 72, serif, c.ink, -1.5),
    `<path d="M350 142 Q470 131 591 137" fill="none" stroke="${c.coral}" stroke-width="2.6" stroke-linecap="round"/>`,
  ].join('');
  const header = svg(1000, 200, title, hero);
  // A new filename also prevents older cached banners from appearing on GitHub.
  await writeFile(path.join(out, `masthead-${name}.svg`), header);
  await writeFile(path.join(out, `hero-${name}.svg`), header);
  // Keep old image URLs compact too, including references in older README copies.
  await writeFile(path.join(out, `hero-mobile-${name}.svg`), header);
  const drawer = [
    `<rect x="1" y="1" width="758" height="130" rx="12" fill="${c.terminal}" stroke="${c.rule}"/>`,
    `<circle cx="24" cy="21" r="3.5" fill="${c.coral}"/><circle cx="40" cy="21" r="3.5" fill="${c.sage}"/><circle cx="56" cy="21" r="3.5" fill="${c.rule}"/>`,
    lettering('~/the-bottom-drawer', 78, 26, 13, sans, c.muted),
    lettering('$ ls -a', 22, 66, 19, bold, c.coral),
    lettering('a tiny penguin. a spare key. a note.', 22, 108, 28, serif, c.ink),
    `<g transform="translate(659 23) scale(.72)" stroke="${c.sage}" stroke-width="2" fill="none" stroke-linecap="round"><path d="M21 60 C4 7 77 2 75 60 L81 101 Q48 122 14 101 Z"/><path d="M28 55 Q47 32 66 55 L67 91 Q46 108 27 91 Z"/><path d="M14 61 L1 83 M76 60 L91 80"/><path d="M40 50 L47 57 L54 50 Z" stroke="${c.coral}"/><path d="M27 109 L18 119 M63 109 L74 119" stroke="${c.coral}"/><circle cx="34" cy="38" r="1.5"/><circle cx="59" cy="38" r="1.5"/></g>`,
  ].join('');
  const drawerImage = svg(760, 132, 'You found the bottom drawer. A tiny penguin, a spare key, and a note.', drawer);
  // One aspect ratio at every viewport; keep older URLs compact as well.
  for (const prefix of ['drawer-compact', 'drawer', 'drawer-mobile']) {
    await writeFile(path.join(out, `${prefix}-${name}.svg`), drawerImage);
  }
}

const loop = svg(1000, 24, '', `<defs><linearGradient id="fade"><stop stop-color="#c56f53" stop-opacity=".15"/><stop offset=".48" stop-color="#c56f53" stop-opacity=".8"/><stop offset="1" stop-color="#c56f53" stop-opacity=".15"/></linearGradient></defs><path d="M8 13 H400 C439 13 449 3 475 4 C504 6 477 23 461 16 C444 5 489 6 511 10 C539 16 550 13 592 13 H990" fill="none" stroke="url(#fade)" stroke-width="1.8" stroke-linecap="round"/>`);
// The plane sits on the closing line, keeping the artwork and divider in one row.
const plane = (await readFile(path.join(out, 'signoff-plane.webp'))).toString('base64');
const sweep = svg(1000, 56, 'A paper plane crossing a coral line.', `<defs><linearGradient id="sweep"><stop stop-color="#c56f53" stop-opacity=".12"/><stop offset=".58" stop-color="#c56f53" stop-opacity=".8"/><stop offset="1" stop-color="#c56f53" stop-opacity=".12"/></linearGradient></defs><g fill="none" stroke="url(#sweep)" stroke-width="1.8" stroke-linecap="round"><path d="M8 28 H332 C425 28 455 40 517 35 C568 31 594 12 642 17 C689 22 719 29 789 28 H988"/><path d="M445 43 C515 46 572 11 628 10 C651 10 669 14 683 19" stroke-width="1.2"/></g><path d="M628 29 Q633 35 640 36 Q635 31 628 29Z" fill="#87967c" opacity=".85"/><image x="25" y="0" width="84" height="56" xlink:href="data:image/webp;base64,${plane}"/>`);
for (const file of ['divider-loop.svg', 'thread.svg']) await writeFile(path.join(out, file), loop);
for (const file of ['divider-sweep.svg', 'thread-closing.svg']) await writeFile(path.join(out, file), sweep);
console.log('Built six illustrations, compact themed mastheads and drawers, two dividers, and compatibility copies.');
