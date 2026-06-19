"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MartBridgeLogo } from "@/components/icons/martbridge-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-data";
import { getVariants, defaultTransition, inViewConfig } from "@/lib/animations";

const HERO_PHOTO_SRC = "/images/hero-photo.jpeg";
const HERO_PHOTO_ALT =
  "MartBridge warehouse team preparing wholesale product shipments for retail partners";

export function HeroSection() {
  const [imageError, setImageError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig);
  const reducedMotion = useReducedMotion();

  const fadeUpVariants = getVariants("fade-up", !!reducedMotion);
  const fadeInVariants = getVariants("fade-in", !!reducedMotion);

  const handleCtaClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-16 flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #0B1F3F 0%, #071528 100%)",
      }}
    >
      <div
        ref={ref}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-[80px] grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-8 md:gap-12 items-center"
      >
        {/* Text Column */}
        <motion.div
          className="flex flex-col items-start text-left"
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={defaultTransition}
        >
          {/* Logo */}
          <MartBridgeLogo size={72} className="mb-6 hidden md:block" />
          <MartBridgeLogo size={56} className="mb-6 md:hidden" />

          {/* Tagline */}
          <h1 className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-bold text-white leading-tight break-words">
            {siteConfig.tagline}
          </h1>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-[540px]">
            {siteConfig.description}
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleCtaClick}
            className="mt-8 bg-[#F47920] hover:bg-[#F47920]/90 text-white text-base font-medium rounded-lg px-8 py-3 h-auto transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-white focus-visible:ring-offset-[#0B1F3F]"
          >
            Get Started
          </Button>
        </motion.div>

        {/* Photo Column */}
        <motion.div
          className="flex items-center justify-center w-full"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={defaultTransition}
        >
          <div className="relative w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-white">
            {imageError ? (
              <span className="flex items-center justify-center h-full text-sm text-gray-600 bg-gray-100 p-4 rounded-full">
                {HERO_PHOTO_ALT}
              </span>
            ) : (
              <Image
                src={HERO_PHOTO_SRC}
                alt={HERO_PHOTO_ALT}
                fill
                priority
                unoptimized
                onError={() => setImageError(true)}
                className="object-contain p-4"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
