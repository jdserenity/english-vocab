<script lang="ts">
  import { words, getDailySelection, type Word } from '$lib/words';

  // Use today's date for deterministic daily 5
  const today = new Date().toISOString().slice(0, 10);
  let daily: Word[] = $state(getDailySelection(today, words, new Set()));

  function speak(word: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    }
  }

  function markKnown(w: Word) {
    // Demo only: removes from today's set and pulls replacement(s)
    // Real version will persist to a seen/mastered store + localStorage
    const remaining = daily.filter(x => x.word !== w.word);
    const needed = 5 - remaining.length;
    if (needed > 0) {
      const more = getDailySelection(today, words, new Set(daily.map(d => d.word)));
      daily = [...remaining, ...more.slice(0, needed)];
    } else {
      daily = remaining;
    }
  }
</script>

<div class="min-h-screen bg-[#0a0a0a] text-[#f1f1f1] p-4 pb-10">
  <header class="max-w-md mx-auto flex items-center justify-between py-4">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-lg font-semibold">E</div>
      <div class="leading-none">
        <div class="font-semibold text-2xl tracking-[-1px]">Elevate</div>
        <div class="text-[10px] text-white/50 -mt-0.5">5 words daily</div>
      </div>
    </div>
    <div class="text-right text-xs text-white/50">
      <div>{today}</div>
      <div class="text-emerald-400">streak 12</div>
    </div>
  </header>

  <div class="max-w-md mx-auto">
    <div class="mb-3 flex items-baseline justify-between px-1">
      <div class="text-lg font-medium">Today's 5</div>
      <div class="text-[10px] text-white/50">tap word to speak • mark known</div>
    </div>

    <div class="space-y-3">
      {#each daily as w (w.word)}
        <div class="word-card bg-[#111] rounded-3xl p-4 active:bg-[#181818]">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <button
                class="text-[22px] font-semibold tracking-[-0.4px] text-left active:underline"
                onclick={() => speak(w.word)}
              >
                {w.word}
              </button>
              <span class="ml-2 text-[10px] align-middle px-1.5 py-px rounded bg-white/10 text-white/70">{w.pos}</span>

              <div class="mt-2 text-[15px] leading-snug text-white/90">
                {w.definition}
              </div>

              {#if w.examples?.[0]}
                <div class="mt-2.5 text-sm text-white/65 italic leading-tight">
                  “{w.examples[0]}”
                </div>
              {/if}

              {#if w.notes}
                <div class="mt-2 text-xs text-white/45">{w.notes}</div>
              {/if}
            </div>

            <button
              class="shrink-0 self-start text-xs px-3 py-1 rounded-2xl border border-white/15 active:bg-white/5"
              onclick={() => markKnown(w)}
            >
              known
            </button>
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-8 px-1 text-[11px] text-center text-white/35">
      Real data • deterministic daily selection (tested) • TTS • local state coming next.<br>
      <span class="font-mono text-white/40">npm run dev</span> • <span class="font-mono text-white/40">npm test</span>
    </div>
  </div>
</div>

