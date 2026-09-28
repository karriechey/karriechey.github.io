---
title: From surface-code circuit to decoder input
summary: How the qubits, gates, noise and readout of a d = 5 rotated surface code become the input tensors of four neural decoders (MLP, GRU, Mamba, RCNN).
date: 2026-09-28
tags: [quantum error correction, machine learning]
draft: false
---

Every number on this page is for one setting: a rotated surface code at
distance $d = 5$, run for $r = 5$ rounds of stabilizer measurement, with
physical error rate $p = 0.004$.

## Pipeline: qubits to prediction

<figure>
<div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
<svg role="img" aria-label="Pipeline: 49 physical qubits run a check circuit for 5 rounds while noise corrupts it; the measure qubits produce 120 raw bits, which become 120 detector events; a neural decoder turns them into the probability of a logical flip, trained against a label computed from the final data-qubit readout. Hardware, circuit and readout happen on the quantum chip; everything after is classical." viewBox="0 0 1120 470" xmlns="http://www.w3.org/2000/svg" style="display: block; width: 100%; min-width: 60rem; height: auto; color: var(--ink); background: var(--raised); border: 1px solid var(--rule); border-radius: 3px; font-family: var(--font-body);">
  <defs>
    <marker id="dp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>
    <marker id="dp-arrow-z" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--z-check)"/></marker>
    <marker id="dp-arrow-x" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--x-check)"/></marker>
  </defs>
  <!-- Region bands: quantum chip on the left, classical hardware on the right. -->
  <rect x="10" y="130" width="540" height="190" rx="6" fill="var(--paper)" stroke="var(--rule)"/>
  <rect x="570" y="130" width="540" height="190" rx="6" fill="var(--paper)" stroke="var(--rule)"/>
  <text x="24" y="143" font-size="10.5" letter-spacing="1.2" style="font-family: var(--font-mono);" fill="var(--ink-soft)">QUANTUM CHIP · simulated by Stim</text>
  <text x="584" y="143" font-size="10.5" letter-spacing="1.2" style="font-family: var(--font-mono);" fill="var(--ink-soft)">CLASSICAL · GPU / FPGA</text>
  <!-- Noise. -->
  <rect x="186" y="20" width="190" height="78" rx="6" fill="var(--z-wash)" stroke="var(--z-check)" stroke-width="1.2"/>
  <text x="281" y="44" text-anchor="middle" font-size="14" font-weight="600" fill="var(--z-check)">Noise, p = 0.004</text>
  <text x="281" y="63" text-anchor="middle" font-size="12" fill="currentColor">random X / Y / Z after gates,</text>
  <text x="281" y="79" text-anchor="middle" font-size="12" fill="currentColor">on idle qubits, readout flips</text>
  <line x1="281" y1="98" x2="281" y2="146" stroke="var(--z-check)" stroke-width="1.6" marker-end="url(#dp-arrow-z)"/>
  <text x="289" y="126" font-size="12" font-style="italic" fill="var(--z-check)">corrupts</text>
  <!-- Stage boxes. -->
  <g fill="var(--raised)" stroke="var(--rule)" stroke-width="1.2">
    <rect x="22" y="150" width="152" height="140" rx="6"/>
    <rect x="206" y="150" width="152" height="140" rx="6"/>
    <rect x="390" y="150" width="152" height="140" rx="6"/>
    <rect x="582" y="150" width="152" height="140" rx="6"/>
    <rect x="950" y="150" width="152" height="140" rx="6"/>
  </g>
  <rect x="766" y="150" width="152" height="140" rx="6" fill="var(--x-wash)" stroke="var(--x-check)" stroke-width="1.4"/>
  <g font-size="12" fill="currentColor">
    <text x="98" y="174" text-anchor="middle" font-size="14" font-weight="600">49 physical qubits</text>
    <text x="98" y="198" text-anchor="middle">25 data: hold the</text>
    <text x="98" y="214" text-anchor="middle">logical qubit</text>
    <text x="98" y="238" text-anchor="middle">24 measure: 12 X-type</text>
    <text x="98" y="254" text-anchor="middle">+ 12 Z-type checks</text>
    <text style="font-family: var(--font-mono);" x="98" y="278" text-anchor="middle" fill="var(--ink-soft)">2d² − 1</text>
    <text x="282" y="174" text-anchor="middle" font-size="14" font-weight="600">Check circuit</text>
    <text x="282" y="198" text-anchor="middle">per round:</text>
    <text style="font-family: var(--font-mono);" x="282" y="216" text-anchor="middle">H · 4×CNOT · H</text>
    <text style="font-family: var(--font-mono);" x="282" y="234" text-anchor="middle">measure + reset</text>
    <text x="282" y="258" text-anchor="middle">repeated r = 5 times</text>
    <text style="font-family: var(--font-mono);" x="282" y="278" text-anchor="middle" fill="var(--ink-soft)">80 CNOTs / round</text>
    <text x="466" y="174" text-anchor="middle" font-size="14" font-weight="600">Raw readout</text>
    <text x="466" y="198" text-anchor="middle">measure qubits,</text>
    <text x="466" y="214" text-anchor="middle">every round:</text>
    <text style="font-family: var(--font-mono);" x="466" y="236" text-anchor="middle" fill="var(--x-check)">m: 24 × 5 = 120</text>
    <text x="466" y="258" text-anchor="middle">data qubits, once</text>
    <text style="font-family: var(--font-mono);" x="466" y="276" text-anchor="middle">at the end: 25</text>
    <text x="658" y="174" text-anchor="middle" font-size="14" font-weight="600">Detector events</text>
    <text x="658" y="198" text-anchor="middle">"did this check</text>
    <text x="658" y="214" text-anchor="middle">change?" (XOR)</text>
    <text style="font-family: var(--font-mono);" x="658" y="236" text-anchor="middle" fill="var(--x-check)">e: 120 bits</text>
    <text style="font-family: var(--font-mono);" x="658" y="258" text-anchor="middle">12+24+24+24</text>
    <text style="font-family: var(--font-mono);" x="658" y="274" text-anchor="middle">+24+12</text>
    <text x="842" y="174" text-anchor="middle" font-size="14" font-weight="600" fill="var(--x-check)">Neural decoder</text>
    <text x="842" y="200" text-anchor="middle">MLP · GRU</text>
    <text x="842" y="218" text-anchor="middle">Mamba · RCNN</text>
    <text x="842" y="242" text-anchor="middle">same bits, arranged</text>
    <text x="842" y="258" text-anchor="middle">into different tensors</text>
    <text x="1026" y="174" text-anchor="middle" font-size="14" font-weight="600">P(logical flip)</text>
    <text style="font-family: var(--font-mono);" x="1026" y="200" text-anchor="middle">shape (N, 1)</text>
    <text x="1026" y="224" text-anchor="middle">if &gt; 0.5, apply</text>
    <text x="1026" y="240" text-anchor="middle">a logical correction</text>
  </g>
  <!-- Main flow arrows. -->
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    <line x1="174" y1="220" x2="202" y2="220" marker-end="url(#dp-arrow)"/>
    <line x1="358" y1="220" x2="386" y2="220" marker-end="url(#dp-arrow)"/>
    <line x1="542" y1="220" x2="578" y2="220" marker-end="url(#dp-arrow)"/>
    <line x1="734" y1="220" x2="762" y2="220" marker-end="url(#dp-arrow)"/>
    <line x1="918" y1="220" x2="946" y2="220" marker-end="url(#dp-arrow)"/>
  </g>
  <!-- The RCNN also takes the raw measurements m. -->
  <path d="M466 150 V116 H842 V146" fill="none" stroke="var(--x-check)" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#dp-arrow-x)"/>
  <text x="654" y="110" text-anchor="middle" font-size="12" fill="var(--x-check)">raw m too (RCNN only)</text>
  <!-- Label, and the MWPM baseline. -->
  <rect x="766" y="370" width="336" height="72" rx="6" fill="var(--z-wash)" stroke="var(--z-check)" stroke-width="1.2"/>
  <text x="934" y="394" text-anchor="middle" font-size="14" font-weight="600" fill="var(--z-check)">Label: 1 bit per shot</text>
  <text x="934" y="414" text-anchor="middle" font-size="12" fill="currentColor">did the logical observable flip?</text>
  <text x="934" y="431" text-anchor="middle" font-size="12" fill="currentColor">(parity of a line of 5 data qubits)</text>
  <path d="M500 290 V432 H762" fill="none" stroke="var(--z-check)" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#dp-arrow-z)"/>
  <text x="512" y="456" font-size="12" fill="var(--z-check)">final 25 data bits give the answer</text>
  <line x1="1026" y1="366" x2="1026" y2="294" stroke="var(--z-check)" stroke-width="1.4" marker-end="url(#dp-arrow-z)"/>
  <text x="1034" y="340" font-size="12" font-style="italic" fill="var(--z-check)">loss, p_L</text>
  <rect x="582" y="370" width="152" height="46" rx="6" fill="var(--raised)" stroke="var(--rule)" stroke-width="1.2"/>
  <text x="658" y="391" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">MWPM baseline</text>
  <text x="658" y="407" text-anchor="middle" font-size="11.5" fill="var(--ink-soft)">uses e only</text>
  <line x1="658" y1="290" x2="658" y2="366" stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 3" marker-end="url(#dp-arrow)"/>
</svg>
</div>
<figcaption>The chip outputs only bits. Model input: 120 detector events (RCNN also takes 120 raw measurements). Gates and noise are not inputs; only their effect on the check bits is. The label comes from the final data-qubit readout.</figcaption>
</figure>

## The Stim circuit, line by line

The circuit is a 153-line text program. Stim simulates it; one run is one shot.
Qubit lists are shortened below.

| Instruction | Meaning | Type |
|---|---|---|
| **Setup** | | |
| `QUBIT_COORDS(1, 1) 1` | Qubit 1 sits at grid position (1, 1). 49 lines like this. | qubits |
| `R 1 3 5 7 …` | Reset all 49 qubits to \|0⟩ | gate |
| `X_ERROR(0.004) …` | Each reset comes out wrong with probability 0.004 | noise |
| **One round** (first round, then `REPEAT 4 { … }`) | | |
| `DEPOLARIZE1(0.004) 1 3 5 …` | Idle error on the 25 data qubits | noise |
| `H 2 6 15 19 …` | Hadamard on the 12 X-type measure qubits | gate |
| `CX 2 3 24 25 46 47 …` | CNOT layer: pairs (control, target) = (2, 3), (24, 25), … Four layers, 80 CNOTs. | gate |
| `DEPOLARIZE2(0.004) …` | Random two-qubit Pauli error after each CNOT | noise |
| `H 2 6 15 19 …` | Hadamard back | gate |
| `MR 2 6 13 15 …` | Measure, then reset, the 24 measure qubits. 24 of the det_bits. | gate, gives det_bits |
| `DETECTOR(2, 2, 0) rec[-22] rec[-46]` | Detector event = XOR of this check now and one round earlier | det_evts |
| **End** | | |
| `M 1 3 5 7 …` | Measure the 25 data qubits once | gate |
| `DETECTOR(…) rec[…] …` | Last 12 detectors, built from the data readout | det_evts |
| `OBSERVABLE_INCLUDE(0) rec[-21] … rec[-25]` | Label: parity of 5 data qubits along one edge | label y |

Build the circuit:

```python
circuit = stim.Circuit.generated(
    "surface_code:rotated_memory_z",
    distance=5, rounds=5,
    after_clifford_depolarization=0.004,
    before_round_data_depolarization=0.004,
    before_measure_flip_probability=0.004,
    after_reset_flip_probability=0.004)
```

Sample shots:

```python
sampler = circuit.compile_detector_sampler()
det_evts, y = sampler.sample(
    shots=N, separate_observables=True)
# det_evts: (N, 120) bool   model input
# y:        (N, 1)   bool   label

raw = circuit.compile_sampler().sample(N)
# raw: (N, 145) = 24 × 5 + 25
# first 120 columns = det_bits (RCNN)
```

The file chain runs from a data-generation script (circuit to sampled arrays
saved as pools), to a training script (reshape, train), to an evaluation script
(model and MWPM on the same held-out shots; PyMatching builds its graph from the
same circuit). On real hardware, the same instruction list is compiled to
control pulses, and the chip returns the same kind of bit arrays. The noise
parameters shown are Stim's standard set.

## Quantities at d = 5, r = 5

| Thing | d=5, r=5 | Formula | What it is | In the ML input? |
|---|---|---|---|---|
| **Hardware** | | | | |
| Code distance d | 5 | $d$ | Fewest physical errors that cause an undetected logical error. Corrects up to 2. | no, sets the shapes |
| Data qubits | 25 | $d^2$ | Hold the encoded state. Measured once, at the end. | indirectly, via the last 12 detectors and the label |
| Measure qubits | 24 | $d^2 - 1$ | 12 X-type (catch phase flips) + 12 Z-type (catch bit flips). Measured every round. | yes, their readouts |
| Physical qubits total | 49 | $2d^2 - 1$ | All the hardware for one logical qubit (rotated layout). | no |
| Logical qubits | 1 | $k = 1$ | Spread across all 25 data qubits; no single qubit holds it. | its flip is the label |
| **Circuit** (gates act on the 49 qubits; they are not qubits) | | | | |
| Rounds r | 5 | $r = d$ | How many times the check circuit repeats. | no, sets the shapes |
| CNOTs per round | 80 | 4 layers | Each measure qubit to its 4 (or 2, on the boundary) data neighbours. | no |
| Hadamards per round | 24 | $2 \times 12$ | Before and after, on the 12 X-type measure qubits only. | no |
| Measure + reset per round | 24 | $d^2 - 1$ | Every measure qubit is read out, then reset for the next round. | no (their outputs are) |
| **Noise** | | | | |
| Physical error rate p | 0.004 | per op | Chance of a random X/Y/Z after each gate, on each idle data qubit per round, and of a flipped readout or reset. | no, fixed; what the model learns to undo |
| **Bits that come out** | | | | |
| Raw measurements m (`det_bits`) | 120 | $r(d^2 - 1)$ | 24 check results × 5 rounds. | yes, RCNN only |
| Detector events e (`det_evts`) | 120 | $r(d^2 - 1)$ | XOR of each check with its previous value. Layers of 12 + 24 + 24 + 24 + 24 + 12. | yes, all four models |
| Final data readout | 25 | $d^2$ | Measuring every data qubit at the end. | no, folded into the last layer and the label |
| Label | 1 bit | — | Did the logical observable flip? | target y |

## Decoder inputs and outputs

| Symbol | Meaning |
|---|---|
| $N$ | batch size (shots per batch) |
| $d$ | code distance (5) |
| $r$ | rounds of stabilizer measurement ($r = d = 5$) |
| $d^2 - 1$ | measure qubits, so bits per round (24) |
| $r(d^2 - 1)$ | detector events per shot ($5 \times 24 = 120$) |
| $r + 1$ | detector layers, the time steps (6) |
| 9, 40 | RCNN: $(d - k + 1)^2$ patches of size $k = 3$; $r(k^2 - 1)$ bits per patch |
| `(N, 1)` | one logit per shot; sigmoid gives P(flip) |

| Model | Input | Shape (general) | Shape at d=5 | Output | Params at d=5 |
|---|---|---|---|---|---|
| **MLP** | Detector events, flattened into one vector | `(N, r(d²−1))` | `(N, 120)` | `(N, 1)` logit | 69,389 |
| **GRU** | Detector events as a time sequence; half-empty first and last layers zero-padded | `(N, r+1, d²−1)` | `(N, 6, 24)` | `(N, 1)` logit | 69,441 |
| **Mamba** | Same sequence as the GRU | `(N, r+1, d²−1)` | `(N, 6, 24)` | `(N, 1)` logit | 79,001 at d=7 |
| **RCNN** | Raw measurements + detector events, regrouped into 9 overlapping 3×3 patches. RCNN architecture by Ulaşcan Sarıca. | `2 × (N, r(d²−1))` → `2 × (N, 9, 40)` | `2 × (N, 120)` | `(N, 1)` logit | 69,485 |

At d=7 the sequence shape is `(N, 8, 48)` and the flat shape is `(N, 336)`; at
d=9 they are `(N, 10, 80)` and `(N, 720)`. The logit goes through a sigmoid to
give P(flip), trained with binary cross-entropy.

## Common questions

**Are the gates part of the 49 qubits?** No. Gates are operations, like
instructions in a program. The 49 qubits are the hardware, and the control
electronics apply H, CNOT, measure and reset to them each round.

**Does the model see the data qubits?** Almost never directly. Measuring them
would destroy the logical qubit, so only the measure qubits are read each round.
The data qubits are read once at the end, and that readout becomes the last 12
detectors and the label.

**Why 120 bits when there are 24 measure qubits?** 24 checks × 5 rounds = 120.
Detector events are also 120: one layer of 12 at the start, four full layers of
24, and a final 12 rebuilt from the data readout.

**Where does noise show up in the data?** An error flips one or more checks, so
nearby detector events light up in space and time. A readout error is a check
that flips for one round and flips back. The model learns these patterns, not
the noise itself.

Counts checked against Stim's `surface_code:rotated_memory_z` circuit at d=5,
r=5. Parameter counts reproduce the reported values from layer arithmetic.
