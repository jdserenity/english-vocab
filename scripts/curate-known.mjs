#!/usr/bin/env node
// Usage: node scripts/curate-known.mjs <user-id>
// Or: npm run curate <user-id>
//
// This lets me (Grok) directly query the D1 database for the words a user has
// marked "I know this already" (seen + mastered) so I can curate the next
// batch of words without the user having to copy/paste lists.

import { execSync } from 'node:child_process';

const userId = process.argv[2];
if (!userId) {
  console.error('Usage: node scripts/curate-known.mjs <user-id>');
  console.error('Get the user-id from the app (tap "streak • id" then "copy user id").');
  process.exit(1);
}

const db = 'english-vocab-db';

try {
  const cmd = `npx wrangler d1 execute ${db} --remote --command "SELECT data FROM progress WHERE user_id = '${userId}';" --json`;
  const output = execSync(cmd, { encoding: 'utf8' });

  const parsed = JSON.parse(output);
  // wrangler --json for SELECT usually returns an array of results
  const rows = Array.isArray(parsed) ? parsed : (parsed.results || []);

  if (!rows.length || !rows[0]?.data) {
    console.log('No progress record found for this user yet (or no marks).');
    process.exit(0);
  }

  const data = JSON.parse(rows[0].data);
  const seen = new Set(data.seen || []);
  const mastered = new Set(data.mastered || []);
  const allKnown = Array.from(new Set([...seen, ...mastered])).sort();

  console.log(`\nUser: ${userId}`);
  console.log(`Total marked "I know this already": ${allKnown.length}\n`);
  console.log(allKnown.join('\n'));
} catch (err) {
  console.error('Failed to query D1:', err.message);
  process.exit(1);
}
