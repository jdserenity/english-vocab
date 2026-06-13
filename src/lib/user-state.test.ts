import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('user-state', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('localStorage', undefined);
  });

  it('initializes without localStorage (SSR / worker)', async () => {
    const { getUserId, getTodaysWords } = await import('./user-state');
    expect(getUserId()).toBeTruthy();
    expect(getTodaysWords().length).toBe(5);
  });
});
