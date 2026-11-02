# sl4dk1y

Personal portfolio built with React, TypeScript and Vite. The visitor-facing site is static and does not require its own server, database or API.

## Run locally

Requires Node.js 24 LTS.

```sh
npm ci
npm run dev
```

## Check and build

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

The static build is written to `dist/`. Fonts are self-hosted WOFF2 files from Source Sans 3 and Source Serif 4, distributed under the SIL Open Font License. The browser only downloads the language subsets it needs.

## Docker preview

Requires Docker Engine and Docker Compose. Compose builds the site with Node.js 24 Alpine and serves the static files with Nginx Alpine. Source files are not mounted into the preview container. Its port is bound to localhost only.

```sh
docker compose up -d --build
docker compose ps
```

Open <http://localhost:8080>. To use a different port, set `PREVIEW_PORT=8081`.

```sh
docker compose logs -f
docker compose restart
docker compose down
```

The container is named `sl4dk1y-portfolio-preview`. `docker compose down` stops this project's container.

## Site structure and content

- `src/content/portfolio.ts` holds profile, contact and shared SEO data.
- `src/content/translations.ts` holds the homepage interface and editorial copy in English and Russian.
- `src/content/cases.ts` holds the bilingual content, diagrams, validation notes, repository links and per-case metadata for the six case pages.
- `src/content/artworks.ts` is the source of truth for artwork metadata, image paths, authors, dates, source records, licenses and alt text.
- `src/content/types.ts` defines the locale and theme types and the ordered five-theme cycle.
- `src/main.tsx` mounts the shared React app and enables motion/reveal behavior only when the browser preference and required APIs allow it.
- `src/App.tsx` renders the homepage or a case page according to the current path; shared diagrams and research figures live in `src/components/CaseDiagrams.tsx` and `src/components/ResearchFigures.tsx`.
- `src/styles.css` holds the homepage and case-page layouts, responsive rules, theme tokens and motion states.
- `src/fonts.css` loads the selected local font subsets.
- `public/images/` holds the current SHA-256-versioned local WebP avatar and, when available, its previous version, the Hero fallback artwork and the subtle `editorial-grain.svg` texture. The React page uses the current local avatar first; optimized artwork is stored under `public/artwork/`.
- `index.html` and the six `projects/<slug>/index.html` files are Vite HTML entries with page metadata and English static fallbacks for visitors who disable JavaScript. `public/noscript.css` styles those fallbacks.
- `vite.config.ts` lists all seven HTML build entries. `public/sitemap.xml` lists the homepage and six case routes; `public/robots.txt` points to the sitemap.

The homepage sections follow the Hero: Work, Practice, Process, Notes, About and Contact. The header navigation links to Work, Practice, Notes, About and Contact. Three case studies appear as featured work, with three more in the secondary list.

## Case pages

The six case studies have direct static routes:

- AI Text Helper — `/projects/ai-text-helper/`
- SnapKeep — `/projects/snapkeep/`
- RAG Retrieval Research — `/projects/rag-retrieval-research/`
- Agent Safe Flow — `/projects/agent-safe-flow/`
- Codebase Atlas — `/projects/codebase-atlas/`
- Context Waypoint — `/projects/context-waypoint/`

Each route has its own HTML entry and search/social metadata. React renders the matching case from `src/content/cases.ts`; the RAG case uses research figures, while the other cases use the shared flow-diagram component. The static English fallbacks are included in the route HTML.

Context Waypoint is described as a local agent skill and Markdown convention. Its public GitHub repository is currently empty; the local source and instructions are not published there. The portfolio does not claim a public release or software runtime for it.

Update public homepage copy in `src/content/translations.ts` and case-page content in `src/content/cases.ts`, keeping the English and Russian versions aligned. Keep project links limited to public repositories and approved information.

The Contact section places the GitHub profile and email next to its heading. An accessible button copies the email and announces success or failure in the selected language. On narrow screens, the section stacks its content.

The interface supports English and Russian. It stores the selected language under `portfolio-locale`; changing languages leaves the selected theme unchanged.

The header theme button cycles through Day, Sunset, Forest, Rain and Night, then returns to Day. Day is the first-visit default. The page stores the selected theme under `portfolio-theme` and applies it before React renders. Existing `light` and `dark` values are migrated to Day and Night. The active theme has its own icon. Five small indicators and a localized tooltip appear on pointer hover or keyboard focus. The button's accessible name reports the current theme, its position in the cycle and the next theme.

The theme button is 44 by 44 pixels. Other header controls and main text links are at least 40 pixels high; mobile navigation links are 44 pixels high. Keyboard focus has a visible outline. Each theme sets foreground and background colors for text selection and a focus color. At widths up to 800px, navigation switches to a menu and the Hero keeps a two-column layout. At 520px and below, the Hero and several content grids stack into one column. Case diagrams and research figures also have narrow-screen layouts.

The interface and all case content support English and Russian. The selected locale is saved in `portfolio-locale`; changing language does not change the theme. The five themes are Day, Sunset, Forest, Rain and Night. Day is the first-visit default, and `portfolio-theme` is applied before React renders. Legacy `light` and `dark` values migrate to Day and Night.

The site uses semantic page landmarks, one `h1` per page, a skip link, keyboard-operable controls and visible `:focus-visible` styles. Case diagrams have captions; research charts include a data table. The Hero text and selected homepage sections enter with restrained motion. `prefers-reduced-motion` disables the reveal and signal animations, shows content immediately and hides the Ambient Gallery. Without JavaScript, each HTML entry displays its English static fallback with working links and the Day palette.

### GitHub avatar synchronization

The Header and no-JavaScript fallback use the current optimized WebP avatar stored locally in `public/images/`. The React page tries the current local file, the previous local version when available, the public GitHub avatar URL, then a compact initials mark. The no-JavaScript page uses the current local file. Fixed avatar boxes reserve their layout size while images load. The Hero uses a separate local botanical illustration selected from the artwork collection.

The `.github/workflows/sync-avatar.yml` workflow checks GitHub every six hours (`0 */6 * * *`) and can also be started with `workflow_dispatch`. Its job runs only for `main`. It runs `scripts/sync-github-avatar.test.mjs` with `node --test`, then `scripts/sync-github-avatar.mjs`. The script verifies the GitHub profile identity and avatar host, downloads the source image, and computes SHA-256 over the original image bytes. That digest is part of the WebP filename, so changed image bytes produce a new URL and avoid stale browser or Pages asset caches.

The script records `current` and `previous` hashes in `.github/avatar-source.sha256`, updates `profile.avatar` and `profile.avatarFallback` in `src/content/portfolio.ts`, and updates the two avatar references in the homepage's static fallback. It keeps the corresponding two versioned WebP files when a previous version is available and removes older managed avatar files. It converts the source to WebP with `cwebp`. If the avatar is unchanged, it does not rewrite files or create a commit. If fetching, validation, conversion or file updates fail, the workflow fails and the existing avatar references remain in place; the app can still try the previous local image and its remote/initials fallbacks.

The sync workflow grants `contents: read` by default and `contents: write` only to its sync job. With checkout credentials enabled, GitHub Actions uses its scoped `GITHUB_TOKEN` to commit and push the validated avatar paths to `main`; no personal access token is configured by the workflow. The repository must allow the workflow token to write repository contents. The runner also installs the `webp` package to provide `cwebp` and needs network access to the public GitHub profile and avatar endpoints. After a changed avatar commit is pushed, the workflow sends a `repository_dispatch` event named `avatar-updated`, including the pushed commit SHA. `.github/workflows/pages.yml` listens for that event and checks out the supplied SHA before building and deploying. Its build job uses `contents: read` and `pages: read`; the deploy job uses `pages: write` and `id-token: write`. If synchronization reports no change, it skips both commit/push and the Pages dispatch. A failed push stops before that dispatch. The repository must allow GitHub Actions as its Pages publishing source for the deployment workflow to publish.

`public/favicon.png` and `public/apple-touch-icon.png` remain static, locally stored avatar-derived icons; the avatar sync workflow updates page avatar references and versioned WebP assets, not those icons.

The Hero selects one of 44 local floral works on page load. It avoids the previous choice on a reload in the same tab and keeps the selection through language and theme changes. If the selected image fails to load, the page uses the local Hero fallback. The Ambient Gallery catalog has 70 local works, with its file membership matching `public/artwork/ambient/`. At viewport widths of at least 1680px, the page selects fourteen unique works and places seven in each of two independently chosen side compositions. The gallery is static, omitted for reduced motion and narrower screens, and its decorative images use empty alt text. Artwork records, image paths, source details and rights notes are listed in `src/content/artworks.ts` and on the [artwork credits page](public/artwork/credits.html). The site serves artwork from local WebP files rather than requesting them from an external archive at runtime.

The shared Open Graph card is a light-background 1200 × 630 PNG. Its editable vector source is `public/og-card.svg`.

## Architecture

Vite builds a static multi-page site from the homepage and six case HTML entries. Each entry mounts the shared React app. `src/App.tsx` selects the case from `window.location.pathname`; case copy and diagrams are data-driven. Vite uses the root path (`base: '/'`) for `https://sl4dk1y.github.io/`. The HTML entries contain their own metadata and static no-JavaScript content; the React app updates localized title and description metadata after loading.

## Release v1.0.2

The `v1.0.2` tag points to release commit `ef1c73b382ca5cdb935c9ca899483e7f7d86c9f7`. The release changes refine Hero artwork sizing so images keep their source proportions without cropping, center and enlarge the artwork on mobile portrait screens, and reserve a separate area for its caption. The Hero figure keeps a layout-defined height across source image orientations. The Ambient Gallery now positions artwork using the viewport and sticky header dimensions, and updates that placement after a resize. Contact layout behavior is described below; its responsive layout and localized email-copy interaction were already present before the `v1.0.2` tag.

The Pages workflow runs `npm run typecheck`, `npm run lint` and `npm run build` before uploading the `dist/` artifact. These three commands passed in the local documentation verification after this release. The repository does not contain a record of the specific GitHub Actions run for the release.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` runs on pushes to `main`, on `workflow_dispatch`, and on `repository_dispatch` with type `avatar-updated`. For that dispatch it checks out the commit SHA included in the event payload. The build job runs `npm ci`, typecheck, lint and production build, then uploads `dist/`; the deploy job publishes the artifact. The repository's Pages publishing source must be **GitHub Actions**. A push to `main` or a successful changed-avatar sync can trigger deployment. The workflow configuration does not establish which commit is currently published, and this feature branch is not described here as deployed.
