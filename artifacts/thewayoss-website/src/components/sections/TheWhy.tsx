import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "@/lib/animations";

export default function TheWhy() {
  const shouldReduce = useReducedMotion();

  const statementProps = {
    initial: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: DURATION, ease: EASE },
    viewport: { amount: 0.2, once: true } as const,
  };

  return (
    <section className="w-full bg-[#F5F2EC]">
      
      <div className="min-h-[60svh] md:min-h-[85svh] w-full flex items-center px-[20px] md:px-[32px] max-w-[1280px] mx-auto pt-[80px] md:pt-0">
        <motion.h2 
          {...statementProps}
          className="text-postulate text-[#1A1816] max-w-[960px]"
        >
          The world is being disrupted faster than meaning can keep up.
        </motion.h2>
      </div>

      <div className="h-[6vh] md:h-[24vh]" />

      <div className="min-h-[60svh] md:min-h-[85svh] w-full flex items-center px-[20px] md:px-[32px] max-w-[1280px] mx-auto">
        <motion.h2 
          {...statementProps}
          className="text-postulate text-[#1A1816] max-w-[960px]"
        >
          Ancient practices already solved this. They were missing distribution.
        </motion.h2>
      </div>

      <div className="h-[6vh] md:h-[24vh]" />

      <div className="min-h-[60svh] md:min-h-[85svh] w-full flex items-center px-[20px] md:px-[32px] max-w-[1280px] mx-auto">
        <motion.h2 
          {...statementProps}
          className="text-postulate text-[#1A1816] max-w-[960px]"
        >
          We are building the operating system for the practitioners who will lead what comes next.
        </motion.h2>
      </div>

    </section>
  );
}
