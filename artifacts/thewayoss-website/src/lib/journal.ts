import entries, { type JournalEntry } from "@/data/journal-entries";

export function getAllEntries(): JournalEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getEntryBySlug(slug: string): JournalEntry | undefined {
  return entries.find((e) => e.slug === slug);
}

export function getAdjacentEntries(slug: string): {
  prev: JournalEntry | null;
  next: JournalEntry | null;
} {
  const sorted = getAllEntries();
  const idx = sorted.findIndex((e) => e.slug === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export function formatStamp(entry: JournalEntry): string {
  const date = new Date(entry.date + "T00:00:00");
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const vPart = entry.version ? ` · ${entry.version}` : "";
  return `${y}.${m}.${d} · ${entry.tag}${vPart}`;
}

export function getPreviewText(entry: JournalEntry): string {
  const firstParagraph = entry.body.split("\n\n")[0];
  const sentences = firstParagraph.match(/[^.!?]+[.!?]+/g) ?? [firstParagraph];
  return sentences.slice(0, 2).join(" ").trim();
}
