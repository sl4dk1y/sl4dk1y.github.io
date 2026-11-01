# Project constraints

## Public portfolio content

- **Rule:** Publish only confirmed public information, approved projects and technologies the owner has used. Do not include private commercial work, secrets, private URLs, local machine paths or client information.
- **Why:** This repository builds a public static portfolio. See `AGENTS.md` sections 1 and 10.
- **Change control:** The owner must confirm new personal or project details; repository policy may be amended by the owner.

## Static site and assets

- **Rule:** Keep the site static and compatible with root deployment at `https://sl4dk1y.github.io/`. Do not add a required backend, database, paid API or external runtime dependency. Keep artwork local. The avatar prefers the current SHA-256-versioned local WebP, then the previous local version when available, then the public GitHub avatar URL, then initials. The no-JavaScript fallback uses the current local asset.
- **Why:** GitHub Pages serves the site, local artwork avoids runtime requests to image archives, and the local-first avatar path is documented in `README.md` and implemented in `src/App.tsx`.
- **Change control:** The owner must approve architecture or hosting changes.

## Content, localization and attribution

- **Rule:** Keep typed portfolio data and RU/EN interface text in `src/content/`; keep the English no-JavaScript fallback in `index.html`; maintain verified artwork metadata in `src/content/artworks.ts` and its public records in `public/artwork/credits.html`.
- **Why:** These are the current sources of truth for public content and artwork rights. See `README.md` and `AGENTS.md`.
- **Change control:** Update the appropriate source and fallback together when relevant content or structure changes. Do not change an artwork source or rights statement without checking the primary record.

## Visual and responsive design

- **Rule:** Keep the approved editorial/minimal visual style; do not redesign the portfolio without an explicit request. Preserve artwork source proportions with `object-fit: contain`; do not crop illustrations. Keep the 9px Hero and 15px Ambient Gallery image corner radii.
- **Rule:** Preserve the Hero's layout-defined height across random image choices. On mobile portrait, keep the centered artwork frame at a `.73` aspect ratio with a separate 64px caption area; retain a separate right-aligned mobile landscape composition.
- **Rule:** Keep Contact responsive without horizontal overflow. Keep Ambient Gallery static, limited to viewports at least 1680px wide, and disabled for reduced motion and narrower screens.
- **Why:** These decisions are specified in `design-system/sl4dk1y-portfolio/MASTER.md` and enforced by `src/styles.css` and `src/components/AmbientGallery.tsx`.
- **Change control:** Change these design constraints only through an explicitly approved design update.

## Themes, localization and credits

- **Rule:** Preserve the five themes (Day, Sunset, Forest, Rain and Night), their cyclic accessible theme button, and the Day first-visit default. Persist the selected theme and locale independently; changing language must not reset the theme. Keep the theme frame and indicators hidden at rest and reveal their feedback on hover and `focus-visible`. Preserve RU/EN parity, contrast and typography improvements, accessible mobile navigation, and theme support on the static artwork credits page.
- **Why:** These behaviors are documented in `README.md` and `design-system/sl4dk1y-portfolio/MASTER.md` and implemented in the application and `public/artwork/credits.html`.
- **Change control:** Do not replace the cycle with a dropdown or alter theme/navigation behavior without an approved design update.

## Local preview, Git and release boundary

- **Rule:** Docker is for local preview and must bind to loopback (`127.0.0.1:8080` by default). AI agents do not perform Git write operations or deployment; the repository owner controls these actions. The sole automated-write exception is the owner-configured avatar synchronization workflow, which may commit and push only its validated avatar allowlist on `main`. Agents must not invoke or broaden that workflow.
- **Why:** A push to `main` can trigger GitHub Pages deployment. The avatar workflow is separately configured with a bounded write scope in `.github/workflows/sync-avatar.yml`; Pages deployment is handled by `.github/workflows/pages.yml`.
- **Change control:** The owner may explicitly change preview or release settings and perform Git or deployment actions.

## Synchronization workflow

- **Rule:** For a requested release synchronization, handle stages in order: Documentation → Context Waypoint → Codebase Memory. Keep stages separate and update only the stages requested; a Context Waypoint update does not authorize changing the Codebase Memory graph. Codebase Memory may be used read-only for navigation when available.
- **Why:** This preserves source-of-truth order and leaves explicit control over graph changes. See `AGENTS.md` section 14 and the applicable task instructions.
- **Change control:** The user may define a different sequence for a specific task.
