# Profile artwork

The README mixes editable personal writing, small illustrations, and real technology logos. Ivory, sage, coral, and brass connect the original artwork; the Java, Spring, PostgreSQL, and Git marks keep their own colors. Longer project, background, and toolkit notes live in expandable sections.

## Editing and preview

- Edit copy, links, and section placement in [`../../README.md`](../../README.md). The build never overwrites it.
- Edit the light/dark `masthead-*.svg` headers in [`../../scripts/profile/build.mjs`](../../scripts/profile/build.mjs). Both use a 1000 × 200 canvas and display centered at a maximum width of 740 pixels. The workbench cutout is enlarged within that fixed canvas; the title size is unchanged. Shared typography and colors live in [`../../scripts/profile/design.mjs`](../../scripts/profile/design.mjs).
- Exactly two coral dividers appear in the README. The first floats in a 12-pixel strip above Backend projects, avoiding a separate block of blank space. The themed `contact-heading-*.svg` sits in a plain HTML block, keeping its title and plane without extra heading margins.
- The themed `drawer-compact-*.svg` Easter egg is nested inside the coding-profile disclosure. It uses one 760 × 132 canvas at every viewport, displayed at a maximum width of 600 pixels. Only color scheme selects a source; no tall mobile image can replace it on a laptop.
- The backend, Linux, and community cutouts use 16% of the text column, so they shrink on phones. Linux floats left, while the other two float right. Keep these images inside their heading elements so the heading borders paint behind the artwork, rather than across it. The Linux paragraph clears its float before the other notebook links. Main contact links remain visible; coding-profile links have their own disclosure. Copyright is a single linked notice at the bottom.
- The toolkit disclosure places a 48-pixel SVG logo beside each entry: Java, Spring, databases, and everyday tools. Sources, ownership, and the distribution license are recorded in [`stack/`](stack/); the logos are not generated or recolored.
- Contact links use compact, transparent SVGs in [`contact/`](contact/), with distinct LinkedIn, portfolio, and email icons. Each is a separate native link with descriptive alternative text, and the row wraps on narrow screens. The invitation and nickname remain selectable, left-aligned text.
- The touch-typing section sits immediately before copyright and uses Monkeytype's original typing-monkey illustration. Its history comes from the owner: learning began in 2023 at around 60 WPM, progressing to 120+ WPM. Recorded personal bests appear in its disclosure. The coding-profile disclosure uses original platform logos in one wrapping row. Downloads, ownership, and sources are recorded in [`practice/`](practice/). Every displayed asset is committed here; none depend on badge or statistics generators.
- Full-resolution originals are in [`source/`](source/). Display copies use WebP with transparency. The headers embed their artwork and convert lettering to paths, so they need no remote images or installed fonts.

From the repository root:

```sh
npm --prefix scripts/profile ci
npm --prefix scripts/profile run build
npm --prefix scripts/profile run preview
```

Open `.preview/profile.html` for a local approximation of GitHub’s layout. To capture both themes at 320, 390, 768, and 1200 pixels:

```sh
npm --prefix scripts/profile run preview -- --screenshots
```

Screenshots use an installed Playwright Chromium browser or Chrome on Windows. Set `PROFILE_BROWSER` to another Chromium executable if needed. Preview files and dependencies are ignored by Git. The default preview uses local files, including when the README contains CDN URLs. Add `--remote` to test the published image URLs at desktop and phone widths in both themes.

## Image delivery and updates

The live profile's relative image URLs redirected to `raw.githubusercontent.com`, which returned `503 Backend.max_conn reached` during diagnosis. The files were already committed and present. Chrome then rejected those HTML error responses with `ERR_BLOCKED_BY_ORB`.

The README now uses [jsDelivr's GitHub CDN](https://www.jsdelivr.com/documentation#id-github) with full commit IDs. GitHub rewrites these URLs through its [image proxy](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls). This avoids visitors requesting images directly from the failing raw-file endpoint. The CDN serves the same committed bytes with immutable caching; changing image bytes gets a new URL. No artwork is uploaded separately, and no generator runs when someone opens the profile. Network and service availability still affect loading time.

For copy-only changes, edit and commit the README normally. After changing artwork:

1. Run the build and preview above.
2. Commit the changed source and generated artwork.
3. Run `npm --prefix scripts/profile run links` to update only image references whose contents changed.
4. Run `npm --prefix scripts/profile run check`, then commit the README and push both commits when ready.

The link command refuses to point at uncommitted asset changes. It never commits or pushes. The check command verifies each image exists locally and matches the exact Git revision in its URL. Keep those asset commits in published history; do not squash them away after linking to them.

The repository contains only the current profile, its source artwork and licenses, and the local build/preview tools. Retired stats, snake, skyline, and README generators have been removed along with their schedules and unused output. Historical versions remain in Git history.

## Artwork and provenance

The original illustrations were generated with the **built-in image_gen tool**. Prompts for the retained illustrations are preserved in [`source/prompts.json`](source/prompts.json).

| Original | Display asset | Placement |
| :--- | :--- | :--- |
| `source/workbench.png` | `workbench.webp` | Embedded in the two `masthead-*.svg` headers |
| `source/backend.png` | `backend.webp` | Backend projects |
| `source/linux-notebook.png` | `linux-notebook.webp` | Learning notes |
| `source/community.png` | `community.webp` | The UBIT Hub |
| `source/signoff-plane.png` | `signoff-plane.webp` | Embedded over the contact heading's coral divider |

The Linux penguin is an original illustration. [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces) and [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) use the SIL Open Font License; font files and notices are retained in `source/`.

The repository’s [copyright and permissions notice](../../LICENSE.md) reserves the owner’s rights in protectable original material. It preserves third-party licenses, GitHub’s platform rights, and applicable legal exceptions, and explains the limits of rights in AI-generated artwork.

The [technology logos](stack/README.md) are third-party assets and are not covered by the original-artwork claim.

The owner’s original profile supplied education, backend focus, Android experience, learning priorities, contacts, and the stated **900+ students** community figure. Project descriptions were checked against the linked repositories. The Fitness Tracker uses MySQL; PostgreSQL comes from the original personal toolkit.

The image-beside-prose layout was inspired by [skydoves’ profile](https://github.com/skydoves), and the personal learning tone by [LINUX_LAB](https://github.com/codewithmahad/LINUX_LAB). No artwork was copied from either reference.
