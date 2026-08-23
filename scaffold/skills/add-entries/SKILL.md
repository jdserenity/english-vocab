---
name: add-entries
description: >-
  Add a small batch of new daily English entries to src/lib/words.ts.
  Use when the word list is running out, the user asks for more words,
  idioms, sayings, or writing moves, or new entries need to be generated.
---

# Add entries

Read this skill before writing any new item in `src/lib/words.ts`. The list is the product. A sloppy batch is worse than no batch.

## Batch size

**8 to 12 entries. Never more than 12 in one pass.**

Twelve is the hard cap. Past that, definitions go generic, examples start sounding like a thesaurus, and duplicates sneak in. If more are needed, finish this batch, run tests, then start a second pass.

A typical refill is **10**.

## Before you write

1. Read `src/lib/words.ts` — the `Entry` type and the current `entries` array.
2. Collect every existing `term` (and `id`). Do not repeat either.
3. Read today's page copy in `src/routes/+page.svelte` so new fields match what the user actually sees: meaning, instead of, in a sentence, spoken/written examples, close cousin, then *they* write a sentence.

## What an entry is for

The user wants to become a more eloquent speaker and writer. Not a collector of rare words.

Prefer items that replace a weak habit (`very`, `really`, `nice`, `interesting`, `a lot`, `get`, `thing`) or that add texture (idioms, sayings, a writing move). If you would not say it in a conversation or a normal email, it does not go in.

Kinds:

- `word` — a precision word that does a job a weaker word is currently doing
- `idiom` — a fixed phrase (`hold water`, `cut both ways`)
- `saying` — a deployable remark (`more heat than light`)
- `move` — a habit to break or a construction to steal (`Name the quality`)

Aim for a mix in each batch. Do not ship 10 fancy adjectives.

## Shape

Append to `entries` in `src/lib/words.ts`. Match the existing object style (2-space indent, compact).

```ts
{
  id: 'hold-water',          // slug; unique
  term: 'hold water',        // exactly what appears large on the page
  kind: 'idiom',             // word | idiom | saying | move
  pos: 'verb',               // optional: adj | verb | n | adv — omit for phrases
  definition: 'Hold up when you test it. A claim that holds water does not fall apart.',
  replaces: 'makes sense / is valid, vaguely',
  patterns: ['does not hold water', 'if the argument holds water'],
  examples: [
    { text: 'That explanation does not hold water.', register: 'spoken' },
    { text: 'The alibi held water until the timestamps came in.', register: 'written' }
  ],
  cousins: [{ term: 'add up', note: 'Add up is casual. Hold water is the test of a claim.' }]
}
```

Required in practice (tests enforce most of this):

- `definition` — one or two plain sentences that teach the meaning. A stranger who does not know the term should understand it. No riddles, no "not a vague very," no style-only fragments. The suite requires a period at the end and more than 40 characters.
- `replaces` — the weak habit this earns its place against
- at least **two** `examples`

`cousins` only when a nearby word is easy to mix up. Skip it rather than invent a distinction.

`patterns` are the frames you would actually reach for (`X is fraught with Y`), not extra example sentences.

## Spoken vs written examples

Both registers earn their keep only when the item actually lives differently in a mouth vs on a page.

- **Use both** when the spoken version would sound stiff on paper, or the written version would sound odd out loud (`on the merits` vs `cut to the chase`).
- **Do not fake a second register.** If both examples would be the same sentence in a costume, write two good examples in the register that fits and label them honestly.
- Writing moves often want both, because the point is using them when speaking *and* when writing.

Never write an example the user would be embarrassed to say. Never write an example that is just the definition with the term jammed in.

## Quality bar (reject the entry if)

- It is a test-prep rarity you would never deploy (the old discarded list was this: *unctuous*, *desultory*, *vituperative*)
- `replaces` is empty or vague (`a better word`)
- The examples could swap terms with a synonym and still sound fine — then the term is not doing a job
- You are padding the batch to hit 12. Ship 8 good ones instead.

## After the batch

1. `npm test -- --run` — unique terms, required fields, picker still returns one entry.
2. Do not touch picker logic, user-state, or UI unless the user asked.
3. If the empty-list copy or docs mention how long the list lasts, only update `scaffold/CODEMAP-LLM.md` when a durable fact changed (it usually has not).

## Do not

- Add an AI chat, quiz, or streak
- Rewrite existing entries unless the user asked
- Dump 20–70 items “while you are here”
