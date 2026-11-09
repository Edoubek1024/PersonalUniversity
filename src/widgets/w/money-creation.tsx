/**
 * money-creation: the textbook deposit-expansion story, bank by bank. A new deposit arrives at
 * Bank 1, which keeps a fraction as reserves and lends the rest; the loan is spent and deposited
 * at Bank 2, and so on. Step or Play adds banks; the bars show each bank's deposit split into
 * reserves and loans, and the lower chart shows total deposits approaching the limit
 * D / (1 - (1 - rr - e)(1 - c)), which is D / rr with no leakages. A note explains why the Fed's
 * ample-reserves system does not work this way.
 *
 * Params:
 *   deposit   number   initial deposit D                       default 1000
 *   rr        number   required reserve ratio, in (0, 1]        default 0.1
 *   excess    number   extra reserves banks choose to hold      default 0
 *   cash      number   share of each loan held as currency      default 0
 *   banks     number   banks available to step through (5-40)   default 25
 *   leakages  boolean  show the excess-reserve and currency sliders  default true
 *   note      boolean  show the ample-reserves note             default true
 *   unit      string   currency label                           default "USD"
 *   title     string                                            default "How deposits multiply in the textbook model"
 *   caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str } from '../kit/params';
import { Dot, Label, Plot, Poly, Rect, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider } from '../kit/controls';
import { useAnimation, useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { depositChain, depositLimit } from '../kit/econ-macro';

const RES = 'var(--plot-2)';
const LOAN = 'var(--plot-1)';
const TOT = 'var(--plot-3)';

export default function MoneyCreation({ params }: WidgetProps) {
  const d0 = num(params, 'deposit', 1000);
  if (!(d0 > 0)) throw new Error('parameter "deposit" must be positive');
  const rr0 = num(params, 'rr', 0.1);
  if (!(rr0 > 0 && rr0 <= 1)) throw new Error('parameter "rr" must be in (0, 1]');
  const nMax = Math.round(num(params, 'banks', 25));
  if (nMax < 5 || nMax > 40) throw new Error('parameter "banks" must be between 5 and 40');
  const unit = str(params, 'unit', 'USD');
  const showLeak = bool(params, 'leakages', true);
  const showNote = bool(params, 'note', true);

  const [rr, setRr] = useState(rr0);
  const [excess, setExcess] = useState(num(params, 'excess', 0));
  const [cash, setCash] = useState(num(params, 'cash', 0));
  const [k, setK] = useState(1);
  const [running, setRunning] = useState(false);
  const [acc, setAcc] = useState(0);

  const rows = useMemo(() => depositChain(d0, rr, excess, cash, nMax), [d0, rr, excess, cash, nMax]);
  const limit = depositLimit(d0, rr, excess, cash);
  const shown = rows.slice(0, k);
  const totalDep = shown.reduce((s, r) => s + r.deposit, 0);
  const totalRes = shown.reduce((s, r) => s + r.reserves, 0);
  const totalLoans = shown.reduce((s, r) => s + r.loan, 0);
  const cum = rows.reduce<number[]>((a, r) => [...a, (a.length ? a[a.length - 1] : 0) + r.deposit], []);
  const last = shown[shown.length - 1];

  useAnimation(running, (dt) => {
    const a = acc + dt;
    if (a >= 0.4) {
      setAcc(0);
      setK((x) => {
        if (x + 1 >= nMax) setRunning(false);
        return Math.min(nMax, x + 1);
      });
    } else setAcc(a);
  });

  const money = (v: number) => `${unit} ${fmt(v, 5)}`;
  const cumTop = Math.max(limit === Infinity ? cum[cum.length - 1] : limit, cum[cum.length - 1]) * 1.12;
  // Leave about 44 px left of x = 0 for the y tick labels, whatever the width.
  const [boxRef, box] = useElementSize<HTMLDivElement>();
  const pw = Math.max(200, box.width || 640);
  const xMax = nMax + 0.6;
  const xMin = (-44 * xMax) / (pw - 44);
  const nonNeg = (v: number) => (v < 0 ? '' : fmt(v, 4));

  return (
    <Frame title={str(params, 'title', 'How deposits multiply in the textbook model')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div ref={boxRef} className="space-y-3">
      <Plot view={[xMin, xMax, -d0 * 0.04, d0 * 1.15]} aspect={0.42} minHeight={170} maxHeight={260} grid={false} xStep={5} yTickFormat={nonNeg} xTickFormat={(v) => (v <= 0 ? '' : fmt(v))} label="Each bank's new deposit split into reserves and loans">
        {shown.map((r, i) => (
          <g key={i}>
            <Rect x={i + 0.6} y={0} w={0.8} h={r.reserves} fill={RES} opacity={0.8} />
            <Rect x={i + 0.6} y={r.reserves} w={0.8} h={r.loan} fill={LOAN} opacity={0.65} />
          </g>
        ))}
        <Label x={xMax} y={d0 * 1.15} dx={-4} dy={13} anchor="end" size={11}>
          bank by bank: reserves (bottom), loans (top)
        </Label>
      </Plot>
      <Plot view={[xMin, xMax, -cumTop * 0.04, cumTop]} aspect={0.32} minHeight={140} maxHeight={200} xStep={5} yTickFormat={nonNeg} xTickFormat={(v) => (v <= 0 ? '' : fmt(v))} xLabel="banks" label="Total deposits as more banks are added">
        {Number.isFinite(limit) && (
          <>
            <Segment x1={0} y1={limit} x2={xMax} y2={limit} color={TOT} dash="6 4" width={1.5} />
            <Label x={xMax} y={limit} dx={-4} dy={14} anchor="end" color={TOT} size={11} weight={600}>
              {`limit ${fmt(limit, 5)}`}
            </Label>
          </>
        )}
        <Poly points={[[0, 0], ...cum.slice(0, k).map((c, i) => [i + 1, c] as [number, number])]} color={TOT} width={2.25} />
        <Dot x={k} y={cum[k - 1]} color={TOT} r={4.5} />
      </Plot>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button primary onClick={() => (k >= nMax ? (setK(1), setRunning(true)) : setRunning((r) => !r))}>
          {running ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={() => (setRunning(false), setK((x) => Math.min(nMax, x + 1)))} disabled={k >= nMax}>
          Next bank
        </Button>
        <Button onClick={() => (setRunning(false), setK(1))} disabled={k === 1}>
          Reset
        </Button>
        <span className="font-mono text-xs text-ink-2">banks shown: {k}</span>
      </div>
      <Controls cols={3}>
        <Readout label={`Bank ${k}: deposit`} value={money(last.deposit)} />
        <Readout label={`Bank ${k}: keeps as reserves`} value={money(last.reserves)} tone={RES} />
        <Readout label={`Bank ${k}: lends`} value={money(last.loan)} tone={LOAN} />
        <Readout label={`Total deposits, ${k} banks`} value={money(totalDep)} tone={TOT} />
        <Readout label="Total reserves / total loans" value={`${fmt(totalRes, 5)} / ${fmt(totalLoans, 5)}`} />
        <Readout label={cash === 0 && excess === 0 ? 'Limit D/rr (multiplier 1/rr)' : 'Limit (multiplier)'} value={Number.isFinite(limit) ? `${fmt(limit, 5)} (${fmt(limit / d0, 4)}×)` : '∞'} tone={TOT} />
      </Controls>
      <Controls cols={showLeak ? 3 : 1}>
        <Slider label="Required reserve ratio rr" value={rr} min={0.02} max={0.5} step={0.01} onChange={(v) => (setRr(v), setRunning(false))} />
        {showLeak && <Slider label="Extra reserves banks hold, e" value={excess} min={0} max={0.5} step={0.01} onChange={(v) => (setExcess(v), setRunning(false))} />}
        {showLeak && <Slider label="Share of each loan kept as cash, c" value={cash} min={0} max={0.5} step={0.01} onChange={(v) => (setCash(v), setRunning(false))} />}
      </Controls>
      {showNote && (
        <Note>
          This is the textbook model, which assumes reserves are scarce and a binding requirement. Since 26 March 2020 the Fed's reserve requirement has been 0%, and banks hold trillions of
          dollars of reserves. In this ample-reserves system a bank's lending is limited by its capital, its borrowers and the interest rate the Fed sets (it pays interest on reserves), not by
          a reserve ratio. When a bank makes a loan it creates a new deposit at the same time.
        </Note>
      )}
    </Frame>
  );
}
