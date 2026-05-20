import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  getCurrentsForPillar,
  getCurrentsForJournal,
  getCurrentsForVoice,
  getFirstLine,
  formatJournalDate,
} from "@/lib/cross-currents";
import type { JournalEntry } from "@/data/journal-entries";
import type { Voice } from "@/data/voices";
import type { Pillar } from "@/data/pillars";
import { EASE, DURATION } from "@/lib/animations";

/**
 * Curated, hand-tagged cross-currents rendered at the bottom of
 * Pillar / Journal / Voice entry pages. Each variant only renders
 * when at least one association exists in the data layer; missing
 * associations are graceful absences, not empty states.
 *
 * Visual language is deliberately quiet: same palette, same type
 * scale, no buttons. Reads as "and also," not "click here."
 */

const SECTION_STYLE: React.CSSProperties = {
  marginTop: "64px",
  paddingTop: "48px",
  borderTop: "1px solid #D9D2C4",
};

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <>
      <h2
        id={id}
        className="font-mono-meta text-[#5C5750] uppercase font-normal"
        style={{ fontSize: "13px", letterSpacing: "0.04em" }}
      >
        {children}
      </h2>
      <div
        style={{
          width: "32px",
          height: "1px",
          background: "#B8471C",
          margin: "16px 0",
        }}
        aria-hidden="true"
      />
    </>
  );
}

function PillarTag({ pillar }: { pillar: Pillar }) {
  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className="inline-flex items-baseline gap-[10px] no-underline group"
      aria-label={`Read the ${pillar.name} pillar`}
    >
      <span
        className="font-fraunces text-[#B8471C] leading-none"
        style={{ fontSize: "28px" }}
        aria-hidden="true"
      >
        {pillar.character}
      </span>
      <span className="font-mono-meta text-[#5C5750] uppercase group-hover:text-[#B8471C] transition-colors duration-200">
        {pillar.name} · {pillar.meaning}
      </span>
    </Link>
  );
}

function VoiceCard({ voice, withImage }: { voice: Voice; withImage: boolean }) {
  return (
    <Link
      href={`/voices/${voice.slug}`}
      className="group block no-underline"
      aria-label={`Read ${voice.firstName}'s voice`}
    >
      <div className="flex items-start gap-[20px]">
        {withImage && (
          <div
            style={{
              width: "80px",
              height: "80px",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={voice.imagePath}
              alt=""
              width={voice.imageWidth}
              height={voice.imageHeight}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.97) saturate(0.92)",
                display: "block",
              }}
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-mono-meta text-[#5C5750] uppercase">A VOICE</p>
          <p className="font-fraunces text-[19px] font-normal text-[#1A1816] group-hover:text-[#B8471C] transition-colors duration-200 leading-snug mt-[6px]">
            {voice.firstName} — {voice.practice}
          </p>
          <p className="font-fraunces italic text-[16px] text-[#5C5750] leading-[1.5] mt-[6px]">
            {getFirstLine(voice.body)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="group block no-underline"
      aria-label={`Read the journal entry: ${entry.title}`}
    >
      <p className="font-mono-meta text-[#5C5750] uppercase">
        FROM THE JOURNAL · {formatJournalDate(entry.date)}
      </p>
      <p className="font-fraunces text-[19px] font-normal text-[#1A1816] group-hover:text-[#B8471C] transition-colors duration-200 leading-snug mt-[6px]">
        {entry.title}
      </p>
      <p className="font-fraunces italic text-[16px] text-[#5C5750] leading-[1.5] mt-[6px]">
        {getFirstLine(entry.body)}
      </p>
    </Link>
  );
}

function CurrentsShell({
  headingId,
  heading,
  children,
}: {
  headingId: string;
  heading: string;
  children: React.ReactNode;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.section
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.18 }}
      aria-labelledby={headingId}
      style={SECTION_STYLE}
    >
      <SectionHeading id={headingId}>{heading}</SectionHeading>
      <div className="flex flex-col gap-[32px]">{children}</div>
    </motion.section>
  );
}

/**
 * Pillar detail page block — "From this pillar":
 * up to one related Voice (with image thumb) and one related Journal entry.
 */
export function PillarCurrents({ pillarSlug }: { pillarSlug: string }) {
  const { voice, journal } = getCurrentsForPillar(pillarSlug);
  if (!voice && !journal) return null;

  return (
    <CurrentsShell headingId="pillar-currents-heading" heading="FROM THIS PILLAR">
      {voice && <VoiceCard voice={voice} withImage />}
      {journal && <JournalCard entry={journal} />}
    </CurrentsShell>
  );
}

/**
 * Journal entry page block — "Elsewhere":
 * Pillar tag (if associated) and one related Voice card (if associated).
 */
export function JournalCurrents({ entry }: { entry: JournalEntry }) {
  const { pillar, voice } = getCurrentsForJournal(entry);
  if (!pillar && !voice) return null;

  return (
    <CurrentsShell headingId="journal-currents-heading" heading="ELSEWHERE">
      {pillar && <PillarTag pillar={pillar} />}
      {voice && <VoiceCard voice={voice} withImage />}
    </CurrentsShell>
  );
}

/**
 * Voice entry page block — "Elsewhere":
 * Pillar tag (if associated) and one related Journal entry (if associated).
 */
export function VoiceCurrents({ voice }: { voice: Voice }) {
  const { pillar, journal } = getCurrentsForVoice(voice);
  if (!pillar && !journal) return null;

  return (
    <CurrentsShell headingId="voice-currents-heading" heading="ELSEWHERE">
      {pillar && <PillarTag pillar={pillar} />}
      {journal && <JournalCard entry={journal} />}
    </CurrentsShell>
  );
}
