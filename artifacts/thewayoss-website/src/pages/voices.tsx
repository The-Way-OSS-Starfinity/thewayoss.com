import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { voices } from "@/data/voices";
import { VoiceEntry } from "@/components/voice/VoiceEntry";
import { EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";

function getSortedVoices() {
  // Full archive — all entries, newest first by order value. No limit applied here.
  return [...voices].sort((a, b) => b.order - a.order);
}

export default function VoicesPage() {
  useMeta({
    title: "Voices — Practitioners in Their Own Words",
    description: "Stories from practitioners on the mat and in life. Unedited, honest accounts of what the practice does.",
    url: "/voices",
  });

  const shouldReduce = useReducedMotion();
  const allVoices = getSortedVoices();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <div className="max-w-[1280px] mx-auto px-[20px] md:px-[32px] py-[96px] md:py-[160px]">

          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
            className="mb-[96px]"
          >
            <h1 className="font-fraunces text-[48px] font-normal text-[#1A1816]">Voices</h1>
            <p className="font-mono-meta text-[#5C5750] uppercase mt-2">PRACTITIONERS IN THEIR OWN WORDS · UNEDITED</p>
          </motion.div>

          <div>
            {allVoices.map((voice, i) => (
              <motion.article
                key={voice.slug}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : i * 0.08 }}
                className={i > 0 ? "mt-[128px] pt-[128px] border-t border-[#D9D2C4]" : ""}
                aria-label={`Voice entry by ${voice.firstName}`}
              >
                <VoiceEntry voice={voice} />
                <div className="mt-[32px] md:ml-[calc((5/12)*100%+(1/12)*100%)]">
                  <Link
                    href={`/voices/${voice.slug}`}
                    className="font-mono-meta text-[#5C5750] uppercase hover:text-[#B8471C] transition-colors duration-200"
                    aria-label={`Open ${voice.firstName}'s voice on its own page`}
                  >
                    PERMALINK →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-[128px] pt-[128px] border-t border-[#D9D2C4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <Link
              href="/"
              className="font-sans text-[16px] text-[#5C5750] hover:text-[#1A1816] transition-colors duration-200"
            >
              ← Return to the threshold
            </Link>
            <a
              href="mailto:hello@thewayoss.app"
              className="font-sans italic text-[18px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
            >
              Share yours →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}


