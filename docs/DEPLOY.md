# Deploy (wrangler + D1)

## One-time setup (run these)

```bash
cd english-vocab

# 1. Authenticate (opens browser)
npx wrangler login

# 2. Create the D1 database for user progress (seen words, notes, favorites, etc.)
npx wrangler d1 create english-vocab-db

#    Copy the "database_id" from the output.

# 3. Edit wrangler.jsonc and replace the placeholder with the real ID you just got.
```

## Apply schema (after you have the id in wrangler.jsonc)

```bash
# Local first (optional)
npx wrangler d1 migrations apply english-vocab-db --local

# Remote (production)
npx wrangler d1 migrations apply english-vocab-db --remote
```

## Deploy with wrangler (as requested)

```bash
npm run build
npm run deploy
# or directly:
# npx wrangler pages deploy .svelte-kit/cloudflare --project-name english-vocab
```

The first deploy will create (or update) the Pages project "english-vocab".

## Wire the D1 binding (required for /api/state to work)

After the first successful `npm run deploy`:

1. Go to Cloudflare dashboard → Pages → your "english-vocab" project.
2. Settings → Functions (or Bindings).
3. Add a D1 database binding:
   - Variable name / Binding: `DB`
   - D1 database: select `english-vocab-db`

Redeploy (or trigger a new one) after adding the binding.

## Local development notes

- `npm run dev` uses Vite on port **5173** (it will automatically try 5174+ if the port is busy).
- Pure `npm run dev` does **not** have the Cloudflare platform/D1 binding. The app falls back to localStorage only (fully functional).
- For a closer-to-prod dev experience with D1:
  ```bash
  npm run build
  npx wrangler pages dev .svelte-kit/cloudflare --d1 english-vocab-db
  ```
  (this serves the built worker + static assets with simulated or remote D1).

## Useful wrangler commands

- `npx wrangler whoami`
- `npx wrangler d1 info english-vocab-db`
- `npx wrangler pages deployment list --project-name english-vocab`
- `npx wrangler tail` (after you have a Worker/Pages project name if needed for logs)

## Port

Vite dev + preview default to **5173** (Vite will automatically use the next free port like 5174 if 5173 is busy).

The previous 5173 process was terminated.

## Architecture note

User progress is local-first (instant, offline, private). Optional D1 sync (via `/api/state`) is additive for multi-device use. The word list itself remains statically bundled for speed and offline reliability.
