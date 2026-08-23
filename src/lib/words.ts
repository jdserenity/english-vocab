export type EntryKind = 'word' | 'idiom' | 'saying' | 'move';

export type Example = {
  text: string;
  register: 'spoken' | 'written';
};

export type Cousin = {
  term: string;
  note: string;
};

export type Entry = {
  id: string;
  term: string;
  kind: EntryKind;
  pos?: string;
  definition: string;
  replaces?: string;
  patterns?: string[];
  examples: Example[];
  cousins?: Cousin[];
};

export const entries: Entry[] = [
  {
    id: 'tacit',
    term: 'tacit',
    kind: 'word',
    pos: 'adj',
    definition: 'Agreed or understood without anyone saying it out loud.',
    replaces: 'unspoken, but everyone knows',
    patterns: ['a tacit agreement', 'tacit approval', 'a tacit understanding'],
    examples: [
      { text: 'We had a tacit agreement not to bring it up at dinner.', register: 'spoken' },
      { text: 'Her silence was read as tacit approval of the plan.', register: 'written' }
    ],
    cousins: [{ term: 'implicit', note: 'Implicit is the broader cousin. Tacit usually means people agreed by not objecting.' }]
  },
  {
    id: 'salient',
    term: 'salient',
    kind: 'word',
    pos: 'adj',
    definition: 'The part that sticks out as the most important thing in this situation.',
    replaces: 'the main / important thing',
    patterns: ['the salient point', 'the salient fact', 'what is salient here'],
    examples: [
      { text: 'The salient point is we still do not have a date.', register: 'spoken' },
      { text: 'Of the objections raised, only two were salient.', register: 'written' }
    ],
    cousins: [{ term: 'relevant', note: 'Many things can be relevant. Salient is the one that rises to the top.' }]
  },
  {
    id: 'fraught',
    term: 'fraught',
    kind: 'word',
    pos: 'adj',
    definition: 'Full of tension, worry, or problems. A fraught conversation is one that could go badly.',
    replaces: 'very tense / full of problems',
    patterns: ['a fraught silence', 'fraught with X', 'a fraught conversation'],
    examples: [
      { text: 'That conversation is going to be fraught.', register: 'spoken' },
      { text: 'The handover was fraught with last-minute changes.', register: 'written' }
    ],
    cousins: [{ term: 'tense', note: 'Tense is the feeling. Fraught says the situation is charged, not just nervous.' }]
  },
  {
    id: 'wry',
    term: 'wry',
    kind: 'word',
    pos: 'adj',
    definition: 'Dryly amused, often at something that went wrong. A wry smile is small and twisted, not a joke-telling grin.',
    replaces: 'funny, when you mean dry',
    patterns: ['a wry smile', 'wryly', 'a wry observation'],
    examples: [
      { text: 'He gave a wry smile and said, "Well, that went well."', register: 'spoken' },
      { text: 'The review offered a wry account of the launch-day chaos.', register: 'written' }
    ],
    cousins: [{ term: 'sarcastic', note: 'Sarcasm cuts. Wry is drier and usually kinder.' }]
  },
  {
    id: 'blunt',
    term: 'blunt',
    kind: 'word',
    pos: 'adj',
    definition: 'Direct and unsoftened, even when the truth stings.',
    replaces: 'honest, when you mean unsoftened',
    patterns: ['to be blunt', 'a blunt assessment', 'put it bluntly'],
    examples: [
      { text: 'To be blunt, this is not ready.', register: 'spoken' },
      { text: 'The report was blunt about the gaps in the evidence.', register: 'written' }
    ],
    cousins: [{ term: 'frank', note: 'Frank is open. Blunt is open without the courtesy layer.' }]
  },
  {
    id: 'keen',
    term: 'keen',
    kind: 'word',
    pos: 'adj',
    definition: 'Eager, or sharply alert. "Keen to" means you really want to; "keenly aware" means you notice it clearly.',
    replaces: 'very interested / very sharp',
    patterns: ['keen to', 'a keen sense of', 'keenly aware'],
    examples: [
      { text: 'I am keen to hear how you would do it.', register: 'spoken' },
      { text: 'She was keenly aware of how the room had shifted.', register: 'written' }
    ],
    cousins: [{ term: 'eager', note: 'Eager is hungry for the thing. Keen can also mean the mind is sharp.' }]
  },
  {
    id: 'spare',
    term: 'spare',
    kind: 'word',
    pos: 'adj',
    definition: 'Deliberately lean: nothing extra, and that is the point.',
    replaces: 'simple, when you mean stripped down',
    patterns: ['spare prose', 'a spare account', 'in spare terms'],
    examples: [
      { text: 'Keep it spare — one page, no throat-clearing.', register: 'spoken' },
      { text: 'The letter was spare, and all the more cutting for it.', register: 'written' }
    ],
    cousins: [{ term: 'plain', note: 'Plain can mean dull. Spare means the fat has been cut on purpose.' }]
  },
  {
    id: 'terse',
    term: 'terse',
    kind: 'word',
    pos: 'adj',
    definition: 'Very short, in a clipped way that can feel cold.',
    replaces: 'short, when the shortness has a tone',
    patterns: ['a terse reply', 'tersely'],
    examples: [
      { text: 'His email was terse. Just "Fine."', register: 'spoken' },
      { text: 'She answered in a terse note that closed the matter.', register: 'written' }
    ],
    cousins: [{ term: 'concise', note: 'Concise is a compliment. Terse can mean you felt the door shut.' }]
  },
  {
    id: 'muted',
    term: 'muted',
    kind: 'word',
    pos: 'adj',
    definition: 'Held back or turned down. The feeling is there, but quietly.',
    replaces: 'not very strong / kind of quiet',
    patterns: ['a muted response', 'muted enthusiasm', 'in muted terms'],
    examples: [
      { text: 'The reaction in the room was muted.', register: 'spoken' },
      { text: 'Even the supporters offered only muted praise.', register: 'written' }
    ]
  },
  {
    id: 'stark',
    term: 'stark',
    kind: 'word',
    pos: 'adj',
    definition: 'Completely clear and bare, with nothing softening the edges.',
    replaces: 'very clear / very different',
    patterns: ['a stark contrast', 'the stark fact', 'in stark terms'],
    examples: [
      { text: 'The contrast is stark once you put the two drafts side by side.', register: 'spoken' },
      { text: 'The figures laid out a stark choice.', register: 'written' }
    ]
  },
  {
    id: 'apt',
    term: 'apt',
    kind: 'word',
    pos: 'adj',
    definition: 'Exactly the right word, image, or remark for this moment.',
    replaces: 'good, when you mean well chosen',
    patterns: ['an apt remark', 'apt to', 'it is apt that'],
    examples: [
      { text: 'That is an apt way to put it.', register: 'spoken' },
      { text: 'It was an apt comparison, and it ended the debate.', register: 'written' }
    ],
    cousins: [{ term: 'appropriate', note: 'Appropriate means it does not offend. Apt means it is the right fit.' }]
  },
  {
    id: 'deft',
    term: 'deft',
    kind: 'word',
    pos: 'adj',
    definition: 'Handled with light, sure skill and no fuss.',
    replaces: 'good at, when you mean neatly handled',
    patterns: ['a deft touch', 'deftly avoided', 'a deft reply'],
    examples: [
      { text: 'That was a deft way out of an awkward question.', register: 'spoken' },
      { text: 'She made a deft edit that saved the paragraph.', register: 'written' }
    ]
  },
  {
    id: 'provisional',
    term: 'provisional',
    kind: 'word',
    pos: 'adj',
    definition: 'Temporary on purpose, because you are not finished deciding.',
    replaces: 'maybe temporary / for now, I guess',
    patterns: ['a provisional plan', 'provisionally', 'a provisional answer'],
    examples: [
      { text: 'Treat this as provisional until Friday.', register: 'spoken' },
      { text: 'The conclusion is provisional, pending the last interviews.', register: 'written' }
    ],
    cousins: [{ term: 'temporary', note: 'Temporary just means it will end. Provisional means we are still deciding.' }]
  },
  {
    id: 'hedge',
    term: 'hedge',
    kind: 'word',
    pos: 'verb',
    definition: 'Soften what you say so you can back away from it later.',
    replaces: 'kind of / sort of, as a nervous habit',
    patterns: ['hedge your bets', 'hedge a claim', 'without hedging'],
    examples: [
      { text: 'Stop hedging — do you want to do it or not?', register: 'spoken' },
      { text: 'He hedged every claim until the piece had no spine.', register: 'written' }
    ]
  },
  {
    id: 'qualify',
    term: 'qualify',
    kind: 'word',
    pos: 'verb',
    definition: 'Add a limit so the claim is exact, not smaller out of fear.',
    replaces: 'walking a statement back vaguely',
    patterns: ['qualify that', 'a qualified yes', 'qualify a claim'],
    examples: [
      { text: 'I would qualify that: it works, but only in writing.', register: 'spoken' },
      { text: 'She qualified the praise so it would not be mistaken for a blank check.', register: 'written' }
    ],
    cousins: [{ term: 'hedge', note: 'Hedging protects you. Qualifying makes the claim truer.' }]
  },
  {
    id: 'undercut',
    term: 'undercut',
    kind: 'word',
    pos: 'verb',
    definition: 'Weaken something from underneath — an argument, a mood, even your own point.',
    replaces: 'make weaker / kind of ruin',
    patterns: ['undercut the point', 'undercut yourself', 'undercut the argument'],
    examples: [
      { text: 'The joke undercut the whole speech.', register: 'spoken' },
      { text: 'A single sloppy citation undercut an otherwise careful piece.', register: 'written' }
    ]
  },
  {
    id: 'parse',
    term: 'parse',
    kind: 'word',
    pos: 'verb',
    definition: 'Work through a sentence or situation carefully until you understand how the pieces fit.',
    replaces: 'figure out / break down, when you mean read closely',
    patterns: ['parse that', 'hard to parse', 'parse a sentence'],
    examples: [
      { text: 'Give me a second to parse what you just said.', register: 'spoken' },
      { text: 'The memo was so hedged it was hard to parse.', register: 'written' }
    ]
  },
  {
    id: 'account-for',
    term: 'account for',
    kind: 'idiom',
    definition: 'Explain why something is the way it is. Also: make up that share of a total.',
    replaces: 'explain / is the reason for',
    patterns: ['account for the difference', 'that accounts for', 'must account for'],
    examples: [
      { text: 'That accounts for the delay, then.', register: 'spoken' },
      { text: 'The missing pages account for the jump in tone.', register: 'written' }
    ]
  },
  {
    id: 'bear-on',
    term: 'bear on',
    kind: 'idiom',
    definition: 'Actually matter to the decision in front of you, not just sit nearby.',
    replaces: 'is related to / has to do with',
    patterns: ['bear on the question', 'does not bear on', 'what bears on this'],
    examples: [
      { text: 'I am not sure that bears on what we are deciding.', register: 'spoken' },
      { text: 'Only two of the letters bear on the timeline.', register: 'written' }
    ],
    cousins: [{ term: 'speak to', note: 'Speak to is a bit looser. Bear on says it actually presses on the decision.' }]
  },
  {
    id: 'speak-to',
    term: 'speak to',
    kind: 'idiom',
    definition: 'Address a particular point, without claiming to settle everything else.',
    replaces: 'talks about / is about',
    patterns: ['speak to the concern', 'does not speak to', 'this speaks to'],
    examples: [
      { text: 'That speaks to the part I was worried about.', register: 'spoken' },
      { text: 'The second chapter speaks to the charge of carelessness.', register: 'written' }
    ]
  },
  {
    id: 'hold-water',
    term: 'hold water',
    kind: 'idiom',
    definition: 'Hold up when you test it. A claim that holds water does not fall apart.',
    replaces: 'makes sense / is valid, vaguely',
    patterns: ['does not hold water', 'if the argument holds water'],
    examples: [
      { text: 'That explanation does not hold water.', register: 'spoken' },
      { text: 'The alibi held water until the timestamps came in.', register: 'written' }
    ]
  },
  {
    id: 'cut-both-ways',
    term: 'cut both ways',
    kind: 'idiom',
    definition: 'Helps one side and hurts it at the same time. The same point has two edges.',
    replaces: 'could go either way, when you mean it cuts both sides',
    patterns: ['that cuts both ways', 'a point that cuts both ways'],
    examples: [
      { text: 'Careful — that argument cuts both ways.', register: 'spoken' },
      { text: 'The same intimacy that won readers also cut both ways in the reviews.', register: 'written' }
    ]
  },
  {
    id: 'wear-thin',
    term: 'wear thin',
    kind: 'idiom',
    definition: 'Start to fail because it has been used too much — patience, an excuse, a joke.',
    replaces: 'getting old / I am tired of this',
    patterns: ['patience is wearing thin', 'the excuse wore thin', 'wearing thin'],
    examples: [
      { text: 'My patience is wearing thin.', register: 'spoken' },
      { text: 'The charm of the bit wore thin two chapters in.', register: 'written' }
    ]
  },
  {
    id: 'a-far-cry-from',
    term: 'a far cry from',
    kind: 'idiom',
    definition: 'Very different from, and not a little different — a real distance.',
    replaces: 'very different from',
    patterns: ['a far cry from X'],
    examples: [
      { text: 'This is a far cry from what we agreed.', register: 'spoken' },
      { text: 'The final cut was a far cry from the draft that won them over.', register: 'written' }
    ]
  },
  {
    id: 'by-the-same-token',
    term: 'by the same token',
    kind: 'idiom',
    definition: 'Using that same logic, now applied to the other side of the point.',
    replaces: 'also / and another thing, when you mean the same rule applies',
    patterns: ['by the same token, …'],
    examples: [
      { text: 'I do not want to rush it. By the same token, we cannot sit on it.', register: 'spoken' },
      { text: 'The book refuses easy villains. By the same token, it refuses easy heroes.', register: 'written' }
    ]
  },
  {
    id: 'to-say-nothing-of',
    term: 'to say nothing of',
    kind: 'idiom',
    definition: 'And that is before we even mention this larger, heavier thing.',
    replaces: 'and also / plus, when the extra thing is heavier',
    patterns: ['X, to say nothing of Y'],
    examples: [
      { text: 'We have no time, to say nothing of the budget.', register: 'spoken' },
      { text: 'The delay hurt the launch, to say nothing of the trust it spent.', register: 'written' }
    ]
  },
  {
    id: 'the-long-and-short-of-it',
    term: 'the long and short of it',
    kind: 'idiom',
    definition: 'The whole story boiled down to what you actually need to know.',
    replaces: 'basically / so yeah, when you mean the distilled version',
    patterns: ['the long and short of it is'],
    examples: [
      { text: 'The long and short of it is we missed the window.', register: 'spoken' },
      { text: 'The long and short of it was that no one had signed.', register: 'written' }
    ]
  },
  {
    id: 'on-the-merits',
    term: 'on the merits',
    kind: 'idiom',
    definition: 'Judged by the actual case, not by who said it or how popular it is.',
    replaces: 'fairly / based on the facts, loosely',
    patterns: ['argue it on the merits', 'lose on the merits', 'a case on the merits'],
    examples: [
      { text: 'I do not care who wrote it. Argue it on the merits.', register: 'spoken' },
      { text: 'The proposal failed on the merits, not on politics.', register: 'written' }
    ]
  },
  {
    id: 'a-live-question',
    term: 'a live question',
    kind: 'idiom',
    definition: 'Still unanswered. Not settled, and not asked just for show.',
    replaces: 'we still do not know / it is unclear',
    patterns: ['remains a live question', 'a live question is whether'],
    examples: [
      { text: 'Whether we ship this week is still a live question.', register: 'spoken' },
      { text: 'Authorship remains a live question.', register: 'written' }
    ]
  },
  {
    id: 'take-as-read',
    term: 'take as read',
    kind: 'idiom',
    definition: 'Treat it as already known, so you do not have to spell it out.',
    replaces: 'obviously / we all know, as filler',
    patterns: ['take X as read', 'taken as read'],
    examples: [
      { text: 'Take it as read that I want this to work.', register: 'spoken' },
      { text: 'The delays can be taken as read; the question is what we do next.', register: 'written' }
    ]
  },
  {
    id: 'cut-to-the-chase',
    term: 'cut to the chase',
    kind: 'idiom',
    definition: 'Skip the warm-up and say the part that matters.',
    replaces: 'anyway / so basically, when you are stalling',
    patterns: ['cut to the chase', 'to cut to the chase'],
    examples: [
      { text: 'I will cut to the chase: I cannot do Thursday.', register: 'spoken' },
      { text: 'The letter cut to the chase in the second sentence.', register: 'written' }
    ]
  },
  {
    id: 'at-face-value',
    term: 'at face value',
    kind: 'idiom',
    definition: 'As it first appears, without looking for a hidden meaning.',
    replaces: 'just believing it / taking it as is',
    patterns: ['take X at face value', 'cannot take it at face value'],
    examples: [
      { text: 'I would not take that promise at face value.', register: 'spoken' },
      { text: 'Taken at face value, the numbers look fine.', register: 'written' }
    ]
  },
  {
    id: 'in-so-many-words',
    term: 'in so many words',
    kind: 'idiom',
    definition: 'Said in those exact words — or, with "not," pointedly not said that plainly.',
    replaces: 'basically said / kind of said',
    patterns: ['said so in so many words', 'not in so many words'],
    examples: [
      { text: 'He did not say it in so many words, but the answer was no.', register: 'spoken' },
      { text: 'She declined, in so many words, to defend the draft.', register: 'written' }
    ]
  },
  {
    id: 'paper-over',
    term: 'paper over',
    kind: 'idiom',
    definition: 'Cover a problem so it looks fine. The problem is still there.',
    replaces: 'smooth over / pretend it is fine',
    patterns: ['paper over the cracks', 'paper over a disagreement'],
    examples: [
      { text: 'We cannot just paper over this.', register: 'spoken' },
      { text: 'The joint statement papered over a real split.', register: 'written' }
    ]
  },
  {
    id: 'on-balance',
    term: 'on balance',
    kind: 'idiom',
    definition: 'After weighing both sides, this is the side you come down on.',
    replaces: 'overall / I guess, when you actually weighed it',
    patterns: ['on balance, …', 'on balance I think'],
    examples: [
      { text: 'On balance, I would wait a week.', register: 'spoken' },
      { text: 'On balance, the revision is stronger, even if it is colder.', register: 'written' }
    ]
  },
  {
    id: 'that-said',
    term: 'that said',
    kind: 'idiom',
    definition: 'You accept the last point, then you add the catch.',
    replaces: 'but yeah / however, as a shrug',
    patterns: ['That said, …'],
    examples: [
      { text: 'I like the idea. That said, I would not ship it like this.', register: 'spoken' },
      { text: 'The case is attractive. That said, the evidence is thin.', register: 'written' }
    ],
    cousins: [{ term: 'but', note: 'But just reverses. That said keeps the first point standing.' }]
  },
  {
    id: 'to-that-end',
    term: 'to that end',
    kind: 'idiom',
    definition: 'For that purpose. The next step exists because of the aim you just named.',
    replaces: 'so / that is why, when you mean a deliberate step',
    patterns: ['To that end, …'],
    examples: [
      { text: 'I want this tighter. To that end, I cut the first page.', register: 'spoken' },
      { text: 'The committee wanted a public record. To that end, it published the minutes.', register: 'written' }
    ]
  },
  {
    id: 'insofar-as',
    term: 'insofar as',
    kind: 'idiom',
    definition: 'Only to this extent. You are limiting the claim as you make it.',
    replaces: 'like, when you mean only in this respect',
    patterns: ['insofar as X', 'only insofar as'],
    examples: [
      { text: 'I agree, insofar as the timeline is concerned.', register: 'spoken' },
      { text: 'The analogy holds only insofar as both sides were unprepared.', register: 'written' }
    ]
  },
  {
    id: 'if-anything',
    term: 'if anything',
    kind: 'idiom',
    definition: 'If you had to lean one way, it would be this way — often the opposite of what someone expected.',
    replaces: 'actually / if I had to say',
    patterns: ['if anything, …', 'if anything it is'],
    examples: [
      { text: 'I am not less sure. If anything, I am more sure.', register: 'spoken' },
      { text: 'The cut did not weaken the piece. If anything, it sharpened it.', register: 'written' }
    ]
  },
  {
    id: 'all-but',
    term: 'all but',
    kind: 'idiom',
    definition: 'So close that it might as well be true. Stronger than a casual "almost".',
    replaces: 'almost / pretty much',
    patterns: ['all but certain', 'all but said', 'all but finished'],
    examples: [
      { text: 'It is all but done. We are waiting on one signature.', register: 'spoken' },
      { text: 'He all but admitted the first draft was a stall.', register: 'written' }
    ]
  },
  {
    id: 'as-it-were',
    term: 'as it were',
    kind: 'idiom',
    definition: 'A small signal that you know the image is a stretch, and you are using it anyway.',
    replaces: 'kind of / in a way, when you are stretching a figure',
    patterns: ['X, as it were'],
    examples: [
      { text: 'He is the translator, as it were, between the two teams.', register: 'spoken' },
      { text: 'The preface is a handshake, as it were, before the argument begins.', register: 'written' }
    ]
  },
  {
    id: 'for-good-measure',
    term: 'for good measure',
    kind: 'idiom',
    definition: 'An extra bit added on top of what was already enough.',
    replaces: 'also / and then, when the extra is a flourish',
    patterns: ['and X, for good measure'],
    examples: [
      { text: 'She corrected the date and, for good measure, the tone.', register: 'spoken' },
      { text: 'He cut the scene and, for good measure, the speech that followed it.', register: 'written' }
    ]
  },
  {
    id: 'in-the-same-breath',
    term: 'in the same breath',
    kind: 'idiom',
    definition: 'Said together, especially when the two things sit oddly side by side.',
    replaces: 'and then also said, when the pairing is the point',
    patterns: ['in the same breath', 'praise and blame in the same breath'],
    examples: [
      { text: 'You cannot praise it and bury it in the same breath.', register: 'spoken' },
      { text: 'The review called the book essential and, in the same breath, unfinished.', register: 'written' }
    ]
  },
  {
    id: 'put-too-fine-a-point',
    term: 'put too fine a point on it',
    kind: 'idiom',
    definition: 'Say it more sharply than politeness wants — usually as you are about to do that.',
    replaces: 'to be honest / no offense, as throat-clearing',
    patterns: ['not to put too fine a point on it'],
    examples: [
      { text: 'Not to put too fine a point on it, this is late.', register: 'spoken' },
      { text: 'Not to put too fine a point on it, the citation was ornamental.', register: 'written' }
    ]
  },
  {
    id: 'leave-well-enough-alone',
    term: 'leave well enough alone',
    kind: 'idiom',
    definition: 'Stop touching it. More fuss will make it worse.',
    replaces: 'just leave it / do not overthink it',
    patterns: ['leave well enough alone'],
    examples: [
      { text: 'The ending works. Leave well enough alone.', register: 'spoken' },
      { text: 'He could not leave well enough alone, and the last pass dulled the piece.', register: 'written' }
    ]
  },
  {
    id: 'split-the-difference',
    term: 'split the difference',
    kind: 'idiom',
    definition: 'Meet in the middle. That is a compromise, not a real solution.',
    replaces: 'meet halfway / we both give a bit',
    patterns: ['split the difference'],
    examples: [
      { text: 'Fine. Let us split the difference and say Wednesday.', register: 'spoken' },
      { text: 'They split the difference and pleased neither side.', register: 'written' }
    ]
  },
  {
    id: 'benefit-of-the-doubt',
    term: 'the benefit of the doubt',
    kind: 'idiom',
    definition: 'Choose the kinder reading when you do not yet have proof.',
    replaces: 'give them a chance / assume the best, loosely',
    patterns: ['give X the benefit of the doubt', 'the benefit of the doubt'],
    examples: [
      { text: 'I will give him the benefit of the doubt this once.', register: 'spoken' },
      { text: 'The editor gave the draft the benefit of the doubt, then asked for proof.', register: 'written' }
    ]
  },
  {
    id: 'grain-of-salt',
    term: 'take with a grain of salt',
    kind: 'idiom',
    definition: 'Do not believe it all the way. Hear it, but do not swallow it whole.',
    replaces: 'do not totally believe / be careful with that',
    patterns: ['take X with a grain of salt'],
    examples: [
      { text: 'Take the official numbers with a grain of salt.', register: 'spoken' },
      { text: 'Memoir is to be taken with a grain of salt, especially the dialogue.', register: 'written' }
    ]
  },
  {
    id: 'more-heat-than-light',
    term: 'more heat than light',
    kind: 'saying',
    definition: 'A lot of feeling and argument, not much actual clarity.',
    replaces: 'people are just arguing / it got too emotional',
    patterns: ['generate more heat than light', 'more heat than light'],
    examples: [
      { text: 'That meeting was more heat than light.', register: 'spoken' },
      { text: 'The exchange produced more heat than light, and the question stayed open.', register: 'written' }
    ]
  },
  {
    id: 'distinction-without-a-difference',
    term: 'a distinction without a difference',
    kind: 'saying',
    definition: 'Two different labels for the same thing. The split is only in the wording.',
    replaces: 'that is the same thing / you are just wording it differently',
    patterns: ['a distinction without a difference'],
    examples: [
      { text: 'Late and delayed is a distinction without a difference.', register: 'spoken' },
      { text: 'Calling it a pause rather than a cut was a distinction without a difference.', register: 'written' }
    ]
  },
  {
    id: 'forest-for-the-trees',
    term: 'miss the forest for the trees',
    kind: 'saying',
    definition: 'Get lost in the small pieces and lose the shape of the whole.',
    replaces: 'overthinking the details / missing the big picture',
    patterns: ['miss the forest for the trees', 'cannot see the forest for the trees'],
    examples: [
      { text: 'We are missing the forest for the trees here.', register: 'spoken' },
      { text: 'Line edits made the prose prettier and missed the forest for the trees.', register: 'written' }
    ]
  },
  {
    id: 'exception-that-proves',
    term: 'the exception that proves the rule',
    kind: 'saying',
    definition: 'A rare case that makes the usual pattern clearer — not a free pass to ignore the pattern.',
    replaces: 'well, except for that, said carelessly',
    patterns: ['the exception that proves the rule'],
    examples: [
      { text: 'He is the exception that proves the rule — and that is why we noticed.', register: 'spoken' },
      { text: 'The one calm chapter is the exception that proves the rule of the book\'s restlessness.', register: 'written' }
    ],
    cousins: [{ term: 'exception', note: 'An exception just sits outside. This phrase is only worth using when the rarity itself teaches the pattern.' }]
  },
  {
    id: 'throw-baby-bathwater',
    term: 'throw the baby out with the bathwater',
    kind: 'saying',
    definition: 'In cleaning up the mess, you throw away the part that was worth keeping.',
    replaces: 'overcorrecting / going too far',
    patterns: ['throw the baby out with the bathwater'],
    examples: [
      { text: 'Do not throw the baby out with the bathwater. Keep the opening.', register: 'spoken' },
      { text: 'The rewrite threw the baby out with the bathwater and lost the voice.', register: 'written' }
    ]
  },
  {
    id: 'cannot-have-it-both-ways',
    term: 'you cannot have it both ways',
    kind: 'saying',
    definition: 'Those two claims cannot both be true. You have to pick one.',
    replaces: 'that does not make sense together',
    patterns: ['you cannot have it both ways', 'cannot have it both ways'],
    examples: [
      { text: 'You cannot have it both ways. Either it is a draft or it is done.', register: 'spoken' },
      { text: 'The essay wants credit for daring and for caution. It cannot have it both ways.', register: 'written' }
    ]
  },
  {
    id: 'devil-in-the-details',
    term: 'the devil is in the details',
    kind: 'saying',
    definition: 'The idea may be fine. The trouble is in the small parts that have to work.',
    replaces: 'the small stuff matters / it is complicated',
    patterns: ['the devil is in the details'],
    examples: [
      { text: 'I like the plan. The devil is in the details.', register: 'spoken' },
      { text: 'The argument was clean on the page; the devil was in the details of the data.', register: 'written' }
    ]
  },
  {
    id: 'other-side-of-the-coin',
    term: 'the other side of the coin',
    kind: 'saying',
    definition: 'The paired opposite of the point you just made. Same coin, other face.',
    replaces: 'on the other hand, when the two sides are one object',
    patterns: ['the other side of the coin'],
    examples: [
      { text: 'The other side of the coin is we will owe them a favor.', register: 'spoken' },
      { text: 'Clarity is a virtue. The other side of the coin is that it leaves nowhere to hide.', register: 'written' }
    ]
  },
  {
    id: 'name-the-quality',
    term: 'Name the quality',
    kind: 'move',
    definition: 'Drop "very." Say the exact quality you meant that "very" to fake.',
    replaces: 'very + a vague adjective',
    patterns: ['exhausted, not very tired', 'minute, not very small', 'furious, not very angry'],
    examples: [
      { text: 'I am not very tired. I am spent.', register: 'spoken' },
      { text: 'The difference was not very small. It was minute, and it changed the tone.', register: 'written' }
    ],
    cousins: [{ term: 'really / so / super', note: 'The same habit in other clothes. Name the quality anyway.' }]
  },
  {
    id: 'not-x-so-much-as-y',
    term: 'Not X so much as Y',
    kind: 'move',
    definition: 'Correct the first label as you go. The second word is the true one.',
    replaces: 'it is more like… / I mean…',
    patterns: ['not X so much as Y', 'less X than Y'],
    examples: [
      { text: 'I was not angry so much as tired of explaining it.', register: 'spoken' },
      { text: 'The ending is not sad so much as emptied out.', register: 'written' }
    ]
  },
  {
    id: 'tuck-a-description',
    term: 'Tuck a description beside the noun',
    kind: 'move',
    definition: 'Put a short extra naming right next to the person or thing, instead of starting a new sentence.',
    replaces: 'He is a teacher. He… / which is a…',
    patterns: ['X, a Y, …', 'X — a Y — …'],
    examples: [
      { text: 'Maya, our editor, already caught it.', register: 'spoken' },
      { text: 'The letter, a single page, did more than the report.', register: 'written' }
    ]
  },
  {
    id: 'name-what-it-does',
    term: 'Name what it does to you',
    kind: 'move',
    definition: 'Do not call something "interesting." Say what it does to you: it unsettles you, it clarifies, it sticks.',
    replaces: 'interesting / cool / nice',
    patterns: ['it unsettles me', 'it clarifies X', 'it sticks because'],
    examples: [
      { text: 'I would not call it interesting. It got under my skin.', register: 'spoken' },
      { text: 'The scene is not merely interesting; it quietly rearranges your sympathies.', register: 'written' }
    ]
  },
  {
    id: 'name-the-virtue',
    term: 'Name the virtue',
    kind: 'move',
    definition: '"Nice" and "good" are shrugs. Say whether you mean kind, precise, generous, or clean.',
    replaces: 'nice / good, as a blanket word',
    patterns: ['kind, not nice', 'precise, not good', 'generous, not nice'],
    examples: [
      { text: 'That note was not just nice. It was generous.', register: 'spoken' },
      { text: 'The prose is not good in the vague sense; it is exact.', register: 'written' }
    ]
  },
  {
    id: 'count-or-characterize',
    term: 'Count it or characterize it',
    kind: 'move',
    definition: '"A lot of" tells nobody anything. Give a number, or say what kind of pile it is.',
    replaces: 'a lot of / many / tons of',
    patterns: ['three unanswered notes', 'a stack of', 'a thin file of'],
    examples: [
      { text: 'I do not have a lot of notes. I have four, and they all say the same thing.', register: 'spoken' },
      { text: 'He did not receive a lot of criticism. He received a narrow, repeated charge.', register: 'written' }
    ]
  },
  {
    id: 'pick-the-verb',
    term: 'Pick the verb that happened',
    kind: 'move',
    definition: '"Get" is a blank. Say what actually happened: they arrived, became, received, fetched.',
    replaces: 'get / got, as the default verb',
    patterns: ['became', 'received', 'reached', 'fetched'],
    examples: [
      { text: 'I did not get home late. I reached home after the lights were out.', register: 'spoken' },
      { text: 'She did not get the job so much as she won it, line by line, in the last interview.', register: 'written' }
    ]
  },
  {
    id: 'name-the-thing',
    term: 'Name the thing',
    kind: 'move',
    definition: '"Thing" and "stuff" are empty. Put the real noun in the sentence.',
    replaces: 'thing / stuff / it, when the noun is hiding',
    patterns: ['the charge', 'the delay', 'the opening paragraph'],
    examples: [
      { text: 'What is the thing you are stuck on? The third paragraph.', register: 'spoken' },
      { text: 'He kept calling it the situation. It was a broken promise.', register: 'written' }
    ]
  },
  {
    id: 'put-judgment-in-the-verb',
    term: 'Put the judgment in the verb',
    kind: 'move',
    definition: 'Do not report that someone "said no." Use a verb that already judges: she refused, dismissed, conceded.',
    replaces: 'said / was like, plus a limp complement',
    patterns: ['she dismissed', 'he conceded', 'they declined'],
    examples: [
      { text: 'She did not say no. She dismissed it.', register: 'spoken' },
      { text: 'He did not say the draft was weak. He conceded the structure had failed.', register: 'written' }
    ]
  },
  {
    id: 'end-on-the-weight',
    term: 'End on the weight',
    kind: 'move',
    definition: 'Put the sharp word at the end of the sentence, so the ear hits it last.',
    replaces: 'front-loading the point, then trailing off',
    patterns: ['…, and then the weight.', 'Not X. Y.'],
    examples: [
      { text: 'I read it twice. Then I sat with how cold it was.', register: 'spoken' },
      { text: 'The chapter is funny, fluent, and, in the last line, cruel.', register: 'written' }
    ]
  },
  {
    id: 'idle',
    term: 'idle',
    kind: 'word',
    pos: 'adj',
    definition: 'Not doing any real work. Idle talk is empty chatter; an idle threat is one nobody will carry out.',
    replaces: 'random / pointless, when you mean it is not doing a job',
    patterns: ['idle talk', 'an idle threat', 'idle hours'],
    examples: [
      { text: 'That was idle talk. Nobody is quitting.', register: 'spoken' },
      { text: 'The rumor was idle, but it still did damage.', register: 'written' }
    ]
  },
  {
    id: 'thin',
    term: 'thin',
    kind: 'word',
    pos: 'adj',
    definition: 'Weak because there is not enough underneath. A thin excuse or argument has no real body.',
    replaces: 'not very good / kind of weak',
    patterns: ['a thin argument', 'the evidence is thin', 'wearing thin'],
    examples: [
      { text: 'That excuse is thin.', register: 'spoken' },
      { text: 'The second half is stylish and thin.', register: 'written' }
    ]
  },
  {
    id: 'weary',
    term: 'weary',
    kind: 'word',
    pos: 'adj',
    definition: 'Tired in a deeper, longer way, usually of a person, a job, or a repeated conversation.',
    replaces: 'very tired / sick of',
    patterns: ['weary of', 'a weary voice', 'wearily'],
    examples: [
      { text: 'I am weary of having this conversation.', register: 'spoken' },
      { text: 'The narrator grows weary of her own charm.', register: 'written' }
    ],
    cousins: [{ term: 'tired', note: 'Tired can be sleep. Weary is often of something, and it has lasted.' }]
  },
  {
    id: 'minute',
    term: 'minute',
    kind: 'word',
    pos: 'adj',
    definition: 'Extremely small, and you are looking closely. Say it my-NEWT, not like a clock minute.',
    replaces: 'very small / tiny, when the smallness is the point',
    patterns: ['a minute difference', 'in minute detail', 'minute changes'],
    examples: [
      { text: 'It is a minute change, but you can hear it.', register: 'spoken' },
      { text: 'The two drafts differ in minute ways that alter the blame.', register: 'written' }
    ]
  },
  {
    id: 'markedly',
    term: 'markedly',
    kind: 'word',
    pos: 'adv',
    definition: 'By a clear, noticeable amount. Use it when the difference is obvious, not as a fancy "very".',
    replaces: 'very / a lot, when you mean noticeably',
    patterns: ['markedly different', 'markedly better', 'a marked change'],
    examples: [
      { text: 'This draft is markedly better.', register: 'spoken' },
      { text: 'Her tone was markedly cooler in the second letter.', register: 'written' }
    ]
  },
  {
    id: 'in-the-main',
    term: 'in the main',
    kind: 'idiom',
    definition: 'For the most part. A calmer way to say "mostly".',
    replaces: 'mostly / pretty much',
    patterns: ['in the main'],
    examples: [
      { text: 'In the main, I agree. I would change the ending.', register: 'spoken' },
      { text: 'In the main, the book keeps its nerve.', register: 'written' }
    ]
  },
  {
    id: 'none-the-worse',
    term: 'none the worse',
    kind: 'idiom',
    definition: 'Not harmed by what happened. It took a hit and is still fine.',
    replaces: 'it is fine / no big deal, when you mean it took a hit and held',
    patterns: ['none the worse for', 'none the worse'],
    examples: [
      { text: 'The piece is none the worse for the cut.', register: 'spoken' },
      { text: 'He came out of the exchange none the worse, and a little clearer.', register: 'written' }
    ]
  }
];

export function getEntry(term: string): Entry | undefined {
  return entries.find(e => e.term === term);
}

export function getDailySelection(
  isoDate: string,
  allEntries: Entry[],
  excluded: Set<string> = new Set()
): Entry[] {
  const pool = allEntries.filter(e => !excluded.has(e.term));
  if (pool.length === 0) return [];
  const seed = hashString(isoDate);
  const shuffled = [...pool].sort((a, b) => hashString(a.term + seed) - hashString(b.term + seed));
  return shuffled.slice(0, 1);
}

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}
