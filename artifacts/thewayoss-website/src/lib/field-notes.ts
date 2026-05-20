import entries, { type FieldNotesEntry } from "@/data/field-notes-entries";

export function getFieldNotesEntryBySlug(slug: string): FieldNotesEntry | undefined {
  return entries.find((e) => e.slug === slug);
}
