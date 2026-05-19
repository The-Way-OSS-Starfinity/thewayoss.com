import { useState, useEffect, useRef } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full bg-[#F5F2EC] min-h-screen">
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-400"
        style={{
          background: scrolled ? "rgba(245,242,236,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid #D9D2C4" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
          <a href="/" className="font-sans font-medium text-[16px] text-[#1A1816] cursor-pointer">
            The Way OSS
          </a>
          <div className="hidden sm:flex flex-row items-center gap-6">
            <a href="#pillars" className="font-sans text-[14px] text-[#1A1816] hover:text-[#5C5750] transition-colors duration-200">Pillars</a>
            <a href="#journal" className="font-sans text-[14px] text-[#1A1816] hover:text-[#5C5750] transition-colors duration-200">Journal</a>
            <a href="#voices" className="font-sans text-[14px] text-[#1A1816] hover:text-[#5C5750] transition-colors duration-200">Voices</a>
            <a href="#threshold" className="font-sans text-[14px] font-medium text-[#B8471C] hover:text-[#9C3A15] transition-colors duration-200">Begin</a>
          </div>
          <button
            className="sm:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px] focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-[1.5px] bg-[#1A1816] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-[#1A1816] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-[#1A1816] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden bg-[#F5F2EC] border-t border-[#D9D2C4] px-5 py-4 flex flex-col gap-4">
            <a href="#pillars" className="font-sans text-[14px] text-[#1A1816]" onClick={() => setMenuOpen(false)}>Pillars</a>
            <a href="#journal" className="font-sans text-[14px] text-[#1A1816]" onClick={() => setMenuOpen(false)}>Journal</a>
            <a href="#voices" className="font-sans text-[14px] text-[#1A1816]" onClick={() => setMenuOpen(false)}>Voices</a>
            <a href="#threshold" className="font-sans text-[14px] font-medium text-[#B8471C]" onClick={() => setMenuOpen(false)}>Begin</a>
          </div>
        )}
      </nav>

      <main>
        {/* HERO */}
        <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#F5F2EC]">
          <div className="flex-1 md:w-2/3 flex flex-col justify-center px-5 md:px-8 pt-[120px] md:pt-[80px] max-w-[1280px] mx-auto md:mx-0 w-full z-10">
            <div className="max-w-[720px] md:pl-8 xl:pl-32">
              <h1 className="text-postulate text-[#1A1816]">
                For practitioners who are ready to build the room they've been training in.
              </h1>
              <p className="font-sans text-[18px] text-[#5C5750] mt-8 md:mt-12 leading-relaxed">
                The Way OSS is the infrastructure for those becoming the leaders their community is waiting for.
              </p>
              <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-4">
                <a
                  href="#threshold"
                  className="bg-[#B8471C] text-[#F5F2EC] font-sans font-medium text-[16px] px-8 py-4 rounded-[2px] hover:bg-[#9C3A15] transition-colors duration-200 text-center"
                >
                  Begin
                </a>
                <a
                  href="#journal"
                  className="bg-transparent border border-[#1A1816] text-[#1A1816] font-sans font-medium text-[16px] px-8 py-4 rounded-[2px] hover:border-[#B8471C] hover:text-[#B8471C] transition-colors duration-200 text-center"
                >
                  See what we're building
                </a>
              </div>
              <div className="mt-8">
                <span className="font-mono-meta text-[#5C5750]">v1.1 · 6 domains live · built by practitioners · The Way OSS</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 h-[50vh] md:h-[calc(100vh-80px)] md:absolute md:right-0 md:top-[80px]">
            <img
              src="https://thewayoss.com/hero-image.webp"
              alt="Practitioners shaking hands on the mat"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* SCROLL STATEMENTS */}
        <section className="w-full bg-[#F5F2EC]">
          {[
            "The world is being disrupted faster than meaning can keep up.",
            "Ancient practices already solved this. They were missing distribution.",
            "We are building the operating system for the practitioners who will lead what comes next.",
          ].map((text) => (
            <div key={text} className="min-h-[85svh] w-full flex items-center px-5 md:px-8 max-w-[1280px] mx-auto">
              <Reveal>
                <h2 className="text-postulate text-[#1A1816] max-w-[960px]">{text}</h2>
              </Reveal>
            </div>
          ))}
        </section>

        {/* FIVE PILLARS */}
        <section id="pillars" className="w-full bg-[#F5F2EC] py-16 md:py-28">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <div className="mb-16">
              <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">Five Pillars</h2>
              <p className="font-mono-meta text-[#5C5750] uppercase mt-2">THE IMMUTABLE FOUNDATION · UNCHANGING</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { kanji: "間", name: "MA", desc: "The interval that holds the rest in place.", href: "/pillars/ma" },
                { kanji: "簡素", name: "KANSO", desc: "Simplicity earned by what you take away.", href: "/pillars/kanso" },
                { kanji: "自然", name: "SHIZEN", desc: "Naturalness — what arrives without strain.", href: "/pillars/shizen" },
              ].map(({ kanji, name, desc, href }) => (
                <Reveal key={name}>
                  <a href={href} className="block h-full no-underline">
                    <div className="bg-[#EDE8DD] p-6 md:p-10 min-h-[280px] h-full rounded-[2px] border border-transparent hover:border-[#B8471C] transition-colors duration-200 flex flex-col cursor-pointer">
                      <span className="font-fraunces text-[96px] leading-none text-[#B8471C]">{kanji}</span>
                      <h3 className="font-sans font-medium text-[20px] text-[#1A1816] mt-8">{name}</h3>
                      <p className="font-fraunces italic text-[18px] text-[#5C5750] mt-4">{desc}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
              <div className="md:col-span-3 flex flex-col md:flex-row justify-center gap-6">
                {[
                  { kanji: "渋味", name: "SHIBUI", desc: "Beauty that rewards return.", href: "/pillars/shibui" },
                  { kanji: "誠", name: "MAKOTO", desc: "Sincerity — the deed and the word as one thing.", href: "/pillars/makoto" },
                ].map(({ kanji, name, desc, href }) => (
                  <div key={name} className="w-full md:w-[calc(33.333%-16px)]">
                    <Reveal>
                      <a href={href} className="block h-full no-underline">
                        <div className="bg-[#EDE8DD] p-6 md:p-10 min-h-[280px] h-full rounded-[2px] border border-transparent hover:border-[#B8471C] transition-colors duration-200 flex flex-col cursor-pointer">
                          <span className="font-fraunces text-[96px] leading-none text-[#B8471C]">{kanji}</span>
                          <h3 className="font-sans font-medium text-[20px] text-[#1A1816] mt-8">{name}</h3>
                          <p className="font-fraunces italic text-[18px] text-[#5C5750] mt-4">{desc}</p>
                        </div>
                      </a>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SIX PRACTICES */}
        <section id="domains" className="w-full bg-[#F5F2EC] py-16 md:py-28">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <div className="mb-16">
              <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">Six Practices</h2>
              <p className="font-mono-meta text-[#5C5750] uppercase mt-2">WHERE LEADERS ARE BEING FORGED · COUNTS GO LIVE AT LAUNCH</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Martial Arts", desc: "For those whose first teacher was the mat, the floor, the opponent who wouldn't let them lie to themselves.", meta: "0 practitioners · 0 dojos seeded", href: "/domains/martial-arts" },
                { name: "Contemplative", desc: "For those who know that stillness is the hardest practice.", meta: "0 practitioners · 0 sanghas seeded", href: "/domains/contemplative" },
                { name: "Creative", desc: "For those whose work exists only because they refused to stop making it.", meta: "0 practitioners · 0 studios seeded", href: "/domains/creative" },
                { name: "Entrepreneurial", desc: "For those building something that didn't exist, for people who didn't know they needed it.", meta: "0 practitioners · 0 cohorts seeded", href: "/domains/entrepreneurial" },
                { name: "Healing", desc: "For those whose hands and presence are the instrument.", meta: "0 practitioners · 0 practices seeded", href: "/domains/healing" },
                { name: "Technical", desc: "For those who build the infrastructure that everything else stands on.", meta: "0 practitioners · 0 guilds seeded", href: "/domains/technical" },
              ].map(({ name, desc, meta, href }) => (
                <Reveal key={name} className="h-full">
                  <a
                    href={href}
                    className="flex flex-col bg-[#F5F2EC] border border-[#D9D2C4] p-6 md:p-8 min-h-[240px] rounded-[2px] hover:border-[#B8471C] transition-colors duration-200 group cursor-pointer h-full"
                  >
                    <h3 className="font-fraunces text-[32px] font-normal text-[#1A1816]">{name}</h3>
                    <p className="font-sans text-[16px] text-[#5C5750] leading-relaxed mt-3">{desc}</p>
                    <div className="mt-auto pt-8 flex justify-between items-end gap-4">
                      <span className="font-mono-meta text-[#B8471C]">{meta}</span>
                      <span className="text-[20px] text-[#5C5750] group-hover:text-[#B8471C] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200 leading-none shrink-0">→</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNAL */}
        <section id="journal" className="w-full bg-[#F5F2EC] pt-16 md:pt-28 pb-12 md:pb-18">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <Reveal className="mb-16 text-center md:text-left">
              <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">The Practice of Building</h2>
              <p className="font-mono-meta text-[#5C5750] uppercase mt-2">WHAT WE SHIPPED · WHAT WE LEARNED · WHAT'S NEXT</p>
            </Reveal>
            <div className="max-w-[720px] mx-auto flex flex-col">
              <Reveal>
                <div className="font-mono-meta text-[#5C5750] uppercase">2026.04.26 · field notes</div>
                <h3 className="font-fraunces text-[28px] font-normal text-[#1A1816] mt-4 leading-snug">What the Belt Doesn't Measure</h3>
                <p className="font-sans text-[18px] text-[#5C5750] leading-relaxed mt-4">
                  There is a quiet truth that most senior practitioners of grappling will admit, but rarely in public: the belt around your waist tells you something about how you move on the mat. It tells you very little about who you've become because of the mat.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <a href="/journal/what-the-belt-doesnt-measure" className="font-sans text-[16px] text-[#B8471C] hover:text-[#9C3A15] hover:underline transition-colors duration-200">Read the full entry →</a>
                  <a href="/journal" className="font-sans text-[16px] text-[#B8471C] hover:text-[#9C3A15] hover:underline transition-colors duration-200">See all entries →</a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* VOICES */}
        <section id="voices" className="w-full bg-[#F5F2EC] py-16 md:py-28">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <Reveal className="mb-24">
              <h2 className="font-fraunces text-[48px] font-normal text-[#1A1816]">Voices</h2>
              <p className="font-mono-meta text-[#5C5750] uppercase mt-2">PRACTITIONERS IN THEIR OWN WORDS · UNEDITED</p>
            </Reveal>
            <div>
              {[
                {
                  img: "https://thewayoss.com/images/voices/h-wide-angle-dual-focus-01.webp",
                  alt: "Cj in a blue gi with black belt shaking hands with a training partner",
                  quote: "The word is community, but the word beneath it is older. Com-unus. With oneness. The togetherness of people who have become the same kind of people.",
                  meta: "— Cj · jiu-jitsu practitioner, founder · Sarasota, Florida",
                  link: "/voices/cj-common-unity-sarasota",
                  mt: false,
                },
                {
                  img: "https://thewayoss.com/images/voices/h-transitional-position-mount-01.webp",
                  alt: "Two jiu-jitsu practitioners kneeling on a mat in conversation",
                  quote: "There is a version of the black belt who believes they have arrived.",
                  meta: "— Cj · jiu-jitsu practitioner, founder · Bradenton, Florida",
                  link: "/voices/cj-staying-a-student-bradenton",
                  mt: true,
                },
                {
                  img: "https://thewayoss.com/images/voices/voices-cj-jiujitsu-2400.jpg",
                  alt: "Three jiu-jitsu practitioners training on a grey mat",
                  quote: "I walked into the gym for the first time on a small decision that turned out to matter more than any of the bigger ones I had been making.",
                  meta: "— Cj · jiu-jitsu practitioner, founder · Bradenton, Florida",
                  link: "/voices/cj-jiujitsu-bradenton",
                  mt: true,
                },
              ].map(({ img, alt, quote, meta, link, mt }) => (
                <Reveal key={link}>
                  <article
                    className={mt ? "mt-32 pt-32 border-t border-[#D9D2C4]" : ""}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12">
                      <div className="md:col-span-5">
                        <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
                          <img
                            src={img}
                            alt={alt}
                            loading="lazy"
                            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.97) saturate(0.92)", display: "block" }}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-1" />
                      <div className="md:col-span-6 flex flex-col">
                        <p className="font-fraunces italic text-[19px] text-[#1A1816] leading-[1.6]">{quote}</p>
                        <p className="font-mono-meta text-[#5C5750] mt-6">{meta}</p>
                        <a href={link} className="font-sans text-[14px] text-[#B8471C] hover:text-[#9C3A15] hover:underline mt-6 transition-colors duration-200 self-start">
                          Read the entry →
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="mt-24 text-center flex flex-col items-center gap-6">
              <a href="/voices" className="font-sans italic text-[18px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200">See all voices →</a>
              <a href="mailto:hello@thewayoss.app" className="font-sans italic text-[18px] text-[#5C5750] hover:text-[#B8471C] transition-colors duration-200">Share yours →</a>
            </div>
          </div>
        </section>

        {/* THRESHOLD CTA */}
        <section id="threshold" className="w-full min-h-[100svh] bg-[#1A1816] flex items-center justify-center relative">
          <div className="flex flex-col items-center text-center px-5">
            <Reveal>
              <h2
                className="font-fraunces font-light tracking-[-0.02em] text-[#F5F2EC]"
                style={{ fontSize: "clamp(48px, 7vw, 72px)" }}
              >
                Step onto the mat.
              </h2>
            </Reveal>
            <Reveal className="mt-12">
              <a
                href="#"
                className="inline-block bg-[#B8471C] text-[#F5F2EC] font-sans font-medium text-[20px] px-10 py-5 rounded-[2px] hover:bg-[#9C3A15] transition-colors duration-200"
              >
                Begin
              </a>
            </Reveal>
            <Reveal className="mt-8">
              <span className="font-mono-meta text-[#9A948A] uppercase">V1.1 · WELCOME · MAKOTO</span>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1816] text-[#F5F2EC] py-16 border-t border-[#2E2A25]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="flex flex-col">
                <span className="font-sans font-medium text-[16px] text-[#F5F2EC]">The Way OSS</span>
                <span className="font-fraunces italic text-[16px] text-[#9A948A] mt-4">Infrastructure for practitioners becoming leaders.</span>
                <span className="font-mono-meta text-[#9A948A] mt-6 uppercase">© 2026 · The Way OSS</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-mono-meta text-[#9A948A] uppercase">SITE</h3>
                <div className="mt-4 flex flex-col space-y-3">
                  <a href="#pillars" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200">Pillars</a>
                  <a href="#journal" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200">Journal</a>
                  <a href="#voices" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200">Voices</a>
                  <a href="#threshold" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200">Begin</a>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-mono-meta text-[#9A948A] uppercase">PRODUCT</h3>
                <a href="https://thewayoss.app" target="_blank" rel="noopener noreferrer" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 mt-4">thewayoss.app →</a>
                <span className="font-sans text-[14px] text-[#9A948A] mt-2">the mat lives there</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-mono-meta text-[#9A948A] uppercase">SYSTEM</h3>
                <span className="font-mono-meta text-[#9A948A] mt-4 normal-case">v1.1</span>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-green-500" />
                  <span className="font-sans text-[13px] text-[#9A948A]">all systems operational</span>
                </div>
                <a href="mailto:support@thewayoss.app" className="font-sans text-[14px] text-[#9A948A] hover:text-[#F5F2EC] transition-colors duration-200 mt-2">support@thewayoss.app</a>
              </div>
            </div>
          </Reveal>
          <div className="w-full mt-12 pt-8 border-t border-[#2E2A25] text-center">
            <span className="font-mono-meta text-[#9A948A] uppercase">MAKOTO — WE SAY WHAT WE DO AND DO WHAT WE SAY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
