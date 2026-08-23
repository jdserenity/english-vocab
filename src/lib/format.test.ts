import { describe, it, expect } from 'vitest';
import { formatDate, kindLabel, posLabel } from './format';

describe('formatDate', () => {
  it('writes a readable English date', () => {
    expect(formatDate('2026-08-22')).toBe('22 August 2026');
  });
});

describe('kindLabel', () => {
  it('names each kind in plain English', () => {
    expect(kindLabel('word')).toBe('Word');
    expect(kindLabel('idiom')).toBe('Idiom');
    expect(kindLabel('saying')).toBe('Saying');
    expect(kindLabel('move')).toBe('Writing move');
  });
});

describe('posLabel', () => {
  it('spells out the part of speech', () => {
    expect(posLabel('adj')).toBe('Adjective');
    expect(posLabel('adv')).toBe('Adverb');
    expect(posLabel('n')).toBe('Noun');
    expect(posLabel('verb')).toBe('Verb');
  });
});
