# Profile artwork

The README mixes editable personal writing, small illustrations, and real technology logos. Ivory, sage, coral, and brass connect the original artwork; the technology marks keep their own colors and proportions. Longer project, background, and toolkit notes live in expandable sections.

## Editing and preview

- Edit copy, links, and section placement in [`../../README.md`](../../README.md). The build never overwrites it.
- The opening uses `intro-title-light.svg` / `intro-title-dark.svg` with a left-aligned SVG viewport. A flat, vector-style blue chai-mug illustration floats right from inside the H1 at 20% of the text column; the title uses a 60%-wide, 42-pixel-high viewport. The greeting keeps its desktop type size and scales within the available width on phones. Introductory text wraps alongside the mug. The earlier glossy mug and red pen-holder images are preserved and no longer displayed. The earlier compact vignette, plain wordmarks, illustrated mastheads, and computer artwork are preserved but the vignette is no longer displayed.
- A single coral SVG divider separates the background disclosure from the toolkit. The connection section uses a native heading and normal text.
- The connection section keeps all six social profiles in one HTML paragraph: Portfolio, LinkedIn, Mail, LeetCode, HackerRank, and Codolio. They fit one row on desktop and wrap naturally on narrow screens. There is no category heading, banner, or disclosure.
- The Linux notebook displays at 104 pixels wide and floats left, roughly matching the heading and two lines of body text without growing with the text column. The backend request-flow vector displays at 112 pixels wide and floats right inside its heading, so the heading border paints behind it. The UBIT emblem displays at 100 pixels wide beside the community body text, with a small vertical inset; its paragraph clears the float before the disclosure. The Linux paragraph clears its float before the other notebook links. All contact and coding-profile links remain visible. The footer is one centered line: copyright owner and year, an All rights reserved link to LICENSE.md, and Back to top with a native up arrow. It wraps naturally on small screens.
- The toolkit starts with a native four-column table: Java, Spring Boot, PostgreSQL, and Linux, each with a 48-pixel SVG logo and its name underneath. A disclosure groups the full toolkit into languages, frameworks and libraries, databases, and tools and environment, using 24-pixel logos. Keep the visible row focused; add technologies to the appropriate category as they become part of actual project work or study. Sources, ownership, and the distribution license are recorded in [`stack/`](stack/); the logos are not generated or recolored.
- The 40-pixel-high SVG buttons in `contact/` share the same geometry. Only the portfolio uses a light surface, keeping the blue M and two-tone mahad.dev branding: pure black for mahad and gray for .dev. LinkedIn uses blue; Mail uses warm red with an original white-envelope vector. LeetCode uses graphite and HackerRank uses deep green, with edges matching their fills. LeetCode retains its original mark. HackerRank uses the shared 14-pixel Manrope label weight and a green terminal square. Codolio uses `codolioBase: #F57C06` from its [public stylesheet](https://codolio.com/_next/static/css/53f9a90df567e9a1.css). LeetCode orange `#F89F1B` and HackerRank green `#20D761` come from the original logo assets. Button surfaces are custom design choices. Edit the palette, logo placement, and outlined lettering in `scripts/profile/build.mjs`.
- The touch-typing section sits immediately before copyright and uses Monkeytype's original typing-monkey illustration. Its history comes from the owner: learning began in 2023 at around 60 WPM, progressing to 130+ WPM. One visible paragraph covers the habit and links to a test and the profile; there is no records table or disclosure. A 160 x 20 SVG profile shortcut sits inline with the text, using a charcoal background, yellow keyboard glyph, and outlined lettering. The practice links use original platform logos embedded in the visible buttons. Downloads, ownership, and sources are recorded in [`practice/`](practice/). Every displayed asset is committed here; none depend on badge or statistics generators.
- Full-resolution originals are in [`source/`](source/). Display copies use WebP with transparency. The SVG headers embed any artwork they use and convert lettering to paths, so they need no remote images or installed fonts.

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

The workbench and Linux notebook illustrations were generated with the **built-in image_gen tool**. Prompts for the retained illustrations are preserved in [`source/prompts.json`](source/prompts.json).

| Original | Display asset | Placement |
| :--- | :--- | :--- |
| SVG lettering | `intro-title-light.svg` / `intro-title-dark.svg` | Current greeting |
| `source/chai-mug-flat-v2.png` | `chai-mug-flat-v2.webp` | Right side of the heading and introductory paragraphs |
| `source/chai-mug-flat.png` | `chai-mug-flat.webp` | Preserved two-wave illustration |
| `source/chai-mug-blue.png` | `chai-mug-blue.webp` | Preserved glossy alternative, no longer displayed |
| `source/pen-holder-red.png` | `pen-holder-red.webp` | Preserved alternative, no longer displayed |
| `source/workbench.png` | `workbench.webp` and `masthead-*.svg` | Preserved illustrated opening, currently not displayed |
| Editable SVG | `backend-flow-light.svg` / `backend-flow-dark.svg` | Backend projects |
| `source/linux-notebook.png` | `linux-notebook.webp` | Learning notes |
| Supplied UBIT emblem | `ubit-emblem.png` | The UBIT Hub |


The earlier study-setup vignette is preserved editable SVG geometry, with ivory chai, a graphite laptop showing 200 OK, and an uneven arrangement of pens and a pencil. Standalone `study-setup-light.svg` / `study-setup-dark.svg` files are retained for inspection and reuse within this profile. Its former responsive header files are retained for reference and are no longer used in the README.

The current chai-mug illustration is a flat graphic redraw of the earlier mug, made with the built-in image_gen tool. It retains the blue mug, warm chai, flowing heart, and three steam curves, replacing the reflective finish with outlined shapes and restrained flat shading. It is a raster illustration in a vector style. The current three-wave edit prompt is in `source/chai-mug-flat-v2.prompt.json`; the earlier two-wave prompt remains in `source/chai-mug-flat.prompt.json`; its transparent source PNG is preserved unchanged, and the display WebP is lossless.

The earlier glossy blue chai-mug emblem was generated with the built-in image_gen tool, using the supplied mug photographs as design references. Its blue palette follows the greeting, with warm chai, a flowing heart motif, and two original steam strokes. The full prompt and settings are in `source/chai-mug-blue.prompt.json`. The original transparent PNG is retained unchanged; its WebP is a lossless encoding at the same dimensions.

The red mesh pen holder was produced with the built-in image_gen tool using the supplied product photo as the reference/edit target: red container, preserved black/chrome pen styles, one added pencil, and transparent background. Its complete prompt and tool settings are recorded in `source/pen-holder-red.prompt.json`. The original PNG is retained unchanged; the WebP is encoded losslessly at the same dimensions, with alpha preserved.

The backend request-flow marks are editable native SVGs showing a request, a code service, and a database. Their two theme variants share the same geometry. The UBIT emblem is copied unchanged from the transparent emblem used in [DeployLatch](https://github.com/codewithmahad/deploylatch/blob/main/docs/assets/ubit-emblem.png). Earlier backend, community, and signoff-plane source illustrations remain in the repository but are no longer displayed. The old drawer and signoff banners have been removed from the build and README.

The Linux penguin is an original illustration. [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces), [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), and [Inter](https://github.com/google/fonts/tree/main/ofl/inter) use the SIL Open Font License; font files and notices are retained in `source/`. Inter was downloaded from Google Fonts on 2026-11-03.

The repository’s [copyright and permissions notice](../../LICENSE.md) grants no reuse permission for the README or copyrighted material the owner holds rights in. Third-party licenses, GitHub’s platform permissions, and applicable legal exceptions remain in effect. Asset provenance is documented separately above.

The [technology logos](stack/README.md) are third-party assets and are not covered by the original-artwork claim.

The owner’s original profile supplied education, backend focus, Android experience, learning priorities, contacts, and the stated **900+ students** community figure. Project descriptions were checked against the linked repositories. PostgreSQL comes from the original personal toolkit.

The image-beside-prose layout was inspired by [skydoves’ profile](https://github.com/skydoves), and the personal learning tone by [LINUX_LAB](https://github.com/codewithmahad/LINUX_LAB). No artwork was copied from either reference.
