import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { out, svg, lettering, bold } from './design.mjs';

// Learning status stays in accessible SVG titles and the README toolkit note.
// Visible names share one baseline without a second caption.
export const backendStack = [
  { slug: 'java', label: 'Java', width: 70, icon: 62, source: 'java.svg', url: 'https://dev.java/' },
  { slug: 'spring', label: 'Spring Boot', width: 100, icon: 56, source: 'spring.svg', url: 'https://spring.io/projects/spring-boot' },
  { slug: 'postgresql', label: 'PostgreSQL', width: 106, icon: 60, source: 'postgresql.svg', url: 'https://www.postgresql.org/' },
  { slug: 'rest-api', label: 'REST APIs', width: 72, icon: 60, url: 'https://developer.mozilla.org/en-US/docs/Glossary/REST' },
  { slug: 'junit', label: 'JUnit', width: 72, icon: 58, source: { light: 'junit-light.svg', dark: 'junit-dark.svg' }, learning: true, url: 'https://junit.org/' },
  { slug: 'spring-security', label: 'Spring Security', width: 128, icon: 62, source: 'spring-security.svg', learning: true, url: 'https://spring.io/projects/spring-security/' },
  { slug: 'git', label: 'Git', width: 72, icon: 58, source: 'git.svg', url: 'https://git-scm.com/' },
];

function restMark(theme) {
  const edge = theme === 'dark' ? '#b8c7d8' : '#4b6075';
  const blue = theme === 'dark' ? '#4b98f0' : '#246ac5';
  return svg(48, 48, 'REST APIs — request and response',
    '<g fill="none" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M12 5 H9 C6 5 5 7 5 10 V17 C5 21 3 22 2 24 C3 26 5 27 5 31 V38 C5 41 6 43 9 43 H12 M36 5 H39 C42 5 43 7 43 10 V17 C43 21 45 22 46 24 C45 26 43 27 43 31 V38 C43 41 42 43 39 43 H36" stroke="' + edge + '" stroke-width="2.5"/>'
    + '<path d="M15 17 H33 M28 12 L33 17 L28 22 M33 31 H15 M20 26 L15 31 L20 36" stroke="' + blue + '" stroke-width="2.7"/>'
    + '</g>');
}

export async function buildBackendStack(directory = path.join(out, 'stack'), inputs = directory) {
  await mkdir(directory, { recursive: true });
  for (const item of backendStack) {
    for (const [theme, c] of Object.entries({
      light: { ink: '#1f2328' },
      dark: { ink: '#f0f6fc' },
    })) {
      const source = typeof item.source === 'string' ? item.source : item.source?.[theme];
      const mark = source ? await readFile(path.join(inputs, source)) : Buffer.from(restMark(theme));
      const labelSize = 14;
      const textWidth = text => bold.layout(text).positions.reduce((sum, p) => sum + p.xAdvance, 0) * labelSize / bold.unitsPerEm;
      const body = '<image x="' + ((item.width - item.icon) / 2) + '" y="' + ((64 - item.icon) / 2) + '" width="' + item.icon + '" height="' + item.icon + '" xlink:href="data:image/svg+xml;base64,' + mark.toString('base64') + '"/>'
        + lettering(item.label, (item.width - textWidth(item.label)) / 2, 82, labelSize, bold, c.ink);
      await writeFile(path.join(directory, item.slug + '-lockup-' + theme + '.svg'), svg(item.width, 88, item.label + (item.learning ? ' — learning' : ''), body));
    }
  }
}

