import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { EASE, DURATION } from "@/lib/animations";
import { voices, type Voice } from "@/data/voices";
import { HOMEPAGE_VOICES_LIMIT } from "@/lib/constants";

function getDisplayVoices(): Voice[] {
  // Homepage displays the 3 most recent voices. Full archive at /voices.
  // This cap is intentional editorial restraint — do not increase without discussion.
  return [...voices]
    .sort((a, b) => b.order - a.order)
    .slice(0, HOMEPAGE_VOICES_LIMIT);
}

export default function Voices() {
  const shouldReduce = useReducedMotion();
  const displayVoices = getDisplayVoices();

  return (
    <section id="voices" className="w-full bg-[#F5F2EC] py-[64px] md:py-[112px]">
      <div className="max-w-[1280px] mx-auto px-[20px] md:px-[32px]">

        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION, ease: EASE }}
          viewport={{ amount: 0.2, once: true }}
          className="mb-[96px]"
        >
          <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">Voices</h2>
          <p className="font-mono-meta text-[#5C5750] uppercase mt-2">PRACTITIONERS IN THEIR OWN WORDS · UNEDITED</p>
        </motion.div>

        <div>
          {displayVoices.map((voice, i) => (
            <motion.article
              key={voice.slug}
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : i * 0.08 }}
              viewport={{ amount: 0.1, once: true }}
              className={i > 0 ? "mt-[128px] pt-[128px] border-t border-[#D9D2C4]" : ""}
              aria-label={`Voice entry by ${voice.firstName}`}
            >
              <VoiceTeaser voice={voice} />
            </motion.article>
          ))}
        </div>

        <div className="mt-[96px] text-center flex flex-col items-center gap-6">
          <Link
            href="/voices"
            className="font-sans italic text-[18px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
          >
            See all voices →
          </Link>
          <a
            href="mailto:hello@thewayoss.app"
            className="font-sans italic text-[18px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
          >
            Share yours →
          </a>
        </div>

      </div>
    </section>
  );
}

function VoiceTeaser({ voice }: { voice: Voice }) {
  const firstParagraph = voice.body.split("\n\n")[0];

  if (voice.imageOrientation === "horizontal") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[48px] md:gap-x-0">
        <div className="md:col-span-5">
          <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
            <img
              src={voice.imagePath}
              alt={voice.imageAlt}
              width={voice.imageWidth}
              height={voice.imageHeight}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.97) saturate(0.92)",
                display: "block",
              }}
            />
          </div>
        </div>

        <div className="md:col-span-1" aria-hidden="true" />

        <div className="md:col-span-6 flex flex-col">
          <p className="font-fraunces italic text-[19px] text-[#1A1816] leading-[1.6]">
            {firstParagraph}
          </p>
          <p className="font-mono-meta text-[#5C5750] mt-[24px]">
            — {voice.firstName} · {voice.practice} · {voice.location}
          </p>
          <Link
            href={`/voices/${voice.slug}`}
            className="font-sans text-[14px] text-[#B8471C] hover:text-[#9C3A15] hover:underline mt-[24px] transition-colors duration-200 self-start"
          >
            Read the entry →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[720px] mx-auto">
      <div style={{ aspectRatio: "2/3", overflow: "hidden" }}>
        <img
          src={voice.imagePath}
          alt={voice.imageAlt}
          width={voice.imageWidth}
          height={voice.imageHeight}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.97) saturate(0.92)",
            display: "block",
          }}
        />
      </div>
      <div className="mt-[48px]">
        <p className="font-fraunces italic text-[19px] text-[#1A1816] leading-[1.6]">
          {firstParagraph}
        </p>
        <p className="font-mono-meta text-[#5C5750] mt-[24px]">
          — {voice.firstName} · {voice.practice} · {voice.location}
        </p>
        <Link
          href={`/voices/${voice.slug}`}
          className="font-sans text-[14px] text-[#B8471C] hover:text-[#9C3A15] hover:underline mt-[24px] transition-colors duration-200 inline-block"
        >
          Read the entry →
        </Link>
      </div>
    </div>
  );
}
