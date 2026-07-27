# Content notes

Created:      2026-07-26
Last updated: 2026-07-26

Rules for publishing, kept here rather than in `README.md` because they are
about the writing, not the build.

---

## Before publishing a guide

The guides are adapted from private study material, which means they arrive
carrying a context the reader on the site does not share.

**Strip anything that dates the material or addresses one specific reader:**

- Course codes and module numbers
- Exam, midterm or problem-set framing — "this will be on the exam", "for
  question 3"
- Time-relative phrasing — "in N days", "by Friday", "before the deadline",
  "last week we covered"
- References to particular assignments, lecturers, tutorials or textbooks the
  reader has no access to
- Names of classmates, instructors or anyone else
- Second-person encouragement — "you've got this", "don't panic", "this is
  easier than it looks"

**Keep:**

- Worked examples, in full, including the intermediate steps
- The common-mistakes section — it is usually the most useful part of the
  document, and it is the part that is hardest to reconstruct later
- Reference tables and summary tables
- Definitions and notation keys

The test: would this sentence still make sense to somebody who found the page
through a search engine, eighteen months from now, in another country?

---

## Verify the arithmetic in every worked example before publishing

A wrong worked example is worse than no example. A reader who cannot reproduce
your step assumes the fault is theirs, and spends an hour on it.

Practical checks:

- Substitute the final answer back into the **original** problem, not into your
  own intermediate result. Checking against your own working confirms an error
  rather than catching it.
- Recompute each row operation independently rather than reading it off the
  previous line.
- For anything over $\mathbb{F}_2$, check that no minus sign has crept in.
  There are none.
- If a result is quoted from a computation — an error rate, a benchmark number,
  a fit — take it from the run log, not from memory.

Where a worked example has been verified, say so in the document, and show the
check. `row-reduction-over-gf2.md` does this in its "Checking it" section; that
is the pattern.

---

## Numbers in project write-ups

Do not put a plausible-looking number on the site as a placeholder. It will be
forgotten and it will be read as a claim.

The results table in `src/pages/work/qec-decoder.astro` contains the literal
word `PLACEHOLDER` in every cell for exactly this reason. Fill those in from the
run logs, or delete the table.

Where a result depends on run-to-run variation, report a spread across
independent runs rather than a single number — and make the figure show the
band, not just the mean.
