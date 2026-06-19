# Implementation Plan: Photo Gallery Integration

## Overview

This plan implements real photography into the MartBridge marketing site through a Hero Section redesign (asymmetric two-column layout with clip-path masked photo) and a new Gallery Section (2×2 photo grid with hover-zoom and staggered scroll animations). All changes use TypeScript/TSX with Next.js, Tailwind CSS, and Framer Motion — matching existing project patterns.

## Tasks

- [x] 1. Set up photo assets and data layer
  - [x] 1.1 Create placeholder image files in the public directory
    - Create `public/images/hero-photo.jpg` (valid JPEG ≥10 KB)
    - Create `public/images/gallery/` directory with `warehouse.jpg`, `store.jpg`, `team.jpg`, `delivery.jpg` (each valid JPEG ≥10 KB)
    - Ensure no other files exist in `public/images/` root besides `hero-photo.jpg`
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 1.2 Update `src/lib/site-data.ts` with gallery data and navigation link
    - Add `GalleryImage` interface with `src: string` and `alt: string` fields
    - Add `galleryImages` array with four entries (warehouse, store, team, delivery) including descriptive alt text (10–125 characters each)
    - Insert `{ label: "Gallery", href: "#gallery" }` into `navLinks` array between "About" and "Contact"
    - _Requirements: 3.3, 5.2, 5.3, 9.2_

- [x] 2. Redesign Hero Section with asymmetric layout
  - [x] 2.1 Rewrite `src/components/hero-section.tsx` to asymmetric two-column layout
    - Convert to `md:grid-cols-[60fr_40fr]` grid on desktop (≥768px)
    - Left column: logo, h1 tagline, description, CTA button — all left-aligned
    - Right column: `next/image` with `fill`, `priority`, `unoptimized`, `object-fit: cover`
    - Apply `clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)` to the photo container
    - Retain navy radial-gradient background on the section
    - Mobile (<768px): single column, text above photo with max-height 240px
    - Add `onError` handler with state to display alt text fallback when image fails
    - Implement fade-up animation on text column and fade-in on photo column (500ms, ease [0.25, 0.1, 0.25, 1])
    - Respect `prefers-reduced-motion` via `useReducedMotion` — render immediately without transitions
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 8.1, 8.3, 8.4, 8.5, 9.1_

  - [ ]* 2.2 Write unit tests for the redesigned Hero Section
    - Create `src/__tests__/components/hero-section.test.tsx`
    - Test two-column grid structure renders correctly
    - Test `next/image` renders with src="/images/hero-photo.jpg", priority, fill, unoptimized
    - Test alt text is at least 10 characters and not generic
    - Test clip-path style is applied to the image container
    - Test reduced motion renders without animation variants
    - Test onError fallback displays alt text visibly
    - _Requirements: 1.1, 1.3, 1.8, 1.9, 2.1, 2.3, 2.6, 9.1_

- [x] 3. Implement Gallery Section component
  - [x] 3.1 Create `src/components/gallery-section.tsx`
    - Create `<section id="gallery">` with white background and py-24 padding
    - Add `<h2>` heading ("Our Operations") for accessibility
    - Render `<ul>` with 4 `<li>` elements, each containing a `next/image` with `fill`, `unoptimized`, `object-cover`
    - Apply 2×2 grid on desktop (`md:grid-cols-2`) with gap-5 (20px), single column on mobile
    - Add `overflow-hidden` and `rounded-xl` (12px border-radius) to each image container
    - Set `aspect-[3/2]` ratio on each image container
    - Apply hover scale `hover:scale-[1.05]` with `transition-transform duration-300` on images
    - Add `motion-reduce:transition-none motion-reduce:hover:scale-100` utilities
    - Do NOT set `priority` prop on gallery images (lazy-load)
    - Implement Framer Motion scroll-triggered entrance animation with `useInView` (margin: "-100px", once: true)
    - Stagger children by 200ms, fade from opacity 0 to 1 over 500ms with ease [0.25, 0.1, 0.25, 1]
    - Respect `prefers-reduced-motion` — render all images immediately without animation
    - Add `onError` handler per image to display alt text fallback within the aspect-ratio container
    - Constrain content within `max-w-7xl` centered container
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 8.2, 8.4, 8.5, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 3.2 Write unit tests for the Gallery Section
    - Create `src/__tests__/components/gallery-section.test.tsx`
    - Test renders `<section>` with id="gallery" and `<h2>` heading
    - Test contains `<ul>` with exactly 4 `<li>` elements
    - Test each image has correct src, alt (10–125 chars), fill, unoptimized, no priority
    - Test `overflow-hidden` class on image containers
    - Test hover scale class present on images
    - Test `motion-reduce:` utility classes present
    - Test onError fallback displays alt text
    - Test stagger animation config (staggerChildren = 0.2)
    - _Requirements: 4.1, 4.5, 4.6, 4.9, 5.1, 5.3, 5.4, 6.2, 6.4, 9.4, 9.5, 9.6_

- [x] 4. Wire components into the page and navigation
  - [x] 4.1 Update `src/app/page.tsx` to include GallerySection
    - Import `GallerySection` from `@/components/gallery-section`
    - Render `<GallerySection />` between `<AboutSection />` and `<ContactSection />`
    - _Requirements: 3.1_

  - [ ]* 4.2 Write data validation and navigation tests
    - Create or update `src/__tests__/components/site-data.test.tsx`
    - Test `galleryImages` has exactly 4 entries
    - Test each entry has `src` starting with "/images/gallery/" and ending with ".jpg"
    - Test each entry has `alt` between 10 and 125 characters
    - Test `navLinks` contains "Gallery" link with href "#gallery"
    - Test "Gallery" appears after "About" and before "Contact" in the array
    - _Requirements: 3.3, 5.2, 5.3, 9.2_

- [x] 5. Checkpoint - Verify build and integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Accessibility and build verification
  - [ ] 6.1 Add accessibility smoke tests
    - Create `src/__tests__/accessibility/photo-sections.test.tsx`
    - Run `jest-axe` audit on rendered HeroSection
    - Run `jest-axe` audit on rendered GallerySection
    - Verify keyboard navigation is not trapped by hover-zoom elements
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ] 6.2 Add build verification test for static assets
    - Create `src/__tests__/build/photo-assets.test.ts`
    - Verify `public/images/hero-photo.jpg` exists and is ≥10 KB
    - Verify all four gallery images exist and are ≥10 KB
    - Verify no unexpected files in `public/images/` root
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The design explicitly notes property-based testing does not apply (UI rendering with fixed inputs)
- All images use `next/image` with `unoptimized` mode for static export compatibility
- Framer Motion animation patterns match existing site components
- Checkpoints ensure incremental validation

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "3.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.1"] },
    { "id": 3, "tasks": ["4.2"] },
    { "id": 4, "tasks": ["6.1", "6.2"] }
  ]
}
```
