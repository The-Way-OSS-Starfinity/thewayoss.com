import { Link } from "wouter";
import { motion } from "framer-motion";
import { useFadeUp, EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";
import { getAllEntries } from "@/lib/journal";

export default function BeginPage() {
  useMeta({
    title: "Begin — The Way OSS",
    description:
      "The room is being built by the practitioners who will train in it. While we finish the floor, walk the rest of the house.",
    url: "/begin",
  });

  const fadeUp = useFadeUp();
  const latest = getAllEntries()[0];

  return (
    <main className="min-h-[100svh] bg-[#1A1816] flex flex-col items-center justify-center px-[20px] py-[80px] text-center">
      <motion.div
        {...fadeUp}
        className="max-w-[720px] flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION, ease: EASE }}
          className="font-mono-meta text-[#7A746B] uppercase tracking-widest text-[12px]"
          data-testid="begin-meta"
        >
          The Threshold · v1.1
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION * 1.4, ease: EASE, delay: 0.1 }}
          className="font-fraunces text-[clamp(32px,5.5vw,56px)] font-light tracking-[-0.02em] text-[#F5F2EC] leading-[1.15] mt-8"
          data-testid="begin-headline"
        >
          The room is being built by the practitioners who will train in it.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE, delay: 0.35 }}
          className="font-fraunces text-[clamp(18px,2.2vw,22px)] text-[#C9C2B5] mt-10 leading-relaxed max-w-[560px] italic"
          data-testid="begin-subhead"
        >
          We are not collecting names. We are laying the floor. When the door
          opens, you will know — by the work, not by an inbox.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE, delay: 0.55 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <p className="font-mono-meta text-[#7A746B] uppercase tracking-widest text-[11px]">
            While you wait
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
            {latest && (
              <Link
                href={`/journal/${latest.slug}`}
                className="font-fraunces text-[18px] text-[#F5F2EC] hover:text-[#B8471C] transition-colors duration-200 underline decoration-[#5C5750] decoration-[1px] underline-offset-[6px] hover:decoration-[#B8471C]"
                data-testid="link-latest-journal"
              >
                Read the latest field note
              </Link>
            )}
            <Link
              href="/voices"
              className="font-fraunces text-[18px] text-[#F5F2EC] hover:text-[#B8471C] transition-colors duration-200 underline decoration-[#5C5750] decoration-[1px] underline-offset-[6px] hover:decoration-[#B8471C]"
              data-testid="link-voices"
            >
              Hear from practitioners
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION, ease: EASE, delay: 0.85 }}
          className="mt-20"
        >
          <Link
            href="/"
            className="font-sans text-[13px] text-[#5C5750] hover:text-[#C9C2B5] transition-colors duration-200 tracking-wide focus:outline-none focus:text-[#C9C2B5]"
            data-testid="link-home"
          >
            ← Return to the threshold
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
