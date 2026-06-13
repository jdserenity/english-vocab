# Architecture

## Product
English Vocab delivers exactly 5 new advanced English words per day to an advanced speaker's phone via a PWA.

Core value: high-quality curation of "Goldilocks" words — elevated and precise enough to notice and want, but practical and usable in real situations (not obscure, archaic, or purely academic curiosities). Words sit at the edge of an advanced speaker's active vocabulary.

Key user flows:
- Receive a fresh daily set of 5.
- View rich details for each (definition, natural example sentences, part of speech, pronunciation via Web Speech API, usage notes).
- Mark words seen/mastered or save notes/favorites locally.
- Browse full library, search, review history of past deliveries.
- All progress persists locally only.

Non-goals (v1): accounts, cloud sync, push notifications, subscriptions, ads, multi-user.

## Tech Stack (confirmed)
- SvelteKit (Svelte 5 runes) + TypeScript
- Tailwind CSS for styling
- Vite
- Tooling: ESLint, Prettier, Vitest (unit tests + component tests)
- Adapter: Cloudflare Pages (`@sveltejs/adapter-cloudflare`, cfTarget: pages)
- PWA capabilities: web app manifest + service worker (to be added via vite-plugin-pwa or equivalent; offline app shell + data)
- No runtime backend for core experience

## Data Model
- Words source of truth: static bundled module (src/lib/words.ts). Curated list (currently ~26 words after user feedback on "too easy" vs "too obscure" vs "right on the line"). Each entry: word, pos, definition, examples[], optional notes.
- User state (local-first in localStorage via src/lib/user-state.ts):
  - seen / delivered words (to avoid immediate repeats)
  - mastered words (permanently excluded)
  - favorites + freeform per-word notes
  - Optional sync to D1 (user_id keyed JSON blob) via /api/state for cross-device use. Local state is always the source of truth and the app is fully functional offline.
- Daily selection: pure client-side `getDailySelection(isoDate, pool, seenSet)`. Deterministic per date via simple hash, excludes seen+mastered. Tested.
- D1 (when bound): single `progress` table (user_id PK, data JSON, updated_at). Binding name "DB". Not required for core offline PWA experience.

## Hosting & Deployment
- Static build output deployed to Cloudflare Pages.
- Git integration for auto-deploys on push to main.
- Free tier sufficient (static assets + edge).
- Service worker + manifest enable install to home screen and offline use on iOS/Android.

## Principles & Constraints
- Fully client-side and private by default.
- Zero ongoing cost or external dependencies for the daily experience.
- Curation quality is the primary product asset; code is delivery + tracking mechanism.
- Mobile-first, installable, fast, reliable offline.
- Tests required for implemented behaviors (TDD preferred for logic like selection).
- Follow project AGENTS.md (2-space indent in TS, minimal doc deltas, confirmed facts only in this file).

## Current Structure (high level)
- src/
  - routes/ ( +page.svelte etc for Today, Library, History )
  - lib/ (words data, stores for persistence, selection logic, components)
- static/ (icons for PWA manifest, robots etc.)
- vite.config.ts (with Cloudflare adapter)
- Tailwind + app styles in src/

## Next major additions (high level only)
PWA manifest + service worker registration.
Word data seed + selection engine + persistence.
Core UI screens.
Deployment verification on CF Pages.
