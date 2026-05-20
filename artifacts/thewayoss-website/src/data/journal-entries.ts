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

const entries: JournalEntry[] = [];

export default entries;
