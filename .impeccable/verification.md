# Verification — 21 October 2026

Current production preview: http://localhost:4181. This replaces the earlier long-scroll stage and folded-card/puzzle experiments.

## Shipped interaction

- Desktop wheel consumes the active scroll pane before any scene transition. A large last delta cannot spill into navigation; a new boundary gesture advances one chapter. Trackpad momentum is gated to one chapter per gesture.
- Compact/coarse-primary-pointer layouts use arrows or menu for chapter changes; native touch only scrolls content. Reduced motion changes chapters instantly. No JavaScript retains linear content.
- One immediate 680ms transition replaces the long runway and chained spring. Iris, curtain and arch poses still reverse deterministically.
- Three interwoven CSS bands surround a tactile CFS imprint. No puzzle or Acak control. Susun ulang cycles three arrangements.
- Seven distinct edge motifs run only in the active chapter. Typing deletes/retypes while Hello is active; pause/hidden/reduced states stop it.
- Intro has no skip control, auto-finishes at about 3.9 seconds and restores focus/inert state. Direct links, catalogue and reduced motion bypass it.

## Validation

- Production build, lint and test:motion passed. The actual transition function is checked over 1,201 positions, reverse parity, endpoints, clamping and all three variants.
- Core browser suite: 57/57 passed, including catalogue/filter/modal, uncropped images, form mocked success/error, keyboard tabs/focus, six responsive sizes, reduced motion, no-JavaScript content and automatic intro.
- Final scroll/audio/motion suite: 50/50 passed after the panel-theme/memo optimization. Includes large deltas, inner scroll priority over certificate intro, reverse boundaries, trackpad momentum, actual synthesized touch, phone arrows, looping/pause, music opt-in and all seven motif states.
- Final axe-core 4.10.3: zero reported violations in all seven scenes and /projects for the selected WCAG2A/AA/2.1AA rules. This is not assistive-technology certification.
- Short mobile menus can scroll to Contact at 320×568, 844×390 and 820×1180. After closing the menu, focus is inside the Contact scene.
- All five screenshots loaded successfully in both preview and catalogue. No internal HTTP errors in that asset check.
- 37 TS/TSX/CSS source files decoded as valid UTF-8 and parsed with TypeScript/PostCSS. Design sidecar schemaVersion2 and nine snippet styles parsed successfully.
- Source detector ran once: exit0, no primary findings; typography/radius ramp advisories were reviewed as intentionally bounded component variations. No second detector was run.
- git diff --check passed, apart from Git's Windows LF/CRLF notices.

Viewports: 1440×980, 1366×768, 390×844, 320×568, 820×1180 and 844×390. Native synthesized touch used Chromium CDP touchStart/Move/End at 390×844. Physical Safari/iOS, real browser zoom and assistive-technology users remain untested.

Contact responses were mocked. No real emails were sent. Production FormSubmit activation/delivery needs owner verification.

## Measured performance

Isolated headless Edge at 390×844, 4× CPU slowdown. Six arrow transitions down, then six up; RAF frame timestamps and PerformanceObserver long tasks, with no concurrent browser audits.

| Final run | Median | p95 | Maximum frame | Long tasks |
| --- | --- | --- | --- | --- |
| First | 7ms | 13.9ms | 34.8ms | 0 |
| Warm | 6.9ms | 13.9ms | 34.6ms | 0 |

Before per-panel material variables and atmosphere memoization, equivalent runs recorded eight long tasks (maximum63–71ms). Retain this local variability rather than claiming every device or frame is lag-free.

## Audit and documentation

See audit-2026-10-21.md for the five-dimension audit and resolved findings. The landscape menu overflow, label/name mismatch, scroll-chaining ambiguity and inherited material restyle were addressed.

DESIGN.md, its schemaVersion2 sidecar, direction records and README match the current navigation and visual behavior. No new runtime dependency, WebGL renderer, video background or physics engine was added. Original reference assets remain preserved. QA scripts/screenshots are local under .impeccable/review.
