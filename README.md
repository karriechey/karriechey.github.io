# karriechey.github.io

Created:      2026-07-26
Last updated: 2026-07-26

Personal site. Astro 5, static output, no UI framework, hand-written CSS.
Deployed to GitHub Pages at <https://karriechey.github.io>.

---

## Running it locally

```
npm install
npm run dev      # http://localhost:4321
```

Other scripts:

```
npm run build    # static build into dist/
npm run preview  # serve the built dist/ locally
npm run check    # TypeScript + Astro diagnostics
```

Node 18 or newer.

---

## Replace these before the site goes live

Everything below is placeholder material shipped so the site builds and renders.
None of it is true.

### Files to supply

| Path | What it should be |
|---|---|
| `public/cv.pdf` | The CV. Currently a one-page placeholder PDF. Overwrite it. |
| `public/work/*.svg` | Four project figures, one per entry on `/work`. |
| `public/work/qec/*.svg` | Four figures for the QEC page — see `public/work/qec/FIGURES.md` for what belongs in each slot. |
| `public/life/*.svg` | Photographs for the grid on `/life`. |

### Copy to rewrite

| File | What is placeholder |
|---|---|
| `src/pages/index.astro` | The bio, "currently" line and selected-work links. The editable text is fenced between `EDIT FROM HERE` and `EDIT TO HERE` markers. |
| `src/data/work.ts` | All four project descriptions, contexts, and links. Every link currently points at the GitHub profile. |
| `src/pages/work/qec-decoder.astro` | The whole page. The results table is filled with the literal word `PLACEHOLDER` rather than invented numbers — fill it in from the run logs. |
| `src/data/photos.ts` | Six placeholder photo entries with placeholder alt text and captions. |
| `src/content/guides/*.md` | Two guides. The mathematics in both has been checked and is correct, but the voice is not yours. |
| `src/content/life/first-post.md` | A formatting template, not writing. It invents nothing — it shows what Markdown renders as, so you can see the shapes before writing the first real post. Delete it once there is one. |

Search the repo for `PLACEHOLDER` to find everything at once.

---

## Adding a guide

Guides are long-form technical reference articles. Create a Markdown file in
`src/content/guides/`. The filename becomes the URL: `row-reduction.md` is
served at `/guides/row-reduction/`.

```markdown
---
title: Row reduction over GF(2)
summary: One line that says what question this answers. Shown on the index.
date: 2026-05-02
tags: [linear algebra, reference]
draft: false
---

Body starts here. Do not write an `# H1` — the title above becomes the page's
only h1. Start sections at `##`.
```

Frontmatter fields are defined in `src/content.config.ts`:

- `title`, `summary`, `date` — required.
- `tags` — optional array, defaults to `[]`. Drives the filter buttons on the index.
- `draft` — optional boolean, defaults to `false`. A draft is excluded from the
  index *and* from `getStaticPaths`, so it has no page at all — not an unlisted
  one somebody can reach by guessing the URL.

**Read `CONTENT-NOTES.md` before publishing a guide.** Guides are adapted from
private study material and there is a strip-down checklist.

### What you can use in a guide

- **Math.** `$...$` inline, `$$...$$` for display. Rendered at build time by
  KaTeX; no client-side JavaScript is involved.
- **Tables.** Standard Markdown. Wide ones scroll inside their own box
  automatically.
- **Fenced blocks for matrices.** Leave the language off. An undecorated fence
  renders as a neutral bordered surface with no syntax colour, because these
  blocks hold matrices and row reduction, not source code. Add a language
  (` ```python `) only when you actually want highlighting.
- **Headings.** `##` and `###` are collected into the table of contents, which
  is a sticky column at 1024px and above and a collapsed block below that.
  Every heading gets an anchor link.

There are deliberately **no chapter numbers and no ordering field**. Guides are
a flat, dated, tagged pile — a numbered sequence advertises its own gaps.

---

## Adding a life post

Same idea, in `src/content/life/`:

```markdown
---
title: Practising the same eight bars for a month
summary: One line, shown on the index.
date: 2026-06-28
tags: [cello, practice]
cover: /life/practice-room.jpg   # optional
draft: false
---
```

The only extra field is `cover`, an optional image path under `public/`. Unlike
the guides index, the life index shows a short auto-generated excerpt and the
cover image where one exists.

---

## Where images go

Everything under `public/` is copied to the site root verbatim: `public/life/x.jpg`
is served at `/life/x.jpg`.

| Directory | For |
|---|---|
| `public/work/` | One figure per project card on `/work`. Paths are set in `src/data/work.ts`. |
| `public/work/qec/` | Figures for the QEC deep page. See `FIGURES.md` in that directory. |
| `public/life/` | Photographs for the grid on `/life`. Captions and alt text go in `src/data/photos.ts`. |
| `public/` (root) | `portrait.jpg`, `cv.pdf`, `favicon.svg`. |

**Every image needs `width` and `height`** set to its real pixel dimensions.
That is what stops the page reflowing as images load. For the photo grid and the
work cards those numbers live in the data files, not in the templates.

Prefer SVG for plots and diagrams — sharp at any zoom and usually smaller than
a PNG of the same chart.

---

## Deployment

Push to `main`. `.github/workflows/deploy.yml` builds the site with
`withastro/action@v3` and publishes it with `actions/deploy-pages@v4`. There is
nothing to run by hand, and `dist/` is not committed.

A deploy can also be triggered manually from the Actions tab.

Three things must be true in the GitHub UI, and they are one-time setup:

1. **The repository must be public.** GitHub Pages does not serve private
   repositories on the Free plan.
2. **Settings → Pages → Source must be "GitHub Actions"**, not "Deploy from a
   branch."
3. **The repository must stay named `karriechey.github.io`.** That exact name is
   what makes it a user site served from the domain root.

Because it is a root-domain user site, `astro.config.mjs` has no `base` option
and there is no `CNAME` file. Adding either would break every internal link.

---

## Structure

```
src/
  components/       Nav, Footer, TagFilter, TableOfContents, SurfaceCode
  content/          Markdown for the two collections
  data/             work.ts, photos.ts — hand-edited content that is not Markdown
  layouts/          BaseLayout (all pages), GuideLayout (guide articles)
  pages/            Routes
  plugins/          rehype-wrap-tables.mjs
  styles/global.css Design tokens and every shared style
  site.ts           Name, email, links, nav definition
public/             Copied to the site root verbatim
```

### Design system

All tokens are custom properties at the top of `src/styles/global.css`, with a
`prefers-color-scheme: dark` block. Nothing else in the repo hard-codes a colour.

Two accents, used semantically, matching the QEC work: **violet** is the X-type
stabilizer and the primary interactive accent; **teal** is the Z-type stabilizer
and the secondary. There is no third accent — do not add one.

Two typefaces: **Newsreader** for headings and body prose alike — a heading
differs from a sentence by size and weight, not by voice — and **IBM Plex Mono**
for things that are not sentences: dates, tags, counts, code, nav links.

The page is full width (`--page-max: none`), so the header and footer rules span
the window. Body prose is still capped at `--measure` (about 68 characters),
because line length, not window width, is what decides whether a long document
is readable. To go back to a centred column, set `--page-max` to a length such
as `72rem`.

Dark mode follows the system preference. There is no toggle, by design.

### The lattice

`src/components/SurfaceCode.astro` is the one interactive element on the site.
It lives on `/work/qec-decoder`, where a visitor already has the context to know
what they are looking at. It is self-contained vanilla TypeScript over inline SVG, with
the physics documented in a comment block at the top of the file. The initial
syndrome is computed at build time so it is correct before any script runs.

If you change it, the rule that matters is: **a Z-type check measures ZZZZ and
therefore detects X and Y errors; an X-type check measures XXXX and detects Z
and Y.** A check fires on *odd* parity, so two errors inside one check cancel.

### Things this site deliberately does not have

Analytics, comments, a newsletter form, a light/dark toggle, search, a CMS, view
counters, reading-time estimates, an About page, a Now page, or a fifth nav
item. These were all decided against. If one gets added later it should be
because it was reconsidered, not because it was forgotten.
