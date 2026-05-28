import { motion } from "framer-motion";
import { useFadeUp } from "@/lib/animations";
import heroWebpSrcset from "../../assets/hero-image.webp?w=400;600;800;1200&format=webp&as=srcset";
import heroRaw from "../../assets/hero-image.webp";


export default function Hero() {
  const fadeUp = useFadeUp();

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#F5F2EC]">

      {/* Text column — left 2/3 on desktop */}
      <div className="flex-1 lg:w-2/3 flex flex-col justify-center px-5 lg:px-8 pt-28 pb-10 lg:pt-20 lg:pb-0 max-w-[1280px] mx-auto lg:mx-0 w-full z-10">
        <motion.div {...fadeUp} className="max-w-[720px] lg:pl-8 xl:pl-32">
          <h1 className="text-postulate text-[#1A1816]">
            Your academy is more than a place to train.
          </h1>

          <p className="font-sans text-[18px] text-[#5C5750] mt-8 lg:mt-12 leading-relaxed">
            The Way OSS helps Jiu-Jitsu gyms become stronger communities — where members connect, grow, return, and belong.
          </p>

          <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="https://thewayoss.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B8471C] text-[#F5F2EC] font-sans font-medium text-[16px] px-8 py-4 rounded-[2px] hover:bg-[#9C3A15] transition-colors duration-200 text-center"
              data-testid="hero-btn-begin"
            >
              Begin
            </a>
            <a
              href="/#journal"
              className="bg-transparent border border-[#1A1816] text-[#1A1816] font-sans font-medium text-[16px] px-8 py-4 rounded-[2px] hover:border-[#B8471C] hover:text-[#B8471C] transition-colors duration-200 text-center"
              data-testid="hero-btn-journal"
            >
              See what we're building
            </a>
          </div>

          <div className="mt-8">
            <span className="font-mono-meta text-[#5C5750]">
              v1.1 · 6 domains live · built by practitioners · The Way OSS
            </span>
          </div>
        </motion.div>
      </div>

      {/*
        Image column
        ─────────────────────────────────────────────────────────────────
        Mobile (< lg):
          • Full viewport width, h-auto → renders at the image's
            natural portrait proportions. Both baked-in text overlays
            ("THIS IS NOT ANOTHER APP" and "THIS IS THE WAY.") remain
            fully visible — no cropping.

        Desktop (≥ lg):
          • Absolute right column pinned to the full viewport height.
          • Explicit lg:h-screen so h-full on the img resolves correctly.
          • object-top anchors the "THIS IS NOT ANOTHER APP" headline
            at the top of the column rather than centering it.

        Performance:
          • src={heroRaw} loads immediately — no imagetools transform.
          • srcSet swaps in optimised webp variants progressively once
            the dev server has processed them (production build pre-bakes
            these at build time, so there is no delay in prod).
      */}
      <div className="w-full lg:w-1/3 lg:absolute lg:right-0 lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-hidden lg:bg-[#1A1816]">
        <img
          src={heroRaw}
          srcSet={heroWebpSrcset}
          sizes="(max-width: 1024px) 100vw, 33vw"
          alt="Practitioners training on the mat"
          className="w-full h-auto lg:h-full lg:object-cover lg:object-center"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width={1200}
          height={1800}
        />
      </div>

    </section>
  );
}
