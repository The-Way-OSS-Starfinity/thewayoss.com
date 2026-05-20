import { Link } from "wouter";
import { motion } from "framer-motion";
import { useFadeUp, EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";
import Nav from "@/components/layout/Nav";

export default function NotFound() {
  useMeta({
    title: "Page Not Found — The Way OSS",
    description: "You've arrived somewhere that isn't here.",
    rawTitle: true,
  });

  const fadeUp = useFadeUp();

  return (
    <main className="min-h-[100svh] bg-[#1A1816] flex flex-col">
      <Nav theme="dark" />

      <div className="flex-1 flex items-center justify-center px-[20px] py-[80px] text-center">
        <motion.div
          {...fadeUp}
          className="max-w-[720px] flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION * 1.4, ease: EASE, delay: 0.1 }}
            className="font-fraunces text-[clamp(32px,5.5vw,64px)] font-light tracking-[-0.02em] text-[#F5F2EC] leading-[1.15]"
          >
            You&rsquo;ve arrived somewhere that isn&rsquo;t here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: 0.35 }}
            className="font-mono-meta text-[13px] tracking-[0.1em] uppercase text-[#9A948A] mt-8"
          >
            &mdash; A MISSED THRESHOLD
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: 0.55 }}
            className="mt-24 flex flex-col items-center gap-6 sm:gap-6"
          >
            <Link
              href="/"
              className="font-sans text-[15px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 focus:outline-none focus:text-[#F5F2EC]"
              data-testid="link-return-home"
            >
              ← Return to the threshold
            </Link>
            <Link
              href="/#domains"
              className="font-sans text-[15px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 focus:outline-none focus:text-[#F5F2EC]"
              data-testid="link-see-domains"
            >
              See what&rsquo;s here →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
