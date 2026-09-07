// Local artwork build. The README needs no JavaScript or services on GitHub.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as fontkit from 'fontkit';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../../', import.meta.url));
const out = path.join(root, 'assets/profile');
const source = path.join(out, 'source');
await mkdir(out, { recursive: true });

// Web-sized derivatives; retain full-resolution originals and preserve alpha.
for (const name of ['workbench', 'backend', 'linux-notebook', 'community']) {
  await sharp(path.join(source, `${name}.png`))
    .resize({ width: name === 'workbench' ? 1100 : 520, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(path.join(out, `${name}.webp`));
}

const serifBase = fontkit.openSync(path.join(source, 'Fraunces.ttf'));
const sansBase = fontkit.openSync(path.join(source, 'Manrope.ttf'));
const serif = serifBase.getVariation({ wght: 600, opsz: 72, SOFT: 20, WONK: 1 });
const sans = sansBase.getVariation({ wght: 550 });
const bold = sansBase.getVariation({ wght: 700 });
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

// Outlined lettering keeps the finished SVG identical on every machine.
function lettering(text, x, y, size, font, color, spacing = 0) {
  const { glyphs, positions } = font.layout(text);
  const scale = size / font.unitsPerEm;
  let pen = 0;
  const paths = glyphs.map((glyph, index) => {
    const pos = positions[index];
    const result = `<path transform="translate(${(pen + pos.xOffset * scale).toFixed(3)} ${(-pos.yOffset * scale).toFixed(3)}) scale(${scale} ${-scale})" d="${glyph.path.toSVG()}"/>`;
    pen += pos.xAdvance * scale + spacing;
    return result;
  }).join('');
  return `<g aria-label="${escape(text)}" transform="translate(${x} ${y})" fill="${color}">${paths}</g>`;
}

function svg(width, height, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title>${body}</svg>\n`;
}

const workbench = (await readFile(path.join(out, 'workbench.webp'))).toString('base64');
const art = (x, y, width, height) => `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="data:image/webp;base64,${workbench}"/>`;
const themes = {
  light: { ink: '#293c36', muted: '#626a61', coral: '#bd503b', sage: '#70856c', rule: '#b7bdb0', terminal: '#f3f3ec' },
  dark: { ink: '#f3ebd9', muted: '#b0bbac', coral: '#ef9479', sage: '#b6cbaa', rule: '#4c5b51', terminal: '#17221f' },
};

for (const [name, c] of Object.entries(themes)) {
  const hero = [
    art(438, 10, 566, 378),
    lettering('A WORK IN PROGRESS, BY', 16, 45, 12, bold, c.coral, 2.2),
    lettering('Hey, I’m', 14, 134, 57, serif, c.ink),
    lettering('Mahad.', 8, 243, 116, serif, c.ink, -3),
    `<path d="M19 264 C100 249 245 276 362 256" fill="none" stroke="${c.coral}" stroke-width="3" stroke-linecap="round"/>`,
    lettering('I like knowing what happens', 18, 305, 20, sans, c.ink),
    lettering('after you click the button.', 18, 335, 20, sans, c.ink),
    `<circle cx="23" cy="387" r="4" fill="${c.sage}"/>`,
    lettering('KARACHI, PK', 38, 391, 11, bold, c.muted, 1.7),
    `<path d="M171 387 H224" stroke="${c.rule}" stroke-width="1"/>`,
    lettering('JAVA / SPRING BOOT / CURIOSITY', 239, 391, 10, bold, c.muted, 1.1),
  ].join('');
  await writeFile(path.join(out, `hero-${name}.svg`), svg(1000, 410, 'Hey, I’m Mahad. I like knowing what happens after you click the button. Karachi, Pakistan.', hero));

  const mobile = [
    lettering('A WORK IN PROGRESS, BY', 14, 30, 12, bold, c.coral, 2.1),
    lettering('Hey, I’m Mahad.', 8, 99, 60, serif, c.ink, -1.6),
    `<path d="M272 113 Q350 104 457 110" fill="none" stroke="${c.coral}" stroke-width="2.8" stroke-linecap="round"/>`,
    lettering('I like knowing what happens', 14, 150, 20, sans, c.ink),
    lettering('after you click the button.', 14, 180, 20, sans, c.ink),
    art(0, 197, 500, 333),
    `<circle cx="20" cy="552" r="4" fill="${c.sage}"/>`,
    lettering('KARACHI, PK  /  JAVA + SPRING BOOT', 35, 556, 11, bold, c.muted, 1.1),
  ].join('');
  await writeFile(path.join(out, `hero-mobile-${name}.svg`), svg(500, 575, 'Hey, I’m Mahad. I like knowing what happens after you click the button. Karachi, Pakistan.', mobile));

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
console.log('Built 4 transparent illustrations, 4 themed headers, 4 secret drawers, and the thread divider.');
