# Mahad’s workbench

The profile combines transparent, tactile illustrations with real Markdown text. Bone white, sage, coral and brass connect the computer, backend drawers, Linux notebook and student noticeboard. Fraunces supplies the large lettering; Manrope handles the small labels.

## Editing

- Edit the profile’s writing and links directly in [`../../README.md`](../../README.md). Nothing generates or overwrites that file.
- Edit the header, dividers and secret drawer in [`../../scripts/profile/build.mjs`](../../scripts/profile/build.mjs).
- Full-resolution PNG originals are in [`source/`](source/). Display assets are smaller WebP derivatives with transparency preserved.
- The four `hero-*.svg` files provide desktop/mobile and light/dark compositions. The four `drawer-*.svg` files do the same for the Easter egg.
- SVG lettering is converted to paths so it does not depend on a visitor having the fonts installed. The header embeds its artwork, so GitHub does not need to resolve an external image from inside an SVG.

From the repository root, with Node.js installed:

```sh
npm --prefix scripts/profile ci
npm --prefix scripts/profile run build
npm --prefix scripts/profile run preview
```

Open `.preview/profile.html` to review the page using GitHub Markdown CSS. The local preview follows the system’s light/dark preference. Preview files and dependencies are ignored by Git.

To capture light/dark screenshots at 320, 390, 768 and 1200 pixels:

```sh
npm --prefix scripts/profile run preview -- --screenshots
```

This uses an installed Playwright Chromium browser, or Chrome on Windows. Set `PROFILE_BROWSER` to an executable path to use another Chromium installation. If needed, install the preview browser with `npm exec --prefix scripts/profile -- playwright-core install chromium`.

The preview is a local approximation of GitHub’s page layout. During this redesign, the README was also rendered through GitHub’s Markdown API to verify that its HTML survives sanitization. The artwork and page need no Node.js, custom CSS, JavaScript or external image service when viewed on GitHub.

## Artwork and type

Original illustrations were generated with the **built-in image_gen tool**. The exact prompts are preserved in [`source/prompts.json`](source/prompts.json). The workbench establishes the materials and palette; the other illustrations use it as a style reference. No artwork was copied from the reference READMEs.

- `source/workbench.png` → `workbench.webp`, embedded in the four headers.
- `source/backend.png` → `backend.webp`, beside the backend projects.
- `source/linux-notebook.png` → `linux-notebook.webp`, beside LINUX_LAB.
- `source/community.png` → `community.webp`, beside The UBIT Hub.

The Linux illustration is an original stylized penguin, not the official Tux artwork.

[Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces) and [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) are distributed under the SIL Open Font License. Their font files and individual license notices are retained in `source/`.

## Content references

The original profile supplied the education, backend focus, prior Android work, community role and 900+ student figure, learning priorities, and contact links. The community figure is the owner’s stated figure, not a live counter.

Public repositories checked for the redesign:

- [Fitness Tracker backend](https://github.com/codewithmahad/fitness-tracker-backend) and [Spring Boot starter](https://github.com/codewithmahad/spring-boot-25-enterprise-template).
- [LINUX_LAB](https://github.com/codewithmahad/LINUX_LAB), [JAVA_LAB](https://github.com/codewithmahad/JAVA_LAB), [SQL_LAB](https://github.com/codewithmahad/SQL_LAB), and [DSA_LAB](https://github.com/codewithmahad/DSA_LAB).
- [The UBIT Hub resources](https://github.com/codewithmahad/the-ubit-hub-resources) and [semester results dashboard](https://github.com/codewithmahad/ubit-semester-result-dashboard).

The fitness project’s README identifies MySQL, so its project label uses MySQL. PostgreSQL remains in the personal toolkit from the original profile. Tool and project descriptions avoid unverified production, performance or security claims.

The layout takes the image-beside-prose idea from [skydoves’ profile](https://github.com/skydoves) and the personal learning tone from [LINUX_LAB](https://github.com/codewithmahad/LINUX_LAB). The composition, copy and artwork are new.

Existing profile automation writes older, unreferenced assets. The new README is independent of those workflows and uses only the checked-in artwork in this directory.
