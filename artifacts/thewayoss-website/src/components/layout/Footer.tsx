import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "@/lib/animations";

export default function Footer() {
  const shouldReduce = useReducedMotion();

  return (
    <footer className="bg-[#1A1816] text-[#F5F2EC] py-16 border-t border-[#2E2A25]">
      <div className="max-w-[1280px] mx-auto px-[20px] md:px-[32px]">
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE }}
          viewport={{ amount: 0.1, once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          
          <div className="flex flex-col">
            <span className="font-sans font-medium text-[16px] text-[#F5F2EC]">The Way OSS</span>
            <span className="font-fraunces italic text-[16px] text-[#9A948A] mt-4">Infrastructure for practitioners becoming leaders.</span>
            <span className="font-mono-meta text-[#9A948A] mt-6 uppercase">© 2026 · The Way OSS</span>
          </div>

          <div className="flex flex-col">
            <h3 className="font-mono-meta text-[#9A948A] uppercase">SITE</h3>
            <div className="mt-4 flex flex-col sm:space-y-3">
              <Link href="/pillars" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 py-2 sm:py-0 block" data-testid="footer-link-pillars">Pillars</Link>
              <Link href="/journal" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 py-2 sm:py-0 block" data-testid="footer-link-journal">Journal</Link>
              <Link href="/voices" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 py-2 sm:py-0 block" data-testid="footer-link-voices">Voices</Link>
              <Link href="/begin" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 py-2 sm:py-0 block" data-testid="footer-link-begin">Begin</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-mono-meta text-[#9A948A] uppercase">PRODUCT</h3>
            <a href="https://thewayoss.app" target="_blank" rel="noopener noreferrer" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 mt-4 py-2 sm:py-0 block" data-testid="footer-link-app">thewayoss.app →</a>
            <span className="font-sans text-[14px] text-[#9A948A] mt-2">the mat lives there</span>
          </div>

          <div className="flex flex-col">
            <h3 className="font-mono-meta text-[#9A948A] uppercase">SYSTEM</h3>
            <span className="font-mono-meta text-[#9A948A] mt-4 normal-case">v1.1</span>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-green-500"></div>
              <span className="font-sans text-[13px] text-[#9A948A]">all systems operational</span>
            </div>
            <a href="mailto:support@thewayoss.app" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 mt-2 py-2 sm:py-0 block" data-testid="footer-link-support">support@thewayoss.app</a>
          </div>

        </motion.div>

        <div className="w-full mt-12 pt-8 border-t border-[#2E2A25] text-center">
          <span className="font-mono-meta text-[#9A948A] uppercase">
            MAKOTO — WE SAY WHAT WE DO AND DO WHAT WE SAY
          </span>
        </div>
      </div>
    </footer>
  );
}
