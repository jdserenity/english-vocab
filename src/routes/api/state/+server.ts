import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Minimal D1-backed user progress store.
// Client generates a stable userId (stored in localStorage) and sends it on every call.
// This enables optional cross-device sync while the app remains fully usable offline via local state.

type Progress = {
  seen: string[];
  mastered: string[];
  favorites: string[];
  notes: Record<string, string>;
  lastDate?: string;
};

function isValidProgress(p: unknown): p is Progress {
  if (!p || typeof p !== 'object') return false;
  const obj = p as Record<string, unknown>;
  return (
    Array.isArray(obj.seen) &&
    Array.isArray(obj.mastered) &&
    Array.isArray(obj.favorites) &&
    obj.notes && typeof obj.notes === 'object'
  );
}

export const GET: RequestHandler = async ({ url, platform }) => {
  const userId = url.searchParams.get('userId');
  if (!userId) return json({ error: 'missing userId' }, { status: 400 });

  const d1 = platform?.env?.DB;
  if (!d1) {
    // No binding in this environment (pure Vite dev, or Pages project not yet bound)
    return json({ ok: true, from: 'no-d1', data: null });
  }

  try {
    const row = await d1
      .prepare('SELECT data FROM progress WHERE user_id = ?')
      .bind(userId)
      .first<{ data: string }>();

    if (!row) {
      return json({ ok: true, from: 'd1', data: null });
    }

    const data = JSON.parse(row.data);
    return json({ ok: true, from: 'd1', data });
  } catch (e) {
    console.error('D1 GET error', e);
    return json({ ok: true, from: 'd1-error', data: null });
  }
};

export const POST: RequestHandler = async ({ request, platform }) => {
  const body = await request.json().catch(() => ({}));
  const userId: string | undefined = body.userId;
  const data: unknown = body.data;

  if (!userId || !isValidProgress(data)) {
    return json({ error: 'invalid payload' }, { status: 400 });
  }

  const d1 = platform?.env?.DB;
  if (!d1) {
    return json({ ok: true, from: 'no-d1', message: 'D1 binding not available in this environment' });
  }

  const jsonData = JSON.stringify(data);
  const now = Date.now();

  try {
    await d1
      .prepare(
        'INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, ?)\n' +
        'ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at'
      )
      .bind(userId, jsonData, now)
      .run();

    return json({ ok: true, from: 'd1' });
  } catch (e) {
    console.error('D1 POST error', e);
    return json({ ok: true, from: 'd1-error', message: 'DB write failed' });
  }
};
