<script lang="ts">
  import { formatDate, kindLabel } from '$lib/format';
  import {
    exportState,
    filterArchive,
    getArchive,
    importState,
    loadFromCloud,
    resetProgress
  } from '$lib/user-state';
  import { onMount } from 'svelte';

  let query = $state('');
  let importOpen = $state(false);
  let importDraft = $state('');
  let notice = $state('');
  let items = $state(getArchive());
  const shown = $derived(filterArchive(items, query));

  onMount(() => {
    reload();
    loadFromCloud().then(ok => { if (ok) reload(); });
  });

  function reload() {
    items = getArchive();
  }

  function doExport() {
    navigator.clipboard.writeText(exportState());
    notice = 'Copied a backup to the clipboard.';
  }

  function doImport() {
    if (importState(importDraft)) {
      reload();
      importDraft = '';
      importOpen = false;
      notice = 'Restored from the backup.';
    } else {
      notice = 'That backup could not be read.';
    }
  }

  function doReset() {
    if (!confirm('Erase every sentence and start over? This cannot be undone.')) return;
    resetProgress();
    reload();
    query = '';
    notice = 'Progress cleared.';
  }
</script>

<svelte:head>
  <title>Archive · English Vocab</title>
</svelte:head>

<p class="kicker">Your lexicon</p>
<h1 class="term term-sub">What you have used</h1>

{#if items.length === 0}
  <p class="empty">Nothing here yet. Write a sentence on today’s page and it will live here.</p>
{:else}
  <input class="search" type="search" bind:value={query} placeholder="Search a term or a sentence" />

  {#if shown.length === 0}
    <p class="empty">No matches.</p>
  {:else}
    <ol class="lexicon">
      {#each shown as item (item.term)}
        <li class="lex-item">
          <div class="lex-meta">
            <span>{item.entry ? kindLabel(item.entry.kind) : 'Entry'}</span>
            <span>{formatDate(item.date)}</span>
          </div>
          <h2 class="lex-term">{item.term}</h2>
          <p class="lex-sentence">“{item.sentence}”</p>
        </li>
      {/each}
    </ol>
  {/if}
{/if}

<details class="settings">
  <summary>Keep a copy</summary>
  <div class="settings-body">
    <div class="row">
      <button class="quiet" type="button" onclick={doExport}>Copy backup</button>
      <button class="quiet" type="button" onclick={() => { importOpen = !importOpen; notice = ''; }}>Restore</button>
      <button class="danger" type="button" onclick={doReset}>Start over</button>
    </div>
    {#if importOpen}
      <textarea bind:value={importDraft} placeholder="Paste a backup here"></textarea>
      <button class="keep" type="button" onclick={doImport}>Restore backup</button>
    {/if}
    {#if notice}<p class="flash">{notice}</p>{/if}
  </div>
</details>
