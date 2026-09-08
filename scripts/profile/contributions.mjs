import { readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { out, sans, bold, lettering, svg, themes, escape } from './design.mjs';

const login = 'codewithmahad';
const snapshotPath = path.join(out, 'contributions.json');
const levels = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const attributes = (s) => Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const plain = (s) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const dateLabel = (date, options = { day: 'numeric', month: 'short', year: 'numeric' }) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });

export function validateSnapshot(snapshot) {
  if (snapshot.login !== login || !Array.isArray(snapshot.days) || snapshot.days.length < 365 || snapshot.days.length > 371) throw new Error('Expected a full-year calendar for codewithmahad.');
  if (!/^\d{4}-\d{2}-\d{2}T/.test(snapshot.fetchedAt) || !Number.isFinite(Date.parse(snapshot.fetchedAt))) throw new Error('Missing capture timestamp.');
  let previous;
  let total = 0;
  for (const day of snapshot.days) {
    const timestamp = Date.parse(`${day.date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== day.date) throw new Error(`Invalid calendar date: ${day.date}`);
    if (previous !== undefined && timestamp - previous !== 86400000) throw new Error('Calendar days must be consecutive and unique.');
    if (!Number.isInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4 || (day.count === 0) !== (day.level === 0)) throw new Error(`Invalid contribution count or level on ${day.date}.`);
    previous = timestamp;
    total += day.count;
  }
  const captureDay = Math.floor(Date.parse(snapshot.fetchedAt) / 86400000) * 86400000;
  if (Math.abs(previous - captureDay) > 86400000) throw new Error('Calendar must end within one day of its capture date. Keeping the previous snapshot.');
  if (!Number.isInteger(snapshot.total) || snapshot.total !== total) throw new Error(`Calendar total mismatch: ${snapshot.total} reported, ${total} counted. Keeping the previous snapshot.`);
  return snapshot;
}

export function parsePublicCalendar(html, fetchedAt = new Date().toISOString()) {
  const tooltips = new Map([...html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)].map(m => [attributes(m[1]).for, plain(m[2])]));
  const days = [];
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const a = attributes(match[1]);
    if (!a['data-date']) continue;
    const tip = tooltips.get(a.id);
    const count = /^No contributions\b/.test(tip ?? '') ? 0 : Number(tip?.match(/([\d,]+) contributions?\b/)?.[1]?.replaceAll(',', ''));
    days.push({ date: a['data-date'], count, level: Number(a['data-level']) });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  const heading = [...html.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/g)].find(m => attributes(m[1]).id === 'js-contribution-activity-description');
  const total = Number(plain(heading?.[2] ?? '').match(/([\d,]+) contributions/)?.[1]?.replaceAll(',', ''));
  return validateSnapshot({ login, source: `https://github.com/users/${login}/contributions`, fetchedAt, total, days });
}

export function parseGraphQLCalendar(body, fetchedAt = new Date().toISOString()) {
  if (body.errors?.length) throw new Error('GitHub GraphQL returned an error.');
  const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
  const days = calendar?.weeks?.flatMap(w => w.contributionDays.map(d => ({ date: d.date, count: d.contributionCount, level: levels[d.contributionLevel] }))) ?? [];
  return validateSnapshot({ login, source: 'https://api.github.com/graphql', fetchedAt, total: calendar?.totalContributions, days });
}

export async function fetchCalendar() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (token) {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'codewithmahad-contribution-garden' },
        body: JSON.stringify({ query: 'query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }', variables: { login } }),
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) throw new Error(`GitHub GraphQL HTTP ${response.status}`);
      return parseGraphQLCalendar(await response.json());
    } catch (error) {
      // Repository-scoped tokens can lack access to some user GraphQL fields.
      console.warn(`${error.message} Trying the public GitHub calendar.`);
    }
  }
  const response = await fetch(`https://github.com/users/${login}/contributions`, {
    headers: { 'User-Agent': 'codewithmahad-contribution-garden' }, signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Public GitHub calendar HTTP ${response.status}`);
  return parsePublicCalendar(await response.text());
}

export function calendarWeeks(days) {
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const padded = [...Array(offset).fill(null), ...days];
  return Array.from({ length: Math.ceil(padded.length / 7) }, (_, i) => padded.slice(i * 7, i * 7 + 7));
}

function leaf(x, y, level, c, title = '') {
  return `<g transform="translate(${x} ${y})">${title ? `<title>${escape(title)}</title>` : ''}<path d="M1 2 C12 -1 17 4 14 14 C3 17 -1 12 1 2Z" fill="${c.leaf[level]}" stroke="${level ? c.leaf[level] : c.rule}" stroke-opacity="${level ? 1 : 0.35}" stroke-width=".65"/>${level ? `<path d="M4 11 L11 4" stroke="${c.ink}" opacity=".2" stroke-width=".8"/>` : ''}</g>`;
}

function plot(weeks, x, y, step, c) {
  const pieces = [];
  const months = new Set();
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  dayNames.forEach((d, i) => pieces.push(lettering(d, x - 27, y + i * step + 11, 10, sans, c.muted)));
  weeks.forEach((week, col) => {
    const monthDay = week.find(day => day && (day.date.endsWith('-01') || col === 0));
    if (monthDay && !months.has(monthDay.date.slice(0, 7))) {
      pieces.push(lettering(dateLabel(monthDay.date, { month: 'short' }), x + col * step, y - 13, 12, sans, c.muted));
      months.add(monthDay.date.slice(0, 7));
    }
    week.forEach((day, row) => {
      if (day) pieces.push(leaf(x + col * step, y + row * step, day.level, c, `${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`));
    });
  });
  return pieces.join('');
}

function legend(x, y, c) {
  return lettering('less', x, y + 11, 12, sans, c.muted) + Array.from({ length: 5 }, (_, n) => leaf(x + 34 + n * 20, y, n, c)).join('') + lettering('more', x + 137, y + 11, 12, sans, c.muted);
}

export function renderGarden(snapshot, themeName, mobile = false) {
  validateSnapshot(snapshot);
  const c = themes[themeName];
  const weeks = calendarWeeks(snapshot.days);
  const range = `${dateLabel(snapshot.days[0].date)} — ${dateLabel(snapshot.days.at(-1).date)}`;
  const countText = snapshot.total.toLocaleString('en-US');
  const title = `GitHub activity: ${countText} contributions. ${range}. Captured ${snapshot.fetchedAt.slice(0, 10)} UTC.`;
  if (mobile) {
    const half = Math.ceil(weeks.length / 2);
    return svg(540, 453, title, [
      lettering(`${countText} GitHub contributions`, 22, 29, 22, bold, c.ink),
      lettering(range, 22, 55, 14, sans, c.muted),
      plot(weeks.slice(0, half), 46, 94, 17, c),
      `<path d="M22 233 H518" stroke="${c.rule}" stroke-opacity=".5"/>`,
      plot(weeks.slice(half), 46, 265, 17, c),
      legend(335, 403, c),
      lettering(`Captured ${snapshot.fetchedAt.slice(0, 10)} UTC`, 22, 439, 12, sans, c.muted),
    ].join(''));
  }
  return svg(1000, 273, title, [
    lettering(`${countText} GitHub contributions`, 25, 34, 22, bold, c.ink),
    lettering(range, 618, 34, 14, sans, c.muted),
    plot(weeks, 52, 88, 17, c),
    `<path d="M26 230 H974" stroke="${c.rule}" stroke-opacity=".5"/>`,
    lettering(`Captured ${snapshot.fetchedAt.slice(0, 10)} UTC`, 28, 253, 12, sans, c.muted),
    legend(792, 242, c),
  ].join(''));
}

async function atomicWrite(file, content) {
  const temporary = `${file}.tmp`;
  await writeFile(temporary, content);
  await rename(temporary, file);
}

async function main() {
  const args = process.argv.slice(2);
  let snapshot;
  const htmlIndex = args.indexOf('--from-html');
  if (htmlIndex !== -1) {
    if (!args[htmlIndex + 1]) throw new Error('--from-html requires a saved GitHub calendar HTML file.');
    snapshot = parsePublicCalendar(await readFile(args[htmlIndex + 1], 'utf8'));
  } else if (args.includes('--refresh')) snapshot = await fetchCalendar();
  else snapshot = validateSnapshot(JSON.parse(await readFile(snapshotPath, 'utf8')));

  // Validate and prepare all artifacts before replacing any checked-in output.
  const artifacts = [];
  for (const theme of Object.keys(themes)) {
    artifacts.push([path.join(out, `garden-${theme}.svg`), renderGarden(snapshot, theme)]);
    artifacts.push([path.join(out, `garden-mobile-${theme}.svg`), renderGarden(snapshot, theme, true)]);
  }
  for (const [file, content] of artifacts) await atomicWrite(file, content);
  if (args.includes('--refresh') || htmlIndex !== -1) await atomicWrite(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Contribution garden: ${snapshot.total} contributions across ${snapshot.days.length} days (${snapshot.days[0].date} to ${snapshot.days.at(-1).date}).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
