<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { page } from '$app/state';
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>English Vocab</title>
</svelte:head>

<div class="page">
  <header class="masthead">
    <a class="wordmark" href="/">English</a>
    <nav class="nav">
      <a href="/" aria-current={page.url.pathname === '/' ? 'page' : undefined}>Today</a>
      <a href="/archive" aria-current={page.url.pathname === '/archive' ? 'page' : undefined}>Archive</a>
    </nav>
  </header>
  {@render children()}
</div>
