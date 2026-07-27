---
title: Row reduction over GF(2)
summary: Gaussian elimination when the only scalars are 0 and 1 — what changes, what gets easier, and a full worked reduction with the null space read off at the end.
date: 2026-05-02
tags: [linear algebra, reference]
draft: false
---

<!--
  PLACEHOLDER CONTENT — written by Claude as a structural example.
  Every arithmetic step below has been checked, and the final null-space vector
  is verified against the original matrix in the last section. The voice is not
  Karrie's. Replace or rewrite. See CONTENT-NOTES.md.
-->

$\mathbb{F}_2$, also written GF(2), is the field with two elements. Addition is
XOR, multiplication is AND, and there is nothing else. Row reduction works
exactly as it does over the reals, and is considerably less annoying.

## What changes

Three simplifications, one trap.

**There is no division.** The only non-zero scalar is $1$, and $1^{-1} = 1$. The
scaling step of Gaussian elimination — divide the pivot row through by the pivot
— is a no-op and can be deleted from the procedure entirely. Every pivot is
already $1$.

**Subtraction is addition.** Since $1 + 1 = 0$, every element is its own additive
inverse, so $-x = x$. "Subtract row 1 from row 2" and "add row 1 to row 2" are
the same instruction. Only one row operation survives:

$$
R_i \leftarrow R_i + R_j \pmod 2
$$

which is elementwise XOR.

**There are no numbers to grow.** Over $\mathbb{Q}$, elimination produces
fractions with increasingly ugly denominators. Here every entry stays in
$\{0, 1\}$ forever, which is why this is fast in practice and why hardware
implementations store rows as machine words and eliminate with a single XOR
instruction.

The trap: **your intuition about "how much" is gone.** There is no ordering on
$\mathbb{F}_2$, no notion of a large or small pivot, and no partial pivoting for
numerical stability — there is no numerical instability to stabilise against. Any
non-zero entry in the column is an equally good pivot. Take the first one.

## The procedure

1. Find the leftmost column with a non-zero entry at or below the current row.
2. Swap that row up into the pivot position.
3. Add the pivot row to *every other* row that has a $1$ in the pivot column —
   both below (forward elimination) and above (back-substitution).
4. Move down one row and right one column, repeat.

Doing step 3 in both directions as you go lands directly in reduced row echelon
form, without a separate back-substitution pass.

## Worked example

Reduce this matrix over $\mathbb{F}_2$:

```
      [ 1 0 1 1 ]
  A = [ 1 1 0 1 ]
      [ 0 1 1 0 ]
      [ 1 1 1 0 ]
```

### Column 1

$R_1$ already has a leading $1$. Rows 2 and 4 also have a $1$ in column 1, so add
$R_1$ to each of them. Row 3 starts with $0$ and is left alone.

```
  R2 <- R2 + R1 :  1101 + 1011 = 0110
  R4 <- R4 + R1 :  1110 + 1011 = 0101
```

```
      [ 1 0 1 1 ]
      [ 0 1 1 0 ]
      [ 0 1 1 0 ]
      [ 0 1 0 1 ]
```

### Column 2

The pivot is $R_2$. Rows 3 and 4 both carry a $1$ in column 2.

```
  R3 <- R3 + R2 :  0110 + 0110 = 0000
  R4 <- R4 + R2 :  0101 + 0110 = 0011
```

```
      [ 1 0 1 1 ]
      [ 0 1 1 0 ]
      [ 0 0 0 0 ]
      [ 0 0 1 1 ]
```

Row 3 has vanished. That is the code telling you the original row 3 was the sum
of rows 1 and 2 — the matrix is rank-deficient. Swap the zero row to the bottom
so the pivots stay in staircase order:

```
      [ 1 0 1 1 ]
      [ 0 1 1 0 ]
      [ 0 0 1 1 ]
      [ 0 0 0 0 ]
```

### Column 3, and back-substitution

The pivot is now the third row. Rows 1 and 2 both have a $1$ in column 3, so
clear them:

```
  R2 <- R2 + R3 :  0110 + 0011 = 0101
  R1 <- R1 + R3 :  1011 + 0011 = 1000
```

Reduced row echelon form:

```
             [ 1 0 0 0 ]
  rref(A) =  [ 0 1 0 1 ]
             [ 0 0 1 1 ]
             [ 0 0 0 0 ]
```

### Reading off the answer

Pivots sit in columns 1, 2 and 3. Column 4 has no pivot, so $x_4$ is the single
free variable.

$$
\operatorname{rank}(A) = 3, \qquad \dim \ker(A) = 4 - 3 = 1
$$

Set $x_4 = 1$ and read the rows bottom-up:

- Row 3 says $x_3 + x_4 = 0$, so $x_3 = 1$.
- Row 2 says $x_2 + x_4 = 0$, so $x_2 = 1$.
- Row 1 says $x_1 = 0$.

$$
\ker(A) = \operatorname{span}\{(0,1,1,1)\}
$$

### Checking it

Never publish a worked example you have not substituted back. Against the
**original** $A$, not the reduced form:

```
  row 1:  (1,0,1,1) . (0,1,1,1) = 0 + 0 + 1 + 1 = 2 = 0  mod 2
  row 2:  (1,1,0,1) . (0,1,1,1) = 0 + 1 + 0 + 1 = 2 = 0  mod 2
  row 3:  (0,1,1,0) . (0,1,1,1) = 0 + 1 + 1 + 0 = 2 = 0  mod 2
  row 4:  (1,1,1,0) . (0,1,1,1) = 0 + 1 + 1 + 0 = 2 = 0  mod 2
```

All four rows vanish. The vector is genuinely in the kernel.

## Why this matters for codes

For a linear code with parity-check matrix $H$, the code space is exactly
$\ker H$, and the syndrome map is $e \mapsto He^{\mathsf{T}}$. So:

| Linear algebra | Coding theory |
|---|---|
| $\ker H$ | The codewords |
| $\dim \ker H = n - \operatorname{rank} H$ | Number of encoded bits, $k$ |
| Rows of $H$ that vanish under reduction | Redundant checks — they measure nothing new |
| Coset $e + \ker H$ | Every error consistent with the observed syndrome |

That third row is worth dwelling on. A dependent check row is a stabilizer
generator you did not need, and finding them is a rank computation, not an
insight. Reducing $H$ tells you how many logical qubits a stabilizer group
actually encodes.

## Common mistakes

**Carrying a minus sign.** There are no minus signs. If one appears in your
working, you have slipped back into $\mathbb{R}$.

**Scaling a row.** The only scalars are $0$ and $1$. Multiplying a row by $0$
destroys information and is not an elementary row operation; multiplying by $1$
does nothing.

**Reducing to echelon form and stopping.** Echelon form gives you the rank.
Reading off the null space cleanly needs *reduced* row echelon form — the pivot
columns must be clear above as well as below.

**Substituting the answer back into the reduced matrix.** It will always work,
because you built the reduced matrix from your own arithmetic; an error earlier
in the reduction gets confirmed rather than caught. Check against the original.

**Assuming rank equals the number of rows.** For a parity-check matrix it very
often does not, and the whole point of reducing is to find out.
