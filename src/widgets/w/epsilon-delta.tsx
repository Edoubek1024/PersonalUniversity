/**
 * epsilon-delta: the ε–δ definition of a limit made visible. The ε band around L and the δ strip
 * around a are drawn; the part of the graph inside the strip turns green where it stays in the
 * band and red where it escapes. The widget checks a δ by dense sampling (excluding x = a), can
 * show the largest δ that works, and has a game in which it names ε and you must answer with δ.
 * A zoom-and-table mode supports the informal idea of a limit. With `seq` it switches to
 * sequences: a_n, L and ε, and you choose N.
 *
 * Params (functions):
 *   f        string    expression in x                                       default "x^2"
 *   a        number    the point x approaches                                default 2
 *   L        number    the claimed limit                                     default: numerical estimate of the limit
 *   fa       number    value of f at a, overriding the formula (a hole filled elsewhere)  default none
 *   epsilon  number    starting ε                                            default 0.5
 *   delta    number    starting δ                                            default 0.25
 *   view     [xMin, xMax, yMin, yMax]                                        default [a−3, a+3, L−3, L+3]
 *   modes    string[]  any of "zoom", "explore", "game"                      default ["explore", "game"]
 *   mode     string    starting mode                                         default first of modes
 *   editL    boolean   add a slider for L (to see that a wrong L fails)       default false
 * Params (sequences):
 *   seq      string    expression in n, e.g. "(3n+1)/(n+2)"; switches to sequence mode
 *   L        number    the claimed limit                                     default: a_n at n = 10⁹
 *   epsilon  number                                                          default 0.1
 *   N        number    starting N                                            default 10
 *   modes    string[]  any of "explore", "game"                              default ["explore", "game"]
 * Both: examples [{label, ...any of the above}], title, caption.
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray, view as readView } from '../kit/params';
import { Plot, FnPath, Segment, Dot, Label, Line } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { compile1, sig, type Fn } from '../kit/calc1-math';
import { Dots, ExampleTabs, HBand, LogSlider, NumTable, VBand, readExamples, ReadoutGrid } from '../kit/calc1-ui';

type Params = Record<string, unknown>;
type Mode = 'zoom' | 'explore' | 'game';
const MODE_LABEL: Record<Mode, string> = { zoom: 'Zoom in', explore: 'Choose δ', game: 'Game' };

/** Numerical two-sided limit estimate, or NaN when the sides disagree. */
function estimateLimit(f: Fn, a: number): number {
  const h = 1e-7 * (1 + Math.abs(a));
  const big = (y: number) => (Math.abs(y) > 1e9 ? NaN : y);
  const l = big(f(a - h));
  const r = big(f(a + h));
  if (Math.abs(f(a - h)) > 1e9 || Math.abs(f(a + h)) > 1e9) return NaN;
  if (Number.isFinite(l) && Number.isFinite(r) && Math.abs(l - r) < 1e-4 * (1 + Math.abs(l))) return (l + r) / 2;
  if (Number.isFinite(l) && !Number.isFinite(r)) return l;
  if (Number.isFinite(r) && !Number.isFinite(l)) return r;
  return NaN;
}

interface DeltaScan {
  /** Supremum of the δ that work (0 if none, R if all up to the scan radius do). */
  best: number;
  capped: boolean;
  /** A failing distance just beyond `best`, and the side it fails on. */
  badT: number;
  badSide: -1 | 1;
}

/**
 * Largest δ such that every x with 0 < |x − a| < δ (where f is defined) has |f(x) − L| < ε.
 * Scans distances t on a log grid (to catch trouble very close to a) and a linear grid, then
 * bisects the first failure.
 */
function scanDelta(f: Fn, a: number, L: number, eps: number, R: number): DeltaScan {
  const badAt = (t: number): -1 | 0 | 1 => {
    const yl = f(a - t);
    if (!Number.isNaN(yl) && !(Math.abs(yl - L) < eps)) return -1;
    const yr = f(a + t);
    if (!Number.isNaN(yr) && !(Math.abs(yr - L) < eps)) return 1;
    return 0;
  };
  const ts: number[] = [];
  for (let i = 0; i <= 300; i++) ts.push(R * Math.pow(10, -9 + (9 * i) / 300));
  for (let i = 1; i <= 3000; i++) ts.push((R * i) / 3000);
  ts.sort((x, y) => x - y);
  let prev = 0;
  for (const t of ts) {
    const s = badAt(t);
    if (s !== 0) {
      if (prev === 0) return { best: 0, capped: false, badT: t, badSide: s };
      let lo = prev;
      let hi = t;
      let side: -1 | 1 = s;
      for (let k = 0; k < 60; k++) {
        const m = (lo + hi) / 2;
        const sm = badAt(m);
        if (sm !== 0) {
          hi = m;
          side = sm;
        } else lo = m;
      }
      return { best: lo, capped: false, badT: hi, badSide: side };
    }
    prev = t;
  }
  return { best: R, capped: true, badT: NaN, badSide: 1 };
}

const GAME_EPS = [0.4, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005];

function FnInner({ p }: { p: Params }) {
  const src = str(p, 'f', 'x^2');
  const f = useMemo(() => compile1(src, 'f'), [src]);
  const a = num(p, 'a', 2);
  const est = useMemo(() => estimateLimit(f, a), [f, a]);
  const L0 = num(p, 'L', Number.isFinite(est) ? est : 0);
  const faParam = p.fa === undefined ? undefined : num(p, 'fa', 0);
  const v = readView(p, 'view', [a - 3, a + 3, L0 - 3, L0 + 3]);
  const modes = strArray(p, 'modes', ['explore', 'game']) as Mode[];
  for (const m of modes) if (!(m in MODE_LABEL)) throw new Error(`parameter "modes": unknown mode "${m}" (use zoom, explore, game)`);
  if (!modes.length) throw new Error('parameter "modes" should not be empty');
  const editL = bool(p, 'editL', false);

  const [mode, setMode] = useState<Mode>(() => oneOf(p, 'mode', modes, modes[0]));
  const [L, setL] = useState(L0);
  const H = Math.max(L0 - v[2], v[3] - L0);
  const R = Math.max(a - v[0], v[1] - a);
  const [eps, setEps] = useState(num(p, 'epsilon', 0.5));
  const [delta, setDelta] = useState(num(p, 'delta', 0.25));
  const [follow, setFollow] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showBest, setShowBest] = useState(false);
  const [game, setGame] = useState({ round: 0, eps: H * GAME_EPS[0], checked: false, score: 0, tries: 0 });

  // The value of f at a: an explicit override, else the formula (which may be undefined).
  const fa = faParam ?? f(a);
  const fx = useMemo<Fn>(() => (x) => (x === a ? fa : f(x)), [f, a, fa]);
  const curEps = mode === 'game' ? game.eps : eps;
  const scan = useMemo(() => scanDelta(f, a, L, curEps, R), [f, a, L, curEps, R]);
  const works = scan.best > 0 && delta <= scan.best * (1 + 1e-9);
  const witnessT = !works ? (scan.best === 0 ? Math.min(scan.badT, delta * 0.5) : scan.badT) : NaN;
  const witnessX = a + scan.badSide * witnessT;

  // View: zoom about (a, L).
  const z = mode === 'zoom' ? zoom : follow ? Math.min(1, curEps / (0.35 * H)) : zoom;
  const cy = mode === 'zoom' ? (Number.isFinite(est) ? est : L0) : L;
  const vz: [number, number, number, number] = [a + (v[0] - a) * z, a + (v[1] - a) * z, cy + (v[2] - L0) * z, cy + (v[3] - L0) * z];

  const showVerdict = mode === 'explore' || (mode === 'game' && game.checked);
  const inside = useMemo<Fn>(() => (x) => {
    const y = f(x);
    return Math.abs(y - L) < curEps ? y : NaN;
  }, [f, L, curEps]);
  const outside = useMemo<Fn>(() => (x) => {
    const y = f(x);
    return Math.abs(y - L) < curEps ? NaN : y;
  }, [f, L, curEps]);

  const lim = est;
  const faFinite = Number.isFinite(fa);
  const hs = [0.1, 0.01, 0.001, 0.0001, 0.00001];

  const newRound = (round: number, score: number) => {
    const base = GAME_EPS[Math.min(round, GAME_EPS.length - 1)];
    setGame({ round, eps: H * base * (0.6 + 0.4 * Math.random()), checked: false, score, tries: 0 });
    setDelta(H * base * 0.9);
  };

  return (
    <>
      {modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={setMode} />}
      <Plot view={vz} aspect={0.62} minHeight={260} maxHeight={440} label="Graph of f with the ε band around L and the δ strip around a">
        {mode !== 'zoom' && (
          <>
            <HBand lo={L - curEps} hi={L + curEps} fill="var(--plot-4)" opacity={0.16} />
            <VBand lo={a - delta} hi={a + delta} fill="var(--plot-5)" opacity={0.14} />
            <Line x={0} y={L + curEps} slope={0} color="var(--plot-4)" width={1.25} dash="5 4" />
            <Line x={0} y={L - curEps} slope={0} color="var(--plot-4)" width={1.25} dash="5 4" />
            <Line x={a - delta} y={0} slope={Infinity} color="var(--plot-5)" width={1.25} dash="5 4" />
            <Line x={a + delta} y={0} slope={Infinity} color="var(--plot-5)" width={1.25} dash="5 4" />
          </>
        )}
        <FnPath f={f} color="var(--plot-1)" width={mode === 'zoom' ? 2.5 : 1.75} opacity={mode === 'zoom' ? 1 : 0.55} />
        {mode !== 'zoom' && showVerdict && (
          <>
            <FnPath f={inside} from={a - delta} to={a + delta} color="var(--plot-3)" width={4} />
            <FnPath f={outside} from={a - delta} to={a + delta} color="var(--plot-2)" width={4} />
          </>
        )}
        {mode !== 'zoom' && !showVerdict && <FnPath f={f} from={a - delta} to={a + delta} color="var(--plot-1)" width={3.5} />}
        {Number.isFinite(lim) && <Dot x={a} y={lim} hollow color="var(--plot-1)" r={5} />}
        {mode !== 'zoom' && !(Number.isFinite(lim) && Math.abs(lim - L) < 1e-9) && <Dot x={a} y={L} hollow color="var(--plot-4)" r={5} />}
        {faFinite && <Dot x={a} y={fa} color="var(--plot-1)" r={4.5} />}
        {mode !== 'zoom' && showVerdict && !works && Number.isFinite(witnessX) && (
          <>
            <Dot x={witnessX} y={f(witnessX)} color="var(--plot-2)" r={5} />
            <Label x={witnessX} y={f(witnessX)} dx={8} dy={-8} color="var(--plot-2)" size={11}>
              x = {sig(witnessX, 5)}
            </Label>
          </>
        )}
        {mode !== 'zoom' && (
          <>
            <Label x={vz[1]} y={L + curEps} dx={-4} dy={-4} anchor="end" color="var(--plot-4)" size={11}>
              L + ε
            </Label>
            <Label x={vz[1]} y={L - curEps} dx={-4} dy={13} anchor="end" color="var(--plot-4)" size={11}>
              L − ε
            </Label>
            <Label x={a + delta} y={vz[3]} dx={4} dy={14} color="var(--plot-5)" size={11}>
              a + δ
            </Label>
            <Label x={a - delta} y={vz[3]} dx={-4} dy={14} anchor="end" color="var(--plot-5)" size={11}>
              a − δ
            </Label>
          </>
        )}
        {showBest && mode === 'explore' && scan.best > 0 && (
          <>
            <Segment x1={a - scan.best} y1={vz[2]} x2={a - scan.best} y2={vz[3]} color="var(--plot-3)" width={1.5} dash="2 3" />
            <Segment x1={a + scan.best} y1={vz[2]} x2={a + scan.best} y2={vz[3]} color="var(--plot-3)" width={1.5} dash="2 3" />
          </>
        )}
      </Plot>

      {mode === 'zoom' && (
        <>
          <Controls>
            <LogSlider label="Zoom (window width)" value={zoom} min={1e-4} max={1} onChange={setZoom} format={(s) => `±${sig((v[1] - v[0]) * s / 2, 3)}`} steps={400} />
            <Readout label={<span className="normal-case tracking-normal">value f(a) at a = {fmt(a)}</span>} value={faFinite ? sig(fa, 6) : 'undefined'} />
          </Controls>
          <NumTable
            head={['h', <>f(a − h)</>, <>f(a + h)</>]}
            rows={hs.map((h) => [sig(h, 2), sig(f(a - h), 7), sig(f(a + h), 7)])}
          />
        </>
      )}

      {mode !== 'zoom' && (
        <>
          <ReadoutGrid>
            <Readout label="ε" value={sig(curEps, 3)} tone="var(--plot-4)" />
            <Readout label="δ" value={sig(delta, 3)} tone="var(--plot-5)" />
            {mode === 'explore' || game.checked ? (
              <Readout label="Largest δ that works" value={scan.best === 0 ? 'none' : scan.capped ? `≥ ${sig(scan.best, 3)}` : sig(scan.best, 4)} tone="var(--plot-3)" />
            ) : (
              <Readout label="Round · score" value={`${game.round + 1} · ${game.score}`} />
            )}
          </ReadoutGrid>
          <Controls>
            {mode === 'explore' ? (
              <LogSlider label="ε" value={eps} min={H * 1e-3} max={H} onChange={setEps} format={(s) => sig(s, 3)} />
            ) : (
              <div className="text-[13px] text-ink-2">
                Round {game.round + 1}: your opponent names <Tex>{`\\varepsilon=${sig(game.eps, 3)}`}</Tex>. Find a δ, then check it.
              </div>
            )}
            <LogSlider
              label="δ"
              value={delta}
              min={R * 1e-4}
              max={R}
              onChange={(d) => {
                setDelta(d);
                if (mode === 'game') setGame((g) => ({ ...g, checked: false }));
              }}
              format={(s) => sig(s, 3)}
              steps={400}
            />
            {editL && mode === 'explore' && <Slider label="L" value={L} min={v[2]} max={v[3]} step={(v[3] - v[2]) / 200} onChange={setL} />}
            {mode === 'explore' && (
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2 pb-1">
                <Toggle label="Zoom with ε" checked={follow} onChange={setFollow} />
                <Toggle label="Mark the largest δ" checked={showBest} onChange={setShowBest} />
              </div>
            )}
            {mode === 'explore' && !follow && <LogSlider label="Zoom" value={zoom} min={1e-3} max={1} onChange={setZoom} format={(s) => `×${fmt(1 / s, 2)}`} />}
          </Controls>
          {mode === 'game' && (
            <div className="flex flex-wrap gap-2">
              <Button
                primary
                onClick={() => setGame((g) => ({ ...g, checked: true, tries: g.tries + 1, score: !g.checked && works ? g.score + 1 : g.score }))}
                disabled={game.checked}
              >
                Check δ
              </Button>
              <Button onClick={() => newRound(game.round + 1, game.score)} disabled={!(game.checked && works)}>
                Smaller ε
              </Button>
              <Button onClick={() => newRound(0, 0)}>Restart</Button>
            </div>
          )}
          {showVerdict && (
            <Note tone={works ? 'good' : 'warn'}>
              {works ? (
                <>
                  δ = {sig(delta, 3)} works: every x with <Tex>{'0<|x-a|<\\delta'}</Tex> has <Tex>{'|f(x)-L|<\\varepsilon'}</Tex>.
                  {mode === 'game' && game.round + 1 >= GAME_EPS.length ? ' You answered every ε: that is what the limit means.' : ''}
                </>
              ) : scan.best === 0 ? (
                <>No δ works: f(x) leaves the band at points arbitrarily close to a (for example x = {sig(witnessX, 6)}), so L = {sig(L, 4)} is not the limit, or ε is smaller than a jump.</>
              ) : (
                <>
                  δ = {sig(delta, 3)} is too big: x = {sig(witnessX, 6)} is within δ of a but f(x) = {sig(f(witnessX), 6)} is outside the band. Any δ ≤ {sig(scan.best, 4)} works.
                </>
              )}
            </Note>
          )}
        </>
      )}
      {mode === 'zoom' && !Number.isFinite(lim) && <Note>The two sides do not settle on one value: zoom in and watch whether the graph near a narrows to a single height.</Note>}
      {mode !== 'zoom' && (faParam !== undefined || (Number.isFinite(fx(a)) && Number.isFinite(lim) && Math.abs(fx(a) - lim) > 1e-9)) && <Note>The point x = a itself is never checked: only 0 &lt; |x − a| &lt; δ matters.</Note>}
    </>
  );
}

function SeqInner({ p }: { p: Params }) {
  const src = str(p, 'seq', '1/n');
  const s = useMemo(() => compile1(src, 'seq', 'n'), [src]);
  const L = num(p, 'L', s(1e9));
  const modes = strArray(p, 'modes', ['explore', 'game']).filter((m) => m !== 'zoom') as Mode[];
  if (!modes.length) throw new Error('parameter "modes" should include explore or game');
  const CAP = 1_000_000;
  const [mode, setMode] = useState<Mode>(() => oneOf(p, 'mode', modes, modes[0]));
  const [eps, setEps] = useState(num(p, 'epsilon', 0.1));
  const [N, setN] = useState(Math.max(1, Math.round(num(p, 'N', 10))));
  const [follow, setFollow] = useState(false);
  const spread = useMemo(() => {
    let m = 0;
    for (let n = 1; n <= 30; n++) {
      const d = Math.abs(s(n) - L);
      if (Number.isFinite(d)) m = Math.max(m, d);
    }
    return m || 1;
  }, [s, L]);
  const [game, setGame] = useState({ round: 0, eps: spread * 0.3, checked: false, score: 0 });
  const curEps = mode === 'game' ? game.eps : eps;

  // Smallest N: one past the last n ≤ CAP that is outside the band.
  const Nmin = useMemo(() => {
    let last = 0;
    for (let n = 1; n <= CAP; n++) {
      const d = Math.abs(s(n) - L);
      if (!(d < curEps)) last = n;
    }
    return last + 1;
  }, [s, L, curEps]);
  const none = Nmin > CAP;
  const works = !none && N >= Nmin;
  const witness = useMemo(() => {
    if (works) return 0;
    for (let n = N; n <= CAP; n++) if (!(Math.abs(s(n) - L) < curEps)) return n;
    return 0;
  }, [works, N, s, L, curEps]);

  const nShow = clamp(Math.round(Math.max(N, none ? N : Math.min(Nmin, N * 4)) * 1.6) + 6, 20, 4000);
  const yr = follow || mode === 'game' ? Math.max(curEps * 3, 1e-12) : Math.max(spread * 1.15, curEps * 1.5);
  const view: [number, number, number, number] = [0, nShow, L - yr, L + yr];
  const stride = Math.max(1, Math.ceil(nShow / 500));
  const pts = useMemo(() => {
    const before: [number, number][] = [];
    const good: [number, number][] = [];
    const bad: [number, number][] = [];
    for (let n = 1; n <= nShow; n += stride) {
      const y = s(n);
      const pt: [number, number] = [n, clamp(y, L - yr * 0.985, L + yr * 0.985)];
      if (n < N) before.push(pt);
      else if (Math.abs(y - L) < curEps) good.push(pt);
      else bad.push(pt);
    }
    return { before, good, bad };
  }, [s, nShow, stride, N, L, yr, curEps]);
  const showVerdict = mode === 'explore' || game.checked;
  const r = nShow > 200 ? 1.8 : nShow > 60 ? 2.6 : 3.4;

  const newRound = (round: number, score: number) => {
    setGame({ round, eps: spread * GAME_EPS[Math.min(round, GAME_EPS.length - 1)] * (0.6 + 0.4 * Math.random()) * 0.75, checked: false, score });
  };
  const setNn = (n: number) => {
    setN(clamp(Math.round(n), 1, 100000));
    if (mode === 'game') setGame((g) => ({ ...g, checked: false }));
  };

  return (
    <>
      {modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m, label: m === 'explore' ? 'Choose N' : 'Game' }))} value={mode} onChange={setMode} />}
      <Plot view={view} aspect={0.6} minHeight={240} maxHeight={420} xLabel="n" label="Terms of the sequence with the ε band around L">
        <HBand lo={L - curEps} hi={L + curEps} fill="var(--plot-4)" opacity={0.16} />
        <Line x={0} y={L + curEps} slope={0} color="var(--plot-4)" width={1.25} dash="5 4" />
        <Line x={0} y={L - curEps} slope={0} color="var(--plot-4)" width={1.25} dash="5 4" />
        <Line x={0} y={L} slope={0} color="var(--plot-axis)" width={1} dash="2 4" />
        <VBand lo={N} hi={nShow * 2} fill="var(--plot-5)" opacity={0.08} />
        <Line x={N} y={0} slope={Infinity} color="var(--plot-5)" width={1.5} dash="5 4" />
        <Dots points={pts.before} r={r} color="var(--plot-axis)" />
        <Dots points={pts.good} r={r} color={showVerdict ? 'var(--plot-3)' : 'var(--plot-1)'} />
        <Dots points={pts.bad} r={r} color={showVerdict ? 'var(--plot-2)' : 'var(--plot-1)'} />
        <Label x={N} y={L + yr} dx={5} dy={16} color="var(--plot-5)" size={11}>
          N = {N}
        </Label>
        <Label x={nShow} y={L + curEps} dx={-4} dy={-4} anchor="end" color="var(--plot-4)" size={11}>
          L + ε
        </Label>
        <Label x={nShow} y={L - curEps} dx={-4} dy={13} anchor="end" color="var(--plot-4)" size={11}>
          L − ε
        </Label>
      </Plot>
      <ReadoutGrid>
        <Readout label="ε" value={sig(curEps, 3)} tone="var(--plot-4)" />
        <Readout label="N" value={String(N)} tone="var(--plot-5)" />
        {mode === 'explore' || game.checked ? <Readout label="Smallest N that works" value={none ? `none ≤ 10⁶` : String(Nmin)} tone="var(--plot-3)" /> : <Readout label="Round · score" value={`${game.round + 1} · ${game.score}`} />}
      </ReadoutGrid>
      <Controls>
        {mode === 'explore' ? (
          <LogSlider label="ε" value={eps} min={spread * 1e-4} max={spread} onChange={setEps} format={(v) => sig(v, 3)} />
        ) : (
          <div className="text-[13px] text-ink-2">
            Round {game.round + 1}: your opponent names <Tex>{`\\varepsilon=${sig(game.eps, 3)}`}</Tex>. Find an N, then check it.
          </div>
        )}
        <div>
          <LogSlider label="N" value={N} min={1} max={100000} onChange={setNn} format={(v) => String(Math.round(v))} steps={500} />
          <div className="mt-1 flex gap-1.5">
            <Button onClick={() => setNn(N - 1)} title="N − 1">
              −1
            </Button>
            <Button onClick={() => setNn(N + 1)} title="N + 1">
              +1
            </Button>
            <Button onClick={() => setNn(N * 2)} title="Double N">
              ×2
            </Button>
          </div>
        </div>
        {mode === 'explore' && <Toggle label="Zoom with ε" checked={follow} onChange={setFollow} />}
      </Controls>
      {mode === 'game' && (
        <div className="flex flex-wrap gap-2">
          <Button primary disabled={game.checked} onClick={() => setGame((g) => ({ ...g, checked: true, score: works ? g.score + 1 : g.score }))}>
            Check N
          </Button>
          <Button disabled={!(game.checked && works)} onClick={() => newRound(game.round + 1, game.score)}>
            Smaller ε
          </Button>
          <Button onClick={() => newRound(0, 0)}>Restart</Button>
        </div>
      )}
      {showVerdict && (
        <Note tone={works ? 'good' : 'warn'}>
          {works ? (
            <>
              N = {N} works: every term from <Tex>{`a_{${N}}`}</Tex> on is within ε of L (checked up to n = 10⁶). Any larger N works too.
            </>
          ) : none ? (
            <>No N works: terms keep leaving the band (checked up to n = 10⁶), so L = {sig(L, 4)} is not the limit.</>
          ) : (
            <>
              N = {N} is too small: <Tex>{`|a_{${witness}}-L|=${sig(Math.abs(s(witness) - L), 4)}\\ge\\varepsilon`}</Tex>. The smallest N that works is {Nmin}.
            </>
          )}
        </Note>
      )}
    </>
  );
}

export default function EpsilonDelta({ params }: WidgetProps) {
  const examples = readExamples(params);
  const [ex, setEx] = useState(0);
  const p = examples.length ? examples[Math.min(ex, examples.length - 1)].params : params;
  const isSeq = typeof p.seq === 'string';
  return (
    <Frame title={str(params, 'title', isSeq ? 'ε–N: the limit of a sequence' : 'ε–δ: the precise limit')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <ExampleTabs examples={examples} value={ex} onChange={setEx} />
      {isSeq ? <SeqInner key={ex} p={p} /> : <FnInner key={ex} p={p} />}
    </Frame>
  );
}
