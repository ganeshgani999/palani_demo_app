"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  getVariants,
  defaultTransition,
  staggerContainer,
  inViewConfig,
} from "@/lib/animations";
import { galleryImages } from "@/lib/site-data";

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, inViewConfig);
  const reducedMotion = useReducedMotion();

  const [imageErrors, setImageErrors] = useState<boolean[]>(
    () => new Array(galleryImages.length).fill(false)
  );

  const fadeInVariants = getVariants("fade-in", !!reducedMotion);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <section id="gallery" className="bg-white py-24" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-[32px] font-semibold leading-tight text-[#0B1F3F] mb-8">
          Our Operations
        </h2>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((img, i) => (
            <motion.li
              key={img.src}
              variants={fadeInVariants}
              transition={defaultTransition}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[3/2]">
                {imageErrors[i] ? (
                  <span className="flex items-center justify-center h-full text-sm text-gray-600 bg-gray-100 p-4">
                    {img.alt}
                  </span>
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 hover:scale-[1.05] motion-reduce:transition-none motion-reduce:hover:scale-100"
                    onError={() => handleImageError(i)}
                  />
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
