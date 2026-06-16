"use client";

import { MartBridgeLogo } from "@/components/icons/martbridge-logo";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-data";

export function HeroSection() {
  const handleCtaClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #0B1F3F 0%, #071528 100%)",
      }}
    >
      {/* Abstract geometric accents — hidden below 768px */}
      <div
        className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full hidden md:block"
        style={{
          background: "rgba(244, 121, 32, 0.08)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[10%] left-[10%] w-80 h-80 rounded-full hidden md:block"
        style={{
          background: "rgba(244, 121, 32, 0.06)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <SectionWrapper
        animation="fade-up"
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-20 md:py-[80px]"
      >
        {/* Logo */}
        <MartBridgeLogo size={72} className="mb-6 hidden md:block" />
        <MartBridgeLogo size={56} className="mb-6 md:hidden" />

        {/* Tagline */}
        <h1 className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-bold text-white leading-tight break-words">
          {siteConfig.tagline}
        </h1>

        {/* Subheading */}
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
      </SectionWrapper>
    </section>
  );
}
