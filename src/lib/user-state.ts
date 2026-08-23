import { getDailySelection, getEntry, entries, type Entry } from './words';

const STORAGE_KEY = 'english-vocab:user-state:v1';

export type SentenceRecord = {
  text: string;
  date: string;
};

export type ArchiveItem = {
  term: string;
  sentence: string;
  date: string;
  entry: Entry | undefined;
};

export type UserState = {
  userId: string;
  seen: string[];
  mastered: string[];
  favorites: string[];
  notes: Record<string, string>;
  lastDate: string;
  skipped: string[];
  sentences: Record<string, SentenceRecord>;
};

function load(): UserState {
  if (typeof localStorage === 'undefined') return createDefault();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalize(JSON.parse(raw));
  } catch {}
  return createDefault();
}

function getId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'user-' + Date.now() + '-' + Math.random().toString(36).slice(2, 11);
}

function createDefault(): UserState {
  return {
    userId: getId(),
    seen: [],
    mastered: [],
    favorites: [],
    notes: {},
    lastDate: new Date().toISOString().slice(0, 10),
    skipped: [],
    sentences: {}
  };
}

function normalize(parsed: Partial<UserState> & { userId?: string }): UserState {
  const base = createDefault();
  const skipped = Array.isArray(parsed.skipped)
    ? parsed.skipped
    : Array.isArray(parsed.seen) ? parsed.seen : [];
  const sentences = parsed.sentences && typeof parsed.sentences === 'object' ? parsed.sentences : {};
  return {
    userId: parsed.userId || base.userId,
    seen: Array.isArray(parsed.seen) ? parsed.seen : [],
    mastered: Array.isArray(parsed.mastered) ? parsed.mastered : [],
    favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
    notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
    lastDate: parsed.lastDate || base.lastDate,
    skipped,
    sentences
  };
}

function usedTerms(s: UserState = state): string[] {
  return Object.keys(s.sentences);
}

function excludedSet(s: UserState = state): Set<string> {
  return new Set([...s.skipped, ...usedTerms(s)]);
}

function syncSeen(s: UserState) {
  s.seen = Array.from(excludedSet(s));
}

function save(s: UserState) {
  syncSeen(s);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }
}

let state: UserState = load();

export function getUserId() {
  return state.userId;
}

export function getTodaysEntry(date = new Date().toISOString().slice(0, 10)): Entry | null {
  const locked = Object.entries(state.sentences).find(([, rec]) => rec.date === date);
  if (locked) return getEntry(locked[0]) ?? null;
  const pick = getDailySelection(date, entries, excludedSet());
  return pick[0] ?? null;
}

export function skipEntry(term: string) {
  if (!state.skipped.includes(term)) state.skipped = [...state.skipped, term];
  if (state.sentences[term]) {
    const next = { ...state.sentences };
    delete next[term];
    state.sentences = next;
  }
  save(state);
  syncToCloud().catch(() => {});
}

export function saveSentence(term: string, text: string, date = new Date().toISOString().slice(0, 10)) {
  const trimmed = text.trim();
  if (!trimmed) return;
  state.sentences = { ...state.sentences, [term]: { text: trimmed, date } };
  state.lastDate = date;
  save(state);
  syncToCloud().catch(() => {});
}

export function getSentence(term: string): string {
  return state.sentences[term]?.text || '';
}

export function getArchive(): ArchiveItem[] {
  return Object.entries(state.sentences)
    .map(([term, rec]) => ({ term, sentence: rec.text, date: rec.date, entry: getEntry(term) }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.term.localeCompare(b.term));
}

export function filterArchive(items: ArchiveItem[], query: string): ArchiveItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(item => item.term.toLowerCase().includes(q) || item.sentence.toLowerCase().includes(q));
}

export function resetProgress() {
  const fresh = createDefault();
  fresh.userId = state.userId;
  state = fresh;
  save(state);
}

export function exportState(): string {
  syncSeen(state);
  return JSON.stringify(state, null, 2);
}

export function importState(json: string) {
  try {
    const incoming = JSON.parse(json);
    if (incoming.userId && (Array.isArray(incoming.seen) || Array.isArray(incoming.skipped))) {
      state = normalize(incoming);
      save(state);
      return true;
    }
  } catch {}
  return false;
}

type ProgressPayload = {
  seen: string[];
  mastered: string[];
  favorites: string[];
  notes: Record<string, string>;
  lastDate?: string;
  skipped?: string[];
  sentences?: Record<string, SentenceRecord>;
};

function toPayload(): ProgressPayload {
  syncSeen(state);
  return {
    seen: state.seen,
    mastered: state.mastered,
    favorites: state.favorites,
    notes: state.notes,
    lastDate: state.lastDate,
    skipped: state.skipped,
    sentences: state.sentences
  };
}

function fromPayload(p: ProgressPayload) {
  const next = normalize({ ...state, ...p, userId: state.userId });
  next.skipped = Array.from(new Set([...(state.skipped || []), ...(next.skipped || [])]));
  next.sentences = { ...state.sentences, ...(p.sentences || {}) };
  next.favorites = Array.from(new Set([...(state.favorites || []), ...(p.favorites || [])]));
  next.mastered = Array.from(new Set([...(state.mastered || []), ...(p.mastered || [])]));
  next.notes = { ...state.notes, ...(p.notes || {}) };
  if (p.lastDate) next.lastDate = p.lastDate;
  state = next;
  save(state);
}

export async function loadFromCloud(): Promise<boolean> {
  try {
    const res = await fetch(`/api/state?userId=${encodeURIComponent(state.userId)}`);
    if (!res.ok) return false;
    const j = await res.json();
    if (j?.ok && j.data && typeof j.data === 'object') {
      fromPayload(j.data as ProgressPayload);
      return true;
    }
  } catch (e) {
    console.warn('[D1] loadFromCloud failed (probably no binding yet)', e);
  }
  return false;
}

export async function syncToCloud(): Promise<boolean> {
  try {
    const res = await fetch('/api/state', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId: state.userId, data: toPayload() })
    });
    const j = await res.json().catch(() => ({}));
    return !!j?.ok;
  } catch (e) {
    console.warn('[D1] syncToCloud failed (probably no binding yet)', e);
    return false;
  }
}
