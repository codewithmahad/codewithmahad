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
const title = 'Hey, I’m Mahad. I like knowing what happens after you click the button.';

for (const [name, c] of Object.entries(themes)) {
  const hero = [
    art(446, 0, 554, 369),
    lettering('Hey, I’m', 14, 95, 58, serif, c.ink),
    lettering('Mahad.', 8, 205, 118, serif, c.ink, -3),
    `<path d="M19 227 C100 212 245 239 362 219" fill="none" stroke="${c.coral}" stroke-width="3" stroke-linecap="round"/>`,
    lettering('I like knowing what happens', 18, 274, 20, sans, c.ink),
    lettering('after you click the button.', 18, 304, 20, sans, c.ink),
  ].join('');
  await writeFile(path.join(out, `hero-${name}.svg`), svg(1000, 370, title, hero));

  const mobile = [
    lettering('Hey, I’m Mahad.', 8, 72, 60, serif, c.ink, -1.6),
    `<path d="M272 91 Q350 82 457 88" fill="none" stroke="${c.coral}" stroke-width="2.8" stroke-linecap="round"/>`,
    lettering('I like knowing what happens', 14, 127, 20, sans, c.ink),
    lettering('after you click the button.', 14, 157, 20, sans, c.ink),
    art(0, 174, 500, 333),
  ].join('');
  await writeFile(path.join(out, `hero-mobile-${name}.svg`), svg(500, 510, title, mobile));
  const drawer = [
    `<rect x="1" y="1" width="998" height="204" rx="12" fill="${c.terminal}" stroke="${c.rule}"/>`,
    `<circle cx="27" cy="26" r="4" fill="${c.coral}"/><circle cx="43" cy="26" r="4" fill="${c.sage}"/><circle cx="59" cy="26" r="4" fill="${c.rule}"/>`,
    lettering('~/the-bottom-drawer', 80, 31, 13, sans, c.muted),
    lettering('$ ls -a', 26, 79, 22, bold, c.coral),
    lettering('a tiny penguin. a spare key. a note.', 26, 119, 27, serif, c.ink),
    lettering('Pick something. See where it takes you.', 26, 163, 18, sans, c.muted),
    `<g transform="translate(859 51)" stroke="${c.sage}" stroke-width="2" fill="none" stroke-linecap="round"><path d="M21 60 C4 7 77 2 75 60 L81 101 Q48 122 14 101 Z"/><path d="M28 55 Q47 32 66 55 L67 91 Q46 108 27 91 Z"/><path d="M14 61 L1 83 M76 60 L91 80"/><path d="M40 50 L47 57 L54 50 Z" stroke="${c.coral}"/><path d="M27 109 L18 119 M63 109 L74 119" stroke="${c.coral}"/><circle cx="34" cy="38" r="1.5"/><circle cx="59" cy="38" r="1.5"/></g>`,
  ].join('');
  await writeFile(path.join(out, `drawer-${name}.svg`), svg(1000, 206, 'You found the bottom drawer. A tiny penguin, a spare key, and a note. Pick something and see where it takes you.', drawer));

  const mobileDrawer = [
    `<rect x="1" y="1" width="498" height="249" rx="12" fill="${c.terminal}" stroke="${c.rule}"/>`,
    `<circle cx="25" cy="26" r="4" fill="${c.coral}"/><circle cx="41" cy="26" r="4" fill="${c.sage}"/><circle cx="57" cy="26" r="4" fill="${c.rule}"/>`,
    lettering('~/the-bottom-drawer', 80, 31, 13, sans, c.muted),
    lettering('$ ls -a', 24, 82, 22, bold, c.coral),
    lettering('a tiny penguin.', 24, 124, 30, serif, c.ink),
    lettering('a spare key. a note.', 24, 162, 30, serif, c.ink),
    lettering('Pick something.', 24, 209, 18, sans, c.muted),
    lettering('See where it takes you.', 24, 234, 18, sans, c.muted),
    `<g transform="translate(364 64)" stroke="${c.sage}" stroke-width="2" fill="none" stroke-linecap="round"><path d="M21 60 C4 7 77 2 75 60 L81 101 Q48 122 14 101 Z"/><path d="M28 55 Q47 32 66 55 L67 91 Q46 108 27 91 Z"/><path d="M14 61 L1 83 M76 60 L91 80"/><path d="M40 50 L47 57 L54 50 Z" stroke="${c.coral}"/><path d="M27 109 L18 119 M63 109 L74 119" stroke="${c.coral}"/><circle cx="34" cy="38" r="1.5"/><circle cx="59" cy="38" r="1.5"/></g>`,
  ].join('');
  await writeFile(path.join(out, `drawer-mobile-${name}.svg`), svg(500, 251, 'You found the bottom drawer. A tiny penguin, a spare key, and a note. Pick something and see where it takes you.', mobileDrawer));
}

await writeFile(path.join(out, 'thread.svg'), svg(1000, 58, '', `<defs><linearGradient id="fade"><stop stop-color="#c56f53" stop-opacity=".15"/><stop offset=".48" stop-color="#c56f53" stop-opacity=".7"/><stop offset="1" stop-color="#c56f53" stop-opacity=".15"/></linearGradient></defs><path d="M8 32 H385 C425 32 437 9 467 14 C504 21 456 50 446 31 C437 12 493 19 520 28 C544 36 561 32 594 32 H971" fill="none" stroke="url(#fade)" stroke-width="1.8" stroke-linecap="round"/><path d="M978 25 V39 M971 32 H985" stroke="#87967c" stroke-width="1.6" stroke-linecap="round"/>`));
// A quieter closing flourish: two coral strokes sweep past a small sage accent.
await writeFile(path.join(out, 'thread-closing.svg'), svg(1000, 58, '', `<defs><linearGradient id="sweep"><stop stop-color="#c56f53" stop-opacity=".12"/><stop offset=".58" stop-color="#c56f53" stop-opacity=".8"/><stop offset="1" stop-color="#c56f53" stop-opacity=".12"/></linearGradient></defs><g fill="none" stroke="url(#sweep)" stroke-width="1.8" stroke-linecap="round"><path d="M8 31 H332 C425 31 455 43 517 38 C568 34 594 15 642 20 C689 25 719 32 789 31 H988"/><path d="M445 46 C515 49 572 14 628 13 C651 13 669 17 683 22" stroke-width="1.2"/></g><path d="M628 32 Q633 38 640 39 Q635 34 628 32Z" fill="#87967c" opacity=".85"/>`));
console.log('Built six illustrations, four headers, four secret drawers, and two distinct coral dividers.');
