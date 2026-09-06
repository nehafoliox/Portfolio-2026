# Product Requirements Document
## Neha's Portfolio Website — v2 (UI-Reference Build)

**Version:** 2.0
**Owner:** Neha
**Location:** Ahmedabad, India
**Visual reference:** Uploaded portfolio screenshot (Matthis-style layout — bold grotesque type, black "About" block, minimal list-style "Projects" section with hover-reveal previews)

> This PRD replaces the general moodboard direction from v1 with a **direct 1:1 structural/interaction reference**: replicate the layout, typography system, and interaction patterns of the uploaded design, re-skinned with Neha's content, colors, and character illustration (to be supplied later).

---

## 1. Overview

Single flagship page (scrollable, section-based) styled after the reference screenshot: an oversized name/type-driven header, a full-bleed black "About" block with parallax scroll, and a minimal, information-dense "Projects" list section with image-on-hover previews. Fixed nav bar appears on scroll. Footer is not in the reference and will be designed to match the same visual system.

## 2. Reference Breakdown (what we're matching)

| Section | Reference behavior |
|---|---|
| Header | Oversized name typography, with a secondary text element running **behind** a character/portrait image; type style is bold, tight-tracking grotesque sans |
| Nav | Becomes fixed/sticky on scroll, stays visible, minimal (small logo/mark + a couple of links) |
| About (black block) | Full-width black section, big "About" heading top-left, bio paragraph top-right, small meta line (all-caps, letter-spaced) below bio, a small "role @ company" chip with logo/initial badge; section has parallax movement as user scrolls |
| Projects | Left-aligned arrow + "Projects" heading; a filter/meta row (Timeframe / Discipline / Tools / Industry as static labels, not necessarily interactive filters); below that, a clean divided list of project rows (name — services, right-aligned CTA button); hovering a row reveals a floating image/video preview of that project near the cursor, with a colored (e.g., yellow) frame; one row is highlighted with a black/inverted background on hover or as "featured" |
| Footer | Not shown in reference — to be generated in the same visual language (see Section 6) |

## 3. Goals

- Recreate this exact structural/interaction pattern for Neha's single-page portfolio
- Swap in Neha's name, bio, Ahmedabad location, and project list
- Header includes an **infinite horizontal scroll (marquee) of text** running behind Neha's photo/character (placeholder until character art is supplied)
- Use the **same font family/style** as the reference (bold grotesque sans — see Section 5)
- Black About section has **parallax scrolling**
- Project list rows have **hover animations** (image/video preview reveal + row invert), matching reference
- Fixed navigation bar while scrolling
- Add social links: **Instagram, LinkedIn, Behance, Dribbble**
- Add **Download Resume** and **Copy Email** buttons
- Footer designed by us, consistent with the reference's visual system

## 4. Page Structure

```
1. Fixed Nav Bar (appears/sticks on scroll)
2. Header — name + infinite scrolling text behind photo/character
3. About — full-bleed black block, parallax
4. Projects — list with hover-reveal previews
5. Footer — social links, resume, copy email (custom-designed)
```

## 5. Typography & Visual System

- **Font:** Bold, tight, geometric/grotesque sans — visually matching the reference (e.g., *General Sans*, *Neue Montreal*, *Aeonik*, or *Suisse Int'l* as close free/licensable substitutes). One weight family used for both huge display type and small caption/meta text, differentiated by size/tracking, not by mixing typefaces.
- **Color system:**
  - Base: white/off-white background
  - About block: solid black background, white text
  - One accent color for hover-preview frames (reference uses yellow — Neha can choose her own signature accent, e.g., coral, lime, electric blue)
  - Small "W."-style corner tab in the reference → replace with Neha's monogram/initial tab, fixed to the side of the black section as a recurring visual anchor
- **Meta text style:** all-caps, letter-spaced, small size — used for labels like "TIMEFRAME," "DISCIPLINE," "TOOLS," "INDUSTRY," and the "BUILDING PRODUCTS AT THE CROSSPATHS OF..." style line under the About bio (Neha's version: a one-line personal tagline/manifesto in this same treatment)

## 6. Section-by-Section Requirements

### 6.1 Fixed Navigation Bar
- Minimal: small logo/monogram (left) + nav links (Work / About / Contact or similar) + maybe a resume link (right)
- Transitions from "inline at top" to "fixed/sticky" once user scrolls past the header — matches reference behavior
- Slight background blur or solid fill once fixed, so content doesn't show through

### 6.2 Header
- Large-scale name treatment: **"Neha"** (or full name) as dominant display type
- **Infinite horizontal scroll (marquee) of text running behind her photo/character image** — e.g., repeating words like her role, tagline, or "UI DESIGNER • UAHMEDABAD • MAKES SCREENS PRETTY •" looping continuously, partially obscured behind the image so the image sits "in front of" the moving text
- Character/portrait image: **placeholder for now** (Neha will supply later) — build the layout to accept a transparent-background character illustration/photo cutout, same as reference's implied treatment
- Tagline line (small, similar to reference's "6 years of asking 'Why?'..."): Neha's own one-liner
- Location tag: Ahmedabad, India

### 6.3 About (Black Section, Parallax)
- Full-width black background block
- Left: "About" heading, large, bold, white
- Right (or below on mobile): bio paragraph — "a bit about Neha" — 3–4 sentences, personality-driven, same structure as reference (name in bold at sentence start, pronoun tag optional)
- Small all-caps meta line below bio (Neha's personal manifesto/tagline in this treatment)
- Small role/current-focus chip with monogram badge (e.g., "UI/Product Designer" + a badge icon)
- **Parallax effect:** background block and/or its internal elements (heading, bio text, badge) move at slightly different scroll speeds as the user scrolls through this section, creating depth
- Side monogram tab (fixed to edge of this block, like reference's "W." tab) — Neha's initials

### 6.4 Projects
- Left-aligned small arrow icon + "Projects" heading (large, bold)
- Meta/label row below heading: **Timeframe / Discipline / Tools / Industry** (or Neha's equivalent categories — could be repurposed as filter tags for her actual skill areas)
- Divider line
- **Project list** (not a grid — a clean row-based list, matching reference):
  - Each row: icon(s) indicating type + project name + em-dash + services/tags + right-aligned CTA button (e.g., "View Project" instead of reference's "Contact for details," since Neha's projects are showcase, not gated)
  - Rows separated by thin divider lines
  - **Hover interaction:** hovering a row reveals a floating preview image or short looping video of that project, positioned near the cursor, framed in Neha's accent color (matching reference's yellow-bordered preview)
  - One row can be visually "featured" with an inverted (black background/white text) treatment on hover or by default, matching the reference's highlighted "ClubRare" row
- Rows link out to full case studies (or open a modal/expanded view — to be decided per available project count)

### 6.5 Footer (custom — not in reference, same visual system)
- Full-width, could reuse the black background treatment from the About section for visual bookending, or a clean white footer with bold type — either is acceptable as long as it uses the same font system
- Large closing line (Neha's version of a sign-off, e.g., "Let's build something pretty →")
- **Social links row:** Instagram, LinkedIn, Behance, Dribbble — icon buttons with hover animation (scale/tilt/underline draw-in, consistent with hover language used elsewhere on the site)
- **Download Resume** button — downloads/opens PDF
- **Copy Email** button — copies email to clipboard, shows toast/checkmark confirmation
- Small copyright line + monogram, echoing the reference's minimal footer credit style

## 7. Interaction & Motion Summary

| Element | Interaction |
|---|---|
| Nav bar | Fixed/sticky on scroll |
| Header text | Infinite horizontal marquee scroll behind photo |
| About section | Parallax scroll on background/content |
| Project rows | Hover reveals floating image/video preview + row highlight (invert) |
| Social icons | Hover scale/tilt animation |
| Copy Email button | Click → clipboard copy + confirmation toast |
| Resume button | Click → open/download PDF |
| General | Respect `prefers-reduced-motion` — disable marquee/parallax/hover-reveal motion for users who request reduced motion |

## 8. Functional Requirements

| # | Requirement |
|---|---|
| FR1 | Nav bar switches to fixed/sticky state after scrolling past header |
| FR2 | Header marquee text scrolls infinitely (seamless loop, no visible reset jump) |
| FR3 | Header accepts a placeholder character image now, swappable later with Neha's final artwork without layout changes |
| FR4 | About section background/content exhibits parallax movement tied to scroll position |
| FR5 | Each project row, on hover (desktop) / tap (mobile), reveals its image/video preview |
| FR6 | Project preview media is lazy-loaded and compressed |
| FR7 | Social icon buttons (Instagram, LinkedIn, Behance, Dribbble) open profiles in new tabs |
| FR8 | Download Resume button serves the correct, current PDF file |
| FR9 | Copy Email button copies the correct address and confirms success visually |
| FR10 | All hover/parallax/marquee effects have touch-friendly or simplified fallbacks on mobile |

## 9. Non-Functional Requirements

- **Performance:** marquee and parallax must be implemented with GPU-friendly transforms (`transform`, not layout-triggering properties) to stay smooth at 60fps
- **Accessibility:** marquee text should be marked decorative (`aria-hidden`) if purely visual, with real heading text available to screen readers separately; reduced-motion fallback required
- **Responsiveness:** header type scale, About block layout (side-by-side → stacked), and project list (row → stacked card) must adapt cleanly to tablet/mobile
- **Browser support:** latest Chrome, Safari, Firefox, Edge

## 10. Suggested Tech Stack

- **Framework:** Next.js (React)
- **Animation/Parallax:** Framer Motion or GSAP + ScrollTrigger (for the About section parallax and row hover-preview positioning)
- **Marquee:** a lightweight infinite-marquee component (custom CSS keyframe loop or a library like `react-fast-marquee`)
- **Styling:** Tailwind CSS with custom type scale matching the reference's bold display sizes
- **Fonts:** General Sans / Neue Montreal / Aeonik (pick one, license-permitting) — single family, multiple weights

## 11. Content Checklist (what Neha still needs to provide)

- [ ] Character/portrait image (transparent background) — placeholder to be used until ready
- [ ] Final name/header tagline + manifesto-style one-liner for About section
- [ ] Bio paragraph for About block (3–4 sentences)
- [ ] Current role/focus line + monogram badge concept
- [ ] Project list: name, services/tags per project, thumbnail image or short video for hover preview, and either a case-study link or "coming soon" state
- [ ] Resume PDF (final version)
- [ ] Email address for Copy Email button
- [ ] Instagram, LinkedIn, Behance, Dribbble profile URLs
- [ ] Signature accent color (replacing reference's yellow)
- [ ] Font license decision (General Sans / Neue Montreal / Aeonik / alternative)

## 12. Open Questions

- Should project rows link to full case-study pages, or is a hover-preview + external link (Behance/Dribbble) enough for v1?
- Featured/inverted row — pick manually (one flagship project) or auto-rotate?
- Footer treatment: reuse black background (bookend with About) or a distinct lighter footer?
- Marquee text content — role/tagline repeated, or a rotating set of words (design, prototyping, motion, etc.)?

---

*This PRD assumes the uploaded screenshot as the binding visual/interaction reference. Once Neha's character artwork and final content are supplied, no structural changes should be needed — only asset swaps.*
