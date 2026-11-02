import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fontkit from 'fontkit';

export const root = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
export const out = path.join(root, 'assets/profile');
export const source = path.join(out, 'source');
const sansBase = fontkit.openSync(path.join(source, 'Manrope.ttf'));
export const sans = sansBase.getVariation({ wght: 550 });
export const bold = sansBase.getVariation({ wght: 700 });
const interBase = fontkit.openSync(path.join(source, 'Inter.ttf'));
export const introText = interBase.getVariation({ wght: 650, opsz: 32 });
export const introNameFont = interBase.getVariation({ wght: 780, opsz: 32 });
export const escape = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

// Outline the lettering so GitHub visitors never need the source fonts installed.
export function lettering(text, x, y, size, font, color, spacing = 0) {
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

export function svg(width, height, title, body, viewBox = `0 0 ${width} ${height}`) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="${viewBox}" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title>${body}</svg>\n`;
}
