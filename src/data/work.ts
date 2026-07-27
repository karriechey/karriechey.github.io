/**
 * The four projects listed on /work.
 *
 * Created:      2026-07-26
 * Last updated: 2026-07-26
 *
 * PLACEHOLDER COPY — Claude wrote this from a one-line brief per project. The
 * owner should correct every `problem` sentence and every link; the dates,
 * venues and outcomes are invented scaffolding, not facts.
 *
 * House rule for the copy: the PROBLEM leads, not the technology.
 * Write "reading handwriting nobody has been able to read since the 1960s",
 * not "semi-supervised learning pipeline". The technology can appear in the
 * `stack` line, where a reader who cares can find it.
 *
 * One project — the QEC decoder — has its own page. The other three are cards.
 * That asymmetry is deliberate and reflects where the time actually went. Do
 * not pad the other three to match it.
 */

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkProject {
  /** Short title. Sentence case. */
  title: string;
  /** Where and when. One line, shown in mono above the title. */
  context: string;
  /** ONE plain-language sentence about what the problem actually was. */
  problem: string;
  /** Tools and methods, for the reader who wants them. Kept out of `problem`. */
  stack: string;
  /** Figure shown beside the entry. Path under /public. */
  image: string;
  /** Alt text for that figure. Must describe the image, not repeat the title. */
  imageAlt: string;
  /** Intrinsic pixel dimensions of the image file. */
  width: number;
  height: number;
  /** Repo, slides, paper — whatever exists. Omit rather than link to nothing. */
  links: WorkLink[];
  /** Set for the one project that has its own page. */
  href?: string;
}

export const PROJECTS: WorkProject[] = [
  {
    title: 'A neural-network decoder for surface-code error correction',
    context: 'National laboratory quantum computing fellowship · 2025–2026',
    problem:
      'A quantum computer can tell you that something has gone wrong without ever telling you what went wrong — the measurement that detects an error is deliberately designed not to reveal it — so the machine has to guess the damage from its shadow, fast enough to keep up with itself.',
    stack:
      'Recurrent and convolutional decoders in TensorFlow/Keras, quantization-aware training, Stim for circuit-level noise simulation, benchmarked against minimum-weight perfect matching.',
    image: '/work/qec-decoder.svg',
    imageAlt:
      'PLACEHOLDER — a surface code lattice with a chain of errors and the two stabilizer checks that fire at its endpoints.',
    width: 800,
    height: 500,
    href: '/work/qec-decoder',
    links: [
      { label: 'Read the full write-up', href: '/work/qec-decoder' },
      { label: 'Code', href: 'https://github.com/karriechey/FNAL-QCDecoding-FPGA' },
      // Served from public/. Compressed from the 17 MB original — see README.
      { label: 'Slides', href: '/karrie-oqi-symposium-slides.pdf' },
    ],
  },
  {
    title: 'Digitizing sixty years of handwritten meteorite notebooks',
    context: 'Planetary science laboratory · 2024',
    problem:
      'Decades of meteorite curation records exist only as handwriting in bound notebooks, in a mix of hands and abbreviations that off-the-shelf transcription models get badly wrong — which means a catalogue that researchers cannot search is, in practice, a catalogue nobody reads.',
    stack:
      'Handwritten text recognition fine-tuned on a small hand-labelled set, page segmentation, and a review interface for the transcriptions the model was least sure about.',
    image: '/work/meteorite-notebooks.svg',
    imageAlt:
      'PLACEHOLDER — a scanned notebook page beside its machine transcription, with uncertain words highlighted.',
    width: 800,
    height: 500,
    links: [{ label: 'Code', href: 'https://github.com/karriechey/JohnWassonNotebook' }],
  },
  {
    title: 'Telling one kind of quantum noise from another',
    context: 'Independent project · 2025',
    problem:
      'Two quantum devices can fail at the same rate for completely different reasons, and the fix for one makes the other worse — so before you can improve a device you have to work out which failure mode you are actually looking at.',
    stack:
      'Simulated noise channels, feature extraction from measurement statistics, and a classifier evaluated on how well it generalizes to noise strengths it was never trained on.',
    image: '/work/noise-classification.svg',
    imageAlt:
      'PLACEHOLDER — measurement distributions for several noise channels, shown as overlaid histograms.',
    width: 800,
    height: 500,
    links: [{ label: 'Code', href: 'https://github.com/karriechey' }],
  },
  {
    title: 'Predicting an ADHD diagnosis from resting-state brain scans',
    context: 'Datathon · 2024',
    problem:
      'A brain scan has vastly more measurements than there are people in the study, so a model can score well on the data it was given and mean nothing at all — the hard part was not building a classifier but establishing whether to believe one.',
    stack:
      'Functional connectivity features from resting-state fMRI, aggressive dimensionality reduction, and nested cross-validation with a held-out site to check the result was not just site effects.',
    image: '/work/fmri-adhd.svg',
    imageAlt:
      'PLACEHOLDER — a functional connectivity matrix beside a cross-validation score distribution.',
    width: 800,
    height: 500,
    links: [{ label: 'Slides', href: 'https://github.com/karriechey' }],
  },
];
