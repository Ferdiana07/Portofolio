# Verification — 22 October 2026

Current production preview: http://localhost:4181. The accepted fixed-stage navigation remains intact; the opening now restores an upgraded, fullscreen C/F/S paper puzzle.

## Shipped interaction

- Desktop wheel consumes the active scroll pane before any scene transition. A large last delta cannot spill into navigation; a new boundary gesture advances one chapter. Trackpad momentum is gated to one chapter per gesture.
- Compact/coarse-primary-pointer layouts use arrows or menu for chapter changes; native touch only scrolls content. Reduced motion changes chapters instantly. No JavaScript retains linear content.
- One immediate 680ms transition replaces the long runway and chained spring. Iris, curtain and arch poses still reverse deterministically.
- Three C/F/S paper sheets split into twelve quarters across the full hero. Drag/drop snaps near faint home guides; selected fragments offer rotation and click-to-place. Keyboard supports arrows/Shift/R/Home. Susun ulang restores all sheets; no Acak control. Header/dock remain usable; the project CTA returns after assembly.
- Opening: twenty inline technology-logo SVGs, fourteen on phones, with three slow drift paths. Includes AWS, Google, Gemini, ChatGPT/OpenAI, Java, HTML and MongoDB. Other chapters have six themed objects plus seven particles (four/four on phones): birds, nodes, prisms, waypoints, stars and post. The earlier generic fibre layer was removed instead of duplicated. Decorative roots are permanently inert and aria-hidden; inactive/hidden/manual-pause/reduced-motion safeguards remain.
- Compact header music/menu controls now reach the right edge: 12px safe margin, 8px gap and at least 44px touch targets. Catalogue adds 8px internal inset. Typing deletes/retypes while Hello is active; pause/hidden/reduced states stop it.
- Intro has no skip control, auto-finishes at about 3.9 seconds and restores focus/inert state. Direct links, catalogue and reduced motion bypass it.

## Validation

- Production build, lint, test:motion and test:puzzle passed. The actual transition function is checked over 1,201 positions, reverse parity, endpoints, clamping and all three variants. Puzzle geometry checks 28,800 rotated corners across six viewports, deterministic scatter, bounds and manual snap reachability.
- Current background/header suite: 85/85 passed, including all seven requested brands, logo movement/freeze, distinct chapter motion, inactive/manual/hidden/reduced safeguards, desktop/phone screenshots, four compact header sizes, catalogue header, seven-scene axe checks and removal of the duplicate fibre layer. The puzzle suite (60) and scroll/audio/motion suite (50) were rerun after the final stage batching changes: 195 current browser checks passed in total.
- Focused puzzle browser suite: 60/60 passed on the final build. Covers fullscreen scatter and exact reset at six sizes, manual magnet placement/progress, rotation, keyboard and single-click alternatives, completion focus, repeated mid-animation reset, blur interruption, resize, menu access, actual CDP touch, phone arrows, reduced motion and no-JavaScript art. Axe-core reports zero violations in assembled, scattered and selected-piece states. Small-phone reset/project controls no longer overlap, and the break hint remains unobstructed.
- Earlier core browser suite: 57/57 passed, including catalogue/filter/modal, uncropped images, form mocked success/error, keyboard tabs/focus, six responsive sizes, reduced motion, no-JavaScript content and automatic intro.
- Final scroll/audio/motion suite: 50/50 passed after the panel-theme/memo optimization. Includes large deltas, inner scroll priority over certificate intro, reverse boundaries, trackpad momentum, actual synthesized touch, phone arrows, looping/pause, music opt-in and all seven motif states.
- Final axe-core 4.10.3: zero reported violations in all seven scenes and /projects for the selected WCAG2A/AA/2.1AA rules. This is not assistive-technology certification.
- Short mobile menus can scroll to Contact at 320×568, 844×390 and 820×1180. After closing the menu, focus is inside the Contact scene.
- All five screenshots loaded successfully in both preview and catalogue. No internal HTTP errors in that asset check.
- Current source check: all 41 TS/TSX/CSS files decode as strict UTF-8; production build typechecks/compiles the sources. The previous stage pass additionally parsed sources with TypeScript/PostCSS and validated the design sidecar. The sidecar remains schemaVersion2 with nine components.
- Source detector ran once: exit0, no primary findings; typography/radius ramp advisories were reviewed as intentionally bounded component variations. No second detector was run.
- git diff --check passed, apart from Git's Windows LF/CRLF notices.

Viewports: 1440×980, 1366×768, 390×844, 320×568, 820×1180 and 844×390. Native synthesized touch used Chromium CDP touchStart/Move/End at 390×844. Physical Safari/iOS, real browser zoom and assistive-technology users remain untested.

Contact responses were mocked. No real emails were sent. Production FormSubmit activation/delivery needs owner verification.

## Measured performance

Current background update, 22 October: isolated headless Edge at 4× CPU slowdown. Six forward/six reverse arrow transitions plus one puzzle scatter/reset, same script before/after, without concurrent browser audits.

| Viewport | Version | Median | p95 | Maximum frame | Long tasks |
| --- | --- | --- | --- | --- | --- |
| Phone 390×844 | Before | 7ms | 13.9ms | 55.4ms | 0 |
| Phone 390×844 | Final | 7ms | 13.9ms | 41.7ms | 0 |
| Desktop 1440×980 | Before | 7ms | 14ms | 62.6ms | 0 |
| Desktop 1440×980 | Final | 7ms | 20.8ms | 62.5ms | 2 (max 60ms) |

The initial expanded desktop version recorded 7 long tasks. An attempted global transition pause worsened this to 18 and was removed. Final work removed duplicate fibre particles, avoided redundant inactive-panel aria writes, made backgrounds permanently inert, and moved scroll-cue geometry reads out of transition writes. A trace identified synchronous UpdateLayoutTree inside the frame callback as the largest main-thread cost. Phone results remained comparable; desktop still has occasional cold scene-entry spikes under the 4× stress test. Do not describe this as universally lag-free or as improved desktop p95.

Previous puzzle-only benchmark, 22 October: isolated headless Edge, 4× CPU slowdown, four scatter/reset cycles per run. RAF timestamps and PerformanceObserver, with no concurrent browser audits. No idle puzzle animation, per-move React updates, WebGL, physics or new runtime dependency.

| Puzzle run | Median | p95 | Maximum frame | Long tasks |
| --- | --- | --- | --- | --- |
| Phone first, 390×844 | 13.7ms | 20.9ms | 55.5ms | 0 |
| Phone warm | 13.8ms | 27.7ms | 41.8ms | 0 |
| Desktop first, 1440×980 | 13.9ms | 20.9ms | 31.7ms | 0 |
| Desktop warm | 13.9ms | 21ms | 41.7ms | 0 |

These throttled local measurements show variation and occasional missed frame budgets; they are not a universal lag-free guarantee. Physical low-end phones remain untested.

Earlier stage-only benchmark, 21 October: isolated headless Edge at 390×844, 4× CPU slowdown. Six arrow transitions down, then six up; RAF frame timestamps and PerformanceObserver long tasks, with no concurrent browser audits. The stage implementation is unchanged by the puzzle update.

| Final run | Median | p95 | Maximum frame | Long tasks |
| --- | --- | --- | --- | --- |
| First | 7ms | 13.9ms | 34.8ms | 0 |
| Warm | 6.9ms | 13.9ms | 34.6ms | 0 |

Before per-panel material variables and atmosphere memoization, equivalent runs recorded eight long tasks (maximum63–71ms). Retain this local variability rather than claiming every device or frame is lag-free.

## Audit and documentation

See audit-2026-10-21.md for the five-dimension audit and resolved findings. The landscape menu overflow, label/name mismatch, scroll-chaining ambiguity and inherited material restyle were addressed.

DESIGN.md, its schemaVersion2 sidecar, direction records and README match the current navigation and visual behavior. No new runtime dependency, WebGL renderer, video background or physics engine was added. Original reference assets remain preserved. QA scripts/screenshots are local under .impeccable/review.
