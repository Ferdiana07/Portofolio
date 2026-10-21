---
name: Caesar Ferdiana Suwandi
description: A personal workshop on woven canvas, with expressive type and quiet tactile controls.
colors:
  forest-accent: "#254c3e"
  forest-ink: "#19372d"
  mineral-mint: "#bdd0b6"
  rose-clay: "#e2c5c7"
  muted-lilac: "#d3c8e2"
  warm-apricot: "#e6bca7"
  deep-forest: "#233c33"
  sage-linen: "#d6dec5"
  parchment: "#e9e7de"
  paper-surface: "#f2f0e9"
  field: "#f7f6f0"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(8rem, 19vw, 18rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.4rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.87rem"
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  field: "10px"
  media: "14px"
  panel: "16px"
  pill: "999px"
spacing:
  control-gap: "8px"
  field-y: "12px"
  field-x: "14px"
  control-x: "20px"
  content: "24px"
components:
  button-primary:
    backgroundColor: "{colors.forest-accent}"
    textColor: "#f3f0e7"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
  header-link:
    typography: "{typography.label}"
    textColor: "{colors.forest-ink}"
  chapter-controls:
    height: "44px"
  interest-tab:
    rounded: "{rounded.pill}"
    padding: "10px 19px"
    height: "45px"
  project-card:
    backgroundColor: "{colors.paper-surface}"
    rounded: "{rounded.media}"
---

# Design System: Caesar Ferdiana Suwandi

## Overview

**Creative North Star: "A personal workshop on woven canvas"**

The portfolio feels personal, elegant, and a little playful. Muted fabric-like grounds, a tactile C/F/S paper puzzle, and large Bodoni lettering give it an identity connected to its owner. Professional information stays readable in Manrope, with friendly Indonesian copy rather than advertising slogans.

Texture is a clearly woven, static material; motion supplies the changing point of view. Fullscreen chapters provide room to read before reversible iris, side-curtain, and rounded-arch reveals, while controls and selected information panels feel raised or pressed into their surroundings. Sparse vector linework, drifting fibres, and shallow relief move slowly without covering the work. The opening puzzle is code-native paper geometry, not a rendered person or mascot. Its twelve fragments scatter across the hero only after an explicit action.

**Key Characteristics:**

- Woven canvas and muted chapter colors.
- Expressive serif display type with clear sans-serif information.
- Tactile controls and selectively moulded information panels.
- A fullscreen C/F/S paper puzzle with manual assembly and a stable reset control.
- Fullscreen exploration with accessible content fallbacks.

## Colors

The palette moves between softened mineral and plant colors, anchored by deep, readable ink.

### Primary

- **Forest Accent:** Shared actions on neutral surfaces; individual chapters provide their own paired accent and ink.
- **Forest Ink:** Hero lettering, navigation, and the default dark foreground.

### Secondary

- **Mineral Mint:** Opening scene and CFS introduction.
- **Rose Clay:** The personal greeting and interest tabs.
- **Muted Lilac:** Profile, education, and skills.
- **Warm Apricot:** Project preview, paired with warm espresso text.

### Tertiary

- **Deep Forest:** Experience chapter, paired with cream text.
- **Sage Linen:** Certifications and learning.

### Neutral

- **Parchment:** Contact, catalogue, and footer ground.
- **Paper Surface:** Catalogue cards and media surroundings.
- **Field:** Form input surfaces.

**The Chapter Pair Rule.** A ground travels with its ink and control tones from `src/data/journey.ts`. Do not place a chapter's foreground on a different ground without checking contrast.

## Typography

**Display Font:** Bodoni Moda, with Georgia and serif fallbacks.

**Body Font:** Manrope, with a sans-serif fallback. The implementation's `--font-geist` variable contains Manrope; the variable name does not identify the family.

**Label/Mono Font:** Geist Mono is loaded for existing specialist labels, not as a replacement for ordinary navigation or copy.

The broad serif name and italic greeting provide expression. Manrope handles the facts, controls, project descriptions, and forms. Typography uses close, measured spacing; generic uppercase eyebrows and excessive tracking are not part of this system.

### Hierarchy

- **Display:** The oversized first name in the opening composition. Mobile uses a viewport-width size rather than squeezing the desktop measure.
- **Headline:** Chapter titles. The greeting is a deliberate larger exception with staggered letters and an italic name.
- **Title:** Project names and other clear entry points.
- **Body:** Greeting copy uses the recorded body role; supporting information varies by component, with generous line height. The greeting's biography is constrained to a readable measure.
- **Label:** Short sentence-case controls and navigation. Fields increase to a readable mobile input size.

**The One Expressive Voice Rule.** Reserve the large serif gesture for names and chapter titles; let factual content remain quiet and legible.

## Layout

The enhanced landing page uses seven fullscreen chapters in one fixed stage. Desktop wheel input is routed to the active chapter's scrollable content first. A separate gesture at the boundary advances one chapter; leftover deltas and trackpad momentum never spill into repeated transitions. Compact layouts (up to 1024px or a coarse primary pointer) use arrows or the header menu, never scrolling, to change chapters. Content itself keeps native touch scrolling. The desktop content shell reaches a maximum width of 1240px. Non-hero chapter bodies reserve a bottom inset (110px) for the fixed journey controls; the hero keeps its own composition and is excluded from that rule. The learning chapter holds its introduction in place while the certificate pane scrolls independently; linear fallback restores normal document flow.

The opening composition centers three tilted C/F/S paper sheets beneath the oversized first name, with smaller copy around them. Clicking the sheets scatters twelve quarters across the entire hero, leaving header and dock accessible. Faint assembled guides support manual placement; the stable reset reconstructs the original composition. The project CTA is temporarily hidden while playing and returns after assembly. On short laptops, the home area uses a viewport-relative height (50svh), a bottom offset (112px), and its action at the composition's bottom edge; short landscape uses a bottom offset (105px). The greeting is centered; factual chapters use content grids and lists. The separate project catalogue uses a two-column grid that becomes a single column on smaller screens.

Responsive rules adapt at 1100px, 1024px, and 767px, with additional short-height treatments. On phones, the bottom controls retain the current chapter, previous/next arrows, and an icon-only background-motion toggle. Long content stays reachable. Reduced motion keeps the navigable stage but changes chapters instantly, suppressing decorative movement and looping type. Without JavaScript, all chapters remain in a readable linear document.

## Elevation & Depth

Neumorphism expresses the material of both controls and selected information panels. Profile education panels are moulded above the lilac ground; skill rows sit in shallow recesses. Experience cards rise from the dark canvas, with inset organisation cards beside them. Project media has a restrained cast shadow because it forms a fan in perspective. Navigation remains unblurred. Catalogue cards use a small, bounded glass blur on desktop, with the blur removed on phones.

### Shadow Vocabulary

- **Raised control:** The shared `--neu-flat-sm` token; small opposing highlights and dark shadows tinted to the active chapter.
- **Pressed control:** The shared `--neu-inset-sm` token; a shallow inset pair for pressed controls and fields.
- **Recessed form:** The shared `--shadow-inset` token; a larger, quiet recess around the contact form.
- **Project media:** A soft cast shadow beneath the thin, pale media frame.
- **Moulded profile:** A larger opposing light/dark pair for education and soft-skills panels; recessed rows keep the skill list structured.
- **Dark experience:** A tinted cast shadow plus a fine inner highlight on employment cards; inset organisation cards provide the complementary depth.

**The Quiet Material Rule.** Canvas is a static repeated SVG tile. Keep the weave clearly visible but subordinate to the type and work, with unfilled pattern paths preserving legibility. Chapter-specific motifs, relief, and selected contours are separate, slow CSS layers with an explicit pause control.

## Shapes

Pills and circles signal actions. Fields have gently curved corners; project media and factual panels use broader but restrained corners. Thin borders or moulded edges provide separation without nested decorative frames. Circular reliefs and low-contrast SVG linework sit behind selected chapters. The woven tile is shared by chapter grounds, the intro, catalogue, footer and C/F/S sheets. The paper sheets have lightly rounded outer corners, a printed serif initial and a static folded highlight. No illustrated person, wave, or pupil layers remain in the composition.

## Components

### Buttons

Primary actions use a filled chapter accent, contrasting text, and a shallow raised shadow. Secondary actions are transparent and outlined. Hover changes tone; pressing compresses the control slightly. Visible keyboard focus uses an offset outline. Circular chapter and project arrows share the tactile treatment and have descriptive accessible names.

### Chips

Interest tabs sit in a recessed pill track. A selected tab is raised and lighter; the associated text panel changes with the selection. Arrow keys, Home, and End move through the tabs. Catalogue filters also show a distinct selected state. These controls express an actual selection rather than decorative metadata.

### Cards / Containers

The landing project preview is a perspective fan with a thin pale border, a project name strip, swipe and arrow navigation. The catalogue repeats the media treatment in full cards, adding a translucent light surface and bounded desktop blur. Screenshots use `object-fit: contain` in a reserved media area; the whole landing page image must remain visible. Descriptions, availability, and logo-based TechStack follow the media. Detail dialogs sit above the page with focus managed inside and the background made inert.

Profile education panels use raised lilac moulding; skill rows and icon wells use inset depth. Employment cards use a dark raised surface and a finite entrance when their chapter becomes active. Their small hover lift remains subordinate to the factual content.

### Inputs / Fields

Fields use pale surfaces, a visible fine border, shallow inset depth, and persistent labels. Focus changes the border and surface. Sending, success, and error feedback remains visible and announced; disabled submission has a clear busy label. Friendly copy tells visitors what to write without exposing implementation details.

### Navigation

The fixed header follows the chapter's ground and ink, with About me and Profil & Skill before Projek. Its active link gains an underline. The bottom group shows the current chapter, a segmented ruler of vertical ticks (61, every fifth tick taller), previous/next arrows, and a background-motion pause button; it does not repeat the header's chapter menu. The ruler spans the bottom horizontally, fills with native scroll progress, and exposes its percentage as a labelled progressbar. Mobile uses a scrollable, height-bounded menu and compact journey controls. The compact header removes the nested shell inset: hamburger ends 12px from the right edge (or the device safe area), music sits 8px before it, and targets remain at least 44px. Catalogue retains an additional 8px inner inset. The dock explicitly says to use arrows; desktop cues distinguish reading content from moving to another chapter.

Music is off by default, with a visible “Nyalakan musik” action. There is no additional lofi hint. The visitor's explicit play action attaches the supplied lofi track to an HTML audio element; it has no source before that action and uses `preload="none"`. Playback loops at a quiet volume (18%). Music pauses when the page is hidden and resumes only if the visitor had enabled it. Playback failure has a clear retry label.

### Paper puzzle and staged motion

The three sheets split into twelve independent quarters. A finite 620ms scatter with at most 132ms stagger reaches the whole hero, not just the central art box. Pointer capture and direct MotionValue updates support mouse/touch dragging without React renders per move. Rotated bounds keep fragments on screen; dropping within 30–56px of home magnetically aligns the fragment. Selected pieces offer Putar and Pasang, a single-click alternative to dragging. Arrow keys move, Shift increases the step, R rotates and Home places a piece. Progress reports actual assembled pieces. “Susun ulang” restores all sheets; there is no Acak button. Manual completion restores the break control and keyboard focus. Resize reflows the play area; blur, hidden pages and chapter changes cancel capture and finish in-flight movements at a consistent destination. Reduced motion makes placement/scatter immediate, without removing the game. No idle puzzle loop, physics, WebGL or new runtime package is used. Without JavaScript the assembled paper art stays visible and inert custom controls are hidden.

In the greeting, nearby glyphs gently repel a fine pointer. Software / AI / Cloud loops through typing, a reading hold, deleting and retyping (70ms type, 38ms delete, 1450ms hold, 500ms empty pause); complete accessible text remains available. Hidden, paused, inactive and reduced-motion states stop the loop.

Explicit chapter changes start a single 680ms eased animation immediately, without a long scroll runway or chained camera spring. The six boundaries use iris, curtain, arch, curtain, iris, arch in that order. Iris adds a small scale; curtain and arch use restrained horizontal and vertical translation respectively, not a full scene slide. Poses depend only on scroll position, so the same position looks the same in either direction; a tiny boundary snap removes endpoint residue. The outgoing base and incoming clipped overlay remain opaque. Only those nearby scenes are visible, and inactive content is inert.

Chapter-specific particles replace the earlier generic fibre layer rather than stacking on top of it. One shallow relief drifts (24s); project contour linework moves gently (26s). The opening contains twenty locally imported technology logos in forest ink, scattered as unframed printed marks. Three slow drift paths last 24–44s with staggered negative phases; phones retain fourteen logos, including AWS, Google, Gemini, ChatGPT/OpenAI, Java, HTML and MongoDB. Positions are deterministic and have separate mobile placement. These decorative marks are not additional skill claims.

Each other chapter has six objects plus seven small particles: birds/feathers with pollen drift, orbit/code/node marks with hollow motes, wireframe prisms with diamond drift, route/compass waypoints, stars with constellation traces and glimmer, or post/paper planes with rising message rings. On phones, four objects and four particles remain. Backgrounds are permanently inert and aria-hidden; they never intercept input or cover the foreground with overlays. Only transforms and bounded opacity animate; texture, paths and shadows stay static. Inactive motifs are paused; hidden pages, manual background pause and reduced motion stop the loops. There is no canvas runtime, frame callback, physics engine, network asset dependency or new runtime package. Scene updates touch only outgoing/incoming accessibility states; scroll-cue geometry is read on a subsequent frame after arrival, not between transition writes.

The CFS opening completes automatically in about 3.9 seconds, once per session, with no skip button. Direct links, the catalogue and reduced motion bypass it. Keyboard focus and inert surfaces are restored after completion; CSS also exits without hydration.

## Do's and Don'ts

### Do:

- **Do** keep the woven texture static and clearly visible without competing with text.
- **Do** carry a chapter's ground, ink, and control tones together.
- **Do** use tactile depth on controls and selectively moulded profile and experience panels.
- **Do** keep screenshots uncropped and show technology logos with accessible names.
- **Do** preserve keyboard access, visible focus, reduced motion, and readable mobile content.
- **Do** write friendly, specific Indonesian grounded in Caesar's actual work.

### Don't:

- **Don't** add moving noise, full-screen blur, or a canvas runtime for texture; keep atmosphere sparse and pausable.
- **Don't** animate every object or expand pointer tracking into the whole composition.
- **Don't** turn factual sections into stacks of decorative containers.
- **Don't** add generic uppercase eyebrows, exaggerated tracking, invented metrics, or promotional filler.
- **Don't** imply that a project without a deployment has a working live demo.
