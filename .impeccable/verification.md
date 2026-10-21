# Verification — 21 October 2026

Final local production build: http://localhost:4181. Browser: headless Microsoft Edge through Playwright. These are local laboratory checks, not real-device certification or field Core Web Vitals.

## Code and functional checks

- `npm run build`: passed; / and /projects prerender successfully.
- `npm run lint`: passed.
- `npm run test:motion`: passed. The actual shipped transition/timing functions are tested over 1,201 positions, exact forward/reverse parity, integer boundary residues, clamping and three transition variants. No test-only duplicate implementation.
- Core browser suite: 55/55 passed after the shared ruler gutter correction. Includes chapter isolation/focus, canvas rearrange button, interest keyboard tabs, project fan, uncropped images, catalogue filter/modal, mobile menu, contact success/error, reduced motion, no-JavaScript linear content and skippable intro.
- Expanded motion/audio suite: 104/104 passed before the final layout-only clearance adjustments. All six transition boundaries matched when approached from either direction on desktop and phone, after allowing the intentional camera spring to settle. It also verified opaque adjacent layers, settled scene isolation, 61 ticks, progress completion, music invitation, real playback, pause and no initial audio request.
- Final clearance and recapture suite: 70/70 passed. Every supplied viewport has clear canvas-action/ruler separation, a nonhero content gutter, scrollable certificate list with fixed introduction and reachable contact submit button.
- Final axe-core 4.10.3 audit: zero reported WCAG A/AA violations across all seven settled chapters and /projects. Automated checks do not replace assistive-technology user testing.
- Final certificate keyboard test: End-key list scrolling with stationary introduction passed in fresh pages at all six sizes. Earlier false readings came from sampling unfinished entrances or reusing an already-bottomed list across hash navigation.
- 37 source TS/TSX/CSS files decoded as strict UTF-8 and parsed with TypeScript/PostCSS; no replacement characters or syntax errors. Build/TypeScript and lint subsequently passed again.
- `git diff --check`: passed; Git reports only the existing Windows LF/CRLF conversion notices.

Contact API responses were mocked. No real email was sent. Owner activation of FormSubmit remains necessary for production delivery.

## Visual coverage and corrections

Viewports: 1440×980, 1366×768, 390×844, 320×568, 820×1180 and 844×390.

Fresh captures include all seven desktop and phone scenes, three intermediate transition variants on each, and the opening at laptop/small/tablet/landscape sizes. Additional certificate/contact captures cover the constrained sizes. Review artifacts are ignored under .impeccable/review.

The old direction-dependent layer order was replaced by a position-only pose: the lower scene stays opaque and the upper scene is revealed with an iris, side curtain or rounded arch. Scroll up reverses the same poses. Floating-point residues snap at scene boundaries.

Visual finish review found two localized clearance defects: the enlarged ruler touched nonhero content and intersected the rearrange button on short landscape/laptop layouts. Nonhero scrollpanes now reserve a 110px bottom inset, excluding the full-stage hero. Short-height artwork and its stable action were repositioned. Measurements and recaptures confirm a visible gap without losing inner scrolling or the pinned certificate introduction.

## Scroll measurements

Final isolated test: 390×844, 4× CPU slowdown, 180 native scroll steps of 25px, browser frame timestamps and PerformanceObserver long tasks. No concurrent browser audits ran during these measurements.

| Run | Median frame interval | p95 | Long tasks |
| --- | --- | --- | --- |
| First downward pass | 6.9ms | 13.8ms | 0 |
| Warm downward pass | 6.9ms | 7.1ms | 0 |
| Upward pass | 6.9ms | 13.9ms | 0 |

Maximum frame interval was 34.7ms in first/down and up passes, 27.9ms warm. An earlier fresh-browser pass measured one 67ms first-entry long task; retain that variability rather than claiming every device or frame is lag-free.

## Assets and runtime

The mascot and its pointer/wave component were removed from the rendered UI. Original user reference files and historical image/vector assets remain archived, not requested by the hero.

Its replacement is three folded CFS canvas leaves built from exact CSS geometry, with a stable rearrange button. A single small authored SVG tile supplies the stronger static weave. Sparse fibres, a relief and selected linework use slow active-scene CSS transforms. Manual pause, document visibility and reduced motion control ambient movement.

No new website runtime dependency, WebGL renderer, video background or scroll-hijacking library was added. The local lofi MP3 remains opt-in, source-free before interaction, looped at 18% volume and paused while hidden.

## Finish status

Second verdict pass: **ship**. Both listed clearance findings were scored resolved; this fix-list verdict is not a new whole-surface or universal performance certification. DESIGN.md and its schemaVersion 2 sidecar were reconciled with the final implementation, preserving normative primitive tokens. Nine self-contained component snippets, narrative parity, transition sequence and both 61-tick ruler layers were validated. No application source changed after the final captures.
