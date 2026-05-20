import { useParams, Link, Redirect } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getPillarBySlug, getAdjacentPillars, formatDomainLabel } from "@/lib/pillars";
import { EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";
import { ShareLink } from "@/components/ShareLink";
import { PillarCurrents } from "@/components/CrossCurrents";

export default function PillarEntryPage() {
  const { slug } = useParams<{ slug: string }>();
  const pillar = getPillarBySlug(slug);
  const shouldReduce = useReducedMotion();

  useMeta(
    pillar
      ? {
          title: pillar.name,
          description: pillar.meaning,
          url: `/pillars/${pillar.slug}`,
          type: "article",
          image: `https://thewayoss.com/og/pillars/${pillar.slug}.svg`,
        }
      : {}
  );

  if (!pillar) {
    return <Redirect to="/pillars" />;
  }

  const { prev, next } = getAdjacentPillars(slug);

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <article className="max-w-[680px] mx-auto px-[20px] md:px-[32px] py-[96px]">

          {/* Header block */}
          <motion.header
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
            className="text-center"
          >
            <p className="font-mono-meta text-[#5C5750] uppercase">
              PILLAR {String(pillar.order).padStart(2, "0")} OF 05
            </p>
            <p
              className="font-fraunces text-[#B8471C] mt-[24px] leading-none select-none"
              style={{ fontSize: "clamp(96px, 20vw, 144px)" }}
              aria-hidden="true"
            >
              {pillar.character}
            </p>
            <h1 className="font-sans font-medium text-[28px] text-[#1A1816] mt-[24px] tracking-wide">
              {pillar.name}
            </h1>
            <p className="font-fraunces italic text-[clamp(20px,3vw,28px)] text-[#5C5750] leading-[1.4] mt-[16px]">
              {pillar.meaning}
            </p>
          </motion.header>

          {/* Source note */}
          <motion.section
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.1 }}
            className="mt-[80px]"
            aria-labelledby="source-heading"
          >
            <p id="source-heading" className="font-mono-meta text-[#5C5750] uppercase">ON THE SOURCE</p>
            <div style={{ width: "32px", height: "1px", background: "#B8471C", margin: "16px 0" }} />
            <p className="font-sans text-[17px] text-[#1A1816] leading-[1.75] mt-[16px]">
              {pillar.sourceNote}
            </p>
          </motion.section>

          {/* Opening */}
          <motion.section
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.16 }}
            className="mt-[64px]"
          >
            <p className="font-sans text-[19px] text-[#1A1816] leading-[1.75]">
              {pillar.opening}
            </p>
          </motion.section>

          {/* Domain examples */}
          <motion.section
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.22 }}
            aria-labelledby="domains-heading"
            className="mt-[64px]"
          >
            <p id="domains-heading" className="font-mono-meta text-[#5C5750] uppercase">ACROSS THE DOMAINS</p>
            <div style={{ width: "32px", height: "1px", background: "#B8471C", margin: "16px 0" }} />
            <div className="mt-[32px] flex flex-col gap-[32px]">
              {pillar.domainExamples.map((example) => (
                <div key={example.domain}>
                  <p className="font-mono-meta text-[#B8471C] uppercase">
                    {formatDomainLabel(example.domain)}
                  </p>
                  <p className="font-sans text-[17px] text-[#1A1816] leading-[1.75] mt-[8px]">
                    {example.example}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Pull quote */}
          <motion.figure
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.28 }}
            className="my-[64px]"
          >
            <div style={{ width: "100%", height: "1px", background: "#B8471C" }} />
            <blockquote className="py-[40px] text-center px-[24px] md:px-[48px]">
              <p className="font-fraunces italic text-[clamp(24px,4vw,32px)] text-[#1A1816] leading-[1.4]">
                {pillar.pullQuote}
              </p>
            </blockquote>
            <div style={{ width: "100%", height: "1px", background: "#B8471C" }} />
          </motion.figure>

          {/* Closing */}
          <motion.section
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.34 }}
          >
            <p className="font-sans text-[19px] text-[#1A1816] leading-[1.75]">
              {pillar.closing}
            </p>
          </motion.section>

          {/* Share affordance */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.38 }}
          >
            <ShareLink
              url={`https://thewayoss.com/pillars/${pillar.slug}`}
              title={`${pillar.name} — A Pillar of The Way OSS`}
            />
          </motion.div>

          <PillarCurrents pillarSlug={pillar.slug} />

          {/* Footer nav */}
          <motion.footer
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.4 }}
            className="mt-[96px] pt-[48px]"
            style={{ borderTop: "1px solid #D9D2C4" }}
          >
            {(prev || next) && (
              <nav
                className={`flex flex-col gap-[24px] mb-[48px] ${prev && next ? "md:flex-row" : ""}`}
                aria-label="Pillar navigation"
              >
                {prev && (
                  <Link href={`/pillars/${prev.slug}`} className={`group block no-underline ${prev && next ? "md:flex-1" : ""}`}>
                    <p className="font-mono-meta text-[#B8471C] uppercase">← previous</p>
                    <div className="flex items-center gap-[12px] mt-[8px]">
                      <span
                        className="font-fraunces text-[32px] leading-none text-[#B8471C] shrink-0"
                        aria-hidden="true"
                      >
                        {prev.character}
                      </span>
                      <p className="font-fraunces text-[20px] font-normal text-[#1A1816] group-hover:text-[#B8471C] transition-colors duration-200 leading-snug">
                        {prev.name}
                      </p>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link href={`/pillars/${next.slug}`} className={`group block no-underline ${prev && next ? "md:flex-1 md:text-right" : ""}`}>
                    <p className="font-mono-meta text-[#B8471C] uppercase">next →</p>
                    <div className={`flex items-center gap-[12px] mt-[8px] ${prev && next ? "md:justify-end" : ""}`}>
                      <p className="font-fraunces text-[20px] font-normal text-[#1A1816] group-hover:text-[#B8471C] transition-colors duration-200 leading-snug">
                        {next.name}
                      </p>
                      <span
                        className="font-fraunces text-[32px] leading-none text-[#B8471C] shrink-0"
                        aria-hidden="true"
                      >
                        {next.character}
                      </span>
                    </div>
                  </Link>
                )}
              </nav>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[24px]">
              <Link
                href="/pillars"
                className="font-sans text-[16px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
              >
                ← All pillars
              </Link>
              <span className="hidden sm:inline text-[#D9D2C4]" aria-hidden="true">·</span>
              <Link
                href="/"
                className="font-sans text-[16px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
              >
                ← Return to the threshold
              </Link>
            </div>
          </motion.footer>

        </article>
      </main>
      <Footer />
    </>
  );
}
