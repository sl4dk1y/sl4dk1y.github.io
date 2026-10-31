# Project constraints

## Public portfolio content

- **Rule:** Publish only confirmed public information, approved projects, and technologies the owner has used. Never expose private commercial work, secrets, private URLs, or local machine paths.
- **Why:** This repository produces a public static site. See `AGENTS.md` sections 1 and 10.
- **Change control:** The owner must confirm new personal or project details; repository policy may be amended by the owner.

## Static GitHub Pages architecture

- **Rule:** Keep the site static and compatible with root deployment at `https://sl4dk1y.github.io/`; do not add a required backend, database, paid API, or runtime external asset dependency.
- **Why:** The published site is hosted by GitHub Pages. See `AGENTS.md` sections 3 and 15.
- **Change control:** The owner must approve an architecture or hosting change.

## Content and accessibility sources

- **Rule:** Keep typed portfolio data and translations in `src/content/`, preserve the English no-JavaScript fallback in `index.html`, and maintain verified image attribution in `src/content/artworks.ts` and `public/artwork/credits.html`.
- **Why:** These are the project's documented sources of truth. See `README.md` and `AGENTS.md`.
- **Change control:** Update the source and fallback together when content or structure changes.

## Local preview and release boundary

- **Rule:** Docker is only for local preview and must publish on loopback (`127.0.0.1:8080`). Git operations and public deployment are performed by the owner.
- **Why:** Keeps preview local and leaves release control with the repository owner. See `README.md` and `AGENTS.md` section 15.
- **Change control:** The owner may explicitly change local preview settings or perform release actions.
