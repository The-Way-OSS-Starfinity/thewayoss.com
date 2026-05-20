import { useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "@/lib/animations";
import { useMeta } from "@/lib/meta";
import { domainsBySlug, domains } from "@/data/domains";

export default function DomainEntryPage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const slug = params.slug ?? "";
  const domain = domainsBySlug[slug];
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!domain) {
      setLocation("/#domains", { replace: true });
    }
  }, [domain, setLocation]);

  useMeta(
    domain
      ? {
          title: `${domain.name} — A Practice of The Way OSS`,
          rawTitle: true,
          description: domain.resonance,
          url: `/domains/${domain.slug}`,
        }
      : { url: "/" },
  );

  if (!domain) return null;

  const idx = domains.findIndex((d) => d.slug === domain.slug);
  const prev = domains[(idx - 1 + domains.length) % domains.length];
  const next = domains[(idx + 1) % domains.length];

  return (
    <main className="min-h-screen bg-[#1A1816] text-[#F5F2EC]">
      {/* Quote viewport */}
      <section className="min-h-screen flex flex-col items-center justify-center px-[20px] text-center">
        <div className="max-w-[860px] flex flex-col items-center">
          <motion.blockquote
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION * 1.4, ease: EASE }}
            className="font-fraunces text-[clamp(32px,6vw,68px)] font-light tracking-[-0.02em] text-[#F5F2EC] leading-[1.15]"
            data-testid="domain-quote"
          >
            {domain.quote}
          </motion.blockquote>

          <motion.p
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.3 }}
            className="font-mono-meta text-[#9A948A] uppercase mt-8 tracking-widest text-[14px]"
            data-testid="domain-attribution"
          >
            — {domain.name.toUpperCase()}
          </motion.p>
        </div>
      </section>

      {/* Content section */}
      <section className="px-[20px] pb-[160px]">
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE }}
          viewport={{ amount: 0.2, once: true }}
          className="max-w-[720px] mx-auto"
          style={{ marginTop: "0" }}
        >
          <p className="font-mono-meta uppercase text-[13px] text-[#9A948A]" style={{ letterSpacing: "0.08em" }}>
            PRACTICES
          </p>

          <ul
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12"
            style={{ rowGap: "12px", listStyle: "none", padding: 0 }}
            data-testid="domain-practices"
          >
            {domain.practices.map((p) => (
              <li
                key={p}
                className="font-sans text-[16px] text-[#F5F2EC]"
                style={{ lineHeight: 1.6 }}
              >
                {p}
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center" style={{ marginTop: "96px" }}>
            <div
              aria-hidden="true"
              style={{ width: "64px", height: "1px", background: "#B8471C" }}
            />
            <p
              className="font-fraunces italic text-[#F5F2EC] text-center"
              style={{
                fontSize: "22px",
                lineHeight: 1.5,
                maxWidth: "640px",
                marginTop: "64px",
              }}
              data-testid="domain-resonance"
            >
              {domain.resonance}
            </p>
          </div>

          <div className="flex flex-col items-center" style={{ marginTop: "96px", gap: "16px" }}>
            <Link
              href="/"
              className="font-sans text-[13px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 tracking-wide"
              data-testid="link-return-threshold"
            >
              ← Return to the threshold
            </Link>
            <div className="font-mono-meta text-[13px] text-[#5C5750] flex items-center gap-3">
              <Link
                href={`/domains/${prev.slug}`}
                className="hover:text-[#F5F2EC] transition-colors duration-200"
                data-testid="link-prev-domain"
              >
                ← {prev.name.toLowerCase()}
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href={`/domains/${next.slug}`}
                className="hover:text-[#F5F2EC] transition-colors duration-200"
                data-testid="link-next-domain"
              >
                {next.name.toLowerCase()} →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
