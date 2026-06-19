# Requirements Document

## Introduction

This feature adds real photography to the MartBridge marketing site. The Hero_Section transitions from a centered-text layout to an asymmetric text-plus-photo layout, and a new Gallery_Section is introduced between the About_Section and Contact_Section. The gallery presents a 2×2 photo grid showcasing MartBridge's operations — warehouse, retail partner store, team, and delivery. All images are statically served from `public/images/` and rendered via `next/image` in unoptimized mode for static export compatibility. The implementation preserves existing brand identity, responsive design (320px–2560px), accessibility (WCAG 2.1 AA), and Framer Motion animation patterns.

## Glossary

- **Marketing_Site**: The public-facing MartBridge Phase 1 static website
- **Hero_Section**: The top-most viewport of the Marketing_Site containing headline, tagline, photo, and primary call-to-action
- **Gallery_Section**: A new section displaying a 2×2 photo grid positioned between the About_Section and the Contact_Section
- **Hero_Photo**: The photograph displayed in the right column of the Hero_Section, located at `public/images/hero-photo.jpg`
- **Gallery_Image**: One of the four photographs displayed in the Gallery_Section grid
- **Clip_Mask**: A CSS clip-path or SVG mask applied to the Hero_Photo to produce a non-rectangular, modern-looking edge
- **Hover_Zoom**: A CSS scale transform applied to Gallery_Images on pointer hover to create a subtle zoom effect
- **About_Section**: The section introducing MartBridge's mission, story, and founder
- **Contact_Section**: The section displaying contact information and social media links
- **Animation**: Scroll-triggered motion effects powered by Framer Motion
- **Visitor**: Any user accessing the Marketing_Site via a web browser

## Requirements

### Requirement 1: Hero Section Asymmetric Layout

**User Story:** As a Visitor, I want to see a compelling photograph alongside the hero text, so that the site feels professional and visually engaging from the first impression.

#### Acceptance Criteria

1. WHEN a Visitor loads the Marketing_Site on a desktop viewport (768px and above), THE Hero_Section SHALL display text content (logo, tagline, description, and CTA button) in a left column occupying 55% to 65% of the container width
2. WHEN a Visitor loads the Marketing_Site on a desktop viewport (768px and above), THE Hero_Section SHALL display the Hero_Photo in a right column occupying 35% to 45% of the container width
3. THE Hero_Section SHALL apply a Clip_Mask to the Hero_Photo using a CSS `clip-path` polygon that produces a diagonal or curved edge on the left side of the image, where the clipped edge deviates at least 20px from a straight vertical line
4. THE Hero_Section SHALL retain the navy radial-gradient background (#0B1F3F to #071528) behind both columns
5. THE Hero_Section text content SHALL be left-aligned within its column on desktop viewports (768px and above)
6. WHEN the Marketing_Site is viewed on screens narrower than 768px, THE Hero_Section SHALL stack the text content above the Hero_Photo in a single-column layout with the photo displayed at full container width
7. WHEN a Visitor scrolls the Hero_Section into view, THE Hero_Section SHALL trigger a fade-up entrance animation on the text column and a fade-in entrance animation on the photo column, each completing within 500ms
8. IF the user has enabled `prefers-reduced-motion: reduce`, THEN THE Hero_Section SHALL display both columns in their final visible state immediately without any opacity transition or transform animation
9. IF the Hero_Photo fails to load, THEN THE Hero_Section SHALL display the image's alt text within the right column area while maintaining the asymmetric two-column layout

### Requirement 2: Hero Photo Rendering

**User Story:** As a Visitor, I want the hero photo to load efficiently and display at high quality, so that the site feels fast and looks sharp on all devices.

#### Acceptance Criteria

1. THE Hero_Section SHALL render the Hero_Photo using the Next.js Image component (`next/image`) with `unoptimized` mode enabled
2. THE Hero_Photo SHALL be loaded from the path `/images/hero-photo.jpg`
3. THE Hero_Photo SHALL include a descriptive `alt` attribute of at least 10 characters conveying the subject of the photograph for screen reader users
4. THE Hero_Photo SHALL use `priority` loading to prevent layout shift in the above-the-fold content
5. THE Hero_Photo SHALL use the Next.js Image component `fill` prop with `object-fit: cover` styling so that the image fills its container while maintaining aspect ratio
6. IF the Hero_Photo fails to load, THEN THE Hero_Section SHALL display the alt text as a visible fallback within the image container

### Requirement 3: Gallery Section Placement

**User Story:** As a Visitor, I want to browse photos of MartBridge's operations between the About and Contact sections, so that I can see the business in action before reaching out.

#### Acceptance Criteria

1. THE Marketing_Site SHALL render the Gallery_Section immediately after the About_Section and immediately before the Contact_Section in the page's DOM order
2. THE Gallery_Section SHALL have a section id attribute of "gallery" for navigation anchor linking
3. THE Navigation_Bar SHALL include a "Gallery" link with href "#gallery" positioned between the "About" and "Contact" navigation links in both desktop and mobile menu layouts
4. WHEN the visitor clicks the "Gallery" navigation link, THE Navigation_Bar SHALL scroll the viewport to the Gallery_Section using smooth scroll behavior

### Requirement 4: Gallery Section Layout and Design

**User Story:** As a Visitor, I want to see a clean grid of photos with a modern hover effect, so that the gallery feels polished and engaging.

#### Acceptance Criteria

1. THE Gallery_Section SHALL display exactly four Gallery_Images in a 2×2 grid layout on desktop viewports (768px and above)
2. THE Gallery_Section SHALL use a white or near-white background color (minimum lightness of 95% in HSL, e.g., #F9FAFB or #FFFFFF) to contrast with adjacent sections
3. THE Gallery_Section SHALL apply rounded corners with a border-radius between 8px and 16px to each Gallery_Image
4. THE Gallery_Section SHALL display Gallery_Images without captions, titles, or overlay text
5. WHEN a Visitor hovers over a Gallery_Image with a pointing device, THE Gallery_Section SHALL apply a Hover_Zoom scale transform (between 1.03 and 1.08) with a transition duration between 200ms and 400ms
6. THE Gallery_Section SHALL contain the Hover_Zoom effect within each image cell using overflow hidden so that scaled images do not overlap adjacent cells
7. WHEN the Marketing_Site is viewed on screens narrower than 768px, THE Gallery_Section SHALL stack Gallery_Images in a single-column layout
8. THE Gallery_Section SHALL maintain a uniform gap of 16px to 24px between all Gallery_Images in both grid and stacked layouts
9. IF the Visitor has enabled a reduced-motion preference, THEN THE Gallery_Section SHALL disable the Hover_Zoom scale transition and display Gallery_Images without animation effects
10. THE Gallery_Section SHALL display each Gallery_Image with a consistent aspect ratio (between 3:2 and 4:3) using object-fit cover to prevent distortion

### Requirement 5: Gallery Section Photos

**User Story:** As a Visitor, I want the gallery photos to load efficiently and be accessible, so that I can view them quickly and understand them regardless of ability.

#### Acceptance Criteria

1. THE Gallery_Section SHALL render each Gallery_Image using the Next.js Image component (`next/image`) with `unoptimized` mode enabled
2. THE Gallery_Section SHALL load Gallery_Images from the following paths: `/images/gallery/warehouse.jpg`, `/images/gallery/store.jpg`, `/images/gallery/team.jpg`, `/images/gallery/delivery.jpg`
3. THE Gallery_Section SHALL provide an `alt` attribute for each Gallery_Image between 10 and 125 characters in length that describes its specific subject: warehouse/products for `warehouse.jpg`, retail partner store for `store.jpg`, team/founder for `team.jpg`, and delivery/logistics for `delivery.jpg`
4. THE Gallery_Section SHALL lazy-load Gallery_Images by not setting the `priority` prop on the Next.js Image component, since the section is below the fold
5. THE Gallery_Section SHALL render each Gallery_Image using the Next.js Image component `fill` prop with `object-fit: cover` styling so that the image fills its grid cell while maintaining aspect ratio

### Requirement 6: Gallery Section Animation

**User Story:** As a Visitor, I want the gallery photos to animate into view as I scroll, so that the section feels dynamic and consistent with the rest of the site.

#### Acceptance Criteria

1. WHEN at least 100 pixels of the Gallery_Section enters the viewport, THE Gallery_Section SHALL trigger entrance Animations on the Gallery_Images using Framer Motion, transitioning each image from hidden state (opacity 0) to visible state (opacity 1) over a duration of 500 milliseconds with easing [0.25, 0.1, 0.25, 1]
2. THE Gallery_Section SHALL stagger the entrance Animation of Gallery_Images with a 200-millisecond delay between each successive image so that each image animates sequentially rather than simultaneously
3. THE Gallery_Section SHALL trigger entrance Animations only once per page load, and SHALL NOT re-trigger Animations when the Visitor scrolls the section out of and back into the viewport
4. IF the user's operating system has prefers-reduced-motion set to reduce, THEN THE Marketing_Site SHALL display all Gallery_Images in their final visible state immediately without any entrance Animation, ensuring no opacity-0 or transformed hidden state is applied

### Requirement 7: Photo File Structure

**User Story:** As the development team, I want photos organized in a clear folder structure, so that assets are easy to locate and maintain.

#### Acceptance Criteria

1. THE Marketing_Site project SHALL contain the Hero_Photo file at the path `public/images/hero-photo.jpg` as a valid JPEG image of at least 10 KB in size
2. THE Marketing_Site project SHALL contain Gallery_Images at the paths `public/images/gallery/warehouse.jpg`, `public/images/gallery/store.jpg`, `public/images/gallery/team.jpg`, and `public/images/gallery/delivery.jpg`, each as a valid JPEG image of at least 10 KB in size
3. WHEN the static build completes (`next build` with `output: 'export'`), THE Marketing_Site SHALL produce an `/out` directory containing all photo files at their corresponding paths (`/out/images/hero-photo.jpg` and `/out/images/gallery/*.jpg`) without requiring any build configuration changes beyond the existing `next.config.mjs`
4. THE `public/images/` directory SHALL contain no photo files other than `hero-photo.jpg` at its root level and the four specified Gallery_Images within the `gallery/` subdirectory, so that the asset inventory remains explicit and maintainable

### Requirement 8: Responsive Behavior

**User Story:** As a Visitor on a mobile device, I want the hero photo and gallery to adapt gracefully, so that I have a good experience regardless of screen size.

#### Acceptance Criteria

1. THE Hero_Section asymmetric layout SHALL transition from a two-column (60/40) arrangement on viewports 768px and above to a single stacked column on viewports below 768px
2. THE Gallery_Section grid SHALL transition from a 2×2 layout on viewports 768px and above to a single-column stacked layout on viewports below 768px
3. WHEN the viewport width is below 768px, THE Hero_Photo SHALL be displayed below the hero text content at a maximum height of 240px while maintaining its aspect ratio via object-fit cover
4. THE Marketing_Site SHALL render all photo content without horizontal overflow, without images being cropped below 50% of their visible area, and without layout breaking on viewport widths from 320px to 2560px
5. WHILE the viewport width is 1280px or greater, THE Marketing_Site SHALL constrain the Hero_Section and Gallery_Section content within a maximum width of 1280px centered horizontally with automatic margins

### Requirement 9: Accessibility for Photo Content

**User Story:** As a Visitor using assistive technology, I want all photos to be properly described, so that I can understand the visual content regardless of ability.

#### Acceptance Criteria

1. THE Hero_Photo SHALL include an `alt` attribute containing at least 10 characters that describes the photograph's specific subject matter, and SHALL NOT use generic placeholder text such as "hero image", "banner", "photo", or empty strings
2. EACH Gallery_Image SHALL include an `alt` attribute of at least 10 characters that describes its specific subject, corresponding in order to: warehouse/products, retail partner store, team/founder, and delivery/logistics
3. WHEN a Visitor navigates via keyboard, THE Hover_Zoom effect SHALL NOT prevent focus from reaching any interactive element in the expected tab order, and SHALL NOT cause screen reader software to announce incorrect or duplicate content
4. THE Gallery_Section SHALL be wrapped in a `<section>` element that contains a heading element (h2–h6) visible or accessible via `aria-label` or `aria-labelledby`, identifying the section's purpose for assistive technology
5. IF a Gallery_Image fails to load, THEN THE Marketing_Site SHALL display the alt text as a visible text fallback within the image's containing element so that the subject of each image is still communicated to the user
6. THE Gallery_Section SHALL present all Gallery_Images within a list structure (`<ul>` with `<li>` elements) so that assistive technology can identify the total count of images and the user's current position within the collection
