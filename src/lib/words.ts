export type Word = {
  word: string;
  pos: string; // e.g. 'adj', 'verb', 'n', 'adv'
  definition: string;
  examples: string[];
  notes?: string;
};

export const words: Word[] = [
  {
    word: 'alacrity',
    pos: 'n',
    definition: 'Cheerful willingness or eager readiness to do something.',
    examples: [
      'She accepted the extra assignment with alacrity, seeing it as an opportunity.',
      'He responded to the invitation with surprising alacrity.'
    ],
    notes: 'Useful for describing positive, unhesitating responses in professional or social contexts.'
  },
  {
    word: 'cogent',
    pos: 'adj',
    definition: 'Clear, logical, and convincing.',
    examples: [
      'Her cogent analysis convinced even the skeptics on the board.',
      'The lawyer presented a cogent argument backed by precise evidence.'
    ]
  },
  {
    word: 'ephemeral',
    pos: 'adj',
    definition: 'Lasting for a very short time; fleeting.',
    examples: [
      'The excitement around the new policy proved ephemeral once the details emerged.',
      'Social media fame is often ephemeral.'
    ],
    notes: 'Pairs well with discussions of trends, attention, or temporary states.'
  },
  {
    word: 'equanimity',
    pos: 'n',
    definition: 'Mental calmness and composure, especially in difficult situations.',
    examples: [
      'She faced the criticism with remarkable equanimity.',
      'His equanimity under pressure made him a natural leader.'
    ]
  },
  {
    word: 'fastidious',
    pos: 'adj',
    definition: 'Very attentive to detail; difficult to please; meticulous.',
    examples: [
      'A fastidious reader who notices every inconsistency in a manuscript.',
      'He was fastidious about the placement of every element in the design.'
    ]
  },
  {
    word: 'intransigent',
    pos: 'adj',
    definition: 'Unwilling to change views or agree; uncompromising.',
    examples: [
      'The two factions remained intransigent even after hours of negotiation.',
      'An intransigent stance on the issue blocked any compromise.'
    ]
  },
  {
    word: 'laconic',
    pos: 'adj',
    definition: 'Using very few words; concise to the point of being brusque.',
    examples: [
      'His laconic reply—"Fine"—ended the conversation.',
      'She is known for laconic emails that get straight to the point.'
    ]
  },
  {
    word: 'perfunctory',
    pos: 'adj',
    definition: 'Carried out with minimal effort or interest; cursory.',
    examples: [
      'The inspection felt perfunctory, more about ticking boxes than finding issues.',
      'He gave a perfunctory nod and returned to his screen.'
    ]
  },
  {
    word: 'sanguine',
    pos: 'adj',
    definition: 'Optimistic or positive, especially in difficult circumstances.',
    examples: [
      'Despite the delays, the team remained sanguine about hitting the deadline.',
      'She was sanguine that the market would recover.'
    ]
  },
  {
    word: 'trenchant',
    pos: 'adj',
    definition: 'Vigorous, sharp, and incisive in thought or expression.',
    examples: [
      'The article offered a trenchant critique of the proposal.',
      'His trenchant observations cut through the usual corporate speak.'
    ]
  },
  {
    word: 'ubiquitous',
    pos: 'adj',
    definition: 'Present, appearing, or found everywhere.',
    examples: [
      'Smartphones have become ubiquitous in daily life.',
      'The once-niche term is now ubiquitous in business writing.'
    ],
    notes: 'Slightly more common than some others here, but still precise and elevated.'
  },
  {
    word: 'mitigate',
    pos: 'verb',
    definition: 'Make less severe, serious, or painful; alleviate.',
    examples: [
      'New protocols were introduced to mitigate the risk of data breaches.',
      'We cannot eliminate the problem, but we can mitigate its effects.'
    ]
  },
  {
    word: 'scrutinize',
    pos: 'verb',
    definition: 'Examine or inspect closely and thoroughly.',
    examples: [
      'Investors will scrutinize the quarterly numbers for any signs of weakness.',
      'She scrutinized the contract before signing.'
    ]
  },
  {
    word: 'nuance',
    pos: 'n',
    definition: 'A subtle difference in meaning, expression, or sound.',
    examples: [
      'The nuance between "assertive" and "aggressive" matters in feedback.',
      'He captured every nuance of the character\'s shifting mood.'
    ]
  },
  {
    word: 'salient',
    pos: 'adj',
    definition: 'Most noticeable or important; prominent.',
    examples: [
      'The most salient point in the report was the unexpected drop in retention.',
      'Several salient features distinguish this approach from previous ones.'
    ]
  },
  {
    word: 'tenuous',
    pos: 'adj',
    definition: 'Very weak or slight; insubstantial.',
    examples: [
      'The connection between the two events felt tenuous at best.',
      'After the layoffs, morale was in a tenuous state.'
    ]
  },
  {
    word: 'judicious',
    pos: 'adj',
    definition: 'Having or showing good judgment; wise and careful.',
    examples: [
      'A judicious use of resources allowed them to complete the project under budget.',
      'She made a judicious decision to pause rather than push forward.'
    ]
  },
  {
    word: 'reticent',
    pos: 'adj',
    definition: 'Not revealing one\'s thoughts or feelings readily; reserved.',
    examples: [
      'He was reticent about his role in the earlier negotiations.',
      'The data is reticent on the question of long-term impact.'
    ]
  },
  {
    word: 'circumspect',
    pos: 'adj',
    definition: 'Wary and unwilling to take risks; prudent.',
    examples: [
      'Investors have become more circumspect after the last downturn.',
      'She was circumspect in her public comments on the controversy.'
    ]
  },
  {
    word: 'mellifluous',
    pos: 'adj',
    definition: 'Sweet or musical; pleasant to hear (usually of a voice or words).',
    examples: [
      'The narrator\'s mellifluous voice made the long audiobook enjoyable.',
      'He delivered the bad news in a mellifluous, almost soothing tone.'
    ]
  }
];

// Helper to get a stable daily selection of N words.
// Pure function: easy to test and reason about.
export function getDailySelection(
  isoDate: string, // 'YYYY-MM-DD'
  allWords: Word[],
  seen: Set<string> = new Set()
): Word[] {
  const count = 5;
  // Filter out seen
  let pool = allWords.filter(w => !seen.has(w.word));

  if (pool.length === 0) {
    pool = [...allWords]; // reset if everything seen (rare)
  }

  // Simple deterministic shuffle based on date + word
  // Using a tiny string hash as seed
  const seed = hashString(isoDate);

  const shuffled = [...pool].sort((a, b) => {
    const ha = hashString(a.word + seed);
    const hb = hashString(b.word + seed);
    return ha - hb;
  });

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}
