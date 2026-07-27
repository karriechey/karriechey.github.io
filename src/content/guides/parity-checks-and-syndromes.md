---
title: Parity checks, syndromes, and why a syndrome never tells you the error
summary: What a stabilizer measurement actually returns, why several different errors always share one syndrome, and what a decoder is therefore choosing between.
date: 2026-06-14
tags: [quantum error correction, linear algebra]
draft: false
---

<!--
  PLACEHOLDER CONTENT — written by Claude as a structural example.
  The mathematics here has been checked and is correct, but the voice is not
  Karrie's and the framing is generic. Replace or rewrite before this goes out
  to anyone. See CONTENT-NOTES.md for the pre-publication checklist.
-->

A parity check does not measure a bit. It measures a *relationship between*
bits, and it returns one classical bit saying whether that relationship holds.
Everything that makes decoding hard follows from the gap between those two
sentences.

## The object being measured

Take a classical code first, because the quantum case adds nothing conceptually
until the very end.

A parity check on a set of bits $S$ returns

$$
s = \bigoplus_{i \in S} e_i
$$

where $e_i$ is $1$ if bit $i$ has flipped and $0$ otherwise, and $\oplus$ is
addition modulo 2. The check fires — returns $1$ — when an **odd** number of the
bits it touches have flipped. Two flips inside one check cancel and the check
stays silent.

Collect every check into a matrix $H$, one row per check, one column per bit.
For the three-bit repetition code with checks on $\{1,2\}$ and $\{2,3\}$:

```
      bit:  1  2  3
   check 1 [ 1  1  0 ]
   check 2 [ 0  1  1 ]
```

The full syndrome of an error pattern $e$ is then a matrix–vector product over
$\mathbb{F}_2$:

$$
s = H e^{\mathsf{T}} \pmod 2
$$

### Worked example: every error of the three-bit code

There are $2^3 = 8$ possible error patterns and only $2^2 = 4$ possible
syndromes, so some collisions are guaranteed before any calculation. Here is
every case:

| Error $e$ | Check 1 ($e_1 \oplus e_2$) | Check 2 ($e_2 \oplus e_3$) | Syndrome |
|---|---|---|---|
| 000 | 0 | 0 | 00 |
| 100 | 1 | 0 | 10 |
| 010 | 1 | 1 | 11 |
| 001 | 0 | 1 | 01 |
| 110 | 0 | 1 | 01 |
| 101 | 1 | 1 | 11 |
| 011 | 1 | 0 | 10 |
| 111 | 0 | 0 | 00 |

Read it the other way round and the structure is obvious:

| Syndrome | Errors that produce it |
|---|---|
| 00 | 000, 111 |
| 10 | 100, 011 |
| 11 | 010, 101 |
| 01 | 001, 110 |

Every syndrome has exactly two preimages, and in every row the two errors differ
by $111$ — the codeword. That is not a coincidence about this code.

## Why the collisions are structural

If $He^{\mathsf{T}} = s$ and $c$ is any codeword, then by definition
$Hc^{\mathsf{T}} = 0$, so

$$
H(e + c)^{\mathsf{T}} = He^{\mathsf{T}} + Hc^{\mathsf{T}} = s + 0 = s .
$$

So $e$ and $e + c$ are indistinguishable to every check simultaneously. The set
of errors consistent with an observed syndrome is a **coset** $e + \mathcal{C}$
of the code, and it always has exactly $|\mathcal{C}|$ members. Adding more
checks shrinks the code and therefore shrinks the coset, but it never reduces it
to one element while the code still encodes anything.

This is the whole problem, stated once:

> The syndrome identifies a coset. The decoder has to pick a representative.

## The quantum case

Two things change, and neither of them removes the coset ambiguity.

### Two kinds of check

A stabilizer measurement is still a parity check, but there are now two
independent flavours, because there are two independent kinds of single-qubit
error.

| Check measures | Detects | Blind to |
|---|---|---|
| $ZZZZ$ | $X$ and $Y$ | $Z$ |
| $XXXX$ | $Z$ and $Y$ | $X$ |

The rule underneath the table is anticommutation: a check fires on exactly those
errors that fail to commute with it. $Z$ anticommutes with $X$, and $Y$ contains
an $X$ factor, so a $Z$-type check sees both. It commutes with $Z$, so a $Z$
error is invisible to it — and would be invisible to every $Z$-type check in the
lattice, which is why both flavours must be measured.

A $Y$ error is seen by *both* kinds of check at once. That is the only local
signature distinguishing $Y$ from $X$ and $Z$.

### Errors come in chains

On a surface code the qubits sit on a lattice and each check touches only its
four neighbours. Consider a run of $X$ errors along a line of qubits. Every
$Z$-check strictly *inside* that run touches two errored qubits, so its parity is
even and it stays silent. Only the checks at the two ends touch exactly one.

So a chain of length one and a chain of length nine can produce syndromes of the
same size — two fired checks — and the syndrome reports only where the chain
*ended*, never which path it took between those endpoints.

## What the decoder is actually doing

Given the fired checks, the decoder proposes a correction. It cannot be right in
the sense of recovering the physical error that occurred, because that
information was never measured. It only has to be right modulo the code: the
proposed correction combined with the true error must be a stabilizer, not a
logical operator.

That reframes the job as a most-likely-coset problem, and under an independent
noise model with per-qubit error probability $p < 1/2$, the probability of a
particular chain falls off with its length. Minimum-weight matching — pair up the
fired checks so the total chain length is smallest — is the standard answer, and
it is a good one. It is also not optimal, because it picks the single most likely
*chain* rather than the most likely *coset*, and a coset containing many
medium-length chains can outweigh one containing a single short one.

That last gap is where a learned decoder has room to be better.

## Common mistakes

**Reading a silent check as "no error here."** A silent check means *even*
parity. Zero errors and two errors look identical to it.

**Assuming the number of fired checks tells you the number of errors.** It tells
you the number of chain endpoints. Nine errors in a line fire two checks.

**Expecting a decoder to identify the error.** It identifies a coset
representative. Success is measured by whether the logical state survives, not by
whether the guessed error matches the real one.

**Forgetting the checks are noisy too.** Everything above assumes the syndrome
itself is measured perfectly. It is not, which is why real decoding runs over
several rounds of measurement and treats a check that fires in one round and not
the next as evidence about the measurement rather than the data.

## Reference

| Symbol | Meaning |
|---|---|
| $e$ | Error pattern, one entry per qubit |
| $H$ | Parity-check matrix, one row per check |
| $s = He^{\mathsf{T}}$ | Syndrome, one bit per check |
| $\mathcal{C}$ | Code space, $\{c : Hc^{\mathsf{T}} = 0\}$ |
| $e + \mathcal{C}$ | The coset of errors consistent with $s$ |
| $d$ | Code distance — the shortest error that goes undetected *and* changes the logical state |
