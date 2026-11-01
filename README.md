# sl4dk1y

Personal portfolio built with React, TypeScript and Vite. The site is static and does not need a server, database or API.

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

## Edit content

- `src/content/portfolio.ts` holds the profile links, technical skills, project descriptions, experience, education, training, languages and SEO copy.
- `src/content/artworks.ts` is the source of truth for artwork metadata, image paths, authors, dates, source records, licenses and alt text.
- `src/content/translations.ts` holds the English and Russian interface text.
- `src/content/types.ts` defines the locale type and the ordered five-theme cycle used by the theme selector.
- `src/App.tsx` holds the page sections and theme, language and navigation controls.
- `src/styles.css` holds the layout, responsive rules, color themes and reduced-motion-aware reveal effects.
- `src/fonts.css` loads the selected local font subsets.
- `public/images/` holds the local WebP avatar fallback and the Hero fallback artwork. The React page first tries the public GitHub avatar URL, then falls back to the local image. Optimized artwork is stored under `public/artwork/`.
- `index.html` includes an English static fallback for visitors who disable JavaScript; `public/noscript.css` styles that version.

The page sections appear in this order: Hero, About, Projects, Technical Skills, Experience, Education, Additional Training, Languages and Contact. About copy is maintained in English and Russian in `src/content/translations.ts`; the English no-JavaScript fallback in `index.html` follows the English copy. Update public copy in the typed content modules and keep both languages in step. Add or remove a project in the `projects` array in `portfolio.ts`. Each item has a name, bilingual description, tags and public repository links. Keep the content limited to work that is public and approved to show.

The Contact section places the GitHub profile and email next to its heading. An accessible button copies the email and announces success or failure in the selected language. On narrow screens, the section stacks its content.

The interface supports English and Russian. It stores the selected language under `portfolio-locale`; changing languages leaves the selected theme unchanged.

The header theme button cycles through Day, Sunset, Forest, Rain and Night, then returns to Day. Day is the first-visit default. The page stores the selected theme under `portfolio-theme` and applies it before React renders. Existing `light` and `dark` values are migrated to Day and Night. The active theme has its own icon. Five small indicators and a localized tooltip appear on pointer hover or keyboard focus. The button's accessible name reports the current theme, its position in the cycle and the next theme.

The theme button is 44 by 44 pixels. Other header controls are at least 40 pixels high, primary text links are 40 pixels high, and mobile navigation links are 44 pixels high. Keyboard focus has a visible outline. Each theme sets dedicated foreground and background colors for text selection and its own focus color. At widths up to 800px, navigation switches to a menu; at 520px and below, the Hero and content use a single-column layout. The English no-JavaScript fallback uses the static Day palette; theme switching requires JavaScript.

The local avatar and favicon images were downloaded from `https://github.com/sl4dk1y.png`; replace `public/images/github-avatar.webp`, `public/favicon.png` and `public/apple-touch-icon.png` together if the GitHub avatar changes. The page shows a short initials fallback if the local avatar cannot load.

The Hero selects one of 44 local floral works on page load. It avoids the previous choice on a reload in the same tab and keeps the selection through language and theme changes. If the selected image fails to load, the page uses the local Hero fallback. The Ambient Gallery catalog has 70 local works, with its file membership matching `public/artwork/ambient/`. At viewport widths of at least 1680px, the page selects fourteen unique works and places seven in each of two independently chosen side compositions. The gallery is static, omitted for reduced motion and narrower screens, and its decorative images use empty alt text. Artwork records, image paths, source details and rights notes are listed in `src/content/artworks.ts` and on the [artwork credits page](public/artwork/credits.html). The site serves artwork from local WebP files rather than requesting them from an external archive at runtime.

The Open Graph card is a local 1200 by 630 PNG. Its editable vector source is `public/og-card.svg`.

## Architecture

`src/main.tsx` mounts the React app. `src/App.tsx` renders the page sections and interactions; `src/content/` holds typed profile, project, translation, artwork and theme-cycle data; `src/styles.css` defines layout, responsive rules, five semantic color themes and reveal effects. `index.html` migrates legacy theme values and applies the saved theme before React renders. Vite builds the static site for the root URL `https://sl4dk1y.github.io/`.

## Release v1.0.2

The `v1.0.2` tag points to release commit `ef1c73b382ca5cdb935c9ca899483e7f7d86c9f7`. The release changes refine Hero artwork sizing so images keep their source proportions without cropping, center and enlarge the artwork on mobile portrait screens, and reserve a separate area for its caption. The Hero figure keeps a layout-defined height across source image orientations. The Ambient Gallery now positions artwork using the viewport and sticky header dimensions, and updates that placement after a resize. Contact layout behavior is described below; its responsive layout and localized email-copy interaction were already present before the `v1.0.2` tag.

The Pages workflow runs `npm run typecheck`, `npm run lint` and `npm run build` before uploading the `dist/` artifact. These three commands passed in the local documentation verification after this release. The repository does not contain a record of the specific GitHub Actions run for the release.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` runs on pushes to `main` and on `workflow_dispatch`. It configures Pages, runs typecheck, lint and production build, then uploads `dist/` and deploys the Pages artifact. The repository's Pages publishing source must be set to **GitHub Actions** for this workflow to publish. That setting and the current public deployment state cannot be verified from tracked files. A push to `main` can start deployment automatically; the repository owner performs Git operations and controls release actions.
