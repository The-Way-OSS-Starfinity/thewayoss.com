import { useParams, Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getEntryBySlug, getAdjacentEntries, formatStamp, getPreviewText } from "@/lib/journal";
import { getFieldNotesEntryBySlug } from "@/lib/field-notes";
import { EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";
import { ShareLink } from "@/components/ShareLink";
import { JournalCurrents } from "@/components/CrossCurrents";
import FieldNotesEntryPage from "@/pages/field-notes-entry";

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}

function renderBlock(para: string, i: number, quotePosition: number, quote: string) {
  const isHeading = para.startsWith("## ");

  if (isHeading) {
    return (
      <div key={i} className="mt-[56px]">
        <h2 className="font-fraunces text-[22px] font-normal text-[#1A1816] leading-snug uppercase tracking-wide">
          {para.slice(3)}
        </h2>
      </div>
    );
  }

  return (
    <div key={i} className={i === 0 ? "" : "mt-[32px]"}>
      <p className="font-sans text-[19px] text-[#1A1816] leading-[1.7]">
        {renderInlineBold(para)}
      </p>
      {i === quotePosition - 1 && (
        <blockquote className="my-[32px] pl-[24px] border-l-[3px] border-[#B8471C]">
          <p className="font-fraunces italic text-[24px] text-[#B8471C] leading-[1.4]">
            {quote}
          </p>
        </blockquote>
      )}
    </div>
  );
}

export default function JournalEntryPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = getEntryBySlug(slug);
  const fieldNotesEntry = !entry ? getFieldNotesEntryBySlug(slug) : undefined;
  const shouldReduce = useReducedMotion();

  useMeta(
    entry
      ? {
          title: entry.title,
          description: getPreviewText(entry),
          url: `/journal/${entry.slug}`,
          type: "article",
          image: `https://thewayoss.com/og/journal/${entry.slug}.svg`,
        }
      : {}
  );

  if (!entry && fieldNotesEntry) {
    return <FieldNotesEntryPage />;
  }

  if (!entry) {
    return (
      <>
        <Nav />
        <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
          <div className="max-w-[680px] mx-auto px-[20px] md:px-[32px] py-[160px] text-center">
            <p className="font-fraunces italic text-[24px] text-[#5C5750]">
              This entry has not yet been written.
            </p>
            <Link
              href="/journal"
              className="inline-block font-sans text-[16px] text-[#B8471C] hover:text-[#9C3A15] hover:underline mt-[32px] transition-colors duration-200"
            >
              ← All entries
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { prev, next } = getAdjacentEntries(slug);
  const paragraphs = entry.body.split("\n\n");

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <article className="max-w-[680px] mx-auto px-[20px] md:px-[32px] py-[96px]">

          <motion.header
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            <p className="font-mono-meta text-[#5C5750] uppercase">{formatStamp(entry)}</p>
            <h1 className="font-fraunces text-[clamp(36px,5vw,56px)] font-normal text-[#1A1816] mt-[16px] leading-tight">
              {entry.title}
            </h1>
          </motion.header>

          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.12 }}
            className="mt-[80px]"
          >
            {paragraphs.map((para, i) => renderBlock(para, i, entry.quotePosition, entry.quote))}
          </motion.div>

          {/* Share affordance */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.18 }}
          >
            <ShareLink
              url={`https://thewayoss.com/journal/${entry.slug}`}
              title={`${entry.title} — The Way OSS Journal`}
            />
          </motion.div>

          <JournalCurrents entry={entry} />

          <motion.footer
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.2 }}
            className="mt-[96px] pt-[48px] border-t border-[#D9D2C4]"
          >
            {(prev || next) && (
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[48px]">
                {prev ? (
                  <Link href={`/journal/${prev.slug}`} className="group block">
                    <p className="font-mono-meta text-[#B8471C] uppercase">← previous</p>
                    <p className="font-fraunces text-[20px] font-normal text-[#1A1816] group-hover:text-[#B8471C] transition-colors duration-200 mt-[8px] leading-snug">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link href={`/journal/${next.slug}`} className="group block md:text-right">
                    <p className="font-mono-meta text-[#B8471C] uppercase">next →</p>
                    <p className="font-fraunces text-[20px] font-normal text-[#1A1816] group-hover:text-[#B8471C] transition-colors duration-200 mt-[8px] leading-snug">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            )}
            <div className="text-center">
              <Link
                href="/journal"
                className="font-sans text-[16px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
              >
                ← All entries
              </Link>
            </div>
          </motion.footer>

        </article>
      </main>
      <Footer />
    </>
  );
}
