/**
 * Content collections.
 *
 * Created:      2026-07-26
 * Last updated: 2026-07-26
 *
 * Two collections, both loaded from Markdown on disk with the `glob` loader.
 *
 * DESIGN DECISION — READ BEFORE EDITING:
 * Guides have no `chapter` field, no `order` field and no curriculum
 * structure. They are a flat, dated, tagged pile. This was decided
 * deliberately: a numbered sequence advertises its own gaps, so a half-written
 * "chapter 4" looks broken in a way an undated pile of reference articles does
 * not. Do not add sequencing "for convenience."
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Long-form technical reference articles. People arrive from a search engine,
 * jump to one section, and leave — so `summary` must describe what question
 * the document answers, not what it is "about".
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    /** One line, shown on the index. The index shows no excerpt beyond this. */
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    /** Drafts are filtered out of every listing and out of getStaticPaths. */
    draft: z.boolean().default(false),
  }),
});

/**
 * Cello, photography and personal writing. Unlike guides, the life index may
 * show an excerpt and a cover image — different content, different treatment.
 */
const life = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    /** Optional image path, e.g. '/life/rehearsal.jpg'. Rendered on the index. */
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides, life };
