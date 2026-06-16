import { type Variants } from "framer-motion";

/**
 * Animation variants for scroll-triggered entrance animations.
 * Each variant defines `hidden` (initial) and `visible` (animate) states.
 */
export const variants: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
};

/** Default transition for entrance animations (500ms with CSS ease equivalent). */
export const defaultTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

/** Stagger container variant — staggers children by 200ms. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/** Default useInView configuration: trigger once, with -100px margin. */
export const inViewConfig = { once: true, margin: "-100px" as const };

/**
 * Returns animation variants for a given name. When `reducedMotion` is true,
 * returns static variants (no motion) to respect prefers-reduced-motion.
 */
export function getVariants(name: string, reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  return variants[name] || variants["fade-in"];
}
