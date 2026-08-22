# Design QA

- Source visual truth: `/var/folders/my/bpps6r9s3f77pjvvxybnctn00000gn/T/TemporaryItems/NSIRD_screencaptureui_wOWxk8/螢幕截圖 2026-08-22 14.08.14.png`
- Alignment issue reference: `/var/folders/my/bpps6r9s3f77pjvvxybnctn00000gn/T/TemporaryItems/NSIRD_screencaptureui_lG6Pnm/螢幕截圖 2026-08-22 15.20.01.png`
- Fullscreen sizing reference: `/var/folders/my/bpps6r9s3f77pjvvxybnctn00000gn/T/TemporaryItems/NSIRD_screencaptureui_KPwRvg/螢幕截圖 2026-08-22 15.47.41.png`
- Implementation screenshots:
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/implementation-desktop-1262x1021.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/implementation-chat-hover.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/implementation-mobile-390x844.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/implementation-reference-1494x602.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/alignment-fullscreen-2374x1196.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/alignment-laptop-1087x865.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/alignment-mobile-390x844.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/alignment-shared-container-1087x450.png`
  - `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/title-responsive-1642x816.png`
- Combined comparison: `/Users/planetcow/Documents/Codex/2026-08-22/files-mentioned-by-the-user-portfolio/audit/qa-side-by-side.png`
- Reference pixels: 1494 × 602; density unknown.
- Matched implementation viewport and pixels: 1494 × 602 CSS px at browser density 1.
- Additional responsive states: 2374 × 1196 fullscreen, 1536 × 900 desktop, 1087 × 865 laptop, 768 × 1024 tablet, and 390 × 844 mobile.
- State: hero at rest, chatbot at rest and hover, chatbot opened and dismissed with Escape.

## Full-view comparison evidence

The reference is a tight crop of the display title rather than the complete hero, so global scale is not treated as a pixel-fidelity target. The implementation preserves the same three-line white/blue hierarchy and dark moving texture while adding the requested slightly more open line rhythm. The complete desktop and mobile captures confirm that the title remains inside the hero and above the logo rail.

## Focused region evidence

The title and chatbot were inspected separately because they are the only requested changes. The chatbot measures 44 × 44 px at rest, expands to 280 px on hover, changes from 60% white to full white, increases its border from 20% to 40% white, and keeps a visible 2 px keyboard focus ring. Its continuous body bob/rotation was removed; the eye blink remains.

## Required fidelity surfaces

- Fonts and typography: existing heading family and weight preserved; line heights increased to 0.96 / 0.92 / 0.90 responsively; wrapping and copy remain unchanged.
- Spacing and layout rhythm: one shared responsive gutter now controls the greeting, intro, title container, and scroll label: 20 px mobile, 32 px tablet, and 40 px laptop/desktop/fullscreen. The title keeps a single `-0.06em` optical font correction. No tested viewport has horizontal overflow; chatbot resting footprint remains 44 px.
- Colors and visual tokens: white and `#4D7CFF` hierarchy preserved; chatbot contrast is intentionally quieter at rest and returns on hover/focus/open.
- Image quality and assets: existing video/background and logo assets are unchanged; no visible asset was substituted.
- Copy and content: all portfolio and chatbot copy is unchanged.

## Interaction and technical checks

- Chatbot hover expansion: passed.
- Chatbot open state: passed.
- Escape dismissal: passed.
- Mobile horizontal overflow: none at 390 × 844.
- Left-edge equality: intro and title container matched exactly at 2374, 1536, 1087, 768, and 390 px widths.
- Console errors: none.
- TypeScript check: passed.

## Findings

No actionable P0, P1, or P2 differences remain for the two requested refinements.

## Comparison history

- Pass 1: title rhythm, resting chatbot size/contrast, hover emphasis, responsive overflow, and open/close interaction all met the brief. No corrective iteration was required.
- Pass 2: replaced separate Tailwind left offsets, `-3px` intro margin, and the title-only class offset with a shared gutter system. The first ultrawide optical nudge over-corrected the title; it was removed and replaced with one `-0.06em` font correction. Post-fix screenshots show the visible `D` aligned with the intro at fullscreen, laptop, and mobile sizes.
- Pass 3: moved the intro and title into the same positioned parent. At 1087 px width, the shared parent, intro, and title wrapper all measured exactly 40 px from the left at viewport heights 865, 700, 600, and 450 px. At 390 × 844 they all measured exactly 20 px. The shortest-state screenshot confirms the visible left edge remains aligned with no overlap or horizontal overflow.
- Pass 4: capped the large title at 160 px instead of 200 px for wide/fullscreen layouts. At the Retina screenshot's effective 1642 × 816 CSS viewport, the title now measures 160 px with a 28.8 px gap below the intro and a 28 px gap above the logo rail. The 1087 px laptop and 390 px mobile sizes remain governed by their existing responsive values. No tested state overflows horizontally.
- Pass 5: added the requested 2 px left-position offset to the three-line title only. The offset remains exactly 2 px at 1642 × 816, 1087 × 865, and 390 × 844, while the shared wrapper gutter remains 40 px on desktop/laptop and 20 px on mobile. No tested state overflows horizontally.

## Follow-up polish

- P3: The expanded chatbot label remains intentionally wide for readability; it could be shortened later if a more minimal hover state is desired.

final result: passed
