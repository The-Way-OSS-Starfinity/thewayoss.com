export interface Voice {
  slug: string;
  order: number;
  date: string;
  imagePath: string;
  imageAlt: string;
  imageOrientation: "horizontal" | "vertical";
  imageWidth: number;
  imageHeight: number;
  body: string;
  firstName: string;
  practice: string;
  location: string;
  shareable: boolean;
  /**
   * Slug of the Pillar this voice expresses. Used to surface the
   * voice on the corresponding Pillar detail page and to render a
   * "Pillar" tag on this voice's own page. Optional — leave undefined
   * if no pillar association applies.
   */
  pillarSlug?: string;
  /**
   * Optional curator-chosen Journal entry to surface alongside this
   * voice. Leave undefined to surface nothing.
   */
  relatedJournalSlug?: string;
}

export const voices: Voice[] = [
  {
    slug: "cj-jiujitsu-bradenton",
    order: 1,
    date: "2026-04-22",
    imagePath: "/images/voices/voices-cj-jiujitsu-2400.jpg",
    imageAlt: "Three jiu-jitsu practitioners training on a grey mat under institutional lighting. One in the foreground recovers on his back, hand reaching upward. Another leans in to engage. The image is honest, unromanticized, mid-roll.",
    imageOrientation: "horizontal",
    imageWidth: 2400,
    imageHeight: 1600,
    body: "I walked into the gym for the first time on a small decision that turned out to matter more than any of the bigger ones I had been making.\n\nThe years before were a slow argument with alcohol that I kept losing. I was not at the bottom. I was somewhere worse — comfortable enough to keep going, awake enough to know I should not. Jiu-jitsu did not save my life. It gave me a place to put my life down for an hour at a time, against people who would not let me lie to myself.\n\nThe floor is the most honest teacher I have ever met. It does not care what I tell people I am. It only cares what I actually do when someone is trying to take my back. Most days I lose. Some days I do not. Both kinds of days build the same thing.\n\nThe Way OSS exists because of the version of me who did not yet know any of this was possible — the kid who thought the way he was living was just the way it was going to be. He did not know there was a mat waiting for him. He did not know there were other people on it. I am building the place I wish he had found earlier.",
    firstName: "Cj",
    practice: "jiu-jitsu practitioner, founder",
    location: "Bradenton, Florida",
    shareable: true,
    pillarSlug: "makoto",
    relatedJournalSlug: "the-pause-between-movements",
  },
  {
    slug: "cj-staying-a-student-bradenton",
    order: 2,
    date: "2026-04-23",
    imagePath: "/images/voices/h-transitional-position-mount-01.webp",
    imageAlt: "Two jiu-jitsu practitioners kneeling on a grey mat in conversation. One gestures with a raised hand while speaking; the other squats in an attentive listening posture. Other training partners visible in the background. Bright institutional lighting reflects in the mirrored wall behind them.",
    imageOrientation: "horizontal",
    imageWidth: 2400,
    imageHeight: 1600,
    body: "There is a version of the black belt who believes they have arrived.\n\nI try hard not to be him. Every class, I walk onto the mat as if I am trying to see the position for the first time — not because I have forgotten what I know, but because what I know is a smaller fraction of what is actually there than I used to think. The techniques I drilled for a decade still have rooms in them I have not entered. The positions I teach are positions I am still learning.\n\nI train in Bradenton under Coach Dan Martinez, a third-degree black belt who speaks to his students as equals even when he is the one with the answer. That is not an accident of personality. That is a choice about what a teacher is for. A room where the black belt cannot keep learning is a room where nobody else can learn either. The reverse is also true.\n\nNot every academy is built this way, and this is the hardest thing to communicate to a new practitioner still searching: the environment you train in is as important as how much you train. The platform I am building is partly an answer to this — a way for practitioners to find the rooms where they will still be learning in twenty years, and to recognize the coaches who keep their students' minds open because they kept their own open first.",
    firstName: "Cj",
    practice: "jiu-jitsu practitioner, founder",
    location: "Bradenton, Florida",
    shareable: true,
  },
  {
    slug: "cj-common-unity-sarasota",
    order: 3,
    date: "2026-04-23",
    imagePath: "/images/voices/h-wide-angle-dual-focus-01.webp",
    imageAlt: "A wide-angle view of a jiu-jitsu academy training floor. Cj, in a blue gi with black belt, stands mid-handshake with a training partner in a black gi with blue belt. Both are smiling. Other practitioners are seated along the wall in the background, watching. Bright institutional lighting reflects on the white mat and walls.",
    imageOrientation: "horizontal",
    imageWidth: 2400,
    imageHeight: 1600,
    body: "The word is community, but the word beneath it is older. Com-unus. With oneness. The togetherness of people who have become the same kind of people.\n\nMost rooms call themselves communities before they have earned the word. A few rooms actually are. What separates them is time — the slow discovery, roll by roll, class by class, year by year, of who will be there when the work gets hard. You do not get to choose your family. You learn who your family is.\n\nI have come to know people through jiu-jitsu that I would not otherwise have met, across years I would not otherwise have shared. The practitioner who taught me something I had been missing for a decade. The training partner who noticed I was struggling before I said anything. The younger belt I watched pass through the belts I had already earned, and learn what I was still learning. These are not friendships built on what we have in common outside the gym. They are friendships built on what we do inside it — together, repeatedly, under pressure, with nothing to prove and nothing to hide.\n\nThis is the kind of family I want the platform to help other practitioners find, and find again, and recognize across the different rooms they will train in over a practice life. Not the academy they first walk into. The ones that stay, in memory and in bond, as the rooms where their real people turned out to be.",
    firstName: "Cj",
    practice: "jiu-jitsu practitioner, founder",
    location: "Sarasota, Florida",
    shareable: true,
  },
];
