import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getAllEntries, formatStamp, getPreviewText } from "@/lib/journal";
import fieldNotesEntries from "@/data/field-notes-entries";
import { EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";

export default function JournalPage() {
  useMeta({
    title: "Journal — The Practice of Building",
    description: "What we shipped, what we learned, and what comes next. Field notes from the practitioners of The Way OSS.",
    url: "/journal",
  });

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

  const allEntries = [...journalEntries, ...fieldNotes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const shouldReduce = useReducedMotion();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <div className="max-w-[720px] mx-auto px-[20px] md:px-[32px] py-[96px]">

          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            <p className="font-mono-meta text-[#5C5750] uppercase">JOURNAL</p>
            <h1 className="font-fraunces text-[48px] font-normal text-[#1A1816] mt-[16px] leading-tight">
              The Practice of Building
            </h1>
            <p className="font-mono-meta text-[#5C5750] uppercase mt-[8px]">
              WHAT WE SHIPPED · WHAT WE LEARNED · WHAT'S NEXT
            </p>
          </motion.div>

          <div className="mt-[80px] flex flex-col">
            {allEntries.map((entry, i) => (
              <motion.article
                key={entry.href}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : i * 0.08 }}
                className={`py-[64px] ${i !== 0 ? "border-t border-[#D9D2C4]" : "pt-0"}`}
              >
                <p className="font-mono-meta text-[#5C5750] uppercase">{entry.stamp}</p>
                <h2 className="font-fraunces text-[28px] font-normal text-[#1A1816] mt-[16px] leading-snug">
                  {entry.title}
                </h2>
                <p className="font-sans text-[18px] text-[#5C5750] leading-relaxed mt-[16px]">
                  {entry.preview}
                </p>
                <Link
                  href={entry.href}
                  className="inline-block font-sans text-[16px] text-[#B8471C] hover:text-[#9C3A15] hover:underline mt-[24px] transition-colors duration-200"
                >
                  Read the full entry →
                </Link>
              </motion.article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
