// Keep CDN references tied to the exact, committed image bytes in this checkout.
// This command edits README links only; it never commits, pushes, or uploads.
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const cdn = 'https://cdn.jsdelivr.net/gh/codewithmahad/codewithmahad@';
const attribute = /\b(?:src|srcset)="([^"]+)"/g;
const git = (...args) => execFileSync('git', ['-c', `safe.directory=${root.replaceAll('\\', '/').replace(/\/$/, '')}`, ...args], { cwd: root, maxBuffer: 5 * 1024 * 1024 });
const original = await readFile(path.join(root, 'README.md'), 'utf8');
let updated = original;
let bytes = 0;
const seen = new Set();

for (const [, url] of original.matchAll(attribute)) {
  if (seen.has(url)) continue;
  seen.add(url);
  const pinned = url.startsWith(cdn) ? url.slice(cdn.length).match(/^([a-f0-9]{40})\/(assets\/profile\/[\w./-]+)$/) : null;
  const file = pinned?.[2] ?? (/^assets\/profile\/[\w./-]+$/.test(url) ? url : null);
  if (!file || file.split('/').includes('..')) throw new Error(`Unexpected image reference: ${url}`);
  const local = await readFile(path.join(root, file));
  // Git can normalize SVG line endings on Windows without changing the artwork.
  const sameContent = committed => file.endsWith('.svg')
    ? committed.toString('utf8').replaceAll('\r\n', '\n') === local.toString('utf8').replaceAll('\r\n', '\n')
    : committed.equals(local);
  bytes += local.length;
  if (pinned && sameContent(git('show', `${pinned[1]}:${file}`))) continue;
  if (!process.argv.includes('--write')) throw new Error(`Run npm run links after committing changes to ${file}.`);
  if (!sameContent(git('show', `HEAD:${file}`))) throw new Error(`Commit the updated asset first: ${file}`);
  const revision = git('log', '-1', '--format=%H', '--', file).toString().trim();
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error(`No committed revision for ${file}`);
  updated = updated.replaceAll(`"${url}"`, `"${cdn}${revision}/${file}"`);
}

if (updated !== original) await writeFile(path.join(root, 'README.md'), updated);
console.log(`${seen.size} image sources verified against committed files (${Math.round(bytes / 1024)} KiB, including both themes).`);
if (updated !== original) console.log('Updated README image URLs. Commit the README and push when ready.');
