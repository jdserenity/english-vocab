import { describe, it, expect, vi, beforeEach } from 'vitest';

async function loadState() {
  return import('./user-state');
}

describe('user-state', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('localStorage', undefined);
  });

  it('initializes without localStorage (SSR / worker)', async () => {
    const { getUserId, getTodaysEntry } = await loadState();
    expect(getUserId()).toBeTruthy();
    const today = getTodaysEntry('2026-06-12');
    expect(today).toBeTruthy();
    expect(today?.term).toBeTruthy();
  });

  it('keeps the same entry for a date until it is skipped or used', async () => {
    const { getTodaysEntry } = await loadState();
    const a = getTodaysEntry('2026-06-12');
    const b = getTodaysEntry('2026-06-12');
    expect(a?.term).toBe(b?.term);
  });

  it('redraws a different unused entry after skip', async () => {
    const { getTodaysEntry, skipEntry } = await loadState();
    const first = getTodaysEntry('2026-06-12');
    expect(first).toBeTruthy();
    skipEntry(first!.term);
    const second = getTodaysEntry('2026-06-12');
    expect(second).toBeTruthy();
    expect(second!.term).not.toBe(first!.term);
  });

  it('does not put a skipped entry in the archive', async () => {
    const { getTodaysEntry, skipEntry, getArchive } = await loadState();
    const first = getTodaysEntry('2026-06-12');
    skipEntry(first!.term);
    expect(getArchive().map(item => item.term)).not.toContain(first!.term);
  });

  it('skip after a sentence removes it from the archive and redraws today', async () => {
    const { getTodaysEntry, saveSentence, skipEntry, getArchive } = await loadState();
    const first = getTodaysEntry('2026-06-12');
    saveSentence(first!.term, 'I wrote this to remember it.', '2026-06-12');
    skipEntry(first!.term);
    expect(getArchive().map(item => item.term)).not.toContain(first!.term);
    const next = getTodaysEntry('2026-06-12');
    expect(next?.term).not.toBe(first!.term);
  });

  it('saves a sentence and shows that entry in the archive', async () => {
    const { getTodaysEntry, saveSentence, getArchive, getSentence } = await loadState();
    const today = getTodaysEntry('2026-06-12');
    saveSentence(today!.term, 'The argument does not hold water.', '2026-06-12');
    expect(getSentence(today!.term)).toBe('The argument does not hold water.');
    const archive = getArchive();
    expect(archive).toHaveLength(1);
    expect(archive[0].term).toBe(today!.term);
    expect(archive[0].sentence).toBe('The argument does not hold water.');
    expect(archive[0].date).toBe('2026-06-12');
  });

  it('locks today to the entry you wrote a sentence for', async () => {
    const { getTodaysEntry, saveSentence } = await loadState();
    const first = getTodaysEntry('2026-06-12');
    saveSentence(first!.term, 'I used it once.', '2026-06-12');
    const again = getTodaysEntry('2026-06-12');
    expect(again?.term).toBe(first?.term);
  });

  it('does not reuse a used entry on a later date', async () => {
    const { getTodaysEntry, saveSentence } = await loadState();
    const first = getTodaysEntry('2026-06-12');
    saveSentence(first!.term, 'Used on the twelfth.', '2026-06-12');
    const later = getTodaysEntry('2026-06-13');
    expect(later?.term).not.toBe(first?.term);
  });

  it('lists archive newest first', async () => {
    const { getTodaysEntry, saveSentence, getArchive } = await loadState();
    const older = getTodaysEntry('2026-06-12');
    saveSentence(older!.term, 'First sentence.', '2026-06-12');
    const later = getTodaysEntry('2026-06-13');
    expect(later!.term).not.toBe(older!.term);
    saveSentence(later!.term, 'Second sentence.', '2026-06-13');
    const archive = getArchive();
    expect(archive[0].term).toBe(later!.term);
    expect(archive[1].term).toBe(older!.term);
  });

  it('ignores a blank sentence', async () => {
    const { getTodaysEntry, saveSentence, getArchive } = await loadState();
    const today = getTodaysEntry('2026-06-12');
    saveSentence(today!.term, '   ', '2026-06-12');
    expect(getArchive()).toHaveLength(0);
  });

  it('filters the archive by term', async () => {
    const { getTodaysEntry, saveSentence, getArchive, filterArchive } = await loadState();
    const today = getTodaysEntry('2026-06-12');
    saveSentence(today!.term, 'A kept sentence.', '2026-06-12');
    const all = getArchive();
    expect(filterArchive(all, today!.term.slice(0, 3)).length).toBe(1);
    expect(filterArchive(all, 'zzzz-not-present')).toHaveLength(0);
  });
});
