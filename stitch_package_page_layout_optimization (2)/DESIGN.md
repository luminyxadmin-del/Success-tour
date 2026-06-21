---
name: Heritage Explorer
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#3d4947'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#835500'
  on-secondary: '#ffffff'
  secondary-container: '#feae2c'
  on-secondary-container: '#6b4500'
  tertiary: '#545c72'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c748b'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#ffb955'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#633f00'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2df'
  surface-dark: '#0F172A'
  surface-light: '#FFFFFF'
  accent-teal: '#0D9488'
  accent-gold: '#F5A623'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  price-display:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
  section-padding: 5rem
---

## Brand & Style

The design system embodies a premium, adventurous, and trustworthy travel identity. It targets sophisticated travelers who seek a blend of modern convenience and cultural heritage. 

The visual style is **Corporate / Modern** with high-end editorial influences. It utilizes a dual-thematic approach: immersive high-contrast dark sections for discovery and "Hero" moments, transitioning into airy, functional light layouts for browsing and booking details. The aesthetic relies on crisp geometric lines paired with elegant serif accents to evoke a sense of "modern legacy."

## Colors

The palette is anchored by **Teal (#0D9488)** as the primary action color, providing a sense of stability and destination. **Gold (#F5A623)** serves as a secondary accent for highlights, ratings, and luxury indicators.

This design system utilizes a specific "Zonal" color strategy:
- **Hero/Header Zones:** Use `surface-dark` (#0F172A) with white text for maximum impact and focus.
- **Content/Body Zones:** Use `surface-light` (#FFFFFF) or the subtle `neutral` (#F8F7F4) for high readability and a clean shopping experience.
- **Success/Call-to-Action:** Primary Teal is used for buttons and primary navigation links.

## Typography

The typography system pairs the literary elegance of **Playfair Display** for headlines with the clean, geometric efficiency of **Montserrat** for functional text.

- **Editorial Headlines:** Use Playfair Display for main section titles and hero statements to establish a premium feel.
- **Functional Interface:** Use Montserrat for all body text, navigation items, and button labels to ensure clarity and modern utility.
- **Micro-copy:** Use `label-caps` for category tags or small overlines to create a structured information hierarchy.

## Layout & Spacing

This design system uses a **Fluid Grid** approach within a centered container.
- **Desktop (1200px+):** 12-column grid with 24px gutters.
- **Tablet (768px - 1199px):** 8-column grid with 24px gutters.
- **Mobile (<768px):** 4-column grid with 16px margins.

Vertical rhythm is strictly maintained using a scale of 8px. Sections should be separated by `stack-lg` or `section-padding` to allow the content to breathe, emphasizing the premium nature of the travel offerings. Card layouts should utilize CSS Grid for consistent height matching across rows.

## Elevation & Depth

Hierarchy is established primarily through **Tonal Layers** and crisp **Low-Contrast Outlines** rather than heavy shadows.

- **Cards:** Use a 1px border (#E2E8F0) on a white background. On hover, apply a subtle, diffused ambient shadow (0px 10px 20px rgba(15, 23, 42, 0.05)) to lift the element.
- **Overlays:** Navigation menus and modals use a soft backdrop blur (8px) when appearing over hero imagery to maintain legibility without losing context.
- **Dark Mode Components:** In hero sections, elements should feel integrated into the background with minimal elevation, using subtle border-bottoms to separate navigation items.

## Shapes

The shape language is **Soft** and restrained. We avoid overly rounded or "bubbly" corners to maintain a professional, high-end travel aesthetic.

- **Primary Radius:** 4px (`0.25rem`) for buttons, input fields, and small UI components.
- **Secondary Radius:** 8px (`0.5rem`) for cards and large image containers to provide a gentle, approachable framing for photography.
- **Buttons:** Maintain the `roundedness: 1` setting; do not use pill-shaped buttons as they conflict with the geometric nature of Montserrat.

## Components

### Buttons
- **Primary:** Solid Teal (#0D9488) background with White text. Sharp transitions with 4px corner radius.
- **Secondary:** Outlined with Teal or Gold.
- **Ghost:** White text for use on Dark Hero sections, with a subtle hover state (opacity 0.8).

### Cards (Travel Packages)
- **Structure:** Top-aligned image (fixed aspect ratio 4:3), followed by a content padding of 24px.
- **Details:** Use `label-caps` for the location and `price-display` for the cost.
- **Interactions:** Subtle scale-up on the image (1.05x) within its container on card hover.

### Form Inputs
- **Style:** 1px border (#CBD5E1) with 4px radius. 
- **Focus:** 2px solid Teal border.
- **Typography:** Body-md (Montserrat) for input text.

### Chips & Badges
- **Style:** Small, high-contrast badges for "New" or "Best Seller." 
- **Color:** Use Gold (#F5A623) background for status/rating badges and Teal for category tags.

### Navigation
- **Hero Nav:** Transparent background, white Montserrat text (500 weight), transitioning to a solid white background with Teal accents upon scrolling.