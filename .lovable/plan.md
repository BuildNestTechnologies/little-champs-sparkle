
# Little Champs School — Premium Single-Page Site

A handcrafted, playful-yet-trustworthy kindergarten site that feels like a premium WordPress build, not a generic AI template. All animations are custom, all hero/program/gallery imagery is AI-generated to match the brand, and the contact form simulates submission with a delightful success state.

## What you'll get

A single-page app with sticky glass header, animated hero, six themed sections, polaroid testimonials, illustrated gallery with lightbox, and a footer with newsletter — all stitched together with smooth scroll, parallax, and entry animations.

## Design system

- **Palette** (HSL, defined as semantic tokens in `index.css` + `tailwind.config.ts`):
  - Sunshine yellow `#FFD23F`, sky blue `#4FC3F7`, candy pink `#FF6FAE`, playful green `#7DD957`, cream white `#FFFBF2`, deep navy text `#1F2A44`.
  - Gradient tokens: `--gradient-rainbow`, `--gradient-sky`, `--gradient-sunshine`.
  - Soft shadows: `--shadow-soft`, `--shadow-pop` (colored ambient shadow).
- **Typography** (Google Fonts via `index.html`):
  - `Fredoka` (variable) for display headings.
  - `Baloo 2` for friendly subheads / playful accents.
  - `Nunito` for body.
- **Background patterns**: faded SVG ABC blocks, stars, clouds tiled at low opacity in alternating sections.
- **Iconography**: Lucide icons (Star, Heart, Shield, Palette, Sun, Phone, etc.) wrapped in colored circular badges with soft shadow.

## Page sections (in order)

1. **Preloader** — bouncing crayon draws the logo star, fades out.
2. **Top bar** — phone, email, social icons, pulsing "Enroll Now" CTA.
3. **Sticky header** — logo + mascot SVG, nav links with sliding underline, glass blur on scroll, mobile full-screen overlay menu with staggered link reveal.
4. **Hero** — split layout: left has cycling word ("Nurturing → Playful → Creative → Safe") above tagline + dual CTAs; right has custom illustrated scene of kids playing. Floating SVG clouds, stars, ABC blocks drift via CSS keyframes. Bouncing scroll indicator.
5. **Welcome / About** — asymmetric image + text, handwritten "Welcome" accent, animated counters (5+ Years, 200+ Kids, 6+ Teachers) triggered on view.
6. **What Makes Us Special** — 6 flip cards (Play-Based Learning, Safe & Hygienic, 12:1 Ratio, Cultural Activities, Outdoor Play, Loving Teachers) with 3D rotateY hover.
7. **Programs** — tabbed interface: Playgroup / Nursery / LKG / UKG. Animated tab switch with parallax background blobs, each panel has icon, description, key activities chips, "Enroll for This Program" button.
8. **Gallery** — masonry grid of AI-generated illustrations with staggered scale-fade reveal, custom lightbox overlay with arrow nav and a "Video Tour" tile that opens a YouTube modal placeholder.
9. **Testimonials** — polaroid carousel: cards rotated -4° / +3° / -2°, taped corners, handwritten font, illustrated parent avatars, autoplay with hover-pause and custom dots. Real quotes from Raviraj, Prashant, Nutan Patil included.
10. **Contact + Map** — left: Google Maps embed for Plus Code 73C2+QR Bhiwandi; right: floating-label form (Parent, Child, Age dropdown, Phone, Email, Message) with zod validation, button morphs into spinner then green checkmark on submit (frontend-only).
11. **Footer** — logo, quick links, contact, newsletter input, "© 2025 Little Champs School. Crafted with love & crayons".
12. **Floating mobile call button** — bottom-right pill that shakes phone icon on tap.

## File structure

```text
src/
  pages/Index.tsx                  // composes all sections
  components/
    Preloader.tsx
    TopBar.tsx
    Header.tsx                     // sticky + mobile overlay
    Logo.tsx                       // SVG mascot + wordmark
    sections/
      Hero.tsx
      About.tsx
      Features.tsx                 // flip cards
      Programs.tsx                 // tabs
      Gallery.tsx                  // masonry + lightbox
      Testimonials.tsx             // polaroid carousel
      Contact.tsx                  // form + map
      Footer.tsx
    ui/
      FloatingShapes.tsx           // animated clouds/stars/blocks
      Counter.tsx                  // count-up on view
      FlipCard.tsx
      Lightbox.tsx
      FloatingCallButton.tsx
  hooks/
    useScrolled.ts
    useCountUp.ts
  lib/
    scroll.ts                      // GSAP ScrollTrigger setup
  assets/                          // AI-generated images saved here
    hero-kids.png
    about-classroom.png
    gallery-1..8.png
    program-playgroup.png ...
    logo-mark.png                  // from uploaded logo
index.html                         // Google Fonts links
src/index.css                      // tokens, fonts, keyframes, patterns
tailwind.config.ts                 // colors, gradients, fonts, animations
ASSETS.md                          // list of generated assets + how to swap
```

## Technical details

- **Stack**: existing Vite + React + TS + Tailwind + shadcn. Adds `framer-motion` and `gsap` (with ScrollTrigger).
- **Animations**:
  - Framer Motion: hero word cycling (`AnimatePresence`), section entry (`whileInView` with stagger), flip cards, tab transitions, polaroid carousel, lightbox, mobile menu, success checkmark morph.
  - GSAP ScrollTrigger: parallax on floating shapes & program/gallery backgrounds, pinned hero illustration micro-animation.
- **Smooth scroll**: `html { scroll-behavior: smooth }` with custom easing via CSS, plus anchor click handler with offset for sticky header.
- **Logo**: I'll copy your uploaded `little_champs_school.png` into `src/assets/logo-mark.png` and pair it with a custom Fredoka wordmark in the header/footer.
- **AI-generated imagery** (via Lovable AI Gateway, `google/gemini-2.5-flash-image`): one warm illustrated hero scene, one classroom welcome image, four program illustrations, eight gallery illustrations, four illustrated parent avatars. All saved to `src/assets/` and imported as ES modules.
- **Form**: `react-hook-form` + `zod` schema (already in project). Submit handler is a `setTimeout` that drives motion states `idle → sending → success → reset`.
- **Map**: `<iframe>` Google Maps embed centered on the school address.
- **Accessibility**: semantic landmarks, alt text on every image, ARIA labels on icon-only buttons, focus rings preserved, color contrast checked against navy text.
- **Performance**: images lazy-loaded (`loading="lazy"`), Framer animations gated by `whileInView` with `once: true`, reduced-motion media query disables drift animations.
- **Responsive**: mobile-first; hero stacks, programs tabs become a horizontal swipe row, polaroids show one-at-a-time on mobile, masonry collapses to 2 cols then 1.

## Out of scope (can add later)

- Real backend for form submissions / email delivery.
- CMS for editing content.
- Multi-page routing (Programs/Gallery sub-pages).
- Real Instagram feed integration.

After you approve, I'll generate the assets, install the two libraries, and build all components in one pass.
