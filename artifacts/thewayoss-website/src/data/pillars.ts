export interface PillarDomainExample {
  domain: "martial-arts" | "contemplative" | "creative" | "entrepreneurial" | "healing" | "technical";
  example: string;
}

export interface Pillar {
  slug: string;
  character: string;
  name: string;
  meaning: string;
  order: number;
  sourceNote: string;
  opening: string;
  domainExamples: PillarDomainExample[];
  closing: string;
  pullQuote: string;
}

export const pillars: Pillar[] = [
  {
    slug: "ma",
    character: "間",
    name: "MA",
    meaning: "The interval that holds the rest in place.",
    order: 1,
    sourceNote: "The character 間 — composed of a gate (門) with the sun (日) shining through — names the active emptiness between two things. In Japanese music, MA is the silence between two notes that makes them music. In Japanese architecture, MA is the space between two pillars that makes the building a building. In any practice, MA is what is doing the work that the work is not doing.",
    opening: "Most practitioners are taught to fill the space. The advanced practitioner learns to keep it open. MA is not the absence of motion — it is the structural emptiness that gives motion its meaning. Every craft eventually arrives at the same lesson: the work between the work is the work.",
    domainExamples: [
      { domain: "martial-arts", example: "The half-second after the feint, before the strike — the interval that creates the opening." },
      { domain: "contemplative", example: "The breath between two thoughts, where the next thought is decided." },
      { domain: "creative", example: "The white space on the page that lets the line carry weight." },
      { domain: "entrepreneurial", example: "The silence after the question, before the team fills it with the wrong answer." },
      { domain: "healing", example: "The pause between the diagnosis and the protocol, when the practitioner sees the whole patient." },
      { domain: "technical", example: "The diagnostic step before the fix, where the bug actually gets understood." },
    ],
    closing: "MA cannot be added later. It is built into the practice from the beginning, or it is not there at all. The practitioner who learns to honor the interval is the practitioner whose work begins to hold its shape under pressure.",
    pullQuote: "The work between the work is the work.",
  },
  {
    slug: "kanso",
    character: "簡素",
    name: "KANSO",
    meaning: "Simplicity earned by what you take away.",
    order: 2,
    sourceNote: "The two characters of 簡素 carry the meanings of 'brief' and 'plain.' Together they name a simplicity that is achieved through deliberate removal — not the simplicity of having nothing, but the simplicity of having refused everything that did not belong. KANSO is what remains after the practitioner has done the harder work of subtraction.",
    opening: "Adding is easy. Adding is rewarded. Adding is what most practitioners are praised for in their first ten years. KANSO is the discipline of the next ten — learning what to refuse, what to remove, what to leave out. The mature practice is defined more by what it does not contain than by what it does.",
    domainExamples: [
      { domain: "martial-arts", example: "The kata stripped to the seven movements that actually decide the fight." },
      { domain: "contemplative", example: "The practice that keeps only the breath, after the apps and journals and incense are set aside." },
      { domain: "creative", example: "The painting finished by the brushstroke that was not made." },
      { domain: "entrepreneurial", example: "The product roadmap shortened by the features that would have diluted the one feature that matters." },
      { domain: "healing", example: "The treatment plan refined to the three interventions that actually move the patient." },
      { domain: "technical", example: "The codebase made coherent by the deletion of the modules nobody quite remembered why they wrote." },
    ],
    closing: "KANSO costs something. Every refusal is a small loss — the feature that would have impressed someone, the technique that would have looked good, the addition that would have made the practitioner feel productive. The cost of the refusals is what makes the remaining work weigh what it weighs.",
    pullQuote: "What you refuse is what gives the rest its weight.",
  },
  {
    slug: "shizen",
    character: "自然",
    name: "SHIZEN",
    meaning: "Naturalness — what arrives without strain.",
    order: 3,
    sourceNote: "The two characters of 自然 mean 'self' and 'so' — literally, 'so of itself.' SHIZEN names the quality of something that has arrived at its form without visible struggle. The Japanese garden that looks wild is, in fact, the result of every stone having been placed. The art of SHIZEN is making the deliberate look inevitable.",
    opening: "The practitioner who has not yet earned SHIZEN is visible at every stage of the work — you can see the effort, the calculation, the tension behind the move. The practitioner who has earned SHIZEN seems to do the work easily. The ease is not natural. The ease is the result of the years that came before.",
    domainExamples: [
      { domain: "martial-arts", example: "The technique that no longer looks like a technique — only a movement that arrived where it needed to." },
      { domain: "contemplative", example: "The teacher whose presence calms the room without effort, because the work was done in private." },
      { domain: "creative", example: "The line of poetry that reads as if it could not have been any other way." },
      { domain: "entrepreneurial", example: "The leader's calm decision in the moment of crisis — possible only because the harder thinking was finished beforehand." },
      { domain: "healing", example: "The hands that find the muscle without the patient explaining where it hurts." },
      { domain: "technical", example: "The architecture that solved a hard problem and now looks obvious to the next engineer who reads it." },
    ],
    closing: "SHIZEN cannot be performed. The attempt to look natural is the most visible form of strain. The practitioner who reaches SHIZEN does so by working long enough that the work moves below the surface — and what surfaces is whatever was true underneath.",
    pullQuote: "The ease is the result of the years that came before.",
  },
  {
    slug: "shibui",
    character: "渋味",
    name: "SHIBUI",
    meaning: "Beauty that rewards return.",
    order: 4,
    sourceNote: "The character 渋 means astringent — the puckering taste of unripe persimmon. The aesthetic meaning of SHIBUI extends from this to name a beauty that does not announce itself, a beauty that becomes more interesting the longer the practitioner spends with it. In Japan, SHIBUI is the highest praise an object can receive — it means this is something you can live with for fifty years.",
    opening: "Most things are designed to please at first encounter. SHIBUI is designed to deepen at the hundredth. The practitioner who values SHIBUI is suspicious of work that is impressive immediately and stops being impressive soon after. The work that matters is the work the practitioner can return to, year after year, and find still has something to give.",
    domainExamples: [
      { domain: "martial-arts", example: "The basic stance that bores the beginner and absorbs the master for forty years." },
      { domain: "contemplative", example: "The single sutra returned to in the eighth decade and still found unfinished." },
      { domain: "creative", example: "The bowl that looked plain on the shelf and became indispensable in the kitchen." },
      { domain: "entrepreneurial", example: "The business that no one celebrates this quarter and is still standing in twenty years." },
      { domain: "healing", example: "The protocol that does not look revolutionary and quietly outlives every revolution." },
      { domain: "technical", example: "The function written so simply that ten years of changing requirements never required it to change." },
    ],
    closing: "SHIBUI is the discipline of building things that age into their value rather than out of it. The practitioner who chooses SHIBUI is choosing the long arc — work that may be quiet at launch and indispensable at maturity. This is the harder choice. It is also the only choice the practitioner can make if the practice is meant to last.",
    pullQuote: "The work that matters is the work you can return to.",
  },
  {
    slug: "makoto",
    character: "誠",
    name: "MAKOTO",
    meaning: "Sincerity — the deed and the word as one thing.",
    order: 5,
    sourceNote: "The character 誠 combines the radical for speech (言) with the character for completion (成). Together they name a sincerity that is not a feeling but a structure — the alignment of what is said, what is meant, and what is done. In the samurai ethical tradition, MAKOTO is the central virtue. Without MAKOTO, the other virtues are decoration.",
    opening: "MAKOTO is the pillar that grounds the other four. A practice can have MA, KANSO, SHIZEN, and SHIBUI and still be hollow if the practitioner's word and deed do not match. MAKOTO is the discipline of saying only what you can do, and doing what you said. It is the slowest virtue to develop and the first one a discerning observer notices is missing.",
    domainExamples: [
      { domain: "martial-arts", example: "The instructor who promises a student progress and structures every class to deliver it." },
      { domain: "contemplative", example: "The teacher who says he meditates every morning and does." },
      { domain: "creative", example: "The artist whose finished work matches the work they claimed they were making." },
      { domain: "entrepreneurial", example: "The founder whose refund policy holds in the hardest case, not just the easy ones." },
      { domain: "healing", example: "The practitioner who tells the patient what the treatment can and cannot do, and is right." },
      { domain: "technical", example: "The engineer whose estimates over a year average within ten percent of actual." },
    ],
    closing: "MAKOTO is built and lost one decision at a time. The practitioner who values MAKOTO does not promise easily, and keeps what is promised. Over decades, this is what builds the trust that lets the practitioner lead. The community that gathers around a MAKOTO practitioner gathers because the ground beneath them does not move.",
    pullQuote: "Say only what you can do. Do what you said.",
  },
];
