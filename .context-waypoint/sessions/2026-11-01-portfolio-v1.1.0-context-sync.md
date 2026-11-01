# Portfolio v1.1.0 candidate context synchronization

## Repository and release state

- `package.json` declares `1.1.0`. The existing tags stop at `v1.0.2`; there is no `v1.1.0` tag. This is an untagged candidate, not a confirmed release or publication.
- At audit time, `main` and `origin/main` both pointed to `886cbcb2cd82a337ecbda79116870f7393436123` (`docs: document five themes and automated avatar sync`). The preceding feature commit is `9e82dbcf5feee5c5ad81a4904a03a1b0ae469ef2` (`feat: add five themes and automated avatar synchronization`). Keep the feature and later documentation commits distinct.
- The worktree was clean before this synchronization. Only Context Waypoint files are changed by this task.
- README and `design-system/sl4dk1y-portfolio/MASTER.md` already describe the functional changes. The documentation stage is complete; this task does not edit those documents.
- No GitHub Actions run result, repository Pages publishing source, or live deployment was inspected. Workflow configuration alone does not confirm a successful run or publication.

## Application and design snapshot

- The project is a static single-page React 19, TypeScript and Vite 8 portfolio. `src/main.tsx` mounts `src/App.tsx`; typed profile, project, translation, and artwork data live in `src/content/`. There is no application backend or API.
- Five themes are cycled in order Day → Sunset → Forest → Rain → Night → Day. The first-visit theme is Day. Theme and RU/EN locale persist independently in local storage; language changes leave the theme unchanged. The theme control is a keyboard-accessible button, with current theme, cycle position, and next theme in its accessible name. Indicators and the frame are hidden at rest, with hover and `focus-visible` feedback.
- UI updates include improved contrast and typography, mobile navigation, and theme styling for the static `public/artwork/credits.html` page. English and Russian content remain the interface locales.
- `index.html` supplies the English static fallback and applies the stored theme before React renders. The artwork credits page is static and theme-aware.
- Existing visual decisions remain: minimal editorial style, no arbitrary redesign, preserve illustration proportions, do not crop artwork, stable mobile-portrait Hero geometry under random image selection, separate portrait and landscape layouts, and no private projects in the public portfolio. Ambient Gallery remains decorative, local, static, disabled below 1680px and for reduced motion.

## Avatar synchronization

- The avatar is stored as a local WebP named by the SHA-256 of its source bytes. `.github/avatar-source.sha256` tracks current and previous hashes/assets; no more than two managed versions are retained.
- `src/App.tsx` uses current local image → previous local image when available → public GitHub avatar URL → initials. The no-JavaScript fallback uses the current local image.
- `.github/workflows/sync-avatar.yml` runs every six hours (`0 */6 * * *`) and supports manual dispatch on `main`. It runs `scripts/sync-github-avatar.test.mjs` before `scripts/sync-github-avatar.mjs`.
- When the source changes, the workflow validates staged paths against an explicit allowlist, commits and pushes only the avatar manifest/assets and the two references, then sends `repository_dispatch` with event type `avatar-updated` and the pushed commit SHA. `.github/workflows/pages.yml` handles that event and checks out the supplied SHA before typecheck, lint, build, artifact upload and Pages deployment. This owner-configured automation is the sole Git-write exception; it does not authorize AI agents to perform Git writes or invoke the workflow.
- The script test suite covers unchanged/no-op behavior, update and fallback cases, invalid or oversized inputs, encoder failures, current/previous asset retention and allowlist/dispatch safeguards. This Context Waypoint task did not run that suite or other application checks; the avatar workflow is configured to run the script tests.
- `public/favicon.png` and `public/apple-touch-icon.png` are static assets outside the avatar synchronization update.

## Workflow and verification boundaries

- Synchronization order remains Documentation → Context Waypoint → Codebase Memory. Codebase Memory may assist read-only code navigation, but its graph was not updated in this task.
- The user/repository owner performs manual Git write operations and controls public deployment. Do not report an untagged candidate as released or infer Pages status from workflow files.
- README, MASTER, AGENTS.md, application sources and both workflows were consulted against the summary. No documentation or application source was changed.
- Context Waypoint consistency, worktree scope, sensitive-content review, and `git diff --check` are checked as part of this task. No build, lint, typecheck, or deployment was requested or performed here.

## Open items

- The owner has not created a `v1.1.0` tag. The versioned candidate is not a tagged release.
- Verify the actual GitHub Actions run, Pages publishing configuration, and deployed site separately if confirmation is required.
- The next synchronization stage is Codebase Memory and requires a separate request.

## Historical context

The existing v1.0.2, v1.0.1, and release-readiness session files remain historical checkpoints. Their version numbers and former implementation state do not describe this v1.1.0 candidate.
