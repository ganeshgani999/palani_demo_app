"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { contactLinks, socialLinks } from "@/lib/site-data";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/icons/social-icons";
import {
  getVariants,
  defaultTransition,
  inViewConfig,
} from "@/lib/animations";

const contactIcons: Record<string, React.ElementType> = {
  phone: Phone,
  email: Mail,
  whatsapp: MessageCircle,
  location: MapPin,
};

const socialIconComponents: Record<string, React.ElementType> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
};

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, inViewConfig);
  const reducedMotion = useReducedMotion();

  const fadeIn = getVariants("fade-in", !!reducedMotion);
  const fadeUp = getVariants("fade-up", !!reducedMotion);

  const containerVariants = reducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="bg-[#0B1F3F] py-20"
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={defaultTransition}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="mb-4 text-center text-2xl sm:text-[32px] font-semibold text-white">
          Get In Touch
        </h2>

        {/* Warmth text */}
        <p className="mb-12 text-center text-base text-white/60">
          We&apos;d love to hear from you
        </p>

        {/* Contact items grid */}
        <motion.div
          className="mx-auto mb-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {contactLinks.map((link) => {
            const Icon = contactIcons[link.type];
            const isLink = link.type !== "location";

            const content = (
              <span className="flex items-center gap-3">
                <Icon size={20} className="shrink-0 text-[#F47920]" aria-hidden="true" />
                <span className="text-base text-white">{link.label}</span>
              </span>
            );

            return (
              <motion.div
                key={link.type}
                variants={fadeUp}
                transition={defaultTransition}
              >
                {isLink ? (
                  <a
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3F] rounded-sm"
                    {...(link.type === "whatsapp"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className="shrink-0 text-[#F47920]"
                        aria-hidden="true"
                      />
                      <span className="text-base text-white group-hover:underline">
                        {link.label}
                      </span>
                    </span>
                  </a>
                ) : (
                  <span aria-label={link.ariaLabel} className="inline-flex items-center">
                    {content}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((social) => {
            const SocialIcon = socialIconComponents[social.platform];
            return (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="text-white transition-colors duration-200 hover:text-[#F47920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3F] rounded-sm"
              >
                <SocialIcon size={32} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
