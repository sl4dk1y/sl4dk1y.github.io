# Project constraints

## Public portfolio content

- **Rule:** Publish only confirmed public information, approved projects and technologies the owner has used. Do not include private commercial work, secrets, private URLs, local machine paths or client information.
- **Why:** This repository builds a public static portfolio. See `AGENTS.md` sections 1 and 10.
- **Change control:** The owner must confirm new personal or project details; repository policy may be amended by the owner.

## Static site and assets

- **Rule:** Keep the site static and compatible with root deployment at `https://sl4dk1y.github.io/`. Do not add a required backend, database, paid API or external runtime dependency. Keep artwork local; the profile avatar currently tries the public GitHub avatar URL and falls back to a local WebP.
- **Why:** GitHub Pages serves the site, and local artwork avoids runtime requests to image archives. The avatar fallback behavior is documented in `README.md` and implemented in `src/App.tsx`.
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

## Local preview and release boundary

- **Rule:** Docker is for local preview and must bind to loopback (`127.0.0.1:8080` by default). The repository owner performs Git write operations and controls public deployment.
- **Why:** A push to `main` can trigger GitHub Pages deployment. See `README.md`, `compose.yaml` and `AGENTS.md` sections 15–16.
- **Change control:** The owner may explicitly change preview settings or perform release actions.

## Synchronization workflow

- **Rule:** For a requested release synchronization, handle stages in order: Documentation → Context Waypoint → Codebase Memory. Keep stages separate and update only the stages requested; a Context Waypoint update does not authorize changing the Codebase Memory graph.
- **Why:** This preserves source-of-truth order and leaves explicit control over graph changes. See `AGENTS.md` section 14 and the applicable task instructions.
- **Change control:** The user may define a different sequence for a specific task.
