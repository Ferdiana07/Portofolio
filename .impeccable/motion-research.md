# Motion observations and adaptations

Observed 21 October 2026. Browser observations describe the public page version inspected that day, not a claim about its complete architecture.

| Reference | Observed | Adapted in Caesar's portfolio |
| --- | --- | --- |
| [Nesil Noble](https://nesilnoble.com/) | Fullscreen layers; pinned scroll timeline; enter, reading hold, exit; oversized greeting with staggered letters. Public runtime exposed GSAP/ScrollTrigger and Lenis. | Seven fullscreen scenes; native scroll plus existing Motion spring; reading hold and eased transition; dedicated “Hi, aku Caesar.” scene. An original folded-canvas CFS composition replaces the reference site's artwork and the retired mascot. |
| [Kelvin](https://kelvin.8b.com/) | The inspected version was a music event site with pinned photo fans and a separate archive sequence. | A manually controlled perspective fan for project previews, then a separate /projects catalogue. No autoplay or scroll library. |
| [Onlines](https://onlines.com.ar/) | Oversized type, floating graphic elements, cursor-like type accents, multiple canvas elements. | Large personal wordmark, responsive greeting letters and direct interactive tabs. No canvas renderer needed for these interactions. |
| [Dribbble neumorphism search](https://dribbble.com/search/neumorphism-web) | Soft paired highlights/shadows on controls and recessed input surfaces. | Small raised buttons, recessed interest tabs and fields; reading content stays mostly flat. |

The references were inspected visually and through their public browser runtime. REA additionally executed a declared, temporary-browser scenario on Nesil: initial wait, three PageDown actions, settle, final DOM capture. Evidence ID: `ev_3a5f7805706f843020c22665e747e31df5b2135440c2e398051cb07279b480c4`. All steps completed and REA reported cleanup `terminated-owned-process`. This capture supports the retained DOM state; it is not a performance benchmark or proof that every bundled module ran.

## Original assets and performance choices

- Mascot vectors in public/caesar-layers were drawn from the owner's supplied PNG/JPG references. No SVGs existed in the original reference folder.
- Canvas weave is authored geometric SVG, displayed as a small repeated static tile. No animated noise, raster editing, shader, feTurbulence, or full-screen filter.
- Latest revision removes the character and its pointer/wave runtime completely. The CFS folded-canvas composition uses CSS geometry, a stable click target and slow transform-only movement; no renderer or new runtime package.
- The project fan uses existing CSS perspective. Actual project screenshots remain contained and uncropped.
- Public reference code and artwork were not copied into the implementation.

## Development tools

Remotion best-practices/markup skills were installed from remotion-dev/skills; Framer External Agent setup completed; existing design-taste-frontend provides TasteSkill guidance; REA 6.7.0 setup completed. REA uses a tool-local Node 24.22.0 because the system's Node 22.18.0 is below that REA release's requirement. The system Node installation was not replaced. These tools do not add dependencies to the shipped website.
