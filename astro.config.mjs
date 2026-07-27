// @ts-check
// Astro configuration.
//
// Created:      2026-07-26
// Last updated: 2026-07-26
//
// Deployment target is a GitHub Pages *user* site served from the domain root
// (https://karriechey.github.io). Because it is served from the root and not
// from a project subpath, there is deliberately no `base` option here and no
// CNAME file in /public. Adding either would break every internal link.

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables.mjs';

export default defineConfig({
  // Canonical origin. Used by @astrojs/sitemap to write absolute URLs, and by
  // Astro.site in the <link rel="canonical"> tag in BaseLayout.
  site: 'https://karriechey.github.io',

  // Plain static HTML. No server adapter, no SSR — GitHub Pages only serves files.
  output: 'static',

  integrations: [sitemap()],

  markdown: {
    // remark-math parses $...$ (inline) and $$...$$ (display) out of the
    // Markdown source; rehype-katex renders those nodes to KaTeX HTML at build
    // time. The KaTeX stylesheet is imported globally in BaseLayout.astro —
    // without it the rendered math has no glyph metrics and looks broken.
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      // rehype-slug is listed explicitly even though Astro also applies its own
      // copy. Astro runs its defaults *after* user plugins, so without this the
      // autolink plugin below would run against headings that have no `id` yet
      // and silently add nothing. Running it twice is harmless — the second
      // pass sees ids already present and leaves them alone.
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          // Wrap each heading's id in an anchor so every section is linkable.
          // `behavior: 'append'` puts the link *after* the heading text so the
          // heading itself stays selectable as plain text.
          behavior: 'append',
          properties: {
            class: 'heading-anchor',
            // The visible glyph is supplied by CSS (::after) and only appears
            // on hover/focus, so the anchor needs its own accessible name.
            'aria-label': 'Link to this section',
          },
        },
      ],
      // Wide reference tables scroll inside their own box rather than pushing
      // the page sideways.
      rehypeWrapTables,
    ],
    shikiConfig: {
      // Light Shiki theme only. There is no dark syntax theme because guide
      // code fences are mostly matrices and row reduction, not source code —
      // see the `.astro-code` rules in global.css, which strip colour from
      // plaintext blocks entirely.
      theme: 'github-light',
      wrap: false,
    },
  },
});
