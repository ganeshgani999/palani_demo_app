"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Warehouse, BadgeCheck, Handshake, Sprout, type LucideIcon } from "lucide-react";
import { trustSignals } from "@/lib/site-data";
import { getVariants, defaultTransition, inViewConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Warehouse,
  BadgeCheck,
  Handshake,
  Sprout,
};

function TrustSignalRow({ icon, title, description, index }: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig);
  const reducedMotion = useReducedMotion();

  const isOdd = index % 2 === 0; // 0-indexed: first row is "odd" (index 0)
  const animation = isOdd ? "slide-left" : "slide-right";
  const Icon = iconMap[icon];

  return (
    <motion.div
      ref={ref}
      variants={getVariants(animation, !!reducedMotion)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={defaultTransition}
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-center",
        !isOdd && "md:flex-row-reverse"
      )}
    >
      {/* Icon + Title side */}
      <div className={cn(
        "flex items-center gap-4 md:w-[60%] lg:w-1/2",
        !isOdd && "md:w-[40%] lg:w-1/2"
      )}>
        <div className="flex-shrink-0 rounded-full bg-orange-50 p-3 sm:p-4">
          {Icon && <Icon className="h-10 w-10 sm:h-16 sm:w-16 text-orange-500" strokeWidth={1.5} aria-hidden="true" />}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-[#0B1F3F]">{title}</h3>
      </div>

      {/* Description side */}
      <div className={cn(
        "md:w-[40%] lg:w-1/2",
        !isOdd && "md:w-[60%] lg:w-1/2"
      )}>
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export function WhyPartnerSection() {
  return (
    <section
      id="why-partner"
      className="bg-[#F9FAFB] py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading with orange accent bar */}
        <div className="mb-12 flex items-center gap-3">
          <div className="h-8 w-1 bg-[#F47920] rounded-sm" aria-hidden="true" />
          <h2 className="text-2xl sm:text-[32px] font-semibold text-[#0B1F3F]">
            Why Partner With Us
          </h2>
        </div>

        {/* Trust signal rows */}
        <div className="flex flex-col gap-12">
          {trustSignals.map((signal, index) => (
            <TrustSignalRow
              key={signal.title}
              icon={signal.icon}
              title={signal.title}
              description={signal.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
