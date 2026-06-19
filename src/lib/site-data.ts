// lib/site-data.ts — All static content constants and type definitions

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface DifferentiatorCard {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface TrustSignal {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactLink {
  type: "phone" | "email" | "whatsapp" | "location";
  label: string;
  href: string;
  ariaLabel: string;
}

export interface SocialLink {
  platform: "facebook" | "whatsapp" | "instagram";
  href: string;
  ariaLabel: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

// ─── Site Configuration ───────────────────────────────────────────────────────

export const siteConfig = {
  name: "MartBridge",
  tagline: "Connecting Stores to Supply",
  description:
    "B2B retail supply platform connecting local retail stores in Andhra Pradesh to a trusted supplier network",
  url: "https://www.martbridge.com",
  founder: { name: "Palani Kumar", title: "Founder & CEO" },
  contact: {
    phone: "9347142434",
    email: "palani@martbrige.com",
    location: "Andhra Pradesh, India",
  },
  social: {
    facebook: "https://facebook.com/martbridge.in",
    instagram: "https://instagram.com/martbridge.in",
    whatsapp: "https://wa.me/9347142434",
  },
} as const;

// ─── Differentiators ──────────────────────────────────────────────────────────

export const differentiators: DifferentiatorCard[] = [
  {
    icon: "PackageSearch",
    title: "Wide range of products",
    description:
      "Access thousands of SKUs across categories — from FMCG essentials to specialty items — all from one trusted platform.",
  },
  {
    icon: "Truck",
    title: "Fast & reliable delivery",
    description:
      "Get your orders delivered on time, every time. Our logistics network ensures your shelves stay stocked without delays.",
  },
  {
    icon: "ShieldCheck",
    title: "Trust & transparency",
    description:
      "Clear pricing, honest dealings, and full visibility on your orders. No hidden costs, no surprises.",
  },
  {
    icon: "TrendingDown",
    title: "Better prices everyday",
    description:
      "Competitive wholesale pricing that helps you maximize margins and grow your retail business sustainably.",
  },
];

// ─── Trust Signals ────────────────────────────────────────────────────────────

export const trustSignals: TrustSignal[] = [
  {
    icon: "Warehouse",
    title: "Large stock availability",
    description:
      "Our warehouses are always stocked so you never miss a sale due to supply shortages.",
  },
  {
    icon: "BadgeCheck",
    title: "Quality assured",
    description:
      "Every product goes through quality checks before reaching your store. Only genuine, quality goods — guaranteed.",
  },
  {
    icon: "Handshake",
    title: "Built on trust",
    description:
      "Long-term partnerships over one-time transactions. We grow when you grow.",
  },
  {
    icon: "Sprout",
    title: "Growing together",
    description:
      "We invest in retailer success — from better pricing to business insights that help your store thrive.",
  },
];

// ─── Gallery Images ───────────────────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/warehouse.jpeg",
    alt: "MartBridge warehouse stocked with wholesale products ready for distribution",
  },
  {
    src: "/images/gallery/store.jpeg",
    alt: "Retail partner store shelves filled with products supplied by MartBridge",
  },
  {
    src: "/images/gallery/team.jpeg",
    alt: "MartBridge founding team collaborating in the operations office",
  },
  {
    src: "/images/gallery/delivery.jpeg",
    alt: "MartBridge delivery vehicle loaded for a retail partner shipment",
  },
];

// ─── Navigation Links ─────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Differentiators", href: "#differentiators" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// ─── Contact Links ────────────────────────────────────────────────────────────

export const contactLinks: ContactLink[] = [
  {
    type: "phone",
    label: "9347142434",
    href: "tel:9347142434",
    ariaLabel: "Call MartBridge at 9347142434",
  },
  {
    type: "email",
    label: "palani@martbrige.com",
    href: "mailto:palani@martbrige.com",
    ariaLabel: "Email MartBridge at palani@martbrige.com",
  },
  {
    type: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/9347142434",
    ariaLabel: "Chat with MartBridge on WhatsApp",
  },
  {
    type: "location",
    label: "Andhra Pradesh, India",
    href: "#",
    ariaLabel: "MartBridge is located in Andhra Pradesh, India",
  },
];

// ─── Social Links ─────────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    platform: "facebook",
    href: "https://facebook.com/martbridge.in",
    ariaLabel: "Visit MartBridge on Facebook",
  },
  {
    platform: "instagram",
    href: "https://instagram.com/martbridge.in",
    ariaLabel: "Visit MartBridge on Instagram",
  },
  {
    platform: "whatsapp",
    href: "https://wa.me/9347142434",
    ariaLabel: "Chat with MartBridge on WhatsApp",
  },
];
