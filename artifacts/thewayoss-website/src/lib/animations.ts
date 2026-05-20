import { useReducedMotion } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const DURATION = 0.6;
export const HOVER_DURATION = 0.2;
export const PAGE_TRANSITION_DURATION = 0.18;

export function useFadeUp() {
  const shouldReduce = useReducedMotion();
  return {
    initial: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION, ease: EASE },
  };
}

export function useScrollFadeUp(delay = 0) {
  const shouldReduce = useReducedMotion();
  return {
    initial: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: DURATION, ease: EASE, delay: shouldReduce ? 0 : delay },
    viewport: { amount: 0.2, once: true } as const,
  };
}
