export interface JournalEntry {
  slug: string;
  date: string;
  tag: string;
  version: string | null;
  title: string;
  body: string;
  quote: string;
  quotePosition: number;
  /**
   * Slug of the Pillar this entry belongs to. Used to surface the
   * entry on the corresponding Pillar detail page and to render a
   * "Pillar" tag on this entry's own page. Optional — leave undefined
   * if no pillar association applies.
   */
  pillarSlug?: string;
  /**
   * Optional curator-chosen Voice to surface alongside this entry.
   * Leave undefined to surface nothing.
   */
  relatedVoiceSlug?: string;
}

const entries: JournalEntry[] = [
  {
    slug: "the-tool-that-lied",
    date: "2026-04-21",
    tag: "field notes",
    version: null,
    title: "The tool that lied to us",
    body: `The tool had been running our shell commands for weeks without incident. Then, during a routine infrastructure pass, operations began failing in ways that had no logical cause. The output looked right. The inputs looked right. But nothing landed where it should.

The investigation took longer than the fix. We eventually traced it to the tool itself — it was silently rewriting certain commands at execution time, in a way that was invisible at the call site and nearly invisible at the failure site. It had a specific failure mode under specific conditions. Those conditions are common.

Every practitioner eventually encounters this. A gi that tears mid-roll, at the seam you never thought to check. A kiln running fifteen degrees hotter than its gauge reads, which you discover only after losing three glazed bowls. A dashboard metric that has been measuring a slightly different thing than you thought it was measuring, for an entire quarter.

The fix was not replacing the tool. It was developing a verification discipline around it — a short sequence of checks, run before any significant operation, that treated the tool as a suspect rather than a given. The tool is now trustworthy. Not because it changed. Because we stopped trusting it blindly.

The instrument you most rely on is worth the most scrutiny. Not paranoia — precision. There is a difference.`,
    quote: "The deepest discipline isn't trusting your tools — it's knowing which of your tools you cannot trust, and where.",
    quotePosition: 2,
    pillarSlug: "ma",
    relatedVoiceSlug: "cj-jiujitsu-bradenton",
  },
  {
    slug: "the-pause-between-movements",
    date: "2026-04-21",
    tag: "method notes",
    version: null,
    title: "On the pause between movements",
    body: `The refactor that preceded this build was large. Four phases, each with entry criteria and exit criteria defined before a single line was changed. Between each phase, a mandatory verification window. No exceptions, even when the work was going well — especially then.

Five problems were caught in those pauses that would not have been caught in motion. Not because the pauses created the problems. Because the problems were already there, waiting. The pause is not a break from the work. It is the part of the work where what is already true becomes visible.

Every domain has its version. The pause between sparring rounds, where the body reports honestly what the mind was too busy to notice during engagement. The space before the bowl enters the kiln, where the clay still accepts correction. The breath before you send the message you have been composing for an hour.

Untrained practitioners fill this pause with motion. There is always more to do. The next phase calls. Trained ones use the pause differently — not to rest, but to verify. To ask: what is already true that I have not yet looked at?

The MA pillar is not about stillness. It is about the pause as instrument. Most of us were never taught to use it.`,
    quote: "Most disasters happen in the moments we were too busy to pause and verify what was already true.",
    quotePosition: 2,
    pillarSlug: "ma",
    relatedVoiceSlug: "cj-jiujitsu-bradenton",
  },
  {
    slug: "what-we-chose-not-to-build",
    date: "2026-04-18",
    tag: "decision notes",
    version: null,
    title: "What we chose not to build",
    body: `Early in the planning cycle, the feature list was longer. Gamification streaks to drive retention. Push notifications to pull practitioners back. AI-suggested content feeds. A virality loop built into the community layer. Each would have shipped with minimal effort. Each had precedent. Each would have looked good in a pitch deck.

None of them shipped.

The decision rule that emerged: if a feature optimizes for the platform's metrics at the expense of the practitioner's depth, it does not ship. Not this version. Not the next one. The rule is not sentimental — it is structural. A platform that pulls practitioners toward it by manufacturing urgency will eventually be treated like every other platform that does the same.

The closest parallel is the dojo that refuses belt-mill students. The rejection costs revenue in the short term. It preserves the mat's integrity over the long term, which is the only thing that makes the mat worth stepping onto.

Every craft is defined more by refusals than by productions. The ceramicist who declines a commission because the brief is wrong for the clay. The analyst who returns a project because the question is not the right question. The writer who deletes the paragraph that was technically good but not necessary.

KANSO is not minimalism. Minimalism is an aesthetic. KANSO is a discipline of elimination — removing what does not belong so that what remains can be itself. What we chose not to build is the clearest record of who we are.`,
    quote: "What you refuse to build defines you more than what you ship.",
    quotePosition: 3,
    pillarSlug: "kanso",
    relatedVoiceSlug: "cj-jiujitsu-bradenton",
  },
  {
    slug: "the-architecture-that-stopped-arguing",
    date: "2026-04-20",
    tag: "method notes",
    version: null,
    title: "The architecture that stopped arguing with itself",
    body: `For the first eighteen months, every new feature required a meeting. Where does this belong? Which module owns it? Does it cross a boundary we said we would not cross? The answers were rarely obvious, and the disagreements were rarely about the feature itself. They were about a structure that had never quite settled into its own shape.

The third rewrite was the one that worked. Not because we found the right pattern — we had tried the right patterns before. It worked because we stopped trying to design the structure and started letting the structure report itself. We moved a piece of code where it seemed to want to go, then we moved the next piece where the first move had made obvious, and after a few weeks the system had a shape that no one had drawn but everyone could now see.

The new engineer who joined that quarter read the code on a Friday and shipped a small feature on Monday. She did not ask where it belonged. The codebase had told her. We had spent three years trying to write down what the codebase could say for itself in an afternoon, once it was allowed to.

This is the part of SHIZEN that is hardest to describe to someone earlier in their practice. The naturalness is not a starting condition. It is what is left after the practitioner has stopped imposing form on something that was trying to find its own. The work looks easy at the end because the practitioner finally got out of its way.

Every domain has the same pattern. The garden that looks wild because the gardener spent twenty years removing what did not belong. The throw that finishes itself because the practitioner stopped forcing the angle. The sentence that reads as inevitable because the writer cut six versions that were not.

You cannot rush to SHIZEN. You can only stop interfering with the work long enough that what wants to surface can.`,
    quote: "The naturalness is what is left after the practitioner has stopped imposing form on something that was trying to find its own.",
    quotePosition: 3,
    pillarSlug: "shizen",
    relatedVoiceSlug: "cj-jiujitsu-bradenton",
  },
  {
    slug: "the-feature-no-one-noticed",
    date: "2026-04-19",
    tag: "field notes",
    version: null,
    title: "The feature no one noticed for two years",
    body: `There is a small piece of behavior in the system — a rule about how a certain kind of conflict resolves itself when two practitioners edit the same surface within a few seconds of each other. It was written carefully. It was tested for a week before it shipped. It has run, without modification, for a little over two years.

No one has ever mentioned it. No support ticket has referenced it. No retrospective has cited it. By the standards of the metrics we were taught to care about, it does not exist.

The first year, this bothered me. The work had been good and the work had been invisible, and the lesson the industry teaches is that invisible work is wasted work. I considered, more than once, redesigning it to be more legible — adding a small notification, a subtle animation, anything that would let a practitioner notice that something thoughtful had happened on their behalf.

I am glad I did not. The behavior works because it does not announce itself. The moment it asks for credit, it becomes a feature the practitioner has to think about, which is the opposite of what it was designed to do. Its silence is not a failure of communication. Its silence is the form the value takes.

This is SHIBUI as a working principle, not an aesthetic theory. The bowl that sits on the shelf and is reached for every morning. The function in the codebase that has not changed in a decade because the requirements never asked it to. The instructor whose corrections you only understand were corrections years after they were made.

Most of what is durable in a long practice will not be noticed in the quarter it ships. Some of it will not be noticed in the decade it ships. The practitioner who needs the work to be noticed will eventually stop building work like this, and the practice will become shallower for it.

The question worth asking, before any non-trivial decision, is not whether the work will be impressive. It is whether the work will still be working — quietly, without thanks — in ten years.`,
    quote: "The moment it asks for credit, it becomes a feature the practitioner has to think about — which is the opposite of what it was designed to do.",
    quotePosition: 4,
    pillarSlug: "shibui",
    relatedVoiceSlug: "cj-jiujitsu-bradenton",
  },
];

export default entries;
