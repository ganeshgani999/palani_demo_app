"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { getVariants, defaultTransition, inViewConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type AnimationVariant =
  | "fade-up"
  | "fade-in"
  | "scale"
  | "slide-left"
  | "slide-right";

export interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  animation?: AnimationVariant;
}

export function SectionWrapper({
  id,
  children,
  className,
  animation = "fade-up",
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      id={id}
      className={cn(className)}
      variants={getVariants(animation, !!reducedMotion)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={defaultTransition}
    >
      {children}
    </motion.div>
  );
}
