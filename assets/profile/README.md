# Profile artwork

The README mixes editable personal writing, small illustrations, and real technology logos. Ivory, sage, coral, and brass connect the original artwork; the Java, Spring, PostgreSQL, and Git marks keep their own colors. Longer project, background, and toolkit notes live in expandable sections.

## Editing and preview

- Edit copy, links, and section placement in [`../../README.md`](../../README.md). The build never overwrites it.
- Edit the light/dark `masthead-*.svg` headers in [`../../scripts/profile/build.mjs`](../../scripts/profile/build.mjs). Both use a 1000 × 200 canvas and display centered at a maximum width of 740 pixels. The older `hero-*.svg` filenames are also rebuilt as compact copies. Shared typography and colors live in [`../../scripts/profile/design.mjs`](../../scripts/profile/design.mjs).
- Exactly two coral dividers appear in the README: the 24-pixel-high `divider-loop.svg` after the introduction, and the themed `contact-heading-*.svg` heading before the contact links. Its Fraunces title sits inside the line, with a larger paper plane over the left end. The older `divider-sweep.svg` and `thread*.svg` filenames remain available for compatibility.
- The themed `drawer-compact-*.svg` Easter egg uses one 760 × 132 canvas at every viewport, displayed at a maximum width of 600 pixels. Its older desktop and mobile filenames use the same compact composition. Only color scheme selects a source; no tall mobile image can replace it on a laptop.
- The backend, Linux, and community cutouts use 16% of the text column, so they shrink on phones. Linux floats left, while the other two float right. The backend image starts beside the first coral divider and crosses the heading rule. The Linux paragraph clears its float before the other notebook links. The 80-pixel copyright image appears inside the reuse disclosure. Main contact links remain visible; coding-profile links have their own disclosure.
- The toolkit disclosure places a 48-pixel SVG logo beside each entry: Java, Spring, databases, and everyday tools. Sources, ownership, and the distribution license are recorded in [`stack/`](stack/); the logos are not generated or recolored.
- Contact links use compact, transparent SVGs in [`contact/`](contact/), with distinct LinkedIn, portfolio, and email icons. Each is a separate native link with descriptive alternative text, and the row wraps on narrow screens. The invitation and nickname remain selectable, left-aligned text.
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

Screenshots use an installed Playwright Chromium browser or Chrome on Windows. Set `PROFILE_BROWSER` to another Chromium executable if needed. Preview files and dependencies are ignored by Git. The published README needs no Node.js, custom CSS, JavaScript, or external image service.

## Artwork and provenance

The original illustrations were generated with the **built-in image_gen tool**. Exact prompts, including the discarded social-tree experiment, are preserved in [`source/prompts.json`](source/prompts.json).

| Original | Display asset | Placement |
| :--- | :--- | :--- |
| `source/workbench.png` | `workbench.webp` | Embedded in the two `masthead-*.svg` headers and four compatibility headers |
| `source/backend.png` | `backend.webp` | Backend projects |
| `source/linux-notebook.png` | `linux-notebook.webp` | Learning notes |
| `source/community.png` | `community.webp` | The UBIT Hub |
| `source/signoff-plane.png` | `signoff-plane.webp` | Embedded over the contact heading's coral divider |
| `source/copyright.png` | `copyright.webp` | Inside Copyright & reuse |

The Linux penguin is an original illustration. [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces) and [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) use the SIL Open Font License; font files and notices are retained in `source/`.

The repository’s [copyright and permissions notice](../../LICENSE.md) reserves the owner’s rights in protectable original material. It preserves third-party licenses, GitHub’s platform rights, and applicable legal exceptions, and explains the limits of rights in AI-generated artwork.

The [technology logos](stack/README.md) are third-party assets and are not covered by the original-artwork claim.

The owner’s original profile supplied education, backend focus, Android experience, learning priorities, contacts, and the stated **900+ students** community figure. Project descriptions were checked against the linked repositories. The Fitness Tracker uses MySQL; PostgreSQL comes from the original personal toolkit.

The image-beside-prose layout was inspired by [skydoves’ profile](https://github.com/skydoves), and the personal learning tone by [LINUX_LAB](https://github.com/codewithmahad/LINUX_LAB). No artwork was copied from either reference.
