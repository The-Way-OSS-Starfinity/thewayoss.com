import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "@/lib/animations";
import { pillars, type Pillar } from "@/data/pillars";

export default function Pillars() {
  return (
    <section className="w-full bg-[#F5F2EC] py-[64px] md:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-[20px] md:px-[32px]">

        <div className="mb-[64px]">
          <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">Five Pillars</h2>
          <p className="font-mono-meta text-[#5C5750] uppercase mt-2">THE IMMUTABLE FOUNDATION · UNCHANGING</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.slice(0, 3).map((pillar, i) => (
            <PillarCard key={pillar.name} pillar={pillar} index={i} />
          ))}
          <div className="md:col-span-3 flex flex-col md:flex-row justify-center gap-6">
            {pillars.slice(3, 5).map((pillar, i) => (
              <div key={pillar.name} className="w-full md:w-[calc(33.333%-16px)]">
                <PillarCard pillar={pillar} index={i + 3} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : index * 0.08 }}
      viewport={{ amount: 0.1, once: true }}
      data-testid={`pillar-card-${pillar.name}`}
      className="h-full"
    >
      <Link
        href={`/pillars/${pillar.slug}`}
        className="block h-full no-underline"
        aria-label={`${pillar.name} — ${pillar.meaning}`}
      >
        <div className="bg-[#EDE8DD] p-6 md:p-[40px] min-h-[280px] h-full rounded-[2px] border border-transparent hover:border-[#B8471C] transition-colors duration-200 group flex flex-col cursor-pointer">
          <span className="font-fraunces text-[96px] leading-none text-[#B8471C]">{pillar.character}</span>
          <h3 className="font-sans font-medium text-[20px] text-[#1A1816] mt-[32px]">{pillar.name}</h3>
          <p className="font-fraunces italic text-[18px] text-[#5C5750] mt-[16px]">{pillar.meaning}</p>
        </div>
      </Link>
    </motion.div>
  );
}
