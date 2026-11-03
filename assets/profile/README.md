# Profile artwork

This directory contains the visuals used by the profile, their current source files, and the notices for third-party assets. Retired artwork is available in Git history.

## Current assets

| Display asset | Source | Placement |
| :--- | :--- | :--- |
| `intro-title-light.svg` / `intro-title-dark.svg` | Inter lettering in `scripts/profile/build.mjs` | Greeting |
| `chai-mug-flat-v2.webp` | `source/chai-mug-flat-v2.png` | Right of the introduction |
| `projects/derivify-*.svg` / `projects/quizzler-*.svg` | Original SVG geometry and the app’s Q contour | Android project entries |
| `linux-notebook.webp` | `source/linux-notebook.png` | Learning notes |
| `ubit-emblem.png` | Supplied UBIT emblem | The UBIT Hub |
| `stack/*-lockup-*.svg` | Original technology marks with Manrope labels | Visible backend stack |
| Other `stack/*.svg` | Original technology marks | Lockup sources and expanded toolkit |
| `contact/*.svg` | Locally generated buttons | Let’s connect |
| `practice/monkeytype-monkey.png` | Original Monkeytype illustration | Typing note |
| `practice/monkeytype-profile-inline.svg` | Locally generated button | Inline Monkeytype link |

The greeting uses a 60%-wide, 42-pixel-high SVG viewport. The mug floats right at 20% of the text column. The backend toolkit uses a native H2 heading and its normal GitHub divider; the earlier standalone rule is no longer needed.

Selected projects sits directly after Backend stack. It features DeployLatch, Derivify, and Quizzler, with linked H3 names, visible technology lines, concise engineering descriptions, and implementation/proof links. There are no per-project disclosures. DeployLatch leads with its existing logo and Ubuntu rollback demo. The Android entries use custom SVG marks and links to real screenshots. Learning notes follows the project entries, and each paragraph clears its illustration.

The notebook is 104 pixels wide and the UBIT emblem is 100 pixels wide. Project marks use 14% width for DeployLatch and 12% for the Android apps, roughly 116 and 100 pixels in the local desktop text column. They scale down on phones so the text has room. Contact buttons are 40 pixels high and share one paragraph, wrapping on narrow screens. The typing monkey keeps its 16% width with 24 pixels of vertical spacing to lower it within the section. The typing note precedes the final connection section and copyright footer.

The visible backend row contains Java, Spring Boot, and PostgreSQL as separate transparent SVG lockups, with original marks and 14-pixel Manrope labels. Its widths total 276 pixels before normal inline spaces, allowing the row to fit a narrow phone. There are no tiles or table borders. The single disclosure groups libraries, data and migrations, development tools, Linux/Bash, and foundations. C++ is recorded as DSA practice; Spring Security is a learning focus rather than a claim of completed project work.

## Editing and preview

Edit profile wording and placement in [the main README](../../README.md). The build never overwrites it. Artwork geometry and button styling are in [build.mjs](../../scripts/profile/build.mjs); font setup and SVG helpers are in [design.mjs](../../scripts/profile/design.mjs).

From the repository root:

```sh
npm --prefix scripts/profile ci
npm --prefix scripts/profile run build
npm --prefix scripts/profile run preview
```

Open `.preview/profile.html` to inspect the local layout. To capture desktop and mobile widths in both themes:

```sh
npm --prefix scripts/profile run preview -- --screenshots
```

Screenshots use Playwright Chromium or Chrome on Windows. `PROFILE_BROWSER` can select another Chromium executable. Dependencies and local previews are ignored by Git.

The build generates the current greeting variants, notebook and mug display copies, six core-stack lockups, four project marks, six contact buttons, and inline Monkeytype button. Other current SVGs are edited directly. Full-resolution PNG originals stay in `source/`; the mug WebP is lossless and preserves transparency.

## Image links

The README uses relative asset paths and commit-pinned jsDelivr URLs. The default preview resolves this repository’s CDN images to local files; `--remote` exercises the published URLs.

[scripts/profile/assets.mjs](../../scripts/profile/assets.mjs) maintains image references tied to committed asset bytes. Commit artwork before updating those references with `npm --prefix scripts/profile run links`. The tool never commits or pushes. Keep referenced asset commits in published history.

## Sources and notices

The current chai mug and Linux notebook were made with the built-in image_gen tool. Their prompt records are [chai-mug-flat-v2.prompt.json](source/chai-mug-flat-v2.prompt.json) and [prompts.json](source/prompts.json). Historical reference images are identified by Git revision in those records; their retired copies are no longer kept in this directory.

The mug is a raster illustration in a flat vector style, with blue steam and a flowing heart motif. Its original transparent PNG is retained unchanged. The Android project marks are editable native SVG, maintained in `scripts/profile/project-marks.mjs`. Their design and source notes are in [projects/](projects/README.md). The supplied UBIT emblem is unchanged from the transparent emblem used in [DeployLatch](https://github.com/codewithmahad/deploylatch/blob/main/docs/assets/ubit-emblem.png).

Inter supplies the greeting lettering; Manrope supplies button lettering. Both fonts and their SIL Open Font License notices are retained in `source/`. SVG lettering is converted to paths, so readers do not need the fonts installed.

Sources and notices for [technology marks](stack/README.md), [platform illustrations](practice/README.md), and [contact buttons](contact/README.md) are recorded beside those files. The profile’s [copyright and permissions notice](../../LICENSE.md) applies to material owned by the author; third-party assets retain their existing terms.
