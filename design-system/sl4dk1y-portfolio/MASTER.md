# Design system: sl4dk1y portfolio

## Direction

A compact editorial portfolio for an individual developer. Favor clear text, quiet surfaces and direct links. One public-domain botanical plate gives the hero a personal, natural-history accent; keep the remaining sections free of decorative art, diagrams, card numbering and grids. This is a portfolio, not a product landing page.

## Color tokens

| Token | Dark | Light | Use |
|---|---|---|---|
| Background | `#100D10` | `#FAF7F8` | Page canvas |
| Surface | `#1B151A` | `#FFFFFF` | Project cards and controls |
| Text | `#F3EDF0` | `#271D22` | Main copy |
| Muted | `#B5A8AF` | `#6D6067` | Supporting copy |
| Accent | `#C15375` | `#852B49` | Links, focus and small labels |
| Border | `#332730` | `#E7DDE2` | Dividers and outlines |

Light mode is the first-visit default. Persist an explicit light or dark choice in local storage and apply it before React renders. Theme selection is independent of language.

## Typography

- Interface and body: Source Sans 3 Variable.
- Editorial headings: Source Serif 4 Variable.
- Both families are self-hosted WOFF2, use Latin and Cyrillic subsets, and are distributed under the SIL Open Font License 1.1.
- Keep headings moderate and body copy comfortably readable. Avoid mono labels as decoration.

## Layout and components

- Main content width: up to 1240px with fluid side gutters. Keep paragraph measure around 60–75ch.
- A compact sticky header contains an avatar and handle, section links, language control and theme control.
- The desktop hero places the GitHub avatar, handle, study context, one specialty heading, short introduction and two links beside a single credited natural-history plate. Stack the image after the text on narrow screens.
- About is one short paragraph about applied AI studies and current technical interests.
- Stack uses two columns of compact text groups and plain tags.
- Projects use short cards with description, tags and repository links. No image placeholders.
- Contact is a small section with one GitHub link.
- Footer stays quiet and short.

## Interaction and motion

- Use native anchor navigation and a compact mobile menu.
- Theme and language controls are buttons with clear accessible names.
- Use a one-time IntersectionObserver reveal with a small vertical offset and a short stagger. Keep hover transitions subtle and reveal all content immediately when JavaScript or motion is unavailable, or when `prefers-reduced-motion` is enabled.
- Keep the default English content available in the static `noscript` fallback, with working section anchors and no reveal effects.
- Avoid scroll choreography, parallax, continuous animation and layout shifts.

## Responsive and accessible

- Check 375px, 768px, 1024px and 1440px widths for overflow and readable line lengths.
- Use semantic landmarks, one H1, descriptive links, a skip link and visible keyboard focus.
- Keep mobile targets comfortable and preserve native keyboard behavior.
- English and Russian copy should be reviewed as separate natural texts.

## External assets

The profile avatar is a local copy sourced from `https://github.com/sl4dk1y.png`; `public/favicon.png` and `public/apple-touch-icon.png` are small local copies of the same image. The Hero artwork is Mark Catesby's *Red Frangipanni*, downloaded from the National Gallery of Art Open Access collection and served as a local WebP. Its public-domain credit is shown under the image. Show a compact initials fallback if the local avatar fails.
