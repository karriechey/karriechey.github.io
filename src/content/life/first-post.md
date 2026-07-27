---
title: Placeholder post
summary: A template for the first real post — delete this line and write your own.
date: 2026-07-27
tags: [placeholder]
draft: false
# cover: /life/some-photo.jpg   # optional. Remove the # to switch it on.
---

<!--
  PLACEHOLDER. This post exists so the Life section is not empty and so you can
  see how formatting renders. It invents nothing about you.

  To write a real post: copy this file, rename it (the filename becomes the URL
  — first-post.md is served at /life/first-post/), change the frontmatter above,
  and replace everything below. Then delete this file.
-->

This is a placeholder. Replace it with the first real post.

Everything above the second `---` at the top of the file is **frontmatter** —
settings, not content. `title` and `summary` show on the `/life` index. `tags`
drive the filter buttons. Set `draft: true` and the post disappears from the
index and stops being built at all, which is how to park something half-written.

## Headings work

A `##` makes a section heading like the one above. There is no table of contents
on life posts — those are for the guides, which are long enough to need one.

Ordinary paragraphs need no markup. Leave a blank line between them.

You can make text *italic* with single asterisks or **bold** with double, link
to [another page on the site](/work) or to [somewhere else entirely](https://example.com),
and make a list:

- like this
- one item per line
- starting each with a dash

> A line starting with `>` becomes a pull quote, which is useful for quoting
> someone else without it looking like your own sentence.

## Images

Put the file in `public/life/`, then reference it by the path it is served at:

```
![Description of what is in the picture](/life/your-photo.jpg)
```

The text in the square brackets is what someone using a screen reader hears, so
describe the photograph rather than repeating the caption.

## Writing the summary

The `summary` in the frontmatter is the one line shown on the index, and the
index also shows the first paragraph automatically. So the summary should say
something the first paragraph does not — otherwise a reader sees the same
sentence twice.
