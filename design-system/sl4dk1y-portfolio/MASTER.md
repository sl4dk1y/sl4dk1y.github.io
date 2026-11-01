# Design system: sl4dk1y portfolio

## Direction

A compact editorial portfolio for an individual developer. Favor clear text, quiet surfaces and direct links. A changing floral work gives the Hero a natural-history accent; the wide-screen side collage uses historic landscapes, architecture, portraits and animals. Keep the remaining sections free of decorative art, diagrams, card numbering and unnecessary grids. This is a portfolio, not a product landing page.

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
- The Hero places the avatar, handle, study context, specialty heading, introduction and two links beside a locally stored floral work selected from the 44-item Hero collection on page load. Keep the selection stable during language and theme changes. The local fallback is used if the selected file cannot load.
- Keep section order as About, Projects, Technical Skills, Experience, Education, Additional Training, Languages and Contact. Use short descriptive eyebrow labels that add context without repeating the section title.
- About is one short paragraph about applied AI studies and current technical interests.
- Projects use short cards with description, tags and repository links. No image placeholders.
- Technical Skills uses two columns of compact text groups and plain tags. Mark conceptual AI knowledge without implying production experience.
- Experience uses a compact text-first timeline; label independent projects as self-directed rather than employment. Education, training and languages use short credential rows.
- Contact is a compact section with GitHub and email links, plus a localized email-copy action and live status feedback.
- The static ambient collage selects fourteen unique local works from the 70-item collection at widths of at least 1680px. It places seven works on each side, uses an independently selected layout for each side and is omitted for reduced motion and narrower screens.
- Keep source image proportions with `object-fit: contain`; do not crop artwork. Apply the 9px Hero and 15px Ambient Gallery corner radius to the image boundaries. Avoid added frames or shadows.
- Footer stays quiet and short.

## Interaction and motion

- Use native anchor navigation and a compact mobile menu.
- Theme and language controls are buttons with clear accessible names.
- Use a one-time IntersectionObserver reveal with a small vertical offset and a short stagger. Keep hover transitions subtle and reveal all content immediately when JavaScript or motion is unavailable, or when `prefers-reduced-motion` is enabled.
- Keep the default English content available in the static `noscript` fallback, with working section anchors and no reveal effects.
- Avoid scroll choreography, parallax, continuous animation and layout shifts.

## Responsive and accessible

- At widths above 800px, the Hero uses two columns and the main content uses the 1240px maximum width with fluid side gutters. At 800px and below, the navigation becomes a menu, the page shell narrows to at most 720px, and the Hero keeps a two-column layout with a 190px artwork column. Project cards reduce to two columns and About stacks vertically.
- At 520px and below, the page shell uses 18px side gutters, the Hero and Contact stack into one column, project cards and skill groups use one column, and experience and credential rows stack. Mobile landscape Hero artwork is right-aligned within a 250–320px figure height. For mobile portrait, the artwork is centered and enlarged to at most 310px wide; its image frame reserves a `.73` aspect ratio and a separate 64px caption area. The image scales inside this frame without cropping, so source artwork orientation does not change the reserved Hero artwork area.
- Contact has a three-column layout above 1140px. From 521px through 1140px, the heading and description occupy the first row and the GitHub/email actions share the second row. From 521px through 660px, those actions stack. At 520px and below, all Contact content stacks vertically.
- The Ambient Gallery is created only at widths of at least 1680px and when reduced motion is not requested. Its images remain in the side gutters; viewport placement is recalculated using the sticky header and current viewport dimensions. A visual adjustment between 1680px and 1850px lowers collage opacity.
- Check 375px, 768px, 1024px and 1440px widths for overflow and readable line lengths.
- Use semantic landmarks, one H1, descriptive links, a skip link and visible keyboard focus.
- Keep mobile targets comfortable and preserve native keyboard behavior.
- English and Russian copy should be reviewed as separate natural texts.

The Hero figure uses a reserved layout height: `clamp(360px, 32vw, 440px)` above 800px, 350px through the tablet layout, and a 250–320px clamp on mobile landscape. The mobile portrait frame has its own fixed ratio and caption area. These containers size the image with its intrinsic ratio; they do not crop portrait or landscape artwork.

## External assets

The profile avatar first loads from `https://github.com/sl4dk1y.png` and then falls back to a local WebP; a compact initials mark appears if both fail. `public/favicon.png` and `public/apple-touch-icon.png` are local copies of the avatar. The Hero collection contains 44 local floral works; the first item, Mark Catesby's *Red Frangipanni*, is the fallback. Its public-domain source is the National Gallery of Art Open Access collection. Runtime artwork paths, dimensions, sources, licenses and attribution are maintained in `src/content/artworks.ts` and `public/artwork/credits.html`.

## Release v1.0.2

The `v1.0.2` tag points to commit `ef1c73b382ca5cdb935c9ca899483e7f7d86c9f7`. The release refined responsive artwork rendering, the mobile portrait Hero composition and gallery vertical positioning. The current Contact layout and email-copy behavior are documented above; the Contact changes predate this release tag. The Pages workflow includes TypeScript, ESLint and production build checks. A specific hosted workflow run must be verified in GitHub Actions before its result is described as a release check result.
