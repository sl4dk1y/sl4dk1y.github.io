# Design system: sl4dk1y portfolio

## Direction

An editorial portfolio organized around selected work, engineering practice and research notes. Pair restrained serif headings with a practical sans-serif interface and quiet surfaces. The Hero combines a text-led introduction, a fine-grain background, an abstract signal line and a locally stored botanical illustration. The wide-screen Ambient Gallery uses historic landscapes, architecture, portraits and animals. Keep the homepage text-forward; use diagrams and data figures inside relevant case pages. The numbered five-step Process list is intentional. Avoid decorative card grids and landing-page embellishments.

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
- Body text is 16px with 1.6 line height. Hero headings scale from 46px to 64px on desktop; section headings scale from 27px to 34px. Case headings and work titles use the same serif display voice at smaller responsive sizes.
- Use small uppercase sans-serif kickers for section labels. Keep body copy readable and line lengths controlled; avoid decorative monospaced labels.

## Layout and components

- Main content width: up to 1240px with fluid side gutters. Keep paragraph measure around 60–75ch.
- A compact sticky Header contains the local avatar and handle, anchor navigation, locale control and theme button.
- The Hero uses a two-column composition on wide screens. Its left column has an eyebrow, two-line display heading, short introduction, abstract signal graphic and direct links. A local botanical work sits in the right column with its attribution in a separate caption area. Keep its source aspect ratio and its selection stable while the locale or theme changes.
- The homepage order is Hero, Work, Practice, Process, Notes, About and Contact. The header links to Work, Practice, Notes, About and Contact.
- Work uses open, border-separated editorial rows rather than a project-card grid. Three featured cases show problem and approach beside tags and links; a secondary list holds three more cases.
- Practice is a three-column text section. Process is a five-step numbered list. Notes presents research findings in concise rows. About remains text-led.
- Each of the six case pages uses a shared reading order: case title and status, overview/problem/approach, an architecture diagram or research figures, decisions, validation/outcome and a repository link. Keep caveats visible beside results when the evidence has limits.
- Architecture diagrams use simple connected nodes and branches with captions, not ornamental illustrations. The RAG case uses horizontal metric bars paired with an accessible HTML data table. Keep labels and units legible in both visual and tabular forms.
- Contact is a compact three-column row on wide screens, with GitHub and email links and a localized email-copy action with live status feedback.
- The Ambient Gallery is a static side composition on the homepage only. It shows fourteen unique local works, seven per side, in three visual depth levels at widths of at least 1680px. Keep the center content clear and hide the gallery for reduced motion and narrower screens.
- Keep source image proportions with `object-fit: contain`; do not crop artwork. Apply the 9px Hero and 15px Ambient Gallery corner radius to the image boundaries. Avoid added frames or shadows.
- Footer stays quiet and short.

## Interaction and motion

- Use native anchor navigation and a compact mobile menu.
- The theme control is one native button, not a menu. It cycles in this order: Day → Sunset → Forest → Rain → Night → Day. Each active theme has its own Lucide icon: Sun, Sunset, TreePine, CloudRain and Moon, respectively.
- Keep the five small theme indicators hidden at rest. On pointer hover or keyboard focus, show the indicators, the button border and background, and a localized tooltip. Widen the active indicator to distinguish it from the other four.
- The theme button's localized accessible name states the current theme, its position in the five-theme cycle and the next theme. The visual tooltip is `aria-hidden`; the button's `aria-label` supplies the accessible name.
- Theme and language controls are buttons with clear accessible names. Language changes update the tooltip and accessible name without changing the stored theme.
- Pointer hover darkens text links, uses the stronger accent on Hero attribution and project links, and adds a quiet border/surface to icon and contact controls. The theme button gets a stronger border and hover surface. Active links and buttons reduce opacity; keyboard focus uses the global visible focus ring.
- The Hero copy enters with a short fade and upward offset. Homepage sections marked for reveal use a one-time `IntersectionObserver`, a 16px upward offset and a 650ms fade/settle transition with a restrained stagger.
- The Hero signal line has two slow pulses. Keep this motion subtle; do not add parallax or movement to the static Ambient Gallery.
- Keep English static fallback content in the homepage and each case HTML entry, with working links and no reveal dependency. Content must remain visible if JavaScript or `IntersectionObserver` is unavailable.
- The no-JavaScript fallback uses the static Day palette. Theme cycling and the five-theme localStorage migration require JavaScript.
- Under `prefers-reduced-motion`, reveal content immediately, stop the signal pulses, reduce transitions and hide the Ambient Gallery.

## Responsive and accessible

- Above 800px, use the 1240px content maximum with fluid gutters and a two-column Hero. At 800px and below, the page shell is at most 720px, navigation becomes a menu, and the Hero retains two columns with a 190px artwork column. Work rows stack their details below the project summary; the five-step Process list reduces to three columns while Practice remains three columns.
- At 520px and below, use 18px side gutters. Stack the Hero, Contact, Practice, case overviews, decision lists and evidence columns. Process and flow diagrams become single-column sequences; research chart rows stack their metrics, and wide tables scroll within their own wrapper.
- On mobile landscape, keep the Hero artwork right-aligned in a 250–320px figure. On mobile portrait, center it at up to 310px wide and reserve a `.73` frame ratio plus a separate 72px caption area. Images retain intrinsic proportions inside the frame; do not crop the artwork.
- Contact has a three-column layout above 1140px. From 521px through 1140px, the heading and description occupy the first row and the GitHub/email actions share the second row. From 521px through 660px, those actions stack. At 520px and below, all Contact content stacks vertically.
- The Ambient Gallery is rendered only on the homepage at widths of at least 1680px and when reduced motion is not requested. Its images stay in the side gutters; vertical placement respects the sticky header and viewport. Between 1680px and 1850px, reduce collage opacity.
- Preserve usable layouts at 375px, 520px, 800px, 1140px and 1680px transitions, and recheck representative widths for overflow and readable line lengths.
- Use semantic landmarks, one `h1` per page, descriptive links, a skip link and visible keyboard focus. Keep the RAG figures' data available in a semantic table.
- The theme control has a 44px square target. Other header controls and primary text links have at least 40px height; mobile navigation links have 44px height. Preserve these hit areas when adjusting the header or responsive layout.
- `:focus-visible` uses a 2px outline with a 3px offset, in the current theme's focus color. Keep the focus ring visible in all five palettes.
- Use the dedicated `--selection-background` and `--selection-foreground` tokens for selected text; preserve readable contrast in every theme.
- English and Russian copy should be reviewed as separate natural texts.

The Hero figure uses a reserved height of `clamp(360px, 32vw, 440px)` above 800px and 350px through the tablet layout. Mobile landscape uses a 250–320px height. These containers size the image with its intrinsic ratio; they do not crop portrait or landscape artwork.

## External assets

The Header loads a SHA-256-versioned local WebP avatar. If it fails, the React page tries the previous local WebP when available, then the public GitHub avatar URL, then a centered `sl` initials mark. Preserve the circular container and its reserved size so fallback does not shift the Header. The Header avatar is 30px square (28px at 520px and below); the homepage Hero artwork beside the introduction is a separate botanical image. The initials fallback uses the raised surface, accent text and centered serif treatment. Static HTML fallbacks use the local WebP directly. `public/favicon.png` and `public/apple-touch-icon.png` are static avatar-derived icons.

The Hero artwork collection contains 44 local floral works; the first item, Mark Catesby's *Red Frangipanni*, is the fallback. Its public-domain source is the National Gallery of Art Open Access collection. Artwork paths, dimensions, sources, licenses and attribution are maintained in `src/content/artworks.ts` and `public/artwork/credits.html`.

## Open Graph card

Use the shared light-background 1200 × 630 PNG at `public/og-card.png`. The composition uses a large two-line serif heading, dark graphite text, a fine divider and a short burgundy accent. `public/og-card.svg` is the editable vector source. Keep this card fixed to the light palette regardless of the visitor's selected site theme.
