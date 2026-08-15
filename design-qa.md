# Design QA — project controls, typography, and cinematic navigation

## Evidence

- Source visual truth: the two annotated `/projects` browser screenshots in the current user request, plus the user's explicit placement requirements (metadata at bottom-left; controls at bottom-right; square filter; navigation-matched type).
- Implementation screenshot: `qa/projects-unified-style.png`.
- Contact cleanup screenshot: `qa/contact-without-particles.png`.
- Viewport: 1135 × 998 CSS px at device scale factor 1.
- Responsive check: 390 × 844 CSS px; document width remained 390 px.
- State: `/projects`, All filter, gallery resting state; `/` contact anchor, Say Hello resting state.
- Source pixel dimensions: 1135 × 998 for the annotated browser evidence displayed in-thread.
- Implementation pixel dimensions: 1135 × 998.
- Density normalization: none required; source and implementation use the same CSS viewport and pixel dimensions.

## Full-view comparison

The implementation preserves the annotated spherical gallery composition and places the active project block at the lower-left edge. The filter/HUD is separated into the lower-right corner, uses square geometry, and shares the site's body typeface and 14 px navigation size. The gallery remains the dominant visual surface with no new decorative layers competing with it.

## Focused region comparison

- Bottom controls: the active project metadata and filter no longer compete for the same center-bottom area.
- Typography: computed styles confirm main navigation and filter controls both use `HelveticaNowDisplayW01-Rg, Helvetica Neue, Arial, sans-serif` at 14 px; filter radius is 0 px.
- Contact card: the particle canvas is absent (`#contact canvas` count: 0) while the card structure, glow, copy, email, and message link remain intact.

## Findings and comparison history

### Initial P2 findings

- Filter used monospaced 8–9 px uppercase pill styling that did not match the site navigation.
- Filter was centered while the annotation requested bottom-right alignment.
- Project metadata sat higher than the requested bottom-left anchor.
- Contact section still rendered moving geometric particles.
- Home and Projects used separate entry treatments with no shared route transition.

### Fixes made

- Introduced shared `site-nav-text` typography tokens and inherited form/control fonts.
- Rebuilt the filter as a square, segmented control at bottom-right and moved metadata to bottom-left.
- Removed `ContactParticleField` from the rendered contact section.
- Added one global cinematic route transition for internal page-to-page navigation.
- Removed the duplicate hero-only intro overlay and aligned timeline display headings with the shared heading family.

### Post-fix evidence

- `qa/projects-unified-style.png`: placement, square controls, and consistent navigation typography.
- `qa/contact-without-particles.png`: particle-free Say Hello card.
- Filter interaction: UI/UX becomes pressed and exposes exactly four project case-study buttons.
- Cinematic navigation: Projects → Home completed after the transition curtain and resolved to `/`.
- Browser console: no errors or warnings.
- `npm run lint`: passed.
- `npm run build`: passed; only the existing Vite bundle-size advisory remains.

## Required fidelity surfaces

- Fonts and typography: passed. Navigation and filters share the same family, size, line height, and letter-spacing token; display headings retain the site heading family.
- Spacing and layout rhythm: passed. Bottom-left and bottom-right control zones are distinct; mobile has no document overflow.
- Colors and visual tokens: passed. Existing black, white, violet ambient light, and orange accent system is preserved.
- Image quality and asset fidelity: passed. Existing project textures and 3D gallery materials are unchanged.
- Copy and content: passed. Project labels, category counts, contact copy, and navigation labels are unchanged.

## Follow-up polish

- P3: code-split the Three.js gallery in a later performance pass to reduce the existing bundle-size warning.

final result: passed
