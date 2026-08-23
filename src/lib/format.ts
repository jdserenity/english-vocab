import type { EntryKind } from './words';

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function kindLabel(kind: EntryKind): string {
  if (kind === 'move') return 'Writing move';
  if (kind === 'idiom') return 'Idiom';
  if (kind === 'saying') return 'Saying';
  return 'Word';
}

export function posLabel(pos: string): string {
  if (pos === 'adj') return 'Adjective';
  if (pos === 'adv') return 'Adverb';
  if (pos === 'n') return 'Noun';
  if (pos === 'verb') return 'Verb';
  return pos;
}
