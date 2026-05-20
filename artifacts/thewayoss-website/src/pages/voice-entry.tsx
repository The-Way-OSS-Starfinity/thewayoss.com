import { useParams, Link, Redirect } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { voices } from "@/data/voices";
import { ShareLink } from "@/components/ShareLink";
import { VoiceCurrents } from "@/components/CrossCurrents";
import { useMeta } from "@/lib/meta";
import { EASE, DURATION } from "@/lib/animations";

const BASE_URL = "https://thewayoss.com";

function getFirstSentence(body: string): string {
  const first = body.split(/\n\n/)[0] ?? "";
  const match = first.match(/^[^.!?]*[.!?]/);
  const raw = match ? match[0] : first;
  return raw.length > 160 ? raw.slice(0, 157) + "…" : raw;
}

export default function VoiceEntryPage() {
  const { slug } = useParams<{ slug: string }>();
  const voice = voices.find((v) => v.slug === slug);
  const shouldReduce = useReducedMotion();

  useMeta(
    voice
      ? {
          title: `${voice.firstName} — A Voice from The Way OSS`,
          description: getFirstSentence(voice.body),
          url: `/voices/${voice.slug}`,
          type: "article",
          image: `${BASE_URL}/images/og/voices/${voice.slug}.jpg`,
        }
      : {}
  );

  if (!voice) {
    return <Redirect to="/#voices" />;
  }

  const paragraphs = voice.body.split("\n\n");
  const canonicalUrl = `${BASE_URL}/voices/${voice.slug}`;

  return (
    <>
      <Nav />
      <main style={{ paddingTop: "80px", minHeight: "100vh", background: "#F5F2EC" }}>
        <article className="max-w-[720px] mx-auto px-[20px] md:px-[32px] py-[96px]">

          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            <img
              src={voice.imagePath}
              alt={voice.imageAlt}
              width={voice.imageWidth}
              height={voice.imageHeight}
              decoding="async"
              style={{
                width: "100%",
                display: "block",
                filter: "brightness(0.97) saturate(0.92)",
              }}
            />
          </motion.div>

          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.12 }}
            style={{ marginTop: "64px" }}
          >
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-fraunces italic text-[#1A1816] leading-[1.6]"
                style={{
                  fontSize: "21px",
                  marginTop: i > 0 ? "32px" : 0,
                }}
              >
                {para}
              </p>
            ))}

            <p
              className="font-mono-meta text-[#5C5750]"
              style={{ marginTop: "48px" }}
            >
              — {voice.firstName} · {voice.practice} · {voice.location}
            </p>
          </motion.div>

          {voice.shareable && (
            <motion.div
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.2 }}
            >
              <ShareLink
                url={canonicalUrl}
                title={`${voice.firstName} — A Voice from The Way OSS`}
                text={getFirstSentence(voice.body)}
              />
            </motion.div>
          )}

          <VoiceCurrents voice={voice} />

          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : 0.24 }}
            className="text-center"
            style={{ marginTop: "64px", paddingTop: "64px", borderTop: "1px solid #D9D2C4" }}
          >
            <Link
              href="/voices"
              className="font-sans text-[16px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
            >
              ← All voices
            </Link>
            <div style={{ marginTop: "32px" }}>
              <Link
                href="/"
                className="font-sans text-[16px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200"
              >
                ← Return to the threshold
              </Link>
            </div>
          </motion.div>

        </article>
      </main>
      <Footer />
    </>
  );
}
