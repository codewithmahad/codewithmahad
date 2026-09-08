# Profile artwork

The README mixes editable personal writing, small illustrations, and real technology logos. Ivory, sage, coral, and brass connect the original artwork; the Java, Spring, and PostgreSQL marks keep their own colors. Longer project, background, and toolkit notes live in expandable sections.

## Editing and preview

- Edit copy, links, and section placement in [`../../README.md`](../../README.md). The build never overwrites it.
- Edit the light/dark `masthead-*.svg` headers in [`../../scripts/profile/build.mjs`](../../scripts/profile/build.mjs). Both use a 1000 × 180 canvas and display centered at a maximum width of 680 pixels. The older `hero-*.svg` filenames are also rebuilt as compact copies. Shared typography and colors live in [`../../scripts/profile/design.mjs`](../../scripts/profile/design.mjs).
- The same build generates two coral dividers: the looped `thread.svg` after the introduction and the sweeping `thread-closing.svg` before contact links. It also builds four themed `drawer-*.svg` graphics for the expandable Easter egg.
- The backend, Linux, and community cutouts use 14% of the text column, so they shrink on phones. Linux floats left, while the other two float right. The centered contact heading uses a 64-pixel paper plane. The 80-pixel copyright image appears inside the reuse disclosure. Contact and coding-profile links remain visible, selectable text.
- The centered stack row uses three 40-pixel SVG logos. Sources, ownership, and the distribution license are recorded in [`stack/`](stack/); the logos are not generated or recolored.
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

## GitHub activity

The optional **GitHub activity** disclosure displays a dated snapshot from [`contributions.json`](contributions.json). [`../../scripts/profile/contributions.mjs`](../../scripts/profile/contributions.mjs) renders GitHub’s five contribution levels into four `garden-*.svg` files. Desktop uses one calendar; mobile splits the same chronological weeks into two panels. The filenames are retained for compatibility.

```sh
# Render the saved snapshot.
node scripts/profile/contributions.mjs

# Fetch current GitHub activity and render it.
npm --prefix scripts/profile run contributions

# Validate calendar handling.
npm --prefix scripts/profile test
```

The updater uses GitHub’s GraphQL calendar with `GH_TOKEN` or `GITHUB_TOKEN`, or reads the public contribution calendar. It checks dates, daily counts, activity levels, and totals before replacing the saved data. Failed fetches leave the previous snapshot intact. Each graphic includes its capture date.

[`../../.github/workflows/contribution-garden.yml`](../../.github/workflows/contribution-garden.yml) requests a refresh daily at **00:17 UTC**, supports manual runs, and runs when its generator changes on `main`. It uses the built-in workflow token and commits only the calendar JSON and four graphics. Scheduled runs become available after the workflow reaches the default branch.

The numbers reflect GitHub contributions, including the profile’s private-contribution visibility settings. They are not hand-authored or a count of commits alone.

## Artwork and provenance

The original illustrations were generated with the **built-in image_gen tool**. Exact prompts, including the discarded social-tree experiment, are preserved in [`source/prompts.json`](source/prompts.json).

| Original | Display asset | Placement |
| :--- | :--- | :--- |
| `source/workbench.png` | `workbench.webp` | Embedded in the two `masthead-*.svg` headers and four compatibility headers |
| `source/backend.png` | `backend.webp` | Backend projects |
| `source/linux-notebook.png` | `linux-notebook.webp` | Learning notes |
| `source/community.png` | `community.webp` | The UBIT Hub |
| `source/signoff-plane.png` | `signoff-plane.webp` | Say hello |
| `source/copyright.png` | `copyright.webp` | Inside Copyright & reuse |

The Linux penguin is an original illustration. [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces) and [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) use the SIL Open Font License; font files and notices are retained in `source/`.

The repository’s [copyright and permissions notice](../../LICENSE.md) reserves the owner’s rights in protectable original material. It preserves third-party licenses, GitHub’s platform rights, and applicable legal exceptions, and explains the limits of rights in AI-generated artwork.

The [technology logos](stack/README.md) are third-party assets and are not covered by the original-artwork claim.

The owner’s original profile supplied education, backend focus, Android experience, learning priorities, contacts, and the stated **900+ students** community figure. Project descriptions were checked against the linked repositories. The Fitness Tracker uses MySQL; PostgreSQL comes from the original personal toolkit.

The image-beside-prose layout was inspired by [skydoves’ profile](https://github.com/skydoves), and the personal learning tone by [LINUX_LAB](https://github.com/codewithmahad/LINUX_LAB). No artwork was copied from either reference.
