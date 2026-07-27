/**
 * rehype plugin: wrap every <table> in <div class="table-scroll">.
 *
 * Created:      2026-07-26
 * Last updated: 2026-07-26
 *
 * Why this exists: the guides contain wide reference tables. A table that is
 * wider than the measure must scroll inside its own container — the page body
 * must never scroll horizontally. The CSS-only alternative (`display: block`
 * on the table itself) destroys column alignment, which is exactly the thing
 * these tables exist to provide.
 *
 * Written by hand rather than pulling in `unist-util-visit`, because the whole
 * job is one recursive walk over children arrays.
 */

/** @returns {(tree: any) => void} */
export default function rehypeWrapTables() {
  return (tree) => {
    walk(tree);
  };
}

/**
 * Recurse depth-first, replacing table nodes in place.
 * @param {any} node
 */
function walk(node) {
  if (!node || !Array.isArray(node.children)) return;

  for (let i = 0; i < node.children.length; i += 1) {
    const child = node.children[i];

    // Recurse first, so nested content is processed before we swap the node
    // out for a wrapper (the wrapper's child is the same object either way).
    walk(child);

    if (child.type === 'element' && child.tagName === 'table') {
      node.children[i] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'] },
        children: [child],
      };
    }
  }
}
