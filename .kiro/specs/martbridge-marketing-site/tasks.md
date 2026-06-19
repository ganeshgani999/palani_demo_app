# Implementation Plan: MartBridge Marketing Site

## Overview

Build a single-page static marketing website for MartBridge using Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion. The site communicates brand identity and value propositions to prospective retailer/supplier partners in Andhra Pradesh, India. It deploys as a fully static export to AWS Amplify.

## Tasks

- [x] 1. Project scaffolding and configuration
  - [x] 1.1 Initialize Next.js 14 project with TypeScript and Tailwind CSS
    - Run `npx create-next-app@14` with App Router, TypeScript, Tailwind CSS, ESLint enabled
    - Install dependencies: `framer-motion`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
    - Initialize shadcn/ui (`npx shadcn-ui@latest init`) and add Button and Sheet components
    - Configure `next.config.ts` with `output: 'export'` and `images: { unoptimized: true }`
    - _Requirements: 14.1, 8.3_

  - [x] 1.2 Configure Tailwind theme and globals.css
    - Extend Tailwind config with brand colors: navy (#0B1F3F), orange (#F47920), and custom font family (Inter)
    - Set up `globals.css` with Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
    - Add CSS custom properties for brand colors and spacing
    - Add `scroll-behavior: smooth` to html element
    - Add `motion-reduce:transition-none` utility for reduced-motion support
    - _Requirements: 9.1, 9.2, 10.2_

  - [x] 1.3 Set up font loading with next/font
    - Configure Inter font via `next/font/google` in `layout.tsx` with `display: 'swap'`
    - Apply font class to the body element
    - _Requirements: 9.1, 8.4_

- [x] 2. Core utilities and data layer
  - [x] 2.1 Create `lib/utils.ts` with cn() helper
    - Implement the `cn()` class merging utility using `clsx` and `tailwind-merge`
    - Export the helper for use across all components
    - _Requirements: 9.4_

  - [x] 2.2 Create `lib/site-data.ts` with all static content
    - Define and export `siteConfig` object (name, tagline, description, URL, founder, contact, social)
    - Define and export `differentiators` array with 4 items: "Wide range of products", "Fast & reliable delivery", "Trust & transparency", "Better prices everyday"
    - Define and export `trustSignals` array with 4 items: "Large stock availability", "Quality assured", "Built on trust", "Growing together"
    - Define and export `navLinks` array with anchor links (#hero, #differentiators, #about, #contact)
    - Define and export `contactLinks` array with phone, email, WhatsApp, and location entries
    - Define and export `socialLinks` array with Facebook, Instagram, WhatsApp entries
    - Export TypeScript interfaces: `DifferentiatorCard`, `TrustSignal`, `NavLink`, `ContactLink`, `SocialLink`
    - _Requirements: 1.1, 3.1, 4.1, 5.1, 5.2, 5.3, 6.1, 6.2_

  - [x] 2.3 Create `lib/animations.ts` with Framer Motion variants
    - Define animation variants: `fade-up`, `fade-in`, `scale`, `slide-left`, `slide-right`
    - Configure duration (500ms entrance), easing (`[0.25, 0.1, 0.25, 1]`), and stagger (200ms)
    - Export `useInView` configuration defaults: `{ once: true, margin: "-100px" }`
    - Implement `useReducedMotion()` integration to disable variants when reduced motion is preferred
    - _Requirements: 10.1, 10.2_

- [x] 3. Shared components
  - [x] 3.1 Create `components/icons/martbridge-logo.tsx`
    - Build inline SVG component for the MartBridge "M" mark (navy letter with orange bridge motif)
    - Accept `size` prop (default 72px desktop, 56px mobile) and `className` prop
    - Include proper `aria-label` and `role="img"` for accessibility
    - _Requirements: 1.1, 13.2, 13.4_

  - [x] 3.2 Create `components/icons/social-icons.tsx`
    - Build SVG icon components for Facebook, Instagram, and WhatsApp
    - Accept `size` prop (default 32px) and `className` prop
    - Include `aria-hidden="true"` since parent links will have aria-labels
    - _Requirements: 6.2, 11.3, 13.4_

  - [x] 3.3 Create `components/section-wrapper.tsx`
    - Build a reusable client component wrapping children in Framer Motion `motion.div`
    - Accept props: `id`, `children`, `className`, `animation` (fade-up | fade-in | scale | slide-left | slide-right)
    - Use `useInView` hook with `{ once: true, margin: "-100px" }` to trigger animations on scroll
    - Respect `prefers-reduced-motion` — render children in final state immediately when active
    - _Requirements: 10.1, 10.2_

  - [x] 3.4 Create `components/navigation-bar.tsx`
    - Build fixed-top navigation bar with MartBridge logo (left) and nav links (right)
    - Implement `isScrolled` state using scroll event listener — apply solid white background with shadow after scroll threshold (e.g., 50px)
    - Implement smooth scroll on nav link click using `scrollIntoView({ behavior: 'smooth' })`
    - Use shadcn/ui Sheet component for mobile menu overlay (hamburger icon trigger)
    - Close mobile menu on link click or Escape key press
    - Apply responsive behavior: show links on `md:` and above, hamburger below 768px
    - Add proper `aria-label` on hamburger button, focus trap in mobile overlay
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 13.3, 13.4_

- [x] 4. Section components — Hero and Differentiators
  - [x] 4.1 Create `components/hero-section.tsx`
    - Build full-viewport section with navy (#0B1F3F) background and subtle radial gradient
    - Center content: MartBridge logo → tagline "Connecting Stores to Supply" (48px/3rem white, bold) → subheading (18px, white/80 opacity, max-w-540px) → CTA button
    - Style CTA button: orange (#F47920) fill, white text, rounded-lg, px-8 py-3, hover scale(1.02)
    - CTA click scrolls to `#contact` section smoothly
    - Add abstract geometric accents (low-opacity blurred circles in orange) positioned off-center — hidden below 768px
    - Apply `fade-up` entrance animation via SectionWrapper
    - Set `id="hero"` for navigation anchor
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 9.2, 10.1_

  - [x] 4.2 Create `components/differentiators-section.tsx`
    - Build section with white background, 80px vertical padding, centered heading "What Sets Us Apart" (navy, 32px, semibold)
    - Render 4 icon-cards in responsive CSS Grid: `grid-cols-1` → `grid-cols-2` (md) → `grid-cols-4` (lg)
    - Card design: rounded-xl, white fill, shadow-sm, 1px gray-100 border, p-6
    - Card content: Lucide icon (40px, orange) → title (navy, 16px, semibold) → description (gray-600, 14px)
    - Use icons: PackageSearch, Truck, ShieldCheck, TrendingDown from `lucide-react`
    - Apply staggered fade-up animation (200ms delay between cards) via Framer Motion
    - Set `id="differentiators"` for navigation anchor
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 10.1_

- [ ] 5. Checkpoint — Verify core structure renders
  - Ensure the project builds successfully (`npm run build` produces `/out` directory)
  - Ensure Hero and Differentiators sections render at all breakpoints
  - Ask the user if questions arise.

- [x] 6. Section components — Why Partner, About, Contact
  - [x] 6.1 Create `components/why-partner-section.tsx`
    - Build section with light gray (#F9FAFB) background, 96px vertical padding
    - Left-aligned heading "Why Partner With Us" (navy, 32px, semibold) with orange accent bar (4px wide, 32px tall) to its left
    - Render 4 trust signals as full-width alternating rows:
      - Odd rows: icon+title on left, description on right
      - Even rows: description on left, icon+title on right
    - Icon treatment: Lucide icons at 64px in orange with soft orange-tinted circular background (bg-orange-50, rounded-full, p-4)
    - Use icons: Warehouse, BadgeCheck, Handshake, Sprout
    - Title rendered as stat-style callout (24px, navy, semibold)
    - Responsive: stack vertically on mobile (<768px), 60/40 split on tablet, 50/50 on desktop
    - Animation: rows slide in from alternating sides (slide-left for odd, slide-right for even)
    - Set `id="why-partner"` for navigation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 10.1_

  - [x] 6.2 Create `components/about-section.tsx`
    - Build section with white background, 96px vertical padding, asymmetric 60/40 layout
    - Left column (60%): heading "About MartBridge" (navy, 32px) → mission statement (gray-700, 18px) → retailer-benefit narrative (gray-600, 16px) → founder attribution with left orange border (Palani Kumar, Founder & CEO)
    - Right column (40%): abstract SVG illustration placeholder — geometric overlapping shapes in navy/orange using Tailwind absolute positioning and opacity layering
    - Responsive: 55/45 on tablet, stacked vertically on mobile (text first, illustration below at max-h-240px)
    - Animation: left column fade-up, right column scale from 0.95
    - Set `id="about"` for navigation anchor
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 9.5, 10.1_

  - [x] 6.3 Create `components/contact-section.tsx`
    - Build section with navy (#0B1F3F) background, 80px vertical padding, centered heading "Get In Touch" (white, 32px)
    - Contact items in 2×2 grid (desktop): phone (tel: link), email (mailto: link), WhatsApp (wa.me deep link), location (plain text)
    - Each item: icon (20px, orange) + label (white, 16px) with hover underline on linked items
    - Social links row below grid: Facebook, Instagram, WhatsApp icons (32px, white, hover → orange)
    - Subtle warmth text: "We'd love to hear from you" (white/60 opacity)
    - Social links open in new tab with `target="_blank"` and `rel="noopener noreferrer"`
    - Responsive: single column, left-aligned on mobile; social icons remain centered
    - Animation: section fades in, contact items stagger (100ms each)
    - Set `id="contact"` for navigation anchor
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 10.1_

  - [x] 6.4 Create `components/footer.tsx`
    - Build footer with dark background (navy or near-black), padding 48px vertical
    - Content: MartBridge logo + tagline, navigation links to all sections, social media icons (Facebook, WhatsApp, Instagram), copyright notice with dynamic year (`© ${new Date().getFullYear()} MartBridge`)
    - Social icons: white, 24px, hover → orange transition
    - Use semantic `<footer>` element
    - _Requirements: 11.1, 11.2, 11.3, 12.4_

- [x] 7. Page composition and layout
  - [x] 7.1 Create `app/layout.tsx` with metadata and structure
    - Configure Inter font via `next/font/google`
    - Set comprehensive metadata: title "MartBridge — Connecting Stores to Supply | B2B Retail Platform", description, Open Graph tags (title, description, image, url, siteName, type)
    - Include NavigationBar component in the layout
    - Use semantic HTML: `<html>`, `<body>` with font class
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 7.2 Create `app/page.tsx` composing all sections
    - Import and render all section components in order: HeroSection → DifferentiatorsSection → WhyPartnerSection → AboutSection → ContactSection → Footer
    - Wrap in semantic `<main>` element
    - Ensure `id` anchors on each section align with navLinks in site-data.ts
    - Verify static export renders all content as HTML
    - _Requirements: 12.4, 12.5, 14.1_

- [ ] 8. Checkpoint — Full page composition
  - Ensure `npm run build` succeeds and produces complete static HTML in `/out`
  - Ensure all sections render correctly at desktop width
  - Ensure navigation links scroll to correct sections
  - Ensure all external links (tel:, mailto:, wa.me, social) have correct href values
  - Ask the user if questions arise.

- [x] 9. Responsive design, accessibility, and visual polish
  - [x] 9.1 Verify and refine responsive behavior across all breakpoints
    - Test all sections at 320px, 768px, 1024px, 1280px, 1920px viewports
    - Confirm NavigationBar collapses to hamburger below 768px
    - Confirm Differentiators grid: 1-col → 2-col → 4-col at correct breakpoints
    - Confirm Why Partner rows stack on mobile, alternate on desktop
    - Confirm About section stacks on mobile, splits asymmetrically on desktop
    - Confirm Contact section stacks on mobile, shows 2×2 grid on desktop
    - Confirm responsive typography scales appropriately
    - _Requirements: 7.1, 7.2, 7.3, 2.4, 3.5, 4.5_

  - [x] 9.2 Implement accessibility compliance
    - Ensure semantic HTML structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
    - Verify heading hierarchy: single `<h1>` (tagline), `<h2>` for section headings, no skipped levels
    - Add `alt` text to all images and decorative SVGs (`aria-hidden` for decorative, descriptive `alt` for meaningful)
    - Add `aria-label` to icon-only buttons (hamburger, social icon links)
    - Verify keyboard navigation: Tab through all interactive elements, Enter activates, Escape closes mobile menu
    - Verify color contrast ratios meet WCAG 2.1 AA: 4.5:1 for normal text, 3:1 for large text (white on navy, navy on white, orange on white)
    - Ensure focus indicators are visible on all interactive elements
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 10. Testing setup and tests
  - [x] 10.1 Set up testing infrastructure
    - Install Vitest, React Testing Library, `@testing-library/jest-dom`, `jest-axe`
    - Configure `vitest.config.ts` with React/JSX support and path aliases
    - Create test setup file with jest-dom matchers and jest-axe configuration
    - Create `__tests__/` directory structure matching design (components/, accessibility/, build/)
    - _Requirements: 8.1, 8.2_

  - [ ]* 10.2 Write component unit tests
    - Test HeroSection: logo, tagline, CTA button render; CTA has correct scroll target
    - Test DifferentiatorsSection: all 4 card titles and icons render
    - Test WhyPartnerSection: all 4 trust signal titles render in alternating layout
    - Test AboutSection: mission text, founder name "Palani Kumar", title "Founder & CEO" render
    - Test ContactSection: phone (tel:9347142434), email (mailto:), WhatsApp (wa.me/9347142434), social links with target="_blank"
    - Test Footer: copyright year, nav links, social icons render
    - Test NavigationBar: all nav links render, hamburger button present, mobile menu opens/closes
    - _Requirements: 1.1, 3.1, 4.1, 5.1, 5.3, 6.1, 6.2, 11.1, 11.2, 11.3, 2.1_

  - [ ]* 10.3 Write accessibility tests with jest-axe
    - Run axe-core audit on each section component
    - Verify heading hierarchy across the full page composition
    - Verify all interactive elements are keyboard accessible
    - Verify all images have alt text
    - Verify ARIA labels on icon-only buttons
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 10.4 Write static export build verification test
    - Verify `next build` completes without errors
    - Verify `/out/index.html` exists and contains key content strings
    - Verify all static assets referenced in HTML exist in the output directory
    - _Requirements: 14.1, 14.3_

- [x] 11. Deployment configuration
  - [x] 11.1 Create `amplify.yml` build specification
    - Define preBuild phase: `npm ci`
    - Define build phase: `npm run build`
    - Set artifacts baseDirectory to `out`, files pattern `**/*`
    - Configure cache paths: `node_modules/**/*`, `.next/cache/**/*`
    - _Requirements: 14.1, 14.2_

  - [x] 11.2 Verify final next.config.ts configuration
    - Confirm `output: 'export'` is set
    - Confirm `images: { unoptimized: true }` is set
    - Confirm static export builds successfully with `npm run build`
    - Verify `/out` directory contains `index.html` and all static assets
    - _Requirements: 14.1, 12.5, 8.3_

- [ ] 12. SEO and metadata finalization
  - [ ] 12.1 Add Open Graph image and favicon
    - Create or place `public/og-image.png` (1200×630) placeholder using brand colors
    - Ensure `favicon.ico` is present in `app/` directory
    - Verify OG meta tags reference correct image path
    - _Requirements: 12.2, 12.1_

- [ ] 13. Final checkpoint — Production readiness
  - Ensure `npm run build` produces error-free static export
  - Ensure all requirements are covered by implemented sections
  - Ensure all navigation links work correctly
  - Ensure all external links (social, phone, email, WhatsApp) function correctly
  - Ensure responsive layout works at all specified breakpoints
  - Ensure animations respect prefers-reduced-motion
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- No property-based tests are needed — the design document explicitly states PBT does not apply to this static marketing page
- Unit tests validate content rendering and accessibility compliance
- The site has no backend, no API, no database — all content is static
- Font loading uses `display: 'swap'` for zero layout shift
- All client components must include `"use client"` directive

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3"] },
    { "id": 4, "tasks": ["3.4"] },
    { "id": 5, "tasks": ["4.1", "4.2"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.3", "6.4"] },
    { "id": 7, "tasks": ["7.1", "7.2"] },
    { "id": 8, "tasks": ["9.1", "9.2"] },
    { "id": 9, "tasks": ["10.1", "11.1", "11.2", "12.1"] },
    { "id": 10, "tasks": ["10.2", "10.3", "10.4"] }
  ]
}
```
