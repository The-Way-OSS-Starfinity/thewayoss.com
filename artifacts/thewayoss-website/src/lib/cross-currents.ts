import journalEntries, { type JournalEntry } from "@/data/journal-entries";
import { voices, type Voice } from "@/data/voices";
import { getPillarBySlug } from "@/lib/pillars";
import type { Pillar } from "@/data/pillars";

/**
 * Curated, hand-tagged cross-currents between Pillars, Voices, and
 * Journal entries. Associations are declared in the data layer
 * (`pillarSlug`, `relatedVoiceSlug`, `relatedJournalSlug`); this
 * module only resolves them. There is no algorithmic fallback —
 * missing associations return null and the page renders nothing.
 */

export interface PillarCurrents {
  voice: Voice | null;
  journal: JournalEntry | null;
}

export interface JournalCurrents {
  pillar: Pillar | null;
  voice: Voice | null;
}

export interface VoiceCurrents {
  pillar: Pillar | null;
  journal: JournalEntry | null;
}

/**
 * Return the curated voice and journal entry that belong to a Pillar.
 * Voice: the first voice tagged with this pillar (typically only one).
 * Journal: the most recent entry tagged with this pillar.
 */
export function getCurrentsForPillar(pillarSlug: string): PillarCurrents {
  const voice = voices.find((v) => v.pillarSlug === pillarSlug) ?? null;
  const journal =
    [...journalEntries]
      .filter((e) => e.pillarSlug === pillarSlug)
      .sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
  return { voice, journal };
}

/**
 * Return the curated pillar and related voice for a Journal entry.
 *
 * Resolution order for the related voice:
 *   1. Explicit `relatedVoiceSlug` set on the entry (curator override).
 *   2. Otherwise, fall back to the first voice that shares the entry's
 *      `pillarSlug` — still curation-driven, just implicit through the
 *      shared pillar tag.
 *   3. Otherwise, null (renders nothing).
 */
export function getCurrentsForJournal(entry: JournalEntry): JournalCurrents {
  const pillar = entry.pillarSlug ? getPillarBySlug(entry.pillarSlug) ?? null : null;
  let voice: Voice | null = null;
  if (entry.relatedVoiceSlug) {
    voice = voices.find((v) => v.slug === entry.relatedVoiceSlug) ?? null;
  } else if (entry.pillarSlug) {
    voice = voices.find((v) => v.pillarSlug === entry.pillarSlug) ?? null;
  }
  return { pillar, voice };
}

/**
 * Return the curated pillar and related journal entry for a Voice.
 *
 * Resolution order for the related journal entry:
 *   1. Explicit `relatedJournalSlug` set on the voice (curator override).
 *   2. Otherwise, fall back to the most recent journal entry that
 *      shares the voice's `pillarSlug`.
 *   3. Otherwise, null.
 */
export function getCurrentsForVoice(voice: Voice): VoiceCurrents {
  const pillar = voice.pillarSlug ? getPillarBySlug(voice.pillarSlug) ?? null : null;
  let journal: JournalEntry | null = null;
  if (voice.relatedJournalSlug) {
    journal = journalEntries.find((e) => e.slug === voice.relatedJournalSlug) ?? null;
  } else if (voice.pillarSlug) {
    journal =
      [...journalEntries]
        .filter((e) => e.pillarSlug === voice.pillarSlug)
        .sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
  }
  return { pillar, journal };
}

/**
 * First sentence (or, if too long, the first ~160 chars) of an
 * entry's body — used as the preview line in cross-link cards.
 */
export function getFirstLine(body: string): string {
  const first = body.split(/\n\n/)[0] ?? "";
  const match = first.match(/^[^.!?]*[.!?]/);
  const raw = (match ? match[0] : first).trim();
  return raw.length > 160 ? raw.slice(0, 157) + "…" : raw;
}

/**
 * Format a journal entry's date as YYYY.MM.DD for the date line
 * shown in cross-link cards.
 */
export function formatJournalDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}
