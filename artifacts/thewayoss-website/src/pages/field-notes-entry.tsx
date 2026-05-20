import { useParams, Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getFieldNotesEntryBySlug } from "@/lib/field-notes";
import { EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";

export default function FieldNotesEntryPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = getFieldNotesEntryBySlug(slug);

  useMeta(
    entry
      ? {
          title: entry.title,
          description: entry.dek,
          url: `/field-notes/${entry.slug}`,
          type: "article",
          image: `https://thewayoss.com/og/field-notes/${entry.slug}.svg`,
        }
      : {}
  );

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

  const shouldReduce = useReducedMotion();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <article className="max-w-[680px] mx-auto px-[20px] md:px-[32px] py-[96px]">

          {/* Kicker */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            <p className="font-mono-meta text-[#5C5750] uppercase tracking-widest text-[11px]">
              Field Notes · {entry.category}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.06 }}
            className="font-fraunces text-[clamp(40px,6vw,72px)] font-normal text-[#1A1816] mt-[20px] leading-[1.05]"
          >
            {entry.title}
          </motion.h1>

          {/* Dek */}
          <motion.p
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.1 }}
            className="font-fraunces italic text-[clamp(20px,2.5vw,26px)] text-[#1A1816] mt-[28px] leading-[1.4]"
          >
            {entry.dek}
          </motion.p>

          {/* Byline */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.14 }}
            className="mt-[40px]"
          >
            <hr className="border-t border-[#D9D2C4]" />
            <p className="font-mono-meta text-[#5C5750] uppercase tracking-widest text-[11px] py-[16px]">
              {entry.byline}
            </p>
            <hr className="border-t border-[#D9D2C4]" />
          </motion.div>

          {/* Lead paragraph */}
          <motion.p
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.18 }}
            className="font-sans text-[20px] text-[#1A1816] leading-[1.7] mt-[56px] font-medium"
          >
            {entry.lead}
          </motion.p>

          {/* Sections */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.22 }}
          >
            {entry.sections.map((section, si) => (
              <div key={si} className="mt-[56px]">
                <hr className="border-t border-[#D9D2C4]" />
                {section.heading && (
                  <h2 className="font-fraunces text-[clamp(22px,3vw,30px)] font-normal text-[#1A1816] mt-[24px]">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pi) => (
                  <p
                    key={pi}
                    className="font-sans text-[19px] text-[#1A1816] leading-[1.7] mt-[20px]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Closing */}
          {entry.closing.length > 0 && (
            <motion.div
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.26 }}
              className="mt-[56px]"
            >
              <hr className="border-t border-[#D9D2C4]" />
              {entry.closing.map((para, pi) => (
                <p
                  key={pi}
                  className="font-sans text-[19px] text-[#1A1816] leading-[1.7] mt-[20px]"
                >
                  {para}
                </p>
              ))}
            </motion.div>
          )}

          {/* Footer nav */}
          <motion.footer
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.3 }}
            className="mt-[96px] pt-[48px] border-t border-[#D9D2C4] text-center"
          >
            <Link
              href="/journal"
              className="font-sans text-[16px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
            >
              ← All entries
            </Link>
          </motion.footer>

        </article>
      </main>
      <Footer />
    </>
  );
}
