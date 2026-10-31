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
- `src/App.tsx` holds the page sections and theme, language and navigation controls.
- `src/styles.css` holds the layout, responsive rules, color themes and reduced-motion-aware reveal effects.
- `src/fonts.css` loads the selected local font subsets.
- `public/images/` holds the local GitHub avatar and the Hero fallback artwork. Optimized artwork is stored under `public/artwork/`.
- `index.html` includes an English static fallback for visitors who disable JavaScript; `public/noscript.css` styles that version.

The page sections appear in this order: Hero, About, Projects, Technical Skills, Experience, Education, Additional Training, Languages and Contact. Update public copy in the typed content modules and keep the English and Russian text in step. Add or remove a project in the `projects` array in `portfolio.ts`. Each item has a name, bilingual description, tags and public repository links. Keep the content limited to work that is public and approved to show.

Light mode is the default on a first visit. A chosen light or dark theme is saved in local storage. Language selection does not change the saved theme. The local avatar and favicon images were downloaded from `https://github.com/sl4dk1y.png`; replace `public/images/github-avatar.webp`, `public/favicon.png` and `public/apple-touch-icon.png` together if the GitHub avatar changes. The page shows a short initials fallback if the local avatar cannot load.

The Hero randomly selects one of 44 local floral works on page load. It avoids the previous choice on a reload in the same tab and keeps the selection through language and theme changes. The Ambient Gallery uses 70 locally stored works, with its file membership matching `public/artwork/ambient/`. The collections include botanical prints, landscapes, portraits and animals from documented open-access sources. Sources, image paths and rights notes are listed in `src/content/artworks.ts` and on the [artwork credits page](public/artwork/credits.html). Images are local WebP files, so the site does not request them from an external archive at runtime.

The ambient collection has 65 local non-floral historical works, including landscapes, architecture, portraits and animals. It includes 15 additions from The Met and the Art Institute of Chicago, both marked open access in their collection records. At widths from 1680px, the page samples fourteen unique images and arranges them in two independently selected side compositions. The collage remains static and is omitted for reduced motion and narrower screens. Ambient images are decorative and use empty alt text. The public-domain status and source records for each image are listed on the [artwork credits page](public/artwork/credits.html).

The Open Graph card is a local 1200 by 630 PNG. Its editable vector source is `public/og-card.svg`.

## Architecture

`src/main.tsx` mounts the React app. `App.tsx` renders the single-page portfolio and its interactions. Typed content and translations live under `src/content/`. The static build works on GitHub Pages at the root of `https://sl4dk1y.github.io`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` configures Pages, runs typecheck, lint and production build, then uploads `dist/` for GitHub Pages Actions deployment. In **Settings > Pages > Build and deployment**, set the publishing source to **GitHub Actions**. The current public site is configured for legacy branch-root publishing, which serves the source `index.html` with `/src/main.tsx` instead of Vite's compiled files in `dist/`; browsers cannot run that TypeScript entry directly. Switching the publishing source is a repository-owner action. After the setting is changed and the workflow runs again, verify that the public HTML loads compiled `/assets/` files and the page mounts correctly.

Git operations and publishing are performed manually by the repository owner.
