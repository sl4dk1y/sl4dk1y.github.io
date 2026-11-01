# Post-release v1.0.2 context synchronization

## Release and repository state

- Tag `v1.0.2` resolves to release commit `ef1c73b382ca5cdb935c9ca899483e7f7d86c9f7` (`fix: improve responsive layout and artwork rendering`). The tag is on that commit.
- At audit time, branch `main` and `origin/main` both pointed to `8848513a430f6f7d29779d0a8b6bb7fce5e90b68`, a later documentation commit. It changes `README.md`, `design-system/sl4dk1y-portfolio/MASTER.md` and `public/artwork/credits.html`, keeping the release commit distinct from documentation synchronization.
- The worktree was clean before the Context Waypoint edits in this session. The Context Waypoint files changed here remain uncommitted.

## Current implementation

- The site is a static, single-page React 19 and TypeScript application built with Vite 8. `src/main.tsx` mounts `src/App.tsx`; typed profile, project, translation and artwork data live under `src/content/`. `src/styles.css` and `src/fonts.css` provide layout, themes, responsive styling and local fonts. There is no application backend or API.
- Interface copy is localized in English and Russian. The English static page in `index.html` works without JavaScript. Light mode is the first-visit default; a stored theme choice is applied before React renders and remains independent of locale.
- The Hero chooses a random item from 44 local floral artworks at page load, avoids the preceding choice in the same tab when possible, and keeps it through locale/theme changes. If its image fails, the first catalog item, Mark Catesby's *Red Frangipanni*, is the fallback. The figure reserves layout height and images preserve their source proportions with `object-fit: contain`; artwork is not cropped.
- Hero geometry: above 800px, the figure height is `clamp(360px, 32vw, 440px)`; the tablet layout uses 350px; mobile landscape uses a 250–320px height. At 520px and below in portrait orientation, the image is centered and at most 310px wide in a `.73` aspect-ratio frame, with a separate 64px caption area. This keeps the reserved area stable across selected image orientations. Landscape and portrait layouts remain separate.
- The Ambient Gallery uses 14 unique works from a 70-work local catalog, seven per side, excluding Hero works. It chooses left/right compositions independently, accounts for viewport and sticky-header dimensions, and repositions after resize. It is decorative and static, appears only at widths of at least 1680px, and is disabled for reduced motion and narrower screens. Its images have empty alt text and lazy/async loading. Artwork uses contain sizing and 15px corner radii; Hero artwork uses 9px radii.
- Contact keeps GitHub and email actions aligned with its heading on wide screens and stacks them at smaller widths. The localized copy button reports success or failure. Layout breakpoints are above 1140px for the three-column Contact row; 521–1140px for heading/actions on separate rows, with actions stacked at 521–660px; and 520px and below for a fully stacked Contact section. Main responsive breakpoints are 800px and 520px. The gallery threshold is 1680px; opacity is reduced from 1680px through 1850px.
- Artwork files are local WebP. `src/content/artworks.ts` holds dimensions, sources, creators, licenses, alt text and captions; `public/artwork/credits.html` lists public source and rights records, including NGA Open Access, The Met Open Access and Biodiversity Heritage Library records. The public page and data records are the authorities for individual artwork attribution.

## Documentation and verification

- The documentation synchronization is in commit `8848513`; README and MASTER now describe the v1.0.2 image sizing, portrait layout, gallery positioning, artwork counts, Contact behavior and release boundary. The credits page was also updated. This session does not repeat those documents.
- README records that `npm run typecheck`, `npm run lint` and `npm run build` passed locally during documentation verification after release. This audit did not rerun them. The repository does not record a specific GitHub Actions result for the release.
- `.github/workflows/pages.yml` runs install, typecheck, lint, build, upload and deploy on pushes to `main` or manual dispatch. `compose.yaml` binds local preview to `127.0.0.1:8080` by default. Neither the repository Pages setting, a hosted Actions run nor the live deployment was checked in this audit.
- `package.json` remains at version `1.0.0` while the release tag is `v1.0.2`; the owner has not decided whether to change it.

## Durable decisions and open items

- Keep the minimal editorial style and do not redesign without an explicit request. Preserve image proportions, do not crop artwork, keep the Hero geometry stable on mobile portrait, and retain separate portrait/landscape compositions.
- Publish only approved public projects; keep private work out of the portfolio. The owner performs Git write operations and controls deployment.
- Synchronize release artifacts in order: Documentation → Context Waypoint → Codebase Memory. This audit did not modify Codebase Memory; its next stage should be explicit and separate.
- Confirm package-version policy and, if needed, verify the hosted Actions run, Pages setting and published site.
- A prior session reported that the linked public `Context-Waypoint` repository appeared empty on 2026-10-31. Its current state was not rechecked, so it remains an unverified historical note rather than an asserted current blocker.

## Historical context

`.context-waypoint/sessions/2026-10-31-portfolio-release-readiness.md` and `.context-waypoint/sessions/2026-10-31-post-release-v1.0.1-context-sync.md` are historical checkpoints. Their older artwork counts, release/deployment status and implementation snapshot must not override this v1.0.2 state. No other active application TODO was found in the existing Context Waypoint files.
