import { describe, it, expect } from 'vitest';
import { getDailySelection, words, type Word } from './words';

describe('getDailySelection', () => {
  const fixedDate = '2026-06-12';

  it('returns exactly 5 words when enough are available', () => {
    const selection = getDailySelection(fixedDate, words, new Set());
    expect(selection.length).toBe(5);
  });

  it('returns distinct words', () => {
    const selection = getDailySelection(fixedDate, words, new Set());
    const unique = new Set(selection.map(w => w.word));
    expect(unique.size).toBe(selection.length);
  });

  it('excludes seen words from the pool', () => {
    const seen = new Set(['alacrity', 'cogent', 'ephemeral', 'laconic', 'sanguine']);
    const selection = getDailySelection(fixedDate, words, seen);
    const selectedWords = selection.map(w => w.word);
    seen.forEach(s => {
      expect(selectedWords).not.toContain(s);
    });
  });

  it('is deterministic for the same date and seen set', () => {
    const seen = new Set<string>();
    const first = getDailySelection(fixedDate, words, seen);
    const second = getDailySelection(fixedDate, words, seen);
    expect(first.map(w => w.word)).toEqual(second.map(w => w.word));
  });

  it('produces different sets for different dates (high probability)', () => {
    const a = getDailySelection('2026-06-12', words, new Set()).map(w => w.word);
    const b = getDailySelection('2026-06-13', words, new Set()).map(w => w.word);
    // They may overlap but are unlikely to be identical
    expect(a).not.toEqual(b);
  });

  it('falls back gracefully when most words are seen', () => {
    const almostAll = new Set(words.slice(0, words.length - 2).map(w => w.word));
    const selection = getDailySelection(fixedDate, words, almostAll);
    expect(selection.length).toBeGreaterThan(0);
    expect(selection.length).toBeLessThanOrEqual(5);
  });
});
