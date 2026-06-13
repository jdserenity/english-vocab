export type Word = {
  word: string;
  pos: string; // e.g. 'adj', 'verb', 'n', 'adv'
  definition: string;
  examples: string[];
  notes?: string;
};

export const words: Word[] = [
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
    word: 'circumspect',
    pos: 'adj',
    definition: 'Wary and unwilling to take risks; prudent and cautious.',
    examples: [
      'Investors have become more circumspect after the last downturn.',
      'She was circumspect in her public comments on the controversy.'
    ]
  },
  {
    word: 'desultory',
    pos: 'adj',
    definition: 'Marked by lack of plan, order, or enthusiasm; haphazard.',
    examples: [
      'The meeting was desultory, drifting from one topic to another without resolution.',
      'He made a desultory attempt at tidying before giving up.'
    ]
  },
  {
    word: 'diffident',
    pos: 'adj',
    definition: 'Modest or shy because of a lack of self-confidence.',
    examples: [
      'In meetings he was diffident, rarely offering his excellent ideas unprompted.',
      'She gave a diffident smile when complimented on the design.'
    ]
  },
  {
    word: 'dilatory',
    pos: 'adj',
    definition: 'Slow to act; intended to cause delay.',
    examples: [
      'The committee\'s dilatory tactics pushed the vote into the next quarter.',
      'He was dilatory in replying to emails that required difficult decisions.'
    ]
  },
  {
    word: 'enervate',
    pos: 'verb',
    definition: 'Cause (someone) to feel drained of energy or vitality; weaken.',
    examples: [
      'The endless bureaucracy enervated even the most enthusiastic new hires.',
      'Hot, humid weather can enervate the strongest athletes.'
    ]
  },
  {
    word: 'evince',
    pos: 'verb',
    definition: 'Reveal the presence of (a quality or feeling); show clearly.',
    examples: [
      'The data evince a clear correlation between the two variables.',
      'He evinced no interest in the proposed changes.'
    ]
  },
  {
    word: 'fastidious',
    pos: 'adj',
    definition: 'Very attentive to detail; difficult to please; meticulous.',
    examples: [
      'A fastidious editor who catches every inconsistency and awkward phrase.',
      'He was fastidious about the alignment of every element on the slide.'
    ]
  },
  {
    word: 'fractious',
    pos: 'adj',
    definition: 'Irritable and quarrelsome; difficult to control or manage.',
    examples: [
      'The fractious debate splintered the committee into warring factions.',
      'A fractious toddler is rarely improved by further negotiation.'
    ]
  },
  {
    word: 'halcyon',
    pos: 'adj',
    definition: 'Denoting a period of time in the past that was idyllically happy and peaceful.',
    examples: [
      'They spoke of the halcyon days before the company was acquired.',
      'The halcyon summer evenings on the porch are what she missed most.'
    ]
  },
  {
    word: 'invidious',
    pos: 'adj',
    definition: 'Likely to arouse or incur resentment or anger in others.',
    examples: [
      'Making invidious comparisons between team members destroyed morale.',
      'The policy created an invidious distinction between old and new employees.'
    ]
  },
  {
    word: 'obdurate',
    pos: 'adj',
    definition: 'Stubbornly refusing to change one\'s opinion or course of action.',
    examples: [
      'He remained obdurate even after the financial projections were revised.',
      'An obdurate refusal to apologize prolonged the dispute unnecessarily.'
    ]
  },
  {
    word: 'opprobrium',
    pos: 'n',
    definition: 'Harsh criticism or censure; the public disgrace arising from it.',
    examples: [
      'The decision drew opprobrium from across the political spectrum.',
      'He bore the opprobrium of the scandal with surprising dignity.'
    ]
  },
  {
    word: 'parsimonious',
    pos: 'adj',
    definition: 'Very unwilling to spend money or use resources; stingy.',
    examples: [
      'The parsimonious budget left no room for the necessary safety upgrades.',
      'She was parsimonious with praise but generous with her time.'
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
    word: 'peremptory',
    pos: 'adj',
    definition: 'Insisting on immediate attention or obedience, especially in a brusque way.',
    examples: [
      'Her peremptory tone ended the discussion before it began.',
      'The peremptory deadline left the team no room to iterate on the design.'
    ]
  },
  {
    word: 'phlegmatic',
    pos: 'adj',
    definition: 'Having an unemotional and stolidly calm disposition.',
    examples: [
      'Even under intense pressure the phlegmatic negotiator never raised his voice.',
      'His phlegmatic response to the crisis was either admirable or alarming.'
    ]
  },
  {
    word: 'restive',
    pos: 'adj',
    definition: 'Unable to keep still or silent and becoming increasingly difficult to control.',
    examples: [
      'The audience grew restive during the third hour of speeches.',
      'Long delays made the passengers restive and vocal.'
    ]
  },
  {
    word: 'reticent',
    pos: 'adj',
    definition: 'Not revealing one\'s thoughts or feelings readily; reserved.',
    examples: [
      'He was reticent about his role in the earlier negotiations.',
      'The data is reticent on the question of long-term cultural impact.'
    ]
  },
  {
    word: 'sanguine',
    pos: 'adj',
    definition: 'Optimistic or positive, especially in difficult circumstances.',
    examples: [
      'Despite the delays, the team remained sanguine about hitting the deadline.',
      'She was sanguine that the market would recover by the next quarter.'
    ]
  },
  {
    word: 'sententious',
    pos: 'adj',
    definition: 'Given to moralizing in a pompous or affected manner.',
    examples: [
      'The memo was sententious, full of lofty principles but short on practical steps.',
      'He delivered a sententious lecture on punctuality to the already irritated staff.'
    ]
  },
  {
    word: 'stolid',
    pos: 'adj',
    definition: 'Calm, dependable, and showing little emotion or animation.',
    examples: [
      'The stolid guard stood motionless through the entire eight-hour shift.',
      'Her stolid acceptance of the news surprised everyone who expected tears.'
    ]
  },
  {
    word: 'supercilious',
    pos: 'adj',
    definition: 'Behaving or looking as though one thinks one is superior to others.',
    examples: [
      'The supercilious waiter made them feel unwelcome from the moment they sat down.',
      'He gave a supercilious glance at the modest proposal.'
    ]
  },
  {
    word: 'tendentious',
    pos: 'adj',
    definition: 'Expressing or promoting a particular cause or point of view, especially a controversial one.',
    examples: [
      'The report was tendentious, selectively highlighting data that supported the preferred conclusion.',
      'A tendentious framing turned a neutral question into a loaded one.'
    ]
  },
  {
    word: 'unctuous',
    pos: 'adj',
    definition: 'Excessively flattering or ingratiating in an oily or insincere way.',
    examples: [
      'The unctuous praise made her more suspicious than flattered.',
      'He offered an unctuous apology that convinced no one.'
    ]
  },
  {
    word: 'vituperative',
    pos: 'adj',
    definition: 'Bitter and abusive in language.',
    examples: [
      'The vituperative editorial attacked every aspect of the reform package.',
      'Vituperative comments online rarely change anyone\'s mind.'
    ]
  },
  {
    word: 'voluble',
    pos: 'adj',
    definition: 'Speaking or spoken incessantly and fluently; talkative.',
    examples: [
      'The voluble host filled every silence with another anecdote.',
      'After two glasses of wine she became uncharacteristically voluble.'
    ]
  },
  // Re-added per your note (you were joking about them being out of the ordinary)
  {
    word: 'alacrity',
    pos: 'n',
    definition: 'Cheerful willingness or eager readiness to do something.',
    examples: [
      'She accepted the extra assignment with alacrity, seeing it as an opportunity.',
      'He responded to the invitation with surprising alacrity.'
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
