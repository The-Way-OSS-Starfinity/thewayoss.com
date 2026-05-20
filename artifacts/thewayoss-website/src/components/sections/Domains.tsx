import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "@/lib/animations";
import { domains } from "@/data/domains";

type CountData = Record<string, { practitioners: number; venues: number; venue_label: string }>;

export default function Domains() {
  const [counts, setCounts] = useState<CountData | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    fetch("/data/domain-counts.json")
      .then(r => r.json())
      .then((data: CountData) => setCounts(data))
      .catch(e => console.error("Failed to load domain counts", e));
  }, []);

  return (
    <section id="domains" className="w-full bg-[#F5F2EC] py-[64px] md:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-[20px] md:px-[32px]">
        
        <div className="mb-[64px]">
          <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">Six Practices</h2>
          <p className="font-mono-meta text-[#5C5750] uppercase mt-2">WHERE LEADERS ARE BEING FORGED · COUNTS GO LIVE AT LAUNCH</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, i) => {
            const data = counts?.[domain.slug];
            const statText = data ? `${data.practitioners} practitioners · ${data.venues} ${data.venue_label}` : "Loading...";

            return (
              <motion.div
                key={domain.slug}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : i * 0.08 }}
                viewport={{ amount: 0.1, once: true }}
                className="h-full"
              >
                <Link
                  href={`/domains/${domain.slug}`}
                  className="flex flex-col bg-[#F5F2EC] border border-[#D9D2C4] p-6 md:p-[32px] min-h-[240px] rounded-[2px] hover:border-[#B8471C] transition-colors duration-200 group cursor-pointer h-full"
                  data-testid={`domain-card-${domain.slug}`}
                >
                  <h3 className="font-fraunces text-[32px] font-normal text-[#1A1816]">{domain.name}</h3>
                  <p className="font-sans text-[16px] text-[#5C5750] leading-relaxed mt-[12px]">{domain.cardDescription}</p>

                  <div className="mt-auto pt-8 flex justify-between items-end gap-4">
                    <span className="font-mono-meta text-[#B8471C]">{statText}</span>
                    <span className="text-[20px] text-[#5C5750] group-hover:text-[#B8471C] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200 leading-none shrink-0">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
