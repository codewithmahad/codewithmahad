// A local approximation of GitHub's README surface, using GitHub Markdown CSS.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { marked } from 'marked';
import { chromium } from 'playwright-core';

const root = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
const preview = path.join(root, '.preview');
await mkdir(preview, { recursive: true });
const md = await readFile(path.join(root, 'README.md'), 'utf8');
const css = await readFile(new URL('./node_modules/github-markdown-css/github-markdown.css', import.meta.url), 'utf8');
marked.use({ renderer: {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const slug = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
    return `<h${depth} id="${slug}">${text}</h${depth}>\n`;
  },
}});
let body = marked.parse(md);
if (process.argv.includes('--github')) {
  body = await readFile(path.join(preview, 'github-rendered.html'), 'utf8');
  // The API resolves links against the live repo; new local assets aren't there yet.
  body = body.replace(/https:\/\/github\.com\/codewithmahad\/codewithmahad\/(?:raw|blob)\/(?:refs\/heads\/)?main\/assets\/profile\//g, 'assets/profile/');
  body = body.replace(/https:\/\/raw\.githubusercontent\.com\/codewithmahad\/codewithmahad\/(?:refs\/heads\/)?main\/assets\/profile\//g, 'assets/profile/');
  // The API sanitizes markup; GitHub's page layer adds heading anchors afterward.
  body = body.replace(/<h([1-6]) dir="auto">([\s\S]*?)<\/h\1>/g, (_, depth, text) => {
    const slug = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
    if (body.includes(`id="user-content-${slug}"`) || body.includes(`id="${slug}"`)) return `<h${depth}>${text}</h${depth}>`;
    return `<h${depth} id="${slug}">${text}</h${depth}>`;
  });
  body = body.replace(/id="user-content-([^"]+)"/g, 'id="$1"');
}
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><base href="../"><title>Mahad · Profile preview</title><style>${css}
body{margin:0;background:#fff;color:#1f2328;color-scheme:light;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.frame{max-width:894px;margin:32px auto;border:1px solid #d1d9e0;border-radius:6px;overflow:hidden}
.file-label{padding:15px 32px 0;font:12px ui-monospace,monospace;color:#59636e}.file-label strong{color:#1f2328}
.markdown-body{padding:24px 32px 32px;font-size:16px}.markdown-body details summary{cursor:pointer}
@media(prefers-color-scheme:dark){body{background:#0d1117;color:#f0f6fc;color-scheme:dark}.frame{border-color:#3d444d}.file-label{color:#9198a1}.file-label strong{color:#f0f6fc}}
@media(max-width:600px){.frame{margin:0;border:0;border-radius:0}.file-label{padding:16px 16px 0}.markdown-body{padding:16px}}
</style></head><body><main class="frame"><div class="file-label"><strong>codewithmahad</strong> / README.md</div><article class="markdown-body">${body}</article></main></body></html>`;
await writeFile(path.join(preview, 'profile.html'), html);
console.log(`Preview: ${path.join(preview, 'profile.html')}`);

if (process.argv.includes('--screenshots')) {
  const types = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
  const server = createServer(async (req, res) => {
    const requested = path.resolve(root, `.${decodeURIComponent(new URL(req.url, 'http://localhost').pathname)}`);
    if (!requested.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { const data = await readFile(requested); res.setHeader('Content-Type', types[path.extname(requested)] || 'application/octet-stream'); res.end(data); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    const candidates = [process.env.PROFILE_BROWSER, chromium.executablePath()];
    if (process.platform === 'win32') candidates.push(path.join(process.env.PROGRAMFILES || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'));
    let executablePath;
    for (const candidate of candidates.filter(Boolean)) {
      try { await access(candidate); executablePath = candidate; break; } catch { /* Try the next installed browser. */ }
    }
    browser = await chromium.launch({ executablePath, headless: true });
    for (const colorScheme of ['light', 'dark']) {
      for (const width of [1200, 768, 390, 320]) {
        const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme, deviceScaleFactor: 1 });
        await page.goto(`http://127.0.0.1:${server.address().port}/.preview/profile.html`);
        await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode().catch(() => {}))));
        const name = `${colorScheme}-${width}`;
        await page.screenshot({ path: path.join(preview, `${name}.png`), fullPage: true });
        const report = await page.evaluate(() => ({
          viewport: innerWidth,
          pageWidth: document.documentElement.scrollWidth,
          brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
          selectedHeader: document.querySelector('picture img').currentSrc.split('/').pop(),
          missingAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1)).filter(id => id && !document.getElementById(id) && !document.getElementById(`user-content-${id}`)),
          stickersCrossHeadingRule: [...document.querySelectorAll('h2 img')].map(img => {
            const sticker = img.getBoundingClientRect();
            const heading = img.closest('h2').getBoundingClientRect();
            return sticker.top < heading.bottom && sticker.bottom > heading.bottom - 1;
          }),
        }));
        console.log(name, JSON.stringify(report));
        if (report.pageWidth > width || report.brokenImages.length || report.missingAnchors.length || report.stickersCrossHeadingRule.some(crosses => !crosses)) {
          throw new Error(`Layout check failed for ${name}.`);
        }
        if (width === 390 || width === 1200) {
          const activity = page.locator('details').filter({ has: page.getByText('GitHub activity', { exact: true }) });
          await activity.locator('summary').click();
          await activity.screenshot({ path: path.join(preview, `activity-${name}.png`) });
          await activity.locator('summary').click();
        }
        await page.close();
      }
    }
  } finally {
    await browser?.close();
    server.close();
  }
}
