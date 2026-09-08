# Profile artwork

The README pairs short, editable text with a workbench illustration and four smaller cutouts. Ivory, sage, coral, and brass connect the artwork; Fraunces and Manrope supply the hero and calendar lettering.

## Editing and preview

- Edit copy, links, and section placement in [`../../README.md`](../../README.md). The build never overwrites it.
- Edit the four desktop/mobile, light/dark headers in [`../../scripts/profile/build.mjs`](../../scripts/profile/build.mjs). Shared typography and colors live in [`../../scripts/profile/design.mjs`](../../scripts/profile/design.mjs).
- The backend, Linux, community, and paper-plane cutouts float inside native HTML headings, overlapping GitHub’s heading rules. Contact links remain normal, selectable text.
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
| `source/workbench.png` | `workbench.webp` | Embedded in the four `hero-*.svg` headers |
| `source/backend.png` | `backend.webp` | Backend projects |
| `source/linux-notebook.png` | `linux-notebook.webp` | Learning notes |
| `source/community.png` | `community.webp` | The UBIT Hub |
| `source/signoff-plane.png` | `signoff-plane.webp` | Say hello |

The Linux penguin is an original illustration. [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces) and [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) use the SIL Open Font License; font files and notices are retained in `source/`.

The owner’s original profile supplied education, backend focus, Android experience, learning priorities, contacts, and the stated **900+ students** community figure. Project descriptions were checked against the linked repositories. The Fitness Tracker uses MySQL; PostgreSQL comes from the original personal toolkit.

The image-beside-prose layout was inspired by [skydoves’ profile](https://github.com/skydoves), and the personal learning tone by [LINUX_LAB](https://github.com/codewithmahad/LINUX_LAB). No artwork was copied from either reference.
