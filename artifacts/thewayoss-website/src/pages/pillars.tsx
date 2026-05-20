import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getAllPillars } from "@/lib/pillars";
import { EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";

export default function PillarsPage() {
  useMeta({
    title: "Five Pillars — The Immutable Foundation",
    description: "The principles that do not change. Five pillars that form the foundation of The Way OSS — internalized by practitioners and made visible through the work.",
    url: "/pillars",
  });

  const pillars = getAllPillars();
  const shouldReduce = useReducedMotion();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <div className="max-w-[720px] mx-auto px-[20px] md:px-[32px] py-[96px]">

          <motion.header
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            <p className="font-mono-meta text-[#5C5750] uppercase">THE IMMUTABLE FOUNDATION</p>
            <h1 className="font-fraunces text-[clamp(40px,6vw,64px)] font-normal text-[#1A1816] mt-[16px] leading-tight">
              Five Pillars
            </h1>
            <p className="font-sans text-[18px] text-[#5C5750] leading-[1.7] mt-[24px]">
              These are the principles that do not change. The practitioner who internalizes them does not apply them — they become visible in the work without being named.
            </p>
          </motion.header>

          <div
            className="mt-[80px]"
            style={{ borderTop: "1px solid #D9D2C4" }}
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.slug}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.08 + i * 0.08 }}
                style={{ borderBottom: "1px solid #D9D2C4" }}
                className="py-[48px] group"
              >
                <Link href={`/pillars/${pillar.slug}`} className="block no-underline">
                  <div className="flex items-start gap-[32px] md:gap-[48px]">
                    <span
                      className="font-fraunces text-[64px] leading-none text-[#B8471C] shrink-0 select-none"
                      aria-hidden="true"
                    >
                      {pillar.character}
                    </span>
                    <div className="flex-1 min-w-0 pt-[4px]">
                      <p className="font-mono-meta text-[#5C5750] uppercase">
                        PILLAR {String(pillar.order).padStart(2, "0")}
                      </p>
                      <h2 className="font-sans font-medium text-[20px] text-[#1A1816] mt-[8px]">
                        {pillar.name}
                      </h2>
                      <p className="font-fraunces italic text-[22px] text-[#5C5750] leading-[1.4] mt-[12px]">
                        {pillar.meaning}
                      </p>
                      <p
                        className="font-sans text-[14px] text-[#B8471C] mt-[20px] group-hover:underline transition-colors duration-200"
                        aria-label={`Enter the ${pillar.name} pillar`}
                      >
                        Enter the pillar →
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.6 }}
            className="mt-[64px] text-center"
          >
            <Link
              href="/"
              className="font-sans text-[16px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
            >
              ← Return to the threshold
            </Link>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
