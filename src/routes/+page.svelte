<script lang="ts">
  import { type Word } from '$lib/words';
  import {
    getTodaysWords,
    markKnown as markKnownImpl,
    master,
    toggleFavorite,
    isFavorite,
    getNote,
    setNote,
    getUserId,
    resetProgress,
    exportState,
    importState,
    loadFromCloud,
    syncToCloud,
    getKnownWords
  } from '$lib/user-state';

  const today = new Date().toISOString().slice(0, 10);
  let daily: Word[] = $state(getTodaysWords(today));

  let showUserId = $state(false);
  const userId = getUserId();

  function speak(word: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    }
  }

  function markKnown(w: Word) {
    markKnownImpl(w.word);
    // Recompute today's set from the now-larger seen set
    daily = getTodaysWords(today);
  }

  function doMaster(w: Word) {
    master(w.word);
    daily = getTodaysWords(today);
  }

  function doToggleFav(w: Word) {
    toggleFavorite(w.word);
  }

  let editingNoteFor: string | null = $state(null);
  let noteDraft = $state('');

  function startNote(w: Word) {
    editingNoteFor = w.word;
    noteDraft = getNote(w.word);
  }

  function saveNote() {
    if (editingNoteFor) {
      setNote(editingNoteFor, noteDraft);
    }
    editingNoteFor = null;
    noteDraft = '';
  }

  function doReset() {
    if (confirm('Reset all progress? This cannot be undone.')) {
      resetProgress();
      daily = getTodaysWords(today);
    }
  }

  function doExport() {
    const data = exportState();
    navigator.clipboard.writeText(data);
    alert('State copied to clipboard. Save it somewhere safe.');
  }

  function doImport() {
    const json = prompt('Paste exported JSON state here:');
    if (json && importState(json)) {
      daily = getTodaysWords(today);
      alert('State imported.');
    }
  }

  function copyUserId() {
    navigator.clipboard.writeText(userId);
    alert('User ID copied. Use it on another device/browser to load the same progress (once cloud sync is wired to D1).');
  }

  async function doPull() {
    const ok = await loadFromCloud();
    if (ok) {
      daily = getTodaysWords(today);
      alert('Pulled state from D1.');
    } else {
      alert('Pull failed (D1 binding probably not attached to the Pages project yet).');
    }
  }

  async function doPush() {
    const ok = await syncToCloud();
    alert(ok ? 'Pushed to D1.' : 'Push failed (D1 binding probably not attached yet).');
  }

  function copyKnownForCuration() {
    const known = getKnownWords();
    if (known.length === 0) {
      alert('No words marked "I know this already" yet.');
      return;
    }
    const text = known.join(', ');
    navigator.clipboard.writeText(text);
    alert(`Copied ${known.length} words you've marked "I know this already". Paste this list to me in chat so I can use it to curate better future suggestions (avoiding ones that are too easy for you).`);
  }

  // Best-effort: try to hydrate from D1 on first load in a real deployment
  if (typeof window !== 'undefined') {
    // don't block render
    loadFromCloud().then(ok => { if (ok) daily = getTodaysWords(today); });
  }
</script>

<div class="min-h-screen bg-[#0a0a0a] text-[#f1f1f1] p-4 pb-10">
  <header class="max-w-md mx-auto flex items-center justify-between py-4">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-lg font-semibold">EV</div>
      <div class="leading-none">
        <div class="font-semibold text-2xl tracking-[-1px]">English Vocab</div>
        <div class="text-[10px] text-white/50 -mt-0.5">5 words daily</div>
      </div>
    </div>
    <div class="text-right text-xs text-white/50">
      <div>{today}</div>
      <button onclick={() => showUserId = !showUserId} class="text-emerald-400 underline">streak • id</button>
    </div>
  </header>

  {#if showUserId}
    <div class="max-w-md mx-auto mb-4 p-3 bg-[#111] rounded-2xl text-xs flex items-center justify-between gap-2">
      <div class="font-mono text-white/70 truncate">{userId}</div>
      <div class="flex gap-2 shrink-0">
        <button onclick={copyUserId} class="px-2 py-1 border border-white/20 rounded">copy id</button>
        <button onclick={doPull} class="px-2 py-1 border border-emerald-400/40 text-emerald-400 rounded">pull D1</button>
        <button onclick={doPush} class="px-2 py-1 border border-emerald-400/40 text-emerald-400 rounded">push D1</button>
        <button onclick={doExport} class="px-2 py-1 border border-white/20 rounded">export</button>
        <button onclick={doImport} class="px-2 py-1 border border-white/20 rounded">import</button>
        <button onclick={doReset} class="px-2 py-1 border border-red-400/40 text-red-400 rounded">reset</button>
      </div>
    </div>

    <div class="max-w-md mx-auto mb-4 p-3 bg-[#111] rounded-2xl text-xs">
      <div class="flex items-center justify-between mb-1">
        <span>You've marked <strong>{getKnownWords().length}</strong> words "I know this already"</span>
        <button onclick={copyKnownForCuration} class="px-2 py-1 border border-emerald-400/40 text-emerald-400 rounded text-[10px]">Copy list for Grok</button>
      </div>
      <div class="text-[10px] text-white/50">
        One-click copy of exactly the words you've hit with "I know this already". Paste the list here in chat so I can see what's too easy for you and curate better suggestions automatically. No full state export needed.
      </div>
    </div>
  {/if}

  <div class="max-w-md mx-auto">
    <div class="mb-3 flex items-baseline justify-between px-1">
      <div class="text-lg font-medium">Today's 5</div>
      <div class="text-[10px] text-white/50">tap word • ★ fav • "I know this already" / master</div>
    </div>

    <div class="space-y-3">
      {#each daily as w (w.word)}
        <div class="word-card bg-[#111] rounded-3xl p-4 active:bg-[#181818]">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <button
                  class="text-[22px] font-semibold tracking-[-0.4px] text-left active:underline"
                  onclick={() => speak(w.word)}
                >
                  {w.word}
                </button>
                <span class="text-[10px] px-1.5 py-px rounded bg-white/10 text-white/70">{w.pos}</span>
                <button onclick={() => doToggleFav(w)} class="text-lg leading-none" title="favorite">
                  {isFavorite(w.word) ? '★' : '☆'}
                </button>
              </div>

              <div class="mt-2 text-[15px] leading-snug text-white/90">
                {w.definition}
              </div>

              {#if w.examples?.[0]}
                <div class="mt-2.5 text-sm text-white/65 italic leading-tight">
                  “{w.examples[0]}”
                </div>
              {/if}

              {#if editingNoteFor === w.word}
                <div class="mt-3">
                  <textarea bind:value={noteDraft} class="w-full bg-black/40 text-sm p-2 rounded" rows="2" placeholder="Your note..."></textarea>
                  <div class="flex gap-2 mt-1">
                    <button onclick={saveNote} class="text-xs px-2 py-1 bg-white/10 rounded">save</button>
                    <button onclick={() => { editingNoteFor = null; noteDraft = ''; }} class="text-xs px-2 py-1">cancel</button>
                  </div>
                </div>
              {:else}
                {#if getNote(w.word)}
                  <div class="mt-2 text-xs text-emerald-400/80 cursor-pointer" onclick={() => startNote(w)}>
                    “{getNote(w.word)}”
                  </div>
                {:else}
                  <button onclick={() => startNote(w)} class="mt-2 text-[10px] text-white/40 underline">+ add note</button>
                {/if}
              {/if}
            </div>

            <div class="shrink-0 flex flex-col gap-1.5 items-end">
              <button
                class="text-xs px-3 py-1 rounded-2xl border border-white/15 active:bg-white/5"
                onclick={() => markKnown(w)}
              >
                I know this already
              </button>
              <button
                class="text-xs px-3 py-1 rounded-2xl border border-red-400/30 text-red-400 active:bg-red-950/30"
                onclick={() => doMaster(w)}
                title="Permanently exclude from future days"
              >
                master
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-8 px-1 text-[11px] text-center text-white/35">
      Real curated words • date-seeded + seen set (persisted) • TTS • local-first (D1 sync coming).<br>
      Dev server on <span class="font-mono">5173</span> (auto-falls back to 5174+ if busy).<br>
      <span class="font-mono text-white/40">npm run dev</span> • <span class="font-mono text-white/40">npm test</span> • <span class="font-mono text-white/40">npx wrangler</span>
    </div>
  </div>
</div>

