import { getDailySelection, words, type Word } from './words';

// Simple personal state persisted to localStorage.
// Later this will optionally sync to D1 via /api/state for cross-device use.

const STORAGE_KEY = 'english-vocab:user-state:v1';

export type UserState = {
  userId: string;
  seen: string[];           // words the user has marked known / seen
  mastered: string[];       // permanently removed from rotation
  favorites: string[];
  notes: Record<string, string>; // word -> user's personal note
  lastDate: string;         // YYYY-MM-DD of last interaction
};

function load(): UserState {
  if (typeof localStorage === 'undefined') {
    return createDefault();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserState;
      if (!parsed.userId) parsed.userId = crypto.randomUUID();
      return parsed;
    }
  } catch {}
  return createDefault();
}

function createDefault(): UserState {
  return {
    userId: crypto.randomUUID(),
    seen: [],
    mastered: [],
    favorites: [],
    notes: {},
    lastDate: new Date().toISOString().slice(0, 10)
  };
}

function save(state: UserState) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

let state = $state<UserState>(load());

// reactive seen set for convenience with getDailySelection
export const seenSet = $derived(new Set(state.seen));

export function getUserId() {
  return state.userId;
}

export function getTodaysWords(date = new Date().toISOString().slice(0, 10)): Word[] {
  // Exclude both seen and mastered
  const excluded = new Set([...state.seen, ...state.mastered]);
  return getDailySelection(date, words, excluded);
}

export function markKnown(word: string) {
  if (!state.seen.includes(word)) {
    state.seen = [...state.seen, word];
  }
  save(state);

  // Best-effort push to D1 so that when curating new words I can query the DB directly.
  // No manual export/copy needed from you.
  syncToCloud().catch(() => {});
}

export function master(word: string) {
  if (!state.mastered.includes(word)) {
    state.mastered = [...state.mastered, word];
  }
  // also remove from seen if present
  state.seen = state.seen.filter(w => w !== word);
  save(state);
}

export function toggleFavorite(word: string) {
  if (state.favorites.includes(word)) {
    state.favorites = state.favorites.filter(w => w !== word);
  } else {
    state.favorites = [...state.favorites, word];
  }
  save(state);
}

export function setNote(word: string, note: string) {
  if (note.trim()) {
    state.notes[word] = note.trim();
  } else {
    delete state.notes[word];
  }
  state.notes = { ...state.notes };
  save(state);
}

export function getNote(word: string): string {
  return state.notes[word] || '';
}

export function isFavorite(word: string): boolean {
  return state.favorites.includes(word);
}

export function resetProgress() {
  const fresh = createDefault();
  // keep the same userId so cloud sync (future) doesn't orphan data
  fresh.userId = state.userId;
  state = fresh;
  save(state);
}

export function exportState(): string {
  return JSON.stringify(state, null, 2);
}

export function importState(json: string) {
  try {
    const incoming = JSON.parse(json) as UserState;
    if (incoming.userId && Array.isArray(incoming.seen)) {
      state = incoming;
      save(state);
      return true;
    }
  } catch {}
  return false;
}

// --- Cloud (D1) sync ---
// The API lives at /api/state and expects { userId, data }.
// It only works after:
//   1. wrangler d1 create english-vocab-db
//   2. fill database_id in wrangler.jsonc
//   3. npm run build && npm run deploy
//   4. In Cloudflare dashboard: Pages project "english-vocab" > Settings > Bindings > D1 databases > add binding "DB" pointing to english-vocab-db
// Local Vite dev (npm run dev) will gracefully no-op.

type ProgressPayload = {
  seen: string[];
  mastered: string[];
  favorites: string[];
  notes: Record<string, string>;
  lastDate?: string;
};

function toPayload(): ProgressPayload {
  return {
    seen: state.seen,
    mastered: state.mastered,
    favorites: state.favorites,
    notes: state.notes,
    lastDate: state.lastDate
  };
}

function fromPayload(p: ProgressPayload) {
  state.seen = Array.from(new Set([...(state.seen || []), ...(p.seen || [])]));
  state.mastered = Array.from(new Set([...(state.mastered || []), ...(p.mastered || [])]));
  state.favorites = Array.from(new Set([...(state.favorites || []), ...(p.favorites || [])]));
  state.notes = { ...state.notes, ...(p.notes || {}) };
  if (p.lastDate) state.lastDate = p.lastDate;
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

// (Removed getKnownWords - curation now happens by directly querying D1 with the userId when needed.)
