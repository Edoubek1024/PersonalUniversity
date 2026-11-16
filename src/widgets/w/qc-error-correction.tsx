/**
 * qc-error-correction: the 3-qubit bit-flip and phase-flip codes and Shor's 9-qubit code, run as
 * a Pauli-frame (stabiliser) simulation. Qubits are numbered 1..n as in Nielsen and Chuang.
 *   single  inject X, Y or Z errors on chosen qubits (or at random with probability p), see the
 *           encoded state change (3-qubit codes: the full state; Shor code: the three blocks of
 *           the |0_L> or |1_L> component), the stabiliser measurements (+1 / -1), the correction
 *           a minimum-weight decoder picks from the syndrome, and the verdict: corrected,
 *           harmless (the error is a stabiliser), or a logical X_L / Z_L error, detected and
 *           miscorrected or never detected.
 *   rate    exact logical failure probability against the physical error rate p, from all 4^n
 *           error patterns, for X-only, Z-only or depolarising noise (X, Y, Z each with p/3),
 *           with the unencoded qubit (error probability p) for comparison, the break-even
 *           point, failing patterns by weight, and Monte Carlo trials.
 * Logical operators: bit-flip X_L = X1X2X3, Z_L = Z1; phase-flip X_L = Z1Z2Z3, Z_L = X1;
 * Shor X_L = Z1Z4Z7 (equivalent to Z on all nine), Z_L = X1X2X3 (equivalent to X on all nine).
 *
 * Params:
 *   code     "bit-flip" | "phase-flip" | "shor9"          initial code               default "bit-flip"
 *   codes    string[]   codes offered as buttons                                   default [code]
 *   mode     "single" | "rate"                            initial mode               default "single"
 *   modes    string[]   modes offered                                              default ["single", "rate"]
 *   model    "x" | "z" | "dep"   noise for random errors and the rate plot          default "x" ("z" for phase-flip)
 *   p        number     physical error probability, 0..0.5                          default 0.1
 *   logical  "0" | "1" | "+" | "-"   encoded logical state shown                    default "0"
 *   errors   string[]   initial errors, e.g. ["X2"] or ["X1", "Z5"]                 default []
 *   trials   number     Monte Carlo trials per press                                default 2000
 *   title    string                                                                 default "Quantum error correction"
 *   caption  string     may contain $TeX$
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str, strArray } from '../kit/params';
import { Dot, FnPath, Label, Plot, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { fmt } from '../kit/num';
import { caption } from '../kit/calc3-ui';
import {
  CODES,
  CODE_IDS,
  breakEven,
  decode,
  failuresByWeight,
  logicalErrorRate,
  mul,
  pauliText,
  randomError,
  type Code,
  type CodeId,
  type NoiseModel,
  type Pauli,
} from '../kit/qc-algo';

const MODES = ['single', 'rate'] as const;
type Mode = (typeof MODES)[number];
const MODELS: readonly NoiseModel[] = ['x', 'z', 'dep'];
const MODEL_LABEL: Record<NoiseModel, string> = { x: 'X only', z: 'Z only', dep: 'depolarising' };
const LOGICALS = ['0', '1', '+', '-'] as const;
type Logical = (typeof LOGICALS)[number];
const LOG_LABEL: Record<Logical, string> = { '0': '|0_L⟩', '1': '|1_L⟩', '+': '|+_L⟩', '-': '|−_L⟩' };
type P1 = 'I' | 'X' | 'Y' | 'Z';

function parseErrors(list: string[], n: number): Pauli {
  let x = 0;
  let z = 0;
  for (const s of list) {
    const m = s.trim().match(/^([XYZ])(\d)$/i);
    const q = m ? Number(m[2]) : NaN;
    if (!m || q < 1 || q > n) throw new Error(`parameter "errors": "${s}" should be X, Y or Z followed by a qubit 1..${n}, e.g. "X2"`);
    const k = m[1].toUpperCase();
    if (k !== 'Z') x ^= 1 << (q - 1);
    if (k !== 'X') z ^= 1 << (q - 1);
  }
  return { x, z };
}

const pauliAt = (e: Pauli, j: number): P1 => {
  const hx = (e.x >> j) & 1;
  const hz = (e.z >> j) & 1;
  return hx && hz ? 'Y' : hx ? 'X' : hz ? 'Z' : 'I';
};
const setAt = (e: Pauli, j: number, k: P1): Pauli => {
  const b = 1 << j;
  return { x: k === 'X' || k === 'Y' ? e.x | b : e.x & ~b, z: k === 'Z' || k === 'Y' ? e.z | b : e.z & ~b };
};

/* ---------- 3-qubit state vectors, for display ---------- */

type C = [number, number];

/** Encoded state of a 3-qubit code in its own letters (0/1 for bit-flip, +/− for phase-flip). */
function encoded(logical: Logical): C[] {
  const v: C[] = Array.from({ length: 8 }, () => [0, 0] as C);
  const h = Math.SQRT1_2;
  if (logical === '0') v[0] = [1, 0];
  else if (logical === '1') v[7] = [1, 0];
  else {
    v[0] = [h, 0];
    v[7] = [logical === '+' ? h : -h, 0];
  }
  return v;
}

/** Apply a Pauli (in the code's letters: for the phase-flip code X and Z swap roles). */
function applyPauli(v: C[], e: Pauli, swapXZ: boolean): C[] {
  const ex = swapXZ ? e.z : e.x;
  const ez = swapXZ ? e.x : e.z;
  const idx = (m: number) => ((m & 1) << 2) | (m & 2) | ((m >> 2) & 1); // qubit 1 is the leftmost letter
  const xi = idx(ex);
  const zi = idx(ez);
  const out: C[] = Array.from({ length: 8 }, () => [0, 0] as C);
  for (let b = 0; b < 8; b++) {
    let [re, im] = v[b];
    let pc = 0;
    let t = b & zi;
    while (t) {
      t &= t - 1;
      pc++;
    }
    if (pc & 1) [re, im] = [-re, -im];
    out[b ^ xi] = [re, im];
  }
  return out;
}

/** "|000⟩ − |111⟩" up to global phase and normalisation. */
function ketText(v: C[], letters: [string, string]): string {
  const terms = v.map((c, b) => ({ c, b })).filter(({ c }) => Math.hypot(c[0], c[1]) > 1e-9);
  if (!terms.length) return '0';
  const [r0, i0] = terms[0].c;
  const m0 = Math.hypot(r0, i0);
  const parts = terms.map(({ c, b }, k) => {
    // Divide by the phase of the first term.
    const re = (c[0] * r0 + c[1] * i0) / m0;
    const im = (c[1] * r0 - c[0] * i0) / m0;
    const sign = Math.abs(im) > Math.abs(re) ? (im > 0 ? '+i' : '−i') : re > 0 ? '+' : '−';
    const ket = `|${[2, 1, 0].map((s) => letters[(b >> s) & 1]).join('')}⟩`;
    if (k === 0) return ket;
    return sign === '+' ? ` + ${ket}` : sign === '−' ? ` − ${ket}` : ` ${sign.replace('+i', '+ i').replace('−i', '− i')}${ket}`;
  });
  const body = parts.join('');
  return terms.length === 2 ? `(${body})/√2` : body;
}

const sameUpToPhase = (a: C[], b: C[]) => {
  let ip: C = [0, 0];
  for (let k = 0; k < 8; k++) ip = [ip[0] + a[k][0] * b[k][0] + a[k][1] * b[k][1], ip[1] + a[k][0] * b[k][1] - a[k][1] * b[k][0]];
  return Math.hypot(ip[0], ip[1]) > 1 - 1e-9;
};

/** Shor code: the |0_L> or |1_L> component, block by block, with an error applied. */
function shorBlocks(e: Pauli, base: 1 | -1): string {
  const out: string[] = [];
  for (let blk = 0; blk < 3; blk++) {
    const bx = (e.x >> (3 * blk)) & 7;
    const bz = (e.z >> (3 * blk)) & 7;
    const par = (m: number) => {
      let c = 0;
      for (let t = m; t; t &= t - 1) c++;
      return c & 1 ? -1 : 1;
    };
    // Terms |000> and |111>, flipped by X, signed by Z (applied before X).
    const s1 = par(0 & bz);
    const s2 = base * par(7 & bz);
    const rel = s1 * s2;
    const bits = (m: number) => [0, 1, 2].map((q) => (m >> q) & 1).join('');
    out.push(`(|${bits(bx)}⟩ ${rel > 0 ? '+' : '−'} |${bits(bx ^ 7)}⟩)`);
  }
  return out.join('');
}

/** Text in which "_L" becomes a subscript L, as in |0_L⟩ or X_L. */
function L({ t }: { t: string }) {
  const parts = t.split('_L');
  return (
    <>
      {parts.map((x, i) => (
        <span key={i}>
          {x}
          {i < parts.length - 1 && <sub className="text-[0.75em]">L</sub>}
        </span>
      ))}
    </>
  );
}

function Chip({ value, label }: { value: 1 | -1; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[12px] ${value < 0 ? 'border-rose-500/50 bg-rose-500/10 text-rose-700 dark:text-rose-300' : 'border-line bg-surface-2 text-ink-2'}`}>
      {label} = {value > 0 ? '+1' : '−1'}
    </span>
  );
}

function Line({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-x-3 text-[13px] sm:grid-cols-[9.5rem_minmax(0,1fr)]">
      <div className="text-ink-3">{label}</div>
      <div className="min-w-0 font-mono [overflow-wrap:anywhere]">{children}</div>
    </div>
  );
}

export default function QcErrorCorrection({ params }: WidgetProps) {
  const code0 = oneOf(params, 'code', CODE_IDS, 'bit-flip');
  const codes = strArray(params, 'codes', [code0]);
  for (const c of codes) if (!CODE_IDS.includes(c as CodeId)) throw new Error(`parameter "codes": unknown code "${c}" (use ${CODE_IDS.join(', ')})`);
  if (!codes.includes(code0)) throw new Error('parameter "codes" should include the initial "code"');
  const mode0 = oneOf(params, 'mode', MODES, 'single');
  const modes = strArray(params, 'modes', ['single', 'rate']);
  for (const m of modes) if (!MODES.includes(m as Mode)) throw new Error(`parameter "modes": unknown mode "${m}" (use single, rate)`);
  if (!modes.includes(mode0)) throw new Error('parameter "modes" should include the initial "mode"');
  const model0 = oneOf(params, 'model', MODELS, code0 === 'phase-flip' ? 'z' : 'x');
  const p0 = num(params, 'p', 0.1);
  if (p0 < 0 || p0 > 0.5) throw new Error('parameter "p" should be between 0 and 0.5');
  const logical0 = oneOf(params, 'logical', LOGICALS, '0');
  const trials = num(params, 'trials', 2000);
  if (!Number.isInteger(trials) || trials < 1 || trials > 200000) throw new Error('parameter "trials" should be a whole number from 1 to 200000');
  const err0 = parseErrors(strArray(params, 'errors', []), CODES[code0].n);

  const [codeId, setCodeId] = useState<CodeId>(code0);
  const [mode, setMode] = useState<Mode>(mode0);
  const [model, setModel] = useState<NoiseModel>(model0);
  const [p, setP] = useState(p0);
  const [logical, setLogical] = useState<Logical>(logical0);
  const [err, setErr] = useState<Pauli>(err0);
  const [mc, setMc] = useState<{ fails: number; n: number; p: number; model: NoiseModel; code: CodeId } | null>(null);
  const code: Code = CODES[codeId];

  const changeCode = (c: CodeId) => {
    setCodeId(c);
    setErr({ x: 0, z: 0 });
    setMc(null);
  };

  const head = (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {codes.length > 1 && <Segmented label="Code" options={codes.map((c) => ({ value: c as CodeId, label: CODES[c as CodeId].name }))} value={codeId} onChange={changeCode} />}
      {modes.length > 1 && <Segmented label="View" options={modes.map((m) => ({ value: m as Mode, label: m === 'single' ? 'One error pattern' : 'Error rates' }))} value={mode} onChange={setMode} />}
      <Segmented label="Noise model" options={MODELS.map((m) => ({ value: m, label: MODEL_LABEL[m] }))} value={model} onChange={(m) => { setModel(m); setMc(null); }} />
    </div>
  );

  return (
    <Frame title={str(params, 'title', 'Quantum error correction')} caption={caption(params)}>
      {head}
      {mode === 'single' ? (
        <Single code={code} err={err} setErr={setErr} logical={logical} setLogical={setLogical} p={p} setP={setP} model={model} />
      ) : (
        <Rate code={code} model={model} p={p} setP={(v) => { setP(v); setMc(null); }} trials={trials} mc={mc && mc.code === codeId && mc.model === model && mc.p === p ? mc : null} run={() => {
          let f = 0;
          for (let i = 0; i < trials; i++) {
            const d = decode(code, randomError(code.n, model, p));
            if (d.logicalX || d.logicalZ) f++;
          }
          setMc({ fails: f, n: trials, p, model, code: codeId });
        }} />
      )}
    </Frame>
  );
}

function Single({ code, err, setErr, logical, setLogical, p, setP, model }: { code: Code; err: Pauli; setErr: (e: Pauli) => void; logical: Logical; setLogical: (l: Logical) => void; p: number; setP: (v: number) => void; model: NoiseModel }) {
  const d = decode(code, err);
  const n = code.n;
  const three = n === 3;
  const letters: [string, string] = code.id === 'phase-flip' ? ['+', '−'] : ['0', '1'];
  const swap = code.id === 'phase-flip';
  const v0 = three ? encoded(logical) : null;
  const vErr = v0 ? applyPauli(v0, err, swap) : null;
  const vFix = vErr ? applyPauli(vErr, d.correction, swap) : null;
  const restored = v0 && vFix ? sameUpToPhase(v0, vFix) : null;
  const base: 1 | -1 = logical === '1' || logical === '-' ? -1 : 1;
  const shorComp = logical === '0' || logical === '1' ? '' : ` (the ${base > 0 ? '|0_L⟩' : '|1_L⟩'} component of ${LOG_LABEL[logical]})`;

  const encodedLine = three
    ? `${LOG_LABEL[logical]} = ${ketText(v0!, letters)}`
    : `${logical === '+' || logical === '-' ? `${LOG_LABEL[logical]} = (|0_L⟩ ${logical === '+' ? '+' : '−'} |1_L⟩)/√2, ` : ''}${base > 0 ? '|0_L⟩' : '|1_L⟩'} = ${shorBlocks({ x: 0, z: 0 }, base)}/2√2`;

  const lname = d.logicalX && d.logicalZ ? 'Y_L' : d.logicalX ? 'X_L' : 'Z_L';
  const lop = d.logicalX && d.logicalZ ? `X_L Z_L` : d.logicalX ? `X_L = ${code.XLlabel}` : `Z_L = ${code.ZLlabel}`;
  const invisible =
    (!d.logicalX && d.logicalZ && (logical === '0' || logical === '1')) || (d.logicalX && !d.logicalZ && (logical === '+' || logical === '-'));

  const verdict: ReactNode =
    d.verdict === 'none' ? (
      <Note>No error yet. Choose X, Y or Z on one or more qubits, or draw random errors.</Note>
    ) : d.verdict === 'corrected' ? (
      <Note tone="good">The syndrome located the error; error × correction is a stabiliser (or the identity), so the encoded state is restored exactly.</Note>
    ) : d.verdict === 'stabiliser' ? (
      <Note tone="good">Every check reads +1, and that is fine: this error is itself a product of stabilisers, so it does not change the encoded state at all (the code is degenerate).</Note>
    ) : (
      <Note tone="warn">
        <L
          t={
            (d.verdict === 'logical-undetected'
              ? `Every check reads +1, so the decoder does nothing, yet the error acts as the logical ${lop}: the encoded information is changed without any warning.`
              : `The syndrome pointed to the wrong correction: error × correction = ${pauliText(d.residual, n)}, which acts as the logical ${lop}. The decoder turned the pattern into a ${lname} error.`) +
            (invisible ? ` On ${LOG_LABEL[logical]} this happens to change only a global sign, but on a superposition of logical states it is a real error.` : '')
          }
        />
      </Note>
    );

  return (
    <div className="space-y-3">
      <Segmented label="Encoded logical state" options={LOGICALS.map((l) => ({ value: l, label: <L t={LOG_LABEL[l]} /> }))} value={logical} onChange={setLogical} />
      <div className="text-xs text-ink-3">Inject errors (qubits numbered 1 to {n}{n === 9 ? '; blocks 1-3, 4-6, 7-9' : ''})</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {Array.from({ length: n }, (_, j) => (
          <Segmented key={j} label={`Qubit ${j + 1}`} options={(['I', 'X', 'Y', 'Z'] as P1[]).map((k) => ({ value: k, label: k }))} value={pauliAt(err, j)} onChange={(k) => setErr(setAt(err, j, k))} />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-end">
        <Button onClick={() => setErr(randomError(n, model, p))}>Random errors ({MODEL_LABEL[model]})</Button>
        <Button onClick={() => setErr({ x: 0, z: 0 })} disabled={!err.x && !err.z}>
          Clear
        </Button>
        <Slider label="p for random errors" value={p} min={0} max={0.5} step={0.01} onChange={setP} />
      </div>
      <div className="space-y-1.5 rounded-lg border border-line p-3">
        <Line label="Encoded">
          <L t={encodedLine} />
        </Line>
        <Line label="Error E">{pauliText(err, n).replace('I (no correction)', 'none')}</Line>
        <Line label="State after E">
          <L t={three ? ketText(vErr!, letters) : `${shorBlocks(err, base)}/2√2${shorComp}`} />
        </Line>
        <Line label="Syndrome">
          <span className="flex flex-wrap gap-1.5 font-sans">
            {code.stabilisers.map((s, i) => (
              <Chip key={i} label={s.label} value={(d.syn >> i) & 1 ? -1 : 1} />
            ))}
          </span>
        </Line>
        <Line label="Decoder applies">{pauliText(d.correction, n)}</Line>
        <Line label="State after correction">
          <L t={three ? ketText(vFix!, letters) : `${shorBlocks(mul(err, d.correction), base)}/2√2${shorComp}`} />
        </Line>
        {three && restored !== null && (
          <Line label="Same as encoded?">{restored ? 'yes (up to a global phase)' : 'no'}</Line>
        )}
      </div>
      {verdict}
    </div>
  );
}

function Rate({ code, model, p, setP, trials, mc, run }: { code: Code; model: NoiseModel; p: number; setP: (v: number) => void; trials: number; mc: { fails: number; n: number } | null; run: () => void }) {
  const f = useMemo(() => (x: number) => logicalErrorRate(code, model, x), [code, model]);
  const be = useMemo(() => breakEven(code, model, 0.5), [code, model]);
  const helps = f(0.01) < 0.01;
  const byW = useMemo(() => failuresByWeight(code, model), [code, model]);
  const yMax = Math.max(0.5, f(0.5)) * 1.08;
  const PL = f(p);
  const rate = mc ? mc.fails / mc.n : NaN;
  const se = mc ? Math.sqrt(Math.max(rate * (1 - rate), 1 / mc.n) / mc.n) : NaN;
  const formula =
    code.n === 3 && ((code.id === 'bit-flip' && model === 'x') || (code.id === 'phase-flip' && model === 'z'))
      ? '3p²(1 − p) + p³ = 3p² − 2p³'
      : code.n === 3 && ((code.id === 'bit-flip' && model === 'z') || (code.id === 'phase-flip' && model === 'x'))
        ? '3p(1 − p)² + p³ (any odd number of errors)'
        : null;
  return (
    <div className="space-y-3">
      <Plot view={[0, 0.5, 0, yMax]} aspect={0.55} minHeight={220} maxHeight={360} xLabel="p" yLabel="P(logical error)" xStep={0.1} yStep={yMax > 0.6 ? 0.2 : 0.1} label="Logical error probability against physical error probability">
        <FnPath f={(x) => x} color="var(--plot-1)" dash="6 4" width={1.75} />
        <FnPath f={f} color="var(--plot-2)" width={2.5} samples={400} />
        {be !== null && <Dot x={be} y={be} r={5} color="var(--plot-4)" />}
        {be !== null && helps && (
          <Label x={be} y={be} dx={-8} dy={18} anchor="end" color="var(--plot-4)" weight={600} size={12}>
            break-even p ≈ {fmt(be, 3)}
          </Label>
        )}
        <Segment x1={p} y1={0} x2={p} y2={yMax} color="var(--plot-text)" width={1} dash="3 3" opacity={0.6} />
        <Dot x={p} y={PL} r={4.5} color="var(--plot-2)" />
        <Dot x={p} y={p} r={3.5} color="var(--plot-1)" hollow />
        {mc && <Dot x={p} y={rate} r={4} color="var(--plot-3)" />}
      </Plot>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4" style={{ background: 'var(--plot-2)' }} /> encoded ({code.name}, minimum-weight decoder)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 border-t-2 border-dashed" style={{ borderColor: 'var(--plot-1)' }} /> one bare qubit: an error hits it with probability p
        </span>
        {mc && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: 'var(--plot-3)' }} /> Monte Carlo estimate
          </span>
        )}
      </div>
      <Controls cols={2}>
        <Slider label="Physical error probability p" value={p} min={0} max={0.5} step={0.005} onChange={setP} />
        <Readout label={`P(logical error) at p = ${fmt(p, 3)}`} value={`${fmt(PL, 4)}${formula ? `   [${formula}]` : ''}`} tone="var(--plot-2)" />
      </Controls>
      <div className="text-[13px]">
        <div className="mb-1 text-xs text-ink-3">Error patterns the decoder gets wrong, by number of affected qubits ({MODEL_LABEL[model]})</div>
        <div className="flex flex-wrap gap-1.5 font-mono text-[12px]">
          {byW
            .filter((r) => r.total > 0 && r.w > 0 && r.w <= Math.min(code.n, 5))
            .map((r) => (
              <span key={r.w} className="rounded-md border border-line bg-surface-2 px-2 py-0.5">
                w = {r.w}: {r.fail.toLocaleString('en-US')} / {r.total.toLocaleString('en-US')}
              </span>
            ))}
          {code.n > 5 && <span className="px-1 text-ink-3">…</span>}
        </div>
      </div>
      {helps ? (
        <Note tone="good">
          For small p the code wins: it fails only when two or more qubits go wrong, so P(logical) grows like p², below the bare qubit&apos;s p.
          {be !== null && ` Above p ≈ ${fmt(be, 3)} the encoded qubit is worse than a bare one.`}
        </Note>
      ) : (
        <Note tone="warn">
          Some single-qubit errors of this kind already cause a logical failure (the code cannot correct them), and there are {code.n} qubits that can suffer one, so for small p the encoded qubit is worse than a bare one.
        </Note>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Button primary onClick={run}>
          Run {trials.toLocaleString('en-US')} trials at p = {fmt(p, 3)}
        </Button>
        {mc && (
          <span className="text-[13px]">
            {mc.fails} failures in {mc.n}: rate {fmt(rate, 4)} ± {fmt(se, 2)} (exact {fmt(PL, 4)})
          </span>
        )}
      </div>
    </div>
  );
}

