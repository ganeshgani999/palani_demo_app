"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { getVariants, defaultTransition, inViewConfig } from "@/lib/animations";
import { siteConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, inViewConfig);
  const rightInView = useInView(rightRef, inViewConfig);
  const reducedMotion = useReducedMotion();

  const fadeUpVariants = getVariants("fade-up", !!reducedMotion);
  const scaleVariants = getVariants("scale", !!reducedMotion);

  return (
    <section
      id="about"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[55fr_45fr] lg:grid-cols-[60fr_40fr]">
          {/* Left column — text content */}
          <motion.div
            ref={leftRef}
            variants={fadeUpVariants}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            transition={defaultTransition}
          >
            <h2 className="text-2xl sm:text-[32px] font-semibold leading-tight text-[#0B1F3F]">
              About MartBridge
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              {siteConfig.description}
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-600">
              We empower local retail stores with access to quality products at
              competitive prices and dependable delivery — so you can focus on
              serving your customers while we take care of the supply chain.
            </p>

            {/* Founder attribution */}
            <div className="mt-8 border-l-4 border-[#F47920] pl-4">
              <p className="text-base font-semibold text-[#0B1F3F]">
                {siteConfig.founder.name}
              </p>
              <p className="text-sm text-gray-600">
                {siteConfig.founder.title}
              </p>
            </div>
          </motion.div>

          {/* Right column — abstract SVG illustration placeholder */}
          <motion.div
            ref={rightRef}
            variants={scaleVariants}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            transition={defaultTransition}
            className="relative flex items-center justify-center max-h-[240px] md:max-h-none"
            aria-hidden="true"
          >
            <div className="relative h-64 w-full md:h-80">
              {/* Large navy circle */}
              <div
                className={cn(
                  "absolute left-[10%] top-[10%] h-36 w-36 rounded-full",
                  "bg-[#0B1F3F] opacity-20"
                )}
              />
              {/* Orange rectangle */}
              <div
                className={cn(
                  "absolute right-[15%] top-[20%] h-28 w-20 rounded-lg",
                  "bg-[#F47920] opacity-30"
                )}
              />
              {/* Small navy rectangle */}
              <div
                className={cn(
                  "absolute bottom-[15%] left-[25%] h-20 w-32 rounded-lg",
                  "bg-[#0B1F3F] opacity-15"
                )}
              />
              {/* Medium orange circle */}
              <div
                className={cn(
                  "absolute bottom-[25%] right-[10%] h-24 w-24 rounded-full",
                  "bg-[#F47920] opacity-25"
                )}
              />
              {/* Small navy circle accent */}
              <div
                className={cn(
                  "absolute left-[45%] top-[5%] h-12 w-12 rounded-full",
                  "bg-[#0B1F3F] opacity-30"
                )}
              />
              {/* Overlapping orange square */}
              <div
                className={cn(
                  "absolute left-[35%] top-[40%] h-16 w-16 rotate-12 rounded-md",
                  "bg-[#F47920] opacity-20"
                )}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
