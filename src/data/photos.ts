/**
 * Photo grid captions for /life.
 *
 * Created:      2026-07-26
 * Last updated: 2026-07-26
 *
 * The images themselves are plain files in /public/life/. This file is the
 * caption and alt-text sidecar — there is no CMS and no image metadata parsing.
 *
 * TO ADD A PHOTO:
 *   1. Drop the file in /public/life/
 *   2. Add an entry here with its real pixel dimensions
 *
 * `width` and `height` are required, not optional: without them the browser
 * cannot reserve space before the image loads and the page reflows as the grid
 * fills in. They are the image's intrinsic pixel size — CSS scales it down.
 */

export interface Photo {
  /** Path under /public, e.g. '/life/rehearsal-room.jpg'. */
  src: string;
  /** Describes the image for someone who cannot see it. Never leave empty. */
  alt: string;
  /** Shown under the image. Short. */
  caption: string;
  /** Intrinsic pixel width of the file. */
  width: number;
  /** Intrinsic pixel height of the file. */
  height: number;
}

/**
 * PLACEHOLDER CONTENT — the owner replaces these.
 *
 * Each entry currently points at a grey placeholder SVG shipped in
 * /public/life/ so the grid renders instead of showing six broken images. Drop
 * the real photographs into that directory, change each `src` to the real
 * filename, and rewrite the alt text and captions — or delete the entries you
 * do not want. An empty array simply hides the grid.
 */
export const PHOTOS: Photo[] = [
  {
    src: '/life/photo-01.svg',
    alt: 'PLACEHOLDER — describe what is actually in the photograph.',
    caption: 'Placeholder caption.',
    width: 1600,
    height: 1200,
  },
  {
    src: '/life/photo-02.svg',
    alt: 'PLACEHOLDER — describe what is actually in the photograph.',
    caption: 'Placeholder caption.',
    width: 1600,
    height: 1200,
  },
  {
    src: '/life/photo-03.svg',
    alt: 'PLACEHOLDER — describe what is actually in the photograph.',
    caption: 'Placeholder caption.',
    width: 1600,
    height: 1200,
  },
  {
    src: '/life/photo-04.svg',
    alt: 'PLACEHOLDER — describe what is actually in the photograph.',
    caption: 'Placeholder caption.',
    width: 1600,
    height: 1200,
  },
  {
    src: '/life/photo-05.svg',
    alt: 'PLACEHOLDER — describe what is actually in the photograph.',
    caption: 'Placeholder caption.',
    width: 1600,
    height: 1200,
  },
  {
    src: '/life/photo-06.svg',
    alt: 'PLACEHOLDER — describe what is actually in the photograph.',
    caption: 'Placeholder caption.',
    width: 1600,
    height: 1200,
  },
];
