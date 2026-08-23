<script lang="ts">
  import { formatDate, kindLabel, posLabel } from '$lib/format';
  import {
    getTodaysEntry,
    getSentence,
    loadFromCloud,
    saveSentence,
    skipEntry
  } from '$lib/user-state';
  import { onMount } from 'svelte';

  const today = new Date().toISOString().slice(0, 10);
  const initial = getTodaysEntry(today);
  let entry = $state(initial);
  let draft = $state(initial ? getSentence(initial.term) : '');
  let editing = $state(!(initial && getSentence(initial.term)));
  let savedFlash = $state('');

  onMount(() => {
    refresh();
    loadFromCloud().then(ok => { if (ok) refresh(); });
  });

  function refresh() {
    entry = getTodaysEntry(today);
    draft = entry ? getSentence(entry.term) : '';
    editing = !(entry && getSentence(entry.term));
  }

  function speak(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  }

  function keep(e: Event) {
    e.preventDefault();
    if (!entry) return;
    saveSentence(entry.term, draft, today);
    if (!getSentence(entry.term)) return;
    editing = false;
    savedFlash = 'Saved.';
    refresh();
  }

  function skip() {
    if (!entry) return;
    skipEntry(entry.term);
    savedFlash = '';
    refresh();
  }
</script>

<svelte:head>
  <title>{entry ? entry.term : 'Today'} · English Vocab</title>
</svelte:head>

{#if !entry}
  <p class="empty">You have used every entry in the list. That is a good problem.</p>
{:else}
  <p class="kicker">
    <span class="bit">{formatDate(today)}</span>
    <span class="dot" aria-hidden="true">·</span>
    <span class="bit">{kindLabel(entry.kind)}</span>
    {#if entry.pos}
      <span class="dot" aria-hidden="true">·</span>
      <span class="bit">{posLabel(entry.pos)}</span>
    {/if}
  </p>
  <h1 class="term">{entry.term}</h1>
  <div class="actions">
    <button class="listen" type="button" onclick={() => speak(entry!.term)}>Listen</button>
    <button class="quiet" type="button" onclick={skip}>I already use this</button>
  </div>

  <hr class="rule" />

  <p class="meaning">{entry.definition}</p>

  {#if entry.replaces}
    <div class="block">
      <span class="block-label">Instead of</span>
      <p>{entry.replaces}</p>
    </div>
  {/if}

  {#if entry.patterns?.length}
    <div class="block">
      <span class="block-label">In a sentence</span>
      <ul class="patterns">
        {#each entry.patterns as pattern}
          <li><em>{pattern}</em></li>
        {/each}
      </ul>
    </div>
  {/if}

  {#each entry.examples as ex}
    <div class="block">
      <span class="block-label">{ex.register === 'spoken' ? 'Spoken' : 'Written'}</span>
      <p class="example"><q>{ex.text}</q></p>
    </div>
  {/each}

  {#if entry.cousins?.length}
    {#each entry.cousins as cousin}
      <div class="block">
        <span class="block-label">Close cousin</span>
        <p class="cousin"><strong>{cousin.term}.</strong> {cousin.note}</p>
      </div>
    {/each}
  {/if}

  <hr class="rule" />

  <div class="composer">
    <span class="block-label">Write a sentence</span>
    {#if !editing && getSentence(entry.term)}
      <p class="kept">“{getSentence(entry.term)}”</p>
      <div class="row">
        <button class="quiet" type="button" onclick={() => { editing = true; savedFlash = ''; }}>Edit</button>
        {#if savedFlash}<span class="flash">{savedFlash}</span>{/if}
      </div>
    {:else}
      <form onsubmit={keep}>
        <textarea bind:value={draft} rows="3"></textarea>
        <div class="row">
          <button class="keep" type="submit">Save my sentence</button>
        </div>
      </form>
    {/if}
  </div>
{/if}
