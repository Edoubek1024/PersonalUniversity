/**
 * Shared step-through pattern for the data-structures-and-algorithms visualisers.
 *
 * An algorithm is run up front and records a list of snapshots, each with a one-line description.
 * The UI then only moves an index through that list:
 *
 *   const steps = useMemo(() => runInsertionSort(values), [values]);
 *   const st = useStepper(steps.length, steps);          // resets when `steps` changes
 *   const snap = steps[st.i];
 *   ...draw snap...
 *   <StepControls st={st} desc={snap.d} />
 *
 * Also here: a seeded random generator, a comma-separated list input with presets, and the
 * shared mark colours (compared, swapped, settled, pivot...) with glyphs so state never relies on
 * colour alone.
 */
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { useAnimation } from './hooks';
import { Button, Controls, Slider } from './controls';

/* ------------------------------------------------------------------ random */

/** Small fast seeded PRNG (mulberry32); returns floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export const randInt = (rng: () => number, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));

export type Preset = 'random' | 'sorted' | 'nearly' | 'reversed' | 'dups';

export const PRESET_LABEL: Record<Preset, string> = {
  random: 'Random',
  sorted: 'Sorted',
  nearly: 'Nearly sorted',
  reversed: 'Reversed',
  dups: 'Many duplicates',
};

/** An input array of length n with values in [lo, hi], shaped by the preset. */
export function genArray(kind: Preset, n: number, seed: number, lo = 1, hi = 99): number[] {
  const rng = mulberry32(seed * 7919 + 17);
  if (kind === 'dups') {
    const pool = Array.from({ length: 3 }, () => randInt(rng, lo, hi));
    return Array.from({ length: n }, () => pool[randInt(rng, 0, pool.length - 1)]);
  }
  const a = Array.from({ length: n }, () => randInt(rng, lo, hi));
  if (kind === 'random') return a;
  a.sort((x, y) => x - y);
  if (kind === 'reversed') return a.reverse();
  if (kind === 'nearly' && n >= 2) {
    const swaps = Math.max(1, Math.round(n / 8));
    for (let s = 0; s < swaps; s++) {
      const i = randInt(rng, 0, n - 2);
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
    }
  }
  return a;
}

/** Parses "3, 1, 4" into numbers; returns an error message instead when it cannot. */
export function parseNumList(text: string, opts: { min?: number; max?: number; maxLen?: number; minLen?: number; integer?: boolean } = {}): number[] | string {
  const parts = text.split(/[\s,;]+/).filter((s) => s.length > 0);
  const { min = -Infinity, max = Infinity, maxLen = 40, minLen = 1, integer = true } = opts;
  if (parts.length < minLen) return `enter at least ${minLen} number${minLen === 1 ? '' : 's'}`;
  if (parts.length > maxLen) return `at most ${maxLen} numbers, please`;
  const out: number[] = [];
  for (const p of parts) {
    const v = Number(p);
    if (!Number.isFinite(v)) return `"${p}" is not a number`;
    if (integer && !Number.isInteger(v)) return `"${p}" is not a whole number`;
    if (v < min || v > max) return `values must be between ${min} and ${max}`;
    out.push(v);
  }
  return out;
}

/* ------------------------------------------------------------------ stepper */

export interface Stepper {
  /** Current step index, always within [0, count - 1]. */
  i: number;
  count: number;
  playing: boolean;
  speed: number;
  setI: (i: number) => void;
  setSpeed: (s: number) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  /** Go to step 0 and optionally start playing (used after a user-triggered operation). */
  restart: (play: boolean) => void;
  /** Jump to the last step. */
  end: () => void;
}

/**
 * Index into a list of `count` precomputed steps. Whenever `resetKey` changes (new input, new
 * algorithm) the index goes back to 0 and playback stops, unless `restart(true)` was called in
 * the same update.
 */
export function useStepper(count: number, resetKey?: unknown, initialSpeed = 3): Stepper {
  const [raw, setRaw] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const acc = useRef(0);
  const auto = useRef<boolean | null>(null);
  const first = useRef(true);
  const i = Math.max(0, Math.min(raw, count - 1));
  const iRef = useRef(i);
  iRef.current = i;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (auto.current === null) return;
    }
    setRaw(0);
    acc.current = 0;
    setPlaying(auto.current ?? false);
    auto.current = null;
  }, [resetKey]);

  useAnimation(playing, (dt) => {
    acc.current += dt * speed;
    if (acc.current < 1) return;
    const k = Math.floor(acc.current);
    acc.current -= k;
    const nx = Math.min(count - 1, iRef.current + k);
    iRef.current = nx;
    setRaw(nx);
    if (nx >= count - 1) setPlaying(false);
  });

  return {
    i,
    count,
    playing,
    speed,
    setI: (v) => {
      setPlaying(false);
      setRaw(Math.max(0, Math.min(count - 1, Math.round(v))));
    },
    setSpeed,
    play: () => {
      if (i >= count - 1) setRaw(0);
      acc.current = 0;
      setPlaying(count > 1);
    },
    pause: () => setPlaying(false),
    next: () => {
      setPlaying(false);
      setRaw(Math.min(count - 1, i + 1));
    },
    prev: () => {
      setPlaying(false);
      setRaw(Math.max(0, i - 1));
    },
    reset: () => {
      setPlaying(false);
      setRaw(0);
    },
    restart: (p) => {
      auto.current = p;
      setRaw(0);
      acc.current = 0;
      setPlaying(p);
    },
    end: () => {
      setPlaying(false);
      setRaw(count - 1);
    },
  };
}

/** Prev / Play / Next / Reset, a step slider, a speed slider and the step description. */
export function StepControls({ st, desc, extra }: { st: Stepper; desc: ReactNode; extra?: ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div aria-live="polite" className="min-h-[2.75rem] rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px] leading-5 text-ink">
        {desc}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button onClick={st.reset} title="Back to the first step">
          <span className="inline-flex items-center gap-1">
            <RotateCcw size={13} aria-hidden /> Reset
          </span>
        </Button>
        <Button onClick={st.prev} disabled={st.i === 0} title="Previous step">
          <span className="inline-flex items-center gap-0.5">
            <ChevronLeft size={14} aria-hidden /> Prev
          </span>
        </Button>
        {st.playing ? (
          <Button onClick={st.pause} primary title="Pause">
            <span className="inline-flex items-center gap-1">
              <Pause size={13} aria-hidden /> Pause
            </span>
          </Button>
        ) : (
          <Button onClick={st.play} primary disabled={st.count <= 1} title="Play the steps">
            <span className="inline-flex items-center gap-1">
              <Play size={13} aria-hidden /> Play
            </span>
          </Button>
        )}
        <Button onClick={st.next} disabled={st.i >= st.count - 1} title="Next step">
          <span className="inline-flex items-center gap-0.5">
            Next <ChevronRight size={14} aria-hidden />
          </span>
        </Button>
        {extra}
      </div>
      <Controls>
        <Slider label="Step" value={st.i} min={0} max={Math.max(1, st.count - 1)} step={1} onChange={st.setI} format={(v) => `${v} / ${Math.max(0, st.count - 1)}`} disabled={st.count <= 1} />
        <Slider label="Speed" value={st.speed} min={1} max={20} step={1} onChange={st.setSpeed} format={(v) => `${v} steps/s`} />
      </Controls>
    </div>
  );
}

/* ------------------------------------------------------------------ list input */

/**
 * A comma-separated list of numbers with Random (seeded) and preset buttons. Calls onChange only
 * with valid lists; shows the parse error otherwise.
 */
export function ListInput({
  label,
  values,
  onChange,
  presets = [],
  min = 1,
  max = 99,
  maxLen = 32,
  minLen = 1,
  size,
  sortedOnly = false,
}: {
  label: ReactNode;
  values: number[];
  onChange: (v: number[]) => void;
  presets?: Preset[];
  min?: number;
  max?: number;
  maxLen?: number;
  minLen?: number;
  /** Length of generated arrays; defaults to the current length (at least 8). */
  size?: number;
  /** Generated arrays are sorted (for binary search). */
  sortedOnly?: boolean;
}) {
  const id = useId();
  const joined = values.join(', ');
  const [draft, setDraft] = useState(joined);
  const [error, setError] = useState<string | null>(null);
  const [seed, setSeed] = useState(1);
  useEffect(() => {
    setDraft(joined);
    setError(null);
  }, [joined]);

  const commit = (text: string) => {
    const r = parseNumList(text, { min, max, maxLen, minLen });
    if (typeof r === 'string') setError(r);
    else {
      setError(null);
      onChange(r);
    }
  };
  const gen = (kind: Preset) => {
    const s = seed + 1;
    setSeed(s);
    const n = size ?? Math.max(8, Math.min(maxLen, values.length));
    let a = genArray(kind, n, s, min, max);
    if (sortedOnly) a = a.sort((x, y) => x - y);
    onChange(a);
  };
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] text-ink-2">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-1.5">
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit(draft);
          }}
          spellCheck={false}
          autoComplete="off"
          inputMode="text"
          aria-invalid={!!error}
          className="input min-w-0 flex-1 basis-56 font-mono text-[13px]"
        />
        <Button onClick={() => commit(draft)} title="Use this list">
          Apply
        </Button>
      </div>
      {error && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{error}</div>}
      {presets.length > 0 && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {presets.map((p) => (
            <Button key={p} onClick={() => gen(p)} title={`Generate a ${PRESET_LABEL[p].toLowerCase()} input (seeded)`}>
              {PRESET_LABEL[p]}
            </Button>
          ))}
          <span className="font-mono text-[11px] text-ink-3">seed {seed}</span>
        </div>
      )}
    </div>
  );
}

/** A labelled single-line text or number field (for keys, targets, strings). */
export function Field({ label, value, onChange, onEnter, width = 'w-24', mono = true, type = 'text', placeholder }: { label: ReactNode; value: string; onChange: (v: string) => void; onEnter?: () => void; width?: string; mono?: boolean; type?: 'text' | 'number'; placeholder?: string }) {
  const id = useId();
  return (
    <div className="inline-flex items-center gap-1.5">
      <label htmlFor={id} className="text-[13px] text-ink-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) onEnter();
        }}
        spellCheck={false}
        autoComplete="off"
        className={`input ${width} ${mono ? 'font-mono' : ''} py-1 text-[13px]`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ marks */

export type MarkKind = 'compare' | 'swap' | 'sorted' | 'pivot' | 'active' | 'found' | 'path' | 'tomb';

/** Colour plus a glyph, so a state is readable without colour. */
export const MARK: Record<MarkKind, { color: string; glyph: string; label: string }> = {
  compare: { color: 'var(--plot-4)', glyph: '?', label: 'compared' },
  swap: { color: 'var(--plot-2)', glyph: '⇄', label: 'swapped / moved' },
  sorted: { color: 'var(--plot-3)', glyph: '✓', label: 'sorted / settled' },
  pivot: { color: 'var(--plot-6)', glyph: 'P', label: 'pivot' },
  active: { color: 'var(--plot-1)', glyph: '●', label: 'current' },
  found: { color: 'var(--plot-3)', glyph: '★', label: 'found' },
  path: { color: 'var(--plot-5)', glyph: '·', label: 'on the path' },
  tomb: { color: 'var(--color-ink-3)', glyph: '⊠', label: 'tombstone' },
};

export const NEUTRAL = 'var(--color-ink-3)';

/** A row of swatches explaining the marks a widget uses. */
export function Legend({ items }: { items: { kind?: MarkKind; color?: string; glyph?: string; label: string; dashed?: boolean }[] }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-ink-2">
      {items.map((it, k) => {
        const m = it.kind ? MARK[it.kind] : undefined;
        const color = it.color ?? m?.color ?? NEUTRAL;
        const glyph = it.glyph ?? m?.glyph ?? '';
        return (
          <span key={k} className="inline-flex items-center gap-1">
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] text-[10px] font-bold leading-none"
              style={{ background: it.dashed ? 'transparent' : color, border: it.dashed ? `1.5px dashed ${color}` : undefined, color: 'var(--color-surface)' }}
              aria-hidden
            >
              {it.dashed ? '' : glyph}
            </span>
            <span>{it.label}</span>
          </span>
        );
      })}
    </div>
  );
}

/** Formats a counter against a reference, e.g. "12 (n log₂ n ≈ 24)". */
export const log2 = (x: number) => Math.log(x) / Math.LN2;
