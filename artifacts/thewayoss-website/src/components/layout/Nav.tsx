import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

interface NavProps {
  theme?: "light" | "dark";
}

export default function Nav({ theme = "light" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const isDark = theme === "dark";

  const textColor = isDark ? "text-[#F5F2EC]" : "text-[#1A1816]";
  const textHover = isDark ? "hover:text-[#9A948A]" : "hover:text-[#5C5750]";
  const barColor = isDark ? "bg-[#F5F2EC]" : "bg-[#1A1816]";
  const activeBorder = isDark ? "border-b border-[#F5F2EC]" : "border-b border-[#1A1816]";

  const navBg = scrolled || menuOpen
    ? isDark
      ? "bg-[#1A1816] border-b border-[#2E2B27]"
      : "bg-[#F5F2EC] border-b border-[#D9D2C4]"
    : "bg-transparent border-transparent";

  const drawerBg = isDark ? "bg-[#1A1816]" : "bg-[#F5F2EC]";

  const navLinkClass = (path: string) => {
    const isActive = location === path || location.startsWith(path + "/");
    return `font-sans text-[14px] ${textColor} ${textHover} transition-colors duration-200 sm:py-0 sm:px-0 ${
      isActive ? `font-medium ${activeBorder}` : ""
    }`;
  };

  const drawerLinkClass = (path: string) => {
    const isActive = location === path || location.startsWith(path + "/");
    const activeDl = isDark ? "border-l-2 border-[#F5F2EC]" : "border-l-2 border-[#1A1816]";
    return `font-sans text-[22px] ${textColor} transition-colors duration-200 py-4 px-6 w-full text-left block ${
      isActive ? `font-medium ${activeDl}` : textHover
    }`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.9;
      setScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${navBg}`}
      >
        <div className="max-w-[1280px] mx-auto px-[20px] md:px-[32px] h-[80px] flex items-center justify-between">
          <Link
            href="/"
            className={`font-sans font-medium text-[16px] ${textColor} cursor-pointer`}
            data-testid="link-home"
            onClick={(e) => {
              if (location === "/") {
                e.preventDefault();
                const prefersReduced =
                  typeof window !== "undefined" &&
                  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
                window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
              }
            }}
          >
            The Way OSS
          </Link>

          <div className="hidden sm:flex flex-row items-center gap-6">
            <Link href="/pillars" className={navLinkClass("/pillars")} data-testid="link-pillars">
              Pillars
            </Link>
            <Link href="/journal" className={navLinkClass("/journal")} data-testid="link-journal">
              Journal
            </Link>
            <Link href="/voices" className={navLinkClass("/voices")} data-testid="link-voices">
              Voices
            </Link>
            <a href="https://thewayoss.app/" target="_blank" rel="noopener noreferrer" className="font-sans text-[14px] font-medium text-[#B8471C] hover:text-[#9C3A15] transition-colors duration-200" data-testid="link-begin">
              Begin
            </a>
          </div>

          <button
            className="sm:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px] focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-testid="hamburger-button"
          >
            <span
              className={`block w-6 h-[1.5px] ${barColor} transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] ${barColor} transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] ${barColor} transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className={`sm:hidden fixed inset-0 z-40 ${drawerBg}`}
          style={{ paddingTop: "80px" }}
          data-testid="mobile-menu"
        >
          <div
            className="absolute inset-0"
            style={{ paddingTop: "80px" }}
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative flex flex-col pt-4">
            <Link href="/pillars" className={drawerLinkClass("/pillars")} data-testid="mobile-link-pillars">
              Pillars
            </Link>
            <Link href="/journal" className={drawerLinkClass("/journal")} data-testid="mobile-link-journal">
              Journal
            </Link>
            <Link href="/voices" className={drawerLinkClass("/voices")} data-testid="mobile-link-voices">
              Voices
            </Link>
            <a
              href="https://thewayoss.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[22px] font-medium text-[#B8471C] hover:text-[#9C3A15] transition-colors duration-200 py-4 px-6 w-full text-left block"
              data-testid="mobile-link-begin"
              onClick={() => setMenuOpen(false)}
            >
              Begin
            </a>
          </div>
        </div>
      )}
    </>
  );
}
