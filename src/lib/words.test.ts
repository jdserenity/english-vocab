import { describe, it, expect } from 'vitest';
import { getDailySelection, entries, getEntry, type Entry } from './words';

function fakeEntry(term: string): Entry {
  return {
    id: term,
    term,
    kind: 'word',
    definition: 'test',
    examples: [{ text: 'x', register: 'spoken' }]
  };
}

const fixture: Entry[] = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'].map(fakeEntry);
const fixedDate = '2026-06-12';

describe('getDailySelection', () => {
  it('returns exactly one entry when enough are available', () => {
    const selection = getDailySelection(fixedDate, fixture, new Set());
    expect(selection.length).toBe(1);
  });

  it('returns that entry from the pool', () => {
    const selection = getDailySelection(fixedDate, fixture, new Set());
    expect(fixture.map(e => e.term)).toContain(selection[0].term);
  });

  it('excludes already-used terms from the pool', () => {
    const excluded = new Set(['alpha', 'bravo', 'charlie']);
    const selection = getDailySelection(fixedDate, fixture, excluded);
    expect(excluded.has(selection[0].term)).toBe(false);
  });

  it('is deterministic for the same date and excluded set', () => {
    const excluded = new Set(['echo']);
    const first = getDailySelection(fixedDate, fixture, excluded);
    const second = getDailySelection(fixedDate, fixture, excluded);
    expect(first.map(e => e.term)).toEqual(second.map(e => e.term));
  });

  it('produces different picks for different dates (high probability)', () => {
    const a = getDailySelection('2026-06-12', fixture, new Set()).map(e => e.term);
    const b = getDailySelection('2026-06-13', fixture, new Set()).map(e => e.term);
    expect(a).not.toEqual(b);
  });

  it('returns the last remaining entry when the rest are excluded', () => {
    const excluded = new Set(fixture.slice(0, -1).map(e => e.term));
    const selection = getDailySelection(fixedDate, fixture, excluded);
    expect(selection.length).toBe(1);
    expect(selection[0].term).toBe(fixture[fixture.length - 1].term);
  });

  it('returns an empty list when every term is excluded', () => {
    const excluded = new Set(fixture.map(e => e.term));
    expect(getDailySelection(fixedDate, fixture, excluded)).toEqual([]);
  });

  it('picks a different remaining entry after the first pick is excluded', () => {
    const first = getDailySelection(fixedDate, fixture, new Set())[0];
    const second = getDailySelection(fixedDate, fixture, new Set([first.term]))[0];
    expect(second.term).not.toBe(first.term);
  });
});

describe('entries corpus', () => {
  it('has at least 60 sayable entries', () => {
    expect(entries.length).toBeGreaterThanOrEqual(60);
  });

  it('has unique terms', () => {
    const terms = entries.map(e => e.term);
    expect(new Set(terms).size).toBe(terms.length);
  });

  it('gives every entry a meaning, a replace-habit, and at least two examples', () => {
    for (const e of entries) {
      expect(e.definition.endsWith('.'), e.term).toBe(true);
      expect(e.definition.length, e.term).toBeGreaterThanOrEqual(40);
      expect(e.replaces && e.replaces.length).toBeGreaterThan(3);
      expect(e.examples.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('getEntry', () => {
  it('finds an entry by term', () => {
    const e = entries[0];
    expect(getEntry(e.term)?.id).toBe(e.id);
  });

  it('returns undefined when the term is unknown', () => {
    expect(getEntry('not-a-real-term')).toBeUndefined();
  });
});
