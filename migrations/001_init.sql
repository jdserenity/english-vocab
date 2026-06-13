-- Initial schema for English Vocab user progress (personal, keyed by userId from client localStorage)
CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT PRIMARY KEY,
  data TEXT NOT NULL,           -- JSON: { seen: string[], mastered: string[], favorites: string[], notes: Record<string,string>, lastDate?: string }
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_progress_updated ON progress(updated_at);
