export interface FieldNotesSection {
  heading?: string;
  paragraphs: string[];
}

export interface FieldNotesEntry {
  slug: string;
  date: string;
  category: string;
  title: string;
  dek: string;
  byline: string;
  lead: string;
  sections: FieldNotesSection[];
  closing: string[];
}

const fieldNotesEntries: FieldNotesEntry[] = [
  {
    slug: "the-application-is-a-mirror",
    date: "2026-05-18",
    category: "Builder Notes",
    title: "The Application Is a Mirror",
    dek: "Submitting to a16z's Speedrun program forced a compression that revealed something more important than a yes or no: the thesis held under pressure.",
    byline: "THE WAY OSS  ·  BUILT BY THE MAT  ·  HUMAN FIRST, AI AUGMENTED",
    lead: "Tonight we submitted an application to a16z's Speedrun program. That sentence is easy to write after the fact. It sounds cleaner than the actual moment felt — a stack of small decisions about how to describe work without making it smaller than it is, how to tell the truth without hiding behind big words, how to explain a product that begins with Jiu-Jitsu academies and points toward something much larger.",
    sections: [
      {
        heading: "The Compression",
        paragraphs: [
          "Applications have a specific kind of discipline built into them. They do not allow fog. They ask for the one-liner, the category, the founder experience, the traction, the plan. They force you to choose what the work really is when there is no room left to be vague.",
          "That compression is uncomfortable. It is also useful. If the work cannot survive being made legible, the problem is not the application — the problem is that the work does not yet know what it is.",
          "We submitted. The thesis survived.",
        ],
      },
      {
        heading: "The Choice",
        paragraphs: [
          "The Way OSS is not a fitness app. It is not gym software with better branding. It is not another platform trying to pull people deeper into screens.",
          "The work is to build AI-native infrastructure that strengthens real-world practice communities — starting with the grappling community, where transformation is already happening every night on the mat, mostly without a system worthy of it.",
          "Submitting to Speedrun does not mean we have arrived. It means we have made the work legible enough to be evaluated by people who see thousands of ambitious claims. That is useful whether the answer is yes or no. If the application is strong, it reflects clarity. If it is weak, it reveals where the work still needs to become sharper.",
        ],
      },
      {
        heading: "The Through-Line",
        paragraphs: [
          "When asked who we are, the answer was not a costume. Martial artist. Builder. Transformation entrepreneur. Recovery. Music. AI. Product. Community.",
          "All of it belongs to the same through-line: use exponential technology to strengthen human connection, not replace it.",
          "When asked what we are building, the answer was not a feature list. We are building the operating layer for practice communities — the places where people become more courageous, more honest, more useful, and more connected through repeated embodied work.",
        ],
      },
      {
        heading: "Why Now",
        paragraphs: [
          "When asked why now, the answer was simple: because AI is finally powerful enough to adapt to human communities, and most of the world is trying to use it to replace them.",
          "That is not the path.",
          "The deeper milestone is not the submission. It is that the thesis held under pressure. The application asked us to compress the work into its most honest form — and what came out the other side was still recognizable.",
        ],
      },
    ],
    closing: [
      "The path is the practice.",
      "This is...The Way.",
    ],
  },
  {
    slug: "four-principles-culture",
    date: "2026-05-20",
    category: "Culture",
    title: "The Four Principles of The Way OSS Culture",
    dek: "Humility, curiosity, discipline, and ego-less contribution are not slogans for the wall. They are the operating principles for the community we are developing.",
    byline: "THE WAY OSS  ·  BUILT BY THE MAT  ·  HUMAN FIRST, AI AUGMENTED",
    lead: "Every real culture begins before the product is finished. It begins in the way people practice together, correct each other, disagree, recover, and keep showing up when the work gets hard.",
    sections: [
      {
        heading: "Humility",
        paragraphs: [
          "The Way OSS is being built for communities of practice, beginning with Jiu-Jitsu. That matters because the mat has a way of stripping away performance. You can talk a beautiful game, but eventually you have to roll. Reality gives feedback. The body tells the truth. The room can feel whether you came to learn, to dominate, or to contribute.",
          "That is the cultural foundation we want inside The Way OSS. Not hustle culture. Not guru culture. Not status games with a better interface. A practice culture.",
          "Humility is the first gate because learning requires empty hands. In Jiu-Jitsu, the white belt who can be corrected becomes dangerous over time. The person who needs to already look impressive stops developing.",
          "For The Way OSS, humility means we do not pretend to know the community better than the people living inside it. We listen to coaches. We listen to beginners. We listen to the quiet person who has been training for years and sees the thing everyone else misses. We let reality update the roadmap.",
          "Humility does not mean thinking small. It means building big without needing to be the center of the room.",
        ],
      },
      {
        heading: "Curiosity",
        paragraphs: [
          "Curiosity keeps the system alive. It turns every problem into a question: What is really happening here? What does this community actually need? What pattern is repeating? What would make practice easier, deeper, more connected?",
          "Curiosity is also how we protect against stale assumptions. The Way OSS is not just software dropped onto a community. It is a listening instrument. We are paying attention to the gaps between people: the missed open mat, the lost technique note, the new student who needs a training partner, the coach trying to strengthen the room without drowning in admin work.",
          "If humility opens the door, curiosity walks through it.",
        ],
      },
      {
        heading: "Discipline",
        paragraphs: [
          "Discipline is how vision becomes trustworthy. It is easy to talk about an operating system for society. It is harder to ship the next useful thing, test it, improve it, and keep the promises already made.",
          "In our culture, discipline means doing the reps. Clean data. Clear interfaces. Respectful communication. Reliable systems. Security that is not treated as an afterthought. Small improvements stacked consistently until the community can feel the difference.",
          "The mat teaches that intensity without discipline becomes chaos. Discipline gives the fire a shape.",
        ],
      },
      {
        heading: "Ego-less contribution",
        paragraphs: [
          "Ego-less contribution is the heart of the culture. It asks a simple question: What can I give that makes the room stronger?",
          "That might mean logging a technique so someone else can learn faster. Inviting a visitor to open mat. Sharing a useful note without needing credit. Giving feedback that helps the product serve the community better. Building in public so others can copy what works.",
          "Ego-less does not mean invisible. It means the contribution is not held hostage by the need for applause. The work is the offering. The room gets better. Everyone rises.",
        ],
      },
    ],
    closing: [
      "The Way OSS is not only a product. It is a bet that communities of practice can become stronger when technology respects the human relationships at the center of them.",
      "We are building for the coach who carries a whole room on their back. For the beginner trying to find their place. For the competitor sharpening the edge. For the hobbyist who needs consistency and connection more than another dopamine loop. For every academy that knows culture is not what you claim — it is what gets repeated.",
      "Humility keeps us teachable. Curiosity keeps us awake. Discipline keeps us honest. Ego-less contribution keeps us in service. That is the way we build. That is the way we train. That is The Way OSS.",
    ],
  },
];

export default fieldNotesEntries;
