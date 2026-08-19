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

The first (manual or Git) deploy will create (or update) the Pages project "english-vocab". For Git integration to work on every push to main, the project in the dashboard must be linked to your Git repo, with the build settings below configured.

## Wire the D1 binding (required for /api/state to work)

**This is required even for Git-based deploys.** The wrangler.jsonc helps with local/wrangler CLI, but the live Pages project needs the binding configured in the dashboard.

1. Go to Cloudflare dashboard → Pages → your "english-vocab" project (the one serving the URL you're testing).
2. Settings → Functions (or Bindings).
3. Add a D1 database binding:
   - Variable name / Binding: `DB`
   - D1 database: select `english-vocab-db`

4. Save, then trigger a new deployment (push to main or manual "Deploy" in dashboard).

Bindings take effect on new deployments. The "no-d1" fallback in the code should prevent crashes, but a missing binding during early loads or specific paths can contribute to 500s or broken state sync.

## Local development notes

- `npm run dev` uses Vite on port **5173** (it will automatically try 5174+ if the port is busy).
- Pure `npm run dev` does **not** have the Cloudflare platform/D1 binding. The app falls back to localStorage only (fully functional).
- For a closer-to-prod dev experience with D1:
  ```bash
  npm run build
  npx wrangler pages dev .svelte-kit/cloudflare --d1 english-vocab-db
  ```
  (this serves the built worker + static assets with simulated or remote D1).

**Note on Git auto-deploys:** The dashboard build settings (below) control Git pushes. wrangler.jsonc is mainly for `wrangler` CLI deploys and local dev. Always verify the build output dir and D1 binding in the dashboard for the project connected to your repo.

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
