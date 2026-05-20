import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { getAllEntries, formatStamp, getPreviewText } from "@/lib/journal";
import fieldNotesEntries from "@/data/field-notes-entries";
import { EASE, DURATION } from "@/lib/animations";
import { HOMEPAGE_JOURNAL_LIMIT } from "@/lib/constants";

export default function Journal() {
  const journalEntries = getAllEntries().map((e) => ({
    slug: e.slug,
    date: e.date,
    stamp: formatStamp(e),
    title: e.title,
    preview: getPreviewText(e),
    href: `/journal/${e.slug}`,
  }));

  const fieldNotes = fieldNotesEntries.map((e) => ({
    slug: e.slug,
    date: e.date,
    stamp: `${e.date.replace(/-/g, ".")} · ${e.category.toLowerCase()}`,
    title: e.title,
    preview: e.dek,
    href: `/field-notes/${e.slug}`,
  }));

  const entries = [...journalEntries, ...fieldNotes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, HOMEPAGE_JOURNAL_LIMIT);

  const shouldReduce = useReducedMotion();

  return (
    <section id="journal" className="w-full bg-[#F5F2EC] pt-[64px] md:pt-[112px] pb-[48px] md:pb-[72px]">
      <div className="max-w-[1280px] mx-auto px-[20px] md:px-[32px]">

        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE }}
          viewport={{ amount: 0.2, once: true }}
          className="mb-[64px] text-center md:text-left"
        >
          <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">The Practice of Building</h2>
          <p className="font-mono-meta text-[#5C5750] uppercase mt-2">WHAT WE SHIPPED · WHAT WE LEARNED · WHAT'S NEXT</p>
        </motion.div>

        <div className="max-w-[720px] mx-auto flex flex-col">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.slug}
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : i * 0.08 }}
              viewport={{ amount: 0.1, once: true }}
              className={i !== 0 ? "py-[64px] border-t border-[#D9D2C4]" : "pt-0 pb-0"}
            >
              <div className="font-mono-meta text-[#5C5750] uppercase">{entry.stamp}</div>
              <h3 className="font-fraunces text-[28px] font-normal text-[#1A1816] mt-[16px] leading-snug">
                {entry.title}
              </h3>
              <p className="font-sans text-[18px] text-[#5C5750] leading-relaxed mt-[16px]">
                {entry.preview}
              </p>
              <div className="mt-[24px] flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href={entry.href}
                  className="font-sans text-[16px] text-[#B8471C] hover:text-[#9C3A15] hover:underline transition-colors duration-200"
                >
                  Read the full entry →
                </Link>
                <Link
                  href="/journal"
                  className="font-sans text-[16px] text-[#B8471C] hover:text-[#9C3A15] hover:underline transition-colors duration-200"
                >
                  See all entries →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
