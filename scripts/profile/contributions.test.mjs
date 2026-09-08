import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateSnapshot, parsePublicCalendar, parseGraphQLCalendar, calendarWeeks, renderGarden } from './contributions.mjs';

const snapshot = JSON.parse(readFileSync(new URL('../../assets/profile/contributions.json', import.meta.url), 'utf8'));

test('calendar retains every real day exactly once, including partial boundary weeks', () => {
  const weeks = calendarWeeks(snapshot.days);
  assert.deepEqual(weeks.flat().filter(Boolean), snapshot.days);
  for (const week of weeks) week.forEach((day, row) => {
    if (day) assert.equal(new Date(`${day.date}T00:00:00Z`).getUTCDay(), row);
  });
});

test('bad fetches cannot replace a complete calendar with partial or invented data', () => {
  assert.throws(() => parsePublicCalendar('<html>Sign in to continue</html>'));
  assert.throws(() => validateSnapshot({ ...snapshot, days: snapshot.days.slice(7) }));
  assert.throws(() => validateSnapshot({ ...snapshot, total: snapshot.total + 1 }));
  for (const changed of [{ count: -1 }, { count: NaN }, { date: '2026-02-30' }, { level: 5 }]) {
    const copy = structuredClone(snapshot);
    Object.assign(copy.days[20], changed);
    assert.throws(() => validateSnapshot(copy));
  }
  const duplicate = structuredClone(snapshot);
  duplicate.days[20] = { ...duplicate.days[19] };
  assert.throws(() => validateSnapshot(duplicate));
});

test('calendar freshness follows its recorded UTC capture date, with one day of tolerance', () => {
  const finalDay = Date.parse(`${snapshot.days.at(-1).date}T00:00:00Z`);
  const shifted = (offset) => ({
    ...snapshot,
    fetchedAt: new Date(finalDay).toISOString(),
    days: snapshot.days.map(day => ({
      ...day,
      date: new Date(Date.parse(`${day.date}T00:00:00Z`) + offset * 86400000).toISOString().slice(0, 10),
    })),
  });
  for (const offset of [-1, 0, 1]) assert.doesNotThrow(() => validateSnapshot(shifted(offset)));
  for (const offset of [-730, -2, 2, 730]) assert.throws(() => validateSnapshot(shifted(offset)), /capture date/);

  const historical = shifted(-730);
  historical.fetchedAt = new Date(finalDay - 730 * 86400000).toISOString();
  assert.doesNotThrow(() => validateSnapshot(historical));

  const nextDate = new Date(finalDay + 86400000).toISOString().slice(0, 10);
  const laterDate = new Date(finalDay + 2 * 86400000).toISOString().slice(0, 10);
  assert.doesNotThrow(() => validateSnapshot({ ...snapshot, fetchedAt: `${laterDate}T00:30:00+02:00` }));
  assert.throws(() => validateSnapshot({ ...snapshot, fetchedAt: `${nextDate}T23:30:00-02:00` }), /capture date/);
});

test('GraphQL errors and unknown contribution levels are rejected', () => {
  assert.throws(() => parseGraphQLCalendar({ errors: [{ message: 'unauthorized' }] }));
  const labels = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
  const calendar = {
    totalContributions: snapshot.total,
    weeks: calendarWeeks(snapshot.days).map(week => ({ contributionDays: week.filter(Boolean).map(d => ({ date: d.date, contributionCount: d.count, contributionLevel: labels[d.level] })) })),
  };
  const body = { data: { user: { contributionsCollection: { contributionCalendar: calendar } } } };
  assert.deepEqual(parseGraphQLCalendar(body, snapshot.fetchedAt).days, snapshot.days);
  calendar.weeks[0].contributionDays[0].contributionLevel = 'UNKNOWN';
  assert.throws(() => parseGraphQLCalendar(body, snapshot.fetchedAt));
});

test('desktop and mobile charts include every dated cell and actual capture date', () => {
  for (const theme of ['light', 'dark']) for (const mobile of [false, true]) {
    const result = renderGarden(snapshot, theme, mobile);
    const dates = [...result.matchAll(/<title>(\d{4}-\d{2}-\d{2}):/g)].map(m => m[1]);
    assert.deepEqual(dates, snapshot.days.map(d => d.date));
    assert.ok(result.includes(snapshot.fetchedAt.slice(0, 10)));
  }
});
