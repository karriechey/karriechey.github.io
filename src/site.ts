/**
 * Site-wide constants.
 *
 * Created:      2026-07-26
 * Last updated: 2026-07-26
 *
 * Everything a reader could call "the owner's details" lives here so it can be
 * changed in one place rather than hunted through templates. The nav is
 * defined here too, and is intentionally exactly four items — home, work,
 * guides, life. There is no About page (the home page does that job) and no
 * Now page. Do not add a fifth item.
 */

export const SITE = {
  /** Shown in the browser tab suffix and the header wordmark. */
  name: 'Karrie Chey',

  /** Canonical origin. Must match `site` in astro.config.mjs. */
  url: 'https://karriechey.github.io',

  /** Fallback <meta name="description"> for pages that do not set their own. */
  description:
    'Karrie Chey — computer science undergraduate working on machine-learning decoders for quantum error correction.',

  /** Contact details render in the footer, deliberately not in the nav. */
  email: 'karriechey@gmail.com',
  github: 'https://github.com/karriechey',
  youtube: 'https://www.youtube.com/@karrieplayscello',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

/**
 * The four nav items. `href` values are root-absolute because this is a
 * GitHub Pages *user* site served from the domain root — there is no base path
 * to prefix.
 */
export const NAV: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Guides', href: '/guides' },
  { label: 'Life', href: '/life' },
];

/**
 * Decide whether a nav item is the current section.
 *
 * Home matches only the exact root path; every other item also matches its
 * child pages, so `/guides/some-article` still marks "Guides" as current.
 *
 * @param href     The nav item's href.
 * @param pathname The current `Astro.url.pathname`, which may or may not carry
 *                 a trailing slash depending on how the page was reached.
 */
export function isCurrent(href: string, pathname: string): boolean {
  // Normalise away a trailing slash so '/work/' and '/work' compare equal.
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

/**
 * Format a collection entry date for display.
 *
 * Fixed to en-GB with a UTC time zone on purpose: frontmatter dates are parsed
 * as UTC midnight, and formatting them in a local zone behind UTC would render
 * the previous day.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Machine-readable date for <time datetime="...">. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
