import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    // Add setupFiles: ['./vitest.setup.ts'] later if global mocks needed
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
