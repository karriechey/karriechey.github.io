# Figures for /work/qec-decoder

Created:      2026-07-26
Last updated: 2026-07-26

Every file in this directory is currently a grey placeholder SVG. Replace each
one with the real figure, keeping the **same filename** — the page reads these
paths from a list at the top of `src/pages/work/qec-decoder.astro`.

If you change a filename, or if the real figure has different pixel dimensions,
update the matching entry in that file too. The `width` and `height` there must
be the image's real intrinsic size, otherwise the page reflows as figures load.

| File | What goes here | Suggested size |
|---|---|---|
| `fig-1-lattice.svg` | The code being decoded: a distance-5 surface code lattice, data qubits at the lattice points, X-type and Z-type checks distinguished by colour. Use violet for X-type and teal for Z-type to match the rest of the site. | 900 × 560 |
| `fig-2-architecture.svg` | Block diagram of the decoder: syndrome rounds in as a time series, recurrent stage, convolutional stage, single-bit logical-flip output. Label the tensor shape at each stage if it fits. | 900 × 460 |
| `fig-3-logical-error-rate.svg` | Logical error rate against physical error rate, learned decoder versus minimum-weight perfect matching. **Must show bands across independent training runs**, not a single seed — the page's caption claims this, so the figure has to deliver it. | 900 × 600 |
| `fig-4-failure-cases.svg` | Where on the lattice the decoder fails: a heat map over plaquettes, or the aggregated error chains from the failure analysis. | 900 × 560 |

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
