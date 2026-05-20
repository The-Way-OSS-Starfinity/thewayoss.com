import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "@/lib/animations";

export default function Threshold() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="threshold" className="w-full min-h-[100svh] bg-[#1A1816] flex items-center justify-center relative">
      <div className="flex flex-col items-center text-center px-[20px]">
        
        <motion.h2
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE }}
          viewport={{ amount: 0.2, once: true }}
          className="font-fraunces text-[clamp(48px,7vw,72px)] font-light tracking-[-0.02em] text-[#F5F2EC]"
        >
          Step onto the mat.
        </motion.h2>

        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.15 }}
          viewport={{ amount: 0.2, once: true }}
          className="mt-[48px]"
        >
          <Link
            href="/begin"
            className="inline-block bg-[#B8471C] text-[#F5F2EC] font-sans font-medium text-[20px] px-[40px] py-[20px] rounded-[2px] hover:bg-[#9C3A15] transition-colors duration-200"
            data-testid="cta-begin-final"
          >
            Begin
          </Link>
        </motion.div>

        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.25 }}
          viewport={{ amount: 0.2, once: true }}
          className="mt-[32px]"
        >
          <span className="font-mono-meta text-[#9A948A] uppercase">
            V1.1 · WELCOME · MAKOTO
          </span>
        </motion.div>

      </div>
    </section>
  );
}
