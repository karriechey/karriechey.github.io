# Figures for /work/qec-decoder

Created:      2026-07-26
Last updated: 2026-08-15

Figures 1 and 2 are real, exported from the analysis notebooks in
`FNAL-QCDecoding-FPGA/analysis_notebooks/figures/`. Figures 3 to 5 are still
grey placeholder SVGs. Replace each with the real figure, keeping the **same
filename** — the page reads these paths from a list at the top of
`src/pages/work/qec-decoder.astro`.

If you change a filename, or if the real figure has different pixel dimensions,
update the matching entry in that file too. The `width` and `height` there must
be the image's real intrinsic size, otherwise the page reflows as figures load.

| File | What goes here | Size | State |
|---|---|---|---|
| `per-round-detector-slice.svg` | The code being decoded, as a single round of detectors. Square. | 1678 × 1678 | Real |
| `detectors-overlaid.svg` | Every round's detectors drawn on top of one another, showing the time dimension a single slice hides. Square. | 3981 × 3981 | Real |
| `fig-3-architecture.svg` | Block diagram of the decoder: syndrome rounds in as a time series, recurrent stage, convolutional stage, single-bit logical-flip output. Label the tensor shape at each stage if it fits. | 900 × 460 | Placeholder |
| `fig-4-logical-error-rate.svg` | Logical error rate against physical error rate, learned decoder versus minimum-weight perfect matching. **Must show bands across independent training runs**, not a single seed — the page's caption claims this, so the figure has to deliver it. | 900 × 600 | Placeholder |
| `fig-5-failure-cases.svg` | Where on the lattice the decoder fails: a heat map over plaquettes, or the aggregated error chains from the failure analysis. | 900 × 560 | Placeholder |

Figure numbering is in the captions, not the filenames of the real figures.
Inserting a figure means renumbering every caption below it — the numbers live
in the `FIGURES` array in the page, so change them there and nowhere else.

Square figures need `class="square-figure"` on the `<figure>` element. Without
it they inherit the 52rem width meant for landscape charts and become enormous.

## Format notes

- **SVG is preferred** for diagrams and plots — it stays sharp at any zoom and
  is usually smaller than a PNG of the same plot. Export vector from matplotlib
  with `plt.savefig('fig-3-logical-error-rate.svg')`.
- If a figure must be raster (a photograph of hardware, say), use PNG, export at
  2× the display size, and change the extension in the page's figure list.
- Do not embed a legend that relies on colour alone. The site's two accents are
  the only colours in use, and a reader who cannot distinguish them needs the
  series labelled or differently dashed.
- Figures render on both a light and a dark background. Avoid a hard white
  canvas — a transparent background, or the site's own `--paper` value, sits
  better in dark mode. If the figure must have an opaque background, `#F7F8FA`
  is the light-mode paper colour.
