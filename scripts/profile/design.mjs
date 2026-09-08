import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fontkit from 'fontkit';

export const root = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
export const out = path.join(root, 'assets/profile');
export const source = path.join(out, 'source');
const serifBase = fontkit.openSync(path.join(source, 'Fraunces.ttf'));
const sansBase = fontkit.openSync(path.join(source, 'Manrope.ttf'));
export const serif = serifBase.getVariation({ wght: 600, opsz: 72, SOFT: 20, WONK: 1 });
export const sans = sansBase.getVariation({ wght: 550 });
export const bold = sansBase.getVariation({ wght: 700 });
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

export const themes = {
  light: { ink: '#293c36', muted: '#626a61', coral: '#bd503b', sage: '#70856c', rule: '#b7bdb0', terminal: '#f3f3ec', leaf: ['#edf0e8', '#c7d5b5', '#99b482', '#668f59', '#345e42'] },
  dark: { ink: '#f3ebd9', muted: '#b0bbac', coral: '#ef9479', sage: '#b6cbaa', rule: '#4c5b51', terminal: '#17221f', leaf: ['#202c27', '#405a40', '#608455', '#8eb575', '#c4dca2'] },
};
