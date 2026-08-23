# Code map (agent reference)

Product: one English entry per calendar day. An entry is a usable word, idiom, saying, or writing move — not a rare test-prep word the user would never say. The daily action is the user writing one original sentence (for retention). The wordmark is “English”. Skipped entries (“I already use this”, always shown next to Listen) leave the rotation; skip also drops any sentence saved for that term. The archive is only entries that still have a sentence.

New entries are added via `scaffold/skills/add-entries/SKILL.md`, in batches of 8–12 (hard cap 12). Definitions are plain-English complete sentences that teach the meaning; they are not riddles or style fragments.

Stack: SvelteKit (Svelte 5 runes) + Tailwind 4 + Vitest, adapter `@sveltejs/adapter-cloudflare`, optional D1 binding `DB`. Font is self-hosted Newsreader (`@fontsource-variable/newsreader`).

Daily pick: `getDailySelection(isoDate, entries, excluded)` in `src/lib/words.ts` returns 0 or 1 entry. Date-seeded hash sort. Excluded = skipped ∪ terms with sentences. If a sentence exists with `date === today`, that entry is locked for the day even though it is excluded from later picks.

Client state key `english-vocab:user-state:v1` in localStorage. Shape: `{ userId, seen, mastered, favorites, notes, lastDate, skipped, sentences }`. `sentences` is `Record<term, { text, date }>`. `seen` is kept as skipped∪used for the existing D1 POST validator. Old saves without `skipped` treat `seen` as skipped. `mastered` / `favorites` / `notes` are unused in the UI and still sent for payload compatibility.

D1: `GET/POST /api/state` in `src/routes/api/state/+server.ts`, table `progress` (see `migrations/001_init.sql`). Local Vite has no binding and no-ops.

Routes: `/` daily page, `/archive` lexicon + search + export/import/reset. No AI features.

`src/routes/+layout.ts` sets `ssr = false` because daily pick and archive live in localStorage. Pages still re-read state in `onMount` (and again after a successful D1 pull).
