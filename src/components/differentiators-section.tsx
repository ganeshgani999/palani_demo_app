"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  PackageSearch,
  Truck,
  ShieldCheck,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { differentiators } from "@/lib/site-data";
import {
  staggerContainer,
  getVariants,
  defaultTransition,
  inViewConfig,
} from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  PackageSearch,
  Truck,
  ShieldCheck,
  TrendingDown,
};

export function DifferentiatorsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig);
  const reducedMotion = useReducedMotion();

  const fadeUpVariants = getVariants("fade-up", !!reducedMotion);

  return (
    <section
      id="differentiators"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-[32px] font-semibold text-[#0B1F3F] mb-4">
          What Sets Us Apart
        </h2>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6"
        >
          {differentiators.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={fadeUpVariants}
                transition={defaultTransition}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col items-center text-center">
                  {Icon && (
                    <Icon
                      className="text-[#F47920]"
                      size={40}
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="mt-4 text-[16px] font-semibold text-[#0B1F3F]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
