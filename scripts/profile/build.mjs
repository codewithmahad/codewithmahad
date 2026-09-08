// Local artwork build. The README needs no JavaScript or services on GitHub.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { out, source, serif, sans, lettering, svg, themes } from './design.mjs';

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
}

console.log('Built five transparent illustrations and four responsive headers.');
