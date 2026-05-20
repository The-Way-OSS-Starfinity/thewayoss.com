import { Link } from "wouter";
import { motion } from "framer-motion";
import { useFadeUp } from "@/lib/animations";


export default function Hero() {
  const fadeUp = useFadeUp();

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#F5F2EC]">
      <div className="flex-1 md:w-2/3 flex flex-col justify-center px-[20px] md:px-[32px] pt-[120px] md:pt-[80px] max-w-[1280px] mx-auto md:mx-0 w-full z-10">
        <motion.div {...fadeUp} className="max-w-[720px] md:pl-[32px] xl:pl-[128px]">
          <h1 className="text-postulate text-[#1A1816]">
            For practitioners who are ready to build the room they've been training in.
          </h1>
          
          <p className="font-sans text-[18px] text-[#5C5750] mt-8 md:mt-12 leading-relaxed">
            The Way OSS is the infrastructure for those becoming the leaders their community is waiting for.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-[16px]">
            <Link 
              href="/begin"
              className="bg-[#B8471C] text-[#F5F2EC] font-sans font-medium text-[16px] px-[32px] py-[16px] rounded-[2px] hover:bg-[#9C3A15] transition-colors duration-200 text-center"
              data-testid="hero-btn-begin"
            >
              Begin
            </Link>
            <a 
              href="/#journal"
              className="bg-transparent border border-[#1A1816] text-[#1A1816] font-sans font-medium text-[16px] px-[32px] py-[16px] rounded-[2px] hover:border-[#B8471C] hover:text-[#B8471C] transition-colors duration-200 text-center"
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
      <div className="w-full md:w-1/3 h-[50vh] md:h-[calc(100vh-80px)] md:absolute md:right-0 md:top-[80px] md:pt-0 md:order-last border-x border-black">
        {/* Placeholder for bespoke photography */}
        <img 
          src="/hero-image.webp" 
          alt="Practitioners shaking hands on the mat" 
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}