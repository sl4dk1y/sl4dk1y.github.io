# Design system: sl4dk1y portfolio

## Direction

A compact editorial portfolio for an individual developer. Favor clear text, quiet surfaces and direct links. A changing floral work gives the Hero a natural-history accent; the wide-screen side collage uses historic landscapes, architecture, portraits and animals. Keep the remaining sections free of decorative art, diagrams, card numbering and unnecessary grids. This is a portfolio, not a product landing page.

## Color tokens

The portfolio has five palettes. Day is the warm, neutral default with a burgundy accent. Sunset uses warm ivory and muted red-brown. Forest pairs pale sage surfaces with evergreen accents. Rain uses cool blue-gray surfaces and slate accents. Night keeps the graphite and berry palette and is the only dark color scheme; the other four use a light color scheme.

| Semantic token | Day | Sunset | Forest | Rain | Night |
|---|---|---|---|---|---|
| `--bg` | `#FAF7F8` | `#FBF5F1` | `#F4F7F2` | `#F3F6F8` | `#100D10` |
| `--surface` | `#FFFFFF` | `#FFFDFC` | `#FFFFFF` | `#FFFFFF` | `#1B151A` |
| `--surface-raised`, `--hover-surface` | `#F4EDEF` | `#F5E7E2` | `#EAF1EB` | `#E7EEF2` | `#241A21` |
| `--text` | `#271D22` | `#2E201E` | `#202A23` | `#20282E` | `#F3EDF0` |
| `--muted` | `#6D6067` | `#6B5652` | `#56665B` | `#56646D` | `#B5A8AF` |
| `--subtle` | `#786970` | `#755F5A` | `#5E6C61` | `#5E6D76` | `#8F8088` |
| `--accent` | `#852B49` | `#7F3B3D` | `#356146` | `#3B6076` | `#C15375` |
| `--accent-strong` | `#70223D` | `#7F3B3D` | `#356146` | `#3B6076` | `#E391AA` |
| `--accent-soft` | `rgb(133 43 73 / 7%)` | `rgb(127 59 61 / 8%)` | `rgb(53 97 70 / 8%)` | `rgb(59 96 118 / 8%)` | `rgb(158 53 88 / 16%)` |
| `--border` | `#E7DDE2` | `#E8D7D1` | `#D8E1D9` | `#D7E0E6` | `#332730` |
| `--border-strong` | `#D3C4CC` | `#CDB2AA` | `#B7C8B9` | `#B7C8D1` | `#55404B` |
| `--focus` | `#852B49` | `#7F3B3D` | `#356146` | `#355B72` | `#EEA3B8` |
| `--selection-background` | `#852B49` | `#7F3B3D` | `#356146` | `#3B6076` | `#BD496D` |
| `--selection-foreground` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

These semantic variables are declared in `src/styles.css` under `data-theme`. Use them for backgrounds, text, borders, selection and focus; avoid component-specific raw colors when a semantic token applies. The inline bootstrap in `index.html` applies the saved theme before React renders. Day is the first-visit default. The stored values `light` and `dark` migrate to `day` and `night`; the five canonical values are `day`, `sunset`, `forest`, `rain` and `night`. Theme choice is independent of the RU/EN locale.

## Typography

- Interface and body: Source Sans 3 Variable.
- Editorial headings: Source Serif 4 Variable.
- Both families are self-hosted WOFF2, use Latin and Cyrillic subsets, and are distributed under the SIL Open Font License 1.1.
- Body text starts at 16px with 1.6 line height; project descriptions use 14px and skill tags use 13px. Section headings scale with `clamp()` across viewport sizes. Preserve readable line spacing when adjusting mobile typography.
- Keep headings moderate and body copy comfortably readable. Avoid mono labels as decoration.

## Layout and components

- Main content width: up to 1240px with fluid side gutters. Keep paragraph measure around 60–75ch.
- A compact sticky header contains an avatar and handle, section links, language control and theme control. Use the locally stored, SHA-256-versioned WebP avatar as the primary visual asset.
- The Hero places the avatar, handle, study context, specialty heading, introduction and two links beside a locally stored floral work selected from the 44-item Hero collection on page load. Keep the selection stable during language and theme changes. The avatar uses the current local image, with a previous local image available as fallback when present.
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
- The theme control is one native button, not a menu. It cycles in this order: Day → Sunset → Forest → Rain → Night → Day. Each active theme has its own Lucide icon: Sun, Sunset, TreePine, CloudRain and Moon, respectively.
- Keep the five small theme indicators hidden at rest. On pointer hover or keyboard focus, show the indicators, the button border and background, and a localized tooltip. Widen the active indicator to distinguish it from the other four.
- The theme button's localized accessible name states the current theme, its position in the five-theme cycle and the next theme. The visual tooltip is `aria-hidden`; the button's `aria-label` supplies the accessible name.
- Theme and language controls are buttons with clear accessible names. Language changes update the tooltip and accessible name without changing the stored theme.
- Use a one-time IntersectionObserver reveal with a small vertical offset and a short stagger. Keep hover transitions subtle and reveal all content immediately when JavaScript or motion is unavailable, or when `prefers-reduced-motion` is enabled.
- Keep the default English content available in the static `noscript` fallback, with working section anchors and no reveal effects.
- The no-JavaScript fallback uses the static Day palette. Theme cycling and the five-theme localStorage migration require JavaScript.
- Avoid scroll choreography, parallax, continuous animation and layout shifts.

## Responsive and accessible

- At widths above 800px, the Hero uses two columns and the main content uses the 1240px maximum width with fluid side gutters. At 800px and below, the navigation becomes a menu, the page shell narrows to at most 720px, and the Hero keeps a two-column layout with a 190px artwork column. Project cards reduce to two columns and About stacks vertically.
- At 520px and below, the page shell uses 18px side gutters, the Hero and Contact stack into one column, project cards and skill groups use one column, and experience and credential rows stack. Mobile landscape Hero artwork is right-aligned within a 250–320px figure height. For mobile portrait, the artwork is centered and enlarged to at most 310px wide; its image frame reserves a `.73` aspect ratio and a separate 64px caption area. The image scales inside this frame without cropping, so source artwork orientation does not change the reserved Hero artwork area.
- Contact has a three-column layout above 1140px. From 521px through 1140px, the heading and description occupy the first row and the GitHub/email actions share the second row. From 521px through 660px, those actions stack. At 520px and below, all Contact content stacks vertically.
- The Ambient Gallery is created only at widths of at least 1680px and when reduced motion is not requested. Its images remain in the side gutters; viewport placement is recalculated using the sticky header and current viewport dimensions. A visual adjustment between 1680px and 1850px lowers collage opacity.
- Check 375px, 768px, 1024px and 1440px widths for overflow and readable line lengths.
- Use semantic landmarks, one H1, descriptive links, a skip link and visible keyboard focus.
- The theme control has a 44px square target. Other header controls and primary text links have at least 40px height; mobile navigation links have 44px height. Preserve these hit areas when adjusting the header or responsive layout.
- `:focus-visible` uses a 2px outline with a 3px offset, in the current theme's focus color. Keep the focus ring visible in all five palettes.
- Use the dedicated `--selection-background` and `--selection-foreground` tokens for selected text; preserve readable contrast in every theme.
- English and Russian copy should be reviewed as separate natural texts.

The Hero figure uses a reserved layout height: `clamp(360px, 32vw, 440px)` above 800px, 350px through the tablet layout, and a 250–320px clamp on mobile landscape. The mobile portrait frame has its own fixed ratio and caption area. These containers size the image with its intrinsic ratio; they do not crop portrait or landscape artwork.

## External assets

The Header and Hero load the current SHA-256-versioned local WebP avatar first. If it fails, the React page tries the previous local WebP when available, then the public GitHub avatar URL, then a compact centered `sl` initials mark. Keep the circular avatar container and its reserved dimensions stable so image failure or fallback does not shift surrounding content. The Header avatar is 30px square (28px at 520px and below); the Hero avatar is 88px square (72px at 800px and below, 64px at 520px and below). The initials fallback uses the existing raised surface, accent text and centered serif treatment; preserve the same circular clipping and sizing as the image. The static no-JavaScript page uses the current local WebP directly. `public/favicon.png` and `public/apple-touch-icon.png` remain static, locally stored avatar-derived icons and are not updated by avatar synchronization. The Hero collection contains 44 local floral works; the first item, Mark Catesby's *Red Frangipanni*, is the fallback. Its public-domain source is the National Gallery of Art Open Access collection. Runtime artwork paths, dimensions, sources, licenses and attribution are maintained in `src/content/artworks.ts` and `public/artwork/credits.html`.

## Release v1.0.2

The `v1.0.2` tag points to commit `ef1c73b382ca5cdb935c9ca899483e7f7d86c9f7`. The release refined responsive artwork rendering, the mobile portrait Hero composition and gallery vertical positioning. The current Contact layout and email-copy behavior are documented above; the Contact changes predate this release tag. The Pages workflow includes TypeScript, ESLint and production build checks. A specific hosted workflow run must be verified in GitHub Actions before its result is described as a release check result.
