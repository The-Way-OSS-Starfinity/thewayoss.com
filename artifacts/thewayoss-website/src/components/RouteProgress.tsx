import { useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { PAGE_TRANSITION_DURATION, EASE } from "@/lib/animations";

/**
 * Thin orange progress bar that animates 0→100% on every route change,
 * then fades out. Quiet affordance to reassure visitors that a click
 * registered, especially on slower connections where the new page's
 * paint can lag the URL change.
 *
 * Suppressed entirely when prefers-reduced-motion is set.
 */
export function RouteProgress() {
  const [location] = useLocation();
  const shouldReduce = useReducedMotion();

  if (typeof window === "undefined" || shouldReduce) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <motion.div
        key={location}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{
          duration: PAGE_TRANSITION_DURATION + 0.25,
          times: [0, 0.7, 1],
          ease: EASE,
        }}
        style={{
          height: "100%",
          background: "#B8471C",
          transformOrigin: "0% 50%",
        }}
      />
    </div>
  );
}
