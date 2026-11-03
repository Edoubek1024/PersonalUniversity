/**
 * kmp: Knuth-Morris-Pratt step by step. Phase 1 computes the failure (prefix) function π, with
 * the current border P[0..k) and the matching suffix bracketed; phase 2 scans the text, sliding
 * the pattern by the border on a mismatch and never moving backwards in the text. Character
 * comparisons are counted against the n + m bound.
 *
 * Params:
 *   pattern  string  up to 16 characters      default "ababaca"
 *   text     string  up to 32 characters      default "bacbababaabcbab"
 *   title    string                           default "Knuth-Morris-Pratt"
 *   caption  string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { str } from '../kit/params';
import { Frame, Readout } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { Field, Legend, MARK, StepControls, useStepper } from '../kit/dsa-steps';

interface KSnap {
  pi: (number | null)[];
  phase: 'pi' | 'search';
  /** pi phase: i, k. search phase: j (text index), q (matched length). */
  i: number;
  k: number;
  eq: boolean | null;
  matches: number[];
  cmp: number;
  d: string;
}

function run(P: string, T: string): KSnap[] {
  const m = P.length;
  const pi: (number | null)[] = Array(m).fill(null);
  const out: KSnap[] = [];
  let cmp = 0;
  const snap = (phase: KSnap['phase'], i: number, k: number, eq: boolean | null, d: string, matches: number[] = []) => out.push({ pi: pi.slice(), phase, i, k, eq, matches: matches.slice(), cmp, d });
  pi[0] = 0;
  snap('pi', 0, 0, null, `π[0] = 0: a single character has no proper border. Now compute π[i] for i = 1..${m - 1}, with k = length of the current border.`);
  let k = 0;
  for (let i = 1; i < m; i++) {
    for (;;) {
      cmp++;
      const eq = P[i] === P[k];
      if (eq) {
        snap('pi', i, k, true, `Compare P[${i}] = ${P[i]} with P[${k}] = ${P[k]}: equal, so the border grows to length ${k + 1}.`);
        k++;
        break;
      }
      if (k === 0) {
        snap('pi', i, k, false, `Compare P[${i}] = ${P[i]} with P[0] = ${P[0]}: different, and k is already 0, so no border.`);
        break;
      }
      snap('pi', i, k, false, `Compare P[${i}] = ${P[i]} with P[${k}] = ${P[k]}: different. Fall back to the next shorter border: k = π[${k - 1}] = ${pi[k - 1]}.`);
      k = pi[k - 1] as number;
    }
    pi[i] = k;
    snap('pi', i, k, null, `π[${i}] = ${k}: the longest proper prefix of P[0..${i}] that is also a suffix has length ${k}${k ? ` (“${P.slice(0, k)}”)` : ''}.`);
  }
  if (!T) return out;
  let q = 0;
  const matches: number[] = [];
  snap('search', 0, 0, null, `Search “${T}”. j walks the text once; q is how many pattern characters currently match.`, matches);
  for (let j = 0; j < T.length; j++) {
    for (;;) {
      cmp++;
      const eq = T[j] === P[q];
      if (eq) {
        snap('search', j, q, true, `T[${j}] = ${T[j]} equals P[${q}]: q becomes ${q + 1}.`, matches);
        q++;
        break;
      }
      if (q === 0) {
        snap('search', j, q, false, `T[${j}] = ${T[j]} ≠ P[0]: move on to the next text character.`, matches);
        break;
      }
      snap('search', j, q, false, `T[${j}] = ${T[j]} ≠ P[${q}] = ${P[q]}: keep the border of the ${q} matched characters, q = π[${q - 1}] = ${pi[q - 1]}. The text pointer does not move back.`, matches);
      q = pi[q - 1] as number;
    }
    if (q === m) {
      matches.push(j - m + 1);
      snap('search', j, q, true, `All ${m} characters match: an occurrence at shift ${j - m + 1}. Continue from the border, q = π[${m - 1}] = ${pi[m - 1]}.`, matches);
      q = pi[m - 1] as number;
    }
  }
  snap('search', T.length - 1, q, null, `Done: ${matches.length} occurrence${matches.length === 1 ? '' : 's'}${matches.length ? ` at ${matches.join(', ')}` : ''}, ${cmp} character comparisons in all (n + m = ${T.length + m}; each comparison either advances j or shortens q, so the total is at most 2n + 2m).`, matches);
  return out;
}

function Row({ chars, x0, cw, y, hl, label, idx }: { chars: string[]; x0: number; cw: number; y: number; hl: Record<number, string>; label: string; idx?: boolean }) {
  return (
    <g>
      <text x={x0 - 6} y={y + cw * 0.62} textAnchor="end" fontSize={11} fill="var(--plot-text)">
        {label}
      </text>
      {chars.map((ch, i) => (
        <g key={i}>
          <rect x={x0 + i * cw + 1} y={y} width={cw - 2} height={cw - 2} rx={3} fill={hl[i] ?? 'var(--color-surface-2)'} stroke="var(--color-line)" />
          <text x={x0 + i * cw + cw / 2} y={y + cw * 0.62} textAnchor="middle" fontSize={Math.min(14, cw * 0.5)} fontWeight={hl[i] ? 700 : 500} fill={hl[i] ? 'var(--color-surface)' : 'var(--color-ink)'} fontFamily="ui-monospace, monospace">
            {ch}
          </text>
          {idx && (
            <text x={x0 + i * cw + cw / 2} y={y - 4} textAnchor="middle" fontSize={9} fill="var(--plot-text)">
              {i}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

function View({ P, T, s }: { P: string; T: string; s: KSnap }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = Math.max(240, size.width || 600);
  const x0 = 30;
  const cols = s.phase === 'search' ? T.length : P.length;
  const cw = Math.max(16, Math.min(36, (W - x0 - 6) / Math.max(cols, 1)));
  const eqColor = s.eq === null ? MARK.active.color : s.eq ? MARK.found.color : MARK.swap.color;
  if (s.phase === 'pi') {
    const H = 30 + cw * 2 + 50;
    const hlP: Record<number, string> = {};
    if (s.i > 0) {
      hlP[s.i] = eqColor;
      if (s.eq !== null) hlP[s.k] = eqColor;
    }
    const y1 = 16;
    const yPi = y1 + cw + 18;
    const k = s.eq === null ? (s.pi[s.i] ?? 0) : s.k;
    const br = (lo: number, hi: number, yy: number, label: string, color: string) =>
      hi > lo ? (
        <g>
          <path d={`M${x0 + lo * cw + 2},${yy} v5 H${x0 + hi * cw - 2} v-5`} fill="none" stroke={color} strokeWidth={1.75} />
          <text x={x0 + ((lo + hi) / 2) * cw} y={yy + 16} textAnchor="middle" fontSize={10} fill="var(--plot-text)">
            {label}
          </text>
        </g>
      ) : null;
    return (
      <div ref={ref} className="w-full overflow-x-auto">
        <svg width={Math.max(W, x0 + cols * cw + 6)} height={H + 20} role="img" aria-label="Failure function computation" className="block select-none rounded-lg bg-surface">
          <Row chars={P.split('')} x0={x0} cw={cw} y={y1} hl={hlP} label="P" idx />
          <Row chars={s.pi.map((v) => (v === null ? '' : String(v)))} x0={x0} cw={cw} y={yPi} hl={s.eq === null && s.i > 0 ? { [s.i]: 'var(--plot-6)' } : {}} label="π" />
          {k > 0 && br(0, k, yPi + cw + 4, 'border P[0..k)', 'var(--plot-1)')}
          {k > 0 && s.i > 0 && br(s.i - k + (s.eq === null ? 1 : 0), s.i + (s.eq === null ? 1 : 0), yPi + cw + 30, 'same as suffix', 'var(--plot-5)')}
        </svg>
      </div>
    );
  }
  const shift = s.i - s.k;
  const H = 30 + cw * 2 + 40;
  const hlT: Record<number, string> = {};
  for (const mt of s.matches) for (let t = mt; t < mt + P.length; t++) hlT[t] = 'var(--plot-6)';
  hlT[s.i] = eqColor;
  const hlP: Record<number, string> = {};
  for (let t = 0; t < s.k; t++) hlP[t] = 'var(--plot-1)';
  if (s.k < P.length) hlP[s.k] = eqColor;
  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg width={Math.max(W, x0 + cols * cw + 6)} height={H} role="img" aria-label="Pattern search" className="block select-none rounded-lg bg-surface">
        <Row chars={T.split('')} x0={x0} cw={cw} y={16} hl={hlT} label="T" idx />
        <Row chars={P.split('')} x0={x0 + shift * cw} cw={cw} y={16 + cw + 14} hl={hlP} label="" />
        <text x={x0 + s.i * cw + cw / 2} y={16 + 2 * cw + 30} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--color-accent)">
          ↑j
        </text>
      </svg>
    </div>
  );
}

export { run as kmpSteps };

export default function KMP({ params }: WidgetProps) {
  const p0 = str(params, 'pattern', 'ababaca');
  const t0 = str(params, 'text', 'bacbababaabcbab');
  if (!p0 || p0.length > 16) throw new Error('parameter "pattern" should have 1 to 16 characters');
  if (t0.length > 32) throw new Error('parameter "text" should have at most 32 characters');
  const title = str(params, 'title', 'Knuth-Morris-Pratt');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;
  const [P, setP] = useState(p0);
  const [T, setT] = useState(t0);
  const [pText, setPText] = useState(p0);
  const [tText, setTText] = useState(t0);
  const snaps = useMemo(() => run(P, T), [P, T]);
  const st = useStepper(snaps.length, snaps, 2);
  const s = snaps[st.i];
  const apply = () => {
    const p = pText.slice(0, 16);
    if (p) setP(p);
    setT(tText.slice(0, 32));
  };
  return (
    <Frame title={title} caption={caption}>
      <div className="text-[12.5px] text-ink-2">
        <span className="font-semibold text-ink">{s.phase === 'pi' ? 'Phase 1: failure function. ' : 'Phase 2: search. '}</span>
        {s.phase === 'pi' ? 'π[i] is the length of the longest proper prefix of P[0..i] that is also a suffix of it (a border).' : 'The pattern row is drawn at the current shift j − q; the q blue characters are known to match.'}
      </div>
      <View P={P} T={T} s={s} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Readout label="Comparisons" value={s.cmp} tone="var(--plot-4)" />
        <Readout label="n + m" value={T.length + P.length} />
        <Readout label="Matches" value={s.matches.length ? s.matches.join(', ') : '–'} tone={MARK.found.color} />
      </div>
      <Legend
        items={[
          { kind: 'found', glyph: '', label: 'characters equal' },
          { kind: 'swap', glyph: '', label: 'mismatch' },
          { color: 'var(--plot-1)', glyph: '', label: 'matched prefix / border' },
          { color: 'var(--plot-6)', glyph: '', label: 'π value just set / occurrence' },
        ]}
      />
      <StepControls st={st} desc={s.d} />
      <div className="flex flex-wrap items-center gap-2">
        <Field label="Pattern" value={pText} onChange={setPText} onEnter={apply} width="w-32" />
        <Field label="Text" value={tText} onChange={setTText} onEnter={apply} width="w-52" />
        <button type="button" className="btn-outline px-2.5 py-1.5 text-xs" onClick={apply}>
          Apply
        </button>
      </div>
    </Frame>
  );
}
