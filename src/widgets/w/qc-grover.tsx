/**
 * qc-grover: Grover search on n qubits (N = 2^n items). Three linked pictures:
 *   (a) the N real amplitudes as bars (marked items in a second colour) with the mean drawn as a
 *       line; Oracle flips the sign of the marked amplitudes, Diffusion reflects every amplitude
 *       about the mean (2|s><s| - I);
 *   (b) the same state in the plane of |w> (normalised sum of the marked states) and |s'> (the
 *       unmarked ones): it starts at angle theta = asin(sqrt(M/N)) and each full iteration (the
 *       oracle reflects about |s'>, diffusion about |s>) turns it by 2 theta;
 *   (c) the success probability sin^2((2k+1) theta) against the iteration count k, with the
 *       optimum round(pi/(4 theta) - 1/2) marked, so overshooting is visible.
 * Steps alternate oracle, diffusion, oracle, ... and never run on their own.
 *
 * Params:
 *   n         number     qubits, 2-6 (N = 2^n)                                   default 3
 *   marked    number[]   marked basis states, 0 <= i < N, 1 <= M < N               default [5] ([3] when n = 2)
 *   nSlider   boolean    show a slider for n                                      default true
 *   editable  boolean    click (or Enter on) a bar to mark or unmark it           default true
 *   title     string                                                              default "Grover search"
 *   caption   string     may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, str } from '../kit/params';
import { Arrow, Dot, FnPath, Label, ParamPath, Plot, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider } from '../kit/controls';
import { fmt } from '../kit/num';
import { caption } from '../kit/calc3-ui';
import { groverOptimal, groverP, groverPlane, groverState, groverTheta, mean, type GroverOp } from '../kit/qc-algo';

const C_UN = 'var(--plot-1)';
const C_MK = 'var(--plot-2)';
const C_MEAN = 'var(--plot-4)';
const C_STATE = 'var(--plot-3)';

function checkMarked(marked: number[], N: number) {
  for (const m of marked) if (!Number.isInteger(m) || m < 0 || m >= N) throw new Error(`parameter "marked": ${m} is not a basis state 0..${N - 1}`);
  const M = new Set(marked).size;
  if (M < 1 || M >= N) throw new Error(`parameter "marked" needs between 1 and ${N - 1} distinct states (got ${M})`);
}

function Bars({ amps, marked, n, editable, onToggle }: { amps: number[]; marked: Set<number>; n: number; editable: boolean; onToggle: (i: number) => void }) {
  const { sx, sy, width } = usePlot();
  const N = amps.length;
  const step = width / N;
  const bw = Math.max(1.5, step * 0.72);
  const binary = step >= 8 * n;
  let labelEvery = 1;
  if (!binary) while (labelEvery * step < 22) labelEvery *= 2;
  const m = mean(amps);
  return (
    <g>
      <line x1={0} x2={width} y1={sy(0)} y2={sy(0)} stroke="var(--plot-axis)" strokeWidth={1.25} />
      {[1, -1].map((v) => (
        <g key={v}>
          <line x1={0} x2={width} y1={sy(v)} y2={sy(v)} stroke="var(--plot-grid)" strokeWidth={1} />
          <text x={3} y={sy(v) + (v > 0 ? 12 : -4)} fontSize={10} fill="var(--plot-text)">
            {v > 0 ? '+1' : '−1'}
          </text>
        </g>
      ))}
      {amps.map((a, i) => {
        const x = sx(i) - bw / 2;
        const y0 = sy(0);
        const y1 = sy(a);
        const mk = marked.has(i);
        return (
          <g key={i}>
            <rect x={x} y={Math.min(y0, y1)} width={bw} height={Math.max(0.5, Math.abs(y1 - y0))} fill={mk ? C_MK : C_UN} fillOpacity={mk ? 0.9 : 0.7} rx={Math.min(2, bw / 4)} />
            {i % labelEvery === 0 && (
              <text x={Math.max(i === 0 ? 7 : 0, sx(i))} y={sy(-1) + 16} fontSize={binary ? 11 : 10} textAnchor="middle" fill={mk ? C_MK : 'var(--plot-text)'} fontWeight={mk ? 700 : 400} fontFamily={binary ? 'ui-monospace, monospace' : undefined}>
                {binary ? i.toString(2).padStart(n, '0') : i}
              </text>
            )}
            {editable && (
              <rect
                x={sx(i) - step / 2}
                y={0}
                width={step}
                height={sy(-1) + 20}
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-pressed={mk}
                aria-label={`State ${i} (${i.toString(2).padStart(n, '0')}), ${mk ? 'marked' : 'not marked'}`}
                style={{ cursor: 'pointer', outline: 'none' }}
                className="focus-visible:fill-[color-mix(in_srgb,var(--color-accent)_15%,transparent)]"
                onClick={() => onToggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle(i);
                  }
                }}
              />
            )}
          </g>
        );
      })}
      <line x1={0} x2={width} y1={sy(m)} y2={sy(m)} stroke={C_MEAN} strokeWidth={1.75} strokeDasharray="6 4" pointerEvents="none" />
    </g>
  );
}

export default function QcGrover({ params }: WidgetProps) {
  const n0 = num(params, 'n', 3);
  if (!Number.isInteger(n0) || n0 < 2 || n0 > 6) throw new Error('parameter "n" should be an integer from 2 to 6');
  const marked0 = numArray(params, 'marked', [5 % 2 ** n0 === 5 ? 5 : 2 ** n0 - 1]);
  checkMarked(marked0, 2 ** n0);
  const nSlider = bool(params, 'nSlider', true);
  const editable = bool(params, 'editable', true);

  const [n, setN] = useState(n0);
  const [marked, setMarked] = useState<Set<number>>(() => new Set(marked0));
  const [ops, setOps] = useState<GroverOp[]>([]);
  const N = 2 ** n;
  const M = marked.size;

  const amps = useMemo(() => groverState(N, marked, ops), [N, marked, ops]);
  const prevAmps = useMemo(() => (ops.length ? groverState(N, marked, ops.slice(0, -1)) : null), [N, marked, ops]);
  const theta = groverTheta(N, M);
  const kOpt = groverOptimal(theta);
  const kFloor = Math.floor(Math.PI / (4 * theta));
  const iters = ops.filter((o) => o === 'D').length;
  const half = ops.length % 2 === 1;
  const pNow = amps.reduce((s, a, i) => s + (marked.has(i) ? a * a : 0), 0);
  const kMax = Math.max(4, 2 * kOpt + 2);
  const last = ops[ops.length - 1];

  const changeN = (v: number) => {
    const NN = 2 ** v;
    const keep = [...marked].filter((i) => i < NN);
    setN(v);
    setMarked(new Set(keep.length ? keep : [NN - 1]));
    setOps([]);
  };
  const toggle = (i: number) => {
    const s = new Set(marked);
    if (s.has(i)) {
      if (s.size === 1) return;
      s.delete(i);
    } else {
      if (s.size >= N - 1) return;
      s.add(i);
    }
    setMarked(s);
    setOps([]);
  };
  const limit = ops.length >= 2 * kMax;
  const push = (o: GroverOp[]) => setOps((x) => [...x, ...o]);

  const plane = groverPlane(amps, marked);
  const ang = Math.atan2(plane.w, plane.s);
  const prevPlane = prevAmps ? groverPlane(prevAmps, marked) : null;
  const R = 1.18;

  const stateLabel = ops.length === 0 ? 'start |s⟩' : `${iters} iteration${iters === 1 ? '' : 's'}${half ? ' + oracle' : ''}`;

  return (
    <Frame title={str(params, 'title', 'Grover search')} caption={caption(params)}>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button primary onClick={() => push(['O'])} disabled={half || limit}>
          Oracle
        </Button>
        <Button primary onClick={() => push(['D'])} disabled={!half}>
          Diffusion
        </Button>
        <Button onClick={() => push(half ? ['D'] : ['O', 'D'])} disabled={limit && !half}>
          {half ? 'Finish iteration' : 'Full iteration'}
        </Button>
        <Button onClick={() => setOps([])} disabled={ops.length === 0}>
          Reset
        </Button>
        <span className="ml-1 text-[13px] text-ink-2">
          State: <span className="font-semibold text-ink">{stateLabel}</span>
        </span>
      </div>
      <Plot view={[-0.5, N - 0.5, -1.27, 1.1]} grid={false} axes={false} aspect={0.42} minHeight={210} maxHeight={320} label={`Amplitudes of the ${N} basis states`}>
        <Bars amps={amps} marked={marked} n={n} editable={editable} onToggle={toggle} />
      </Plot>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: C_UN }} /> unmarked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: C_MK }} /> marked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4" style={{ background: C_MEAN }} /> mean amplitude, now {fmt(mean(amps), 3)} (diffusion reflects every bar about it)
        </span>
        {editable && <span>Click a bar to mark or unmark it.</span>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-1 text-xs text-ink-3">The state in the |s′⟩, |w⟩ plane</div>
          <Plot view={[-R, R, -R, R]} equal grid={false} axes={false} aspect={0.9} minHeight={230} maxHeight={330} label="Rotation picture">
            <ParamPath x={Math.cos} y={Math.sin} t0={0} t1={2 * Math.PI} color="var(--plot-grid)" width={1.25} />
            <Segment x1={-R} y1={0} x2={R} y2={0} color="var(--plot-axis)" width={1} />
            <Segment x1={0} y1={-R} x2={0} y2={R} color="var(--plot-axis)" width={1} />
            <Label x={1.02} y={0} dx={-4} dy={16} anchor="end" color="var(--plot-text)" size={12}>|s′⟩ (unmarked)</Label>
            <Label x={0} y={1.06} dx={6} dy={10} color={C_MK} size={12} weight={600}>|w⟩ (marked)</Label>
            <Segment x1={-1.1 * Math.cos(theta)} y1={-1.1 * Math.sin(theta)} x2={1.1 * Math.cos(theta)} y2={1.1 * Math.sin(theta)} color={C_MEAN} width={1.25} dash="5 4" />
            <Label x={1.05 * Math.cos(theta)} y={1.05 * Math.sin(theta)} dx={-2} dy={-6} anchor="end" color={C_MEAN} size={11}>|s⟩</Label>
            {prevPlane && <Arrow x1={0} y1={0} x2={prevPlane.s} y2={prevPlane.w} color={C_STATE} width={1.5} opacity={0.35} />}
            <Arrow x1={0} y1={0} x2={plane.s} y2={plane.w} color={C_STATE} width={3} />
            <Dot x={plane.s} y={plane.w} r={3.5} color={C_STATE} />
            {last && (
              <Label x={-1.1} y={-1.05} dx={0} dy={0} color="var(--plot-text)" size={11}>
                {last === 'O' ? 'Last step: oracle = reflection about |s′⟩' : 'Last step: diffusion = reflection about |s⟩'}
              </Label>
            )}
          </Plot>
        </div>
        <div>
          <div className="mb-1 text-xs text-ink-3">P(success) after k iterations</div>
          <Plot view={[-0.4, kMax + 0.4, -0.06, 1.1]} aspect={0.9} minHeight={230} maxHeight={330} xStep={kMax > 12 ? 2 : 1} yStep={0.25} xLabel="k" label="Success probability against iterations">
            <FnPath f={(x) => groverP(theta, x)} from={0} to={kMax} color="var(--plot-1)" width={1.25} dash="4 3" opacity={0.7} />
            <Segment x1={kOpt} y1={0} x2={kOpt} y2={1.05} color={C_MEAN} dash="5 4" width={1.25} />
            <Label x={kOpt} y={1.05} dx={4} dy={2} color={C_MEAN} size={11}>
              optimum k = {kOpt}
            </Label>
            {Array.from({ length: kMax + 1 }, (_, k) => (
              <Dot key={k} x={k} y={groverP(theta, k)} r={k === iters ? 6 : 3.5} color={k === iters ? C_STATE : 'var(--plot-1)'} hollow={k !== iters} />
            ))}
          </Plot>
        </div>
      </div>
      {nSlider && (
        <Controls cols={2}>
          <Slider label="Qubits n" value={n} min={2} max={6} step={1} onChange={changeN} format={(v) => `${v} (N = ${2 ** v})`} />
        </Controls>
      )}
      <Controls cols={3}>
        <Readout label="N items, M marked" value={`${N}, ${M}`} />
        <Readout label="θ = asin √(M/N)" value={`${fmt(theta, 4)} rad = ${fmt((theta * 180) / Math.PI, 3)}°`} />
        <Readout label="Angle of the state now" value={`${fmt((ang * 180) / Math.PI, 3)}° = ${fmt(ang / theta, 3)} θ`} tone={C_STATE} />
        <Readout label="P(marked) now" value={fmt(pNow, 4)} tone={C_STATE} />
        <Readout label="Optimal k = round(π/4θ − ½)" value={`${kOpt}  (⌊π/4θ⌋ = ${kFloor}), P = ${fmt(groverP(theta, kOpt), 4)}`} />
        <Readout label="Oracle calls: Grover vs classical" value={`${kOpt} vs about N/2M = ${fmt(N / (2 * M), 3)}`} />
      </Controls>
      {iters > kOpt && !half ? (
        <Note tone="warn">Past the optimum: each extra iteration still turns the state by 2θ, so it rotates past |w⟩ and the success probability falls.</Note>
      ) : iters === kOpt && !half && ops.length > 0 ? (
        <Note tone="good">
          Optimal number of iterations reached: measuring now gives a marked state with probability {fmt(pNow, 4)}. √N = {fmt(Math.sqrt(N), 3)}; Grover needs about (π/4)√(N/M) oracle calls.
        </Note>
      ) : half ? (
        <Note>The oracle changed only signs, so no probability moved. The flipped marked bars pull the mean down; diffusion (reflection about the mean) now sends them far above it.</Note>
      ) : null}
    </Frame>
  );
}
