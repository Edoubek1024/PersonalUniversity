/**
 * cap-table: stack post-money (or pre-money) SAFEs, add a priced round with an option pool target,
 * and see who owns what before and after the round. Optionally run a simple sale through the cap
 * table to see who gets paid. The arithmetic lives in kit/startup-captable.ts.
 *
 * The SAFE rows are editable (amount and cap in USD millions), SAFEs can be added and removed, and
 * every number has a keyboard path (number inputs, sliders, buttons).
 *
 * Params:
 *   founders    number    founders' shares                                  default 10000000
 *   pool        number    existing unissued option pool shares              default 0
 *   safes       number[][] SAFEs as [amount, cap] in USD; [] for none       default [[500000,5000000],[1000000,8000000],[1000000,12000000]]
 *   safeType    "post" | "pre"   how the caps are read                      default "post"
 *   round       boolean   start with the priced round switched on           default false
 *   pre         number    round pre-money valuation, USD                    default 20000000
 *   money       number    new money in the round, USD                       default 5000000
 *   poolTarget  number    available pool after closing, % of fully diluted  default 10
 *   poolTiming  "pre" | "post"   pool increase in the pre-money (the shuffle) or created after closing   default "pre"
 *   waterfall   boolean   start with the sale panel open                    default false
 *   exit        number    sale price for the sale panel, USD                default 30000000
 *   title       string                                                      default "Cap table: SAFEs, a priced round and the pool"
 *   caption     string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { computeCapTable, waterfall, type PoolTiming, type Safe, type SafeType } from '../kit/startup-captable';

const C_FOUNDERS = 'var(--plot-1)';
const C_POOL = 'var(--plot-3)';
const C_SAFE = 'var(--plot-2)';
const C_INV = 'var(--plot-4)';
const MAX_SAFES = 6;

const intFmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const shares = (n: number) => intFmt.format(n);
const pct = (a: number, b: number) => (b > 0 ? `${((100 * a) / b).toFixed(2)}%` : '–');
const usd = (v: number) => {
  const a = Math.abs(v);
  if (a >= 1e9) return `USD ${(v / 1e9).toFixed(2)} billion`;
  if (a >= 1e6) return `USD ${(v / 1e6).toFixed(2)} million`;
  return `USD ${intFmt.format(Math.round(v))}`;
};
/** Compact money for table cells: "USD 16.14M". */
const usdShort = (v: number) => (Math.abs(v) >= 1e6 ? `USD ${(v / 1e6).toFixed(2)}M` : `USD ${intFmt.format(Math.round(v))}`);
const price = (v: number) => `USD ${v.toFixed(4)}`;
const mill = (v: number) => {
  const s = (v / 1e6).toFixed(3);
  return s.replace(/\.?0+$/, '');
};

function readSafes(p: Record<string, unknown>): Safe[] {
  const v = p.safes;
  const def = [
    [500000, 5000000],
    [1000000, 8000000],
    [1000000, 12000000],
  ];
  const rows = v === undefined ? def : v;
  const ok = Array.isArray(rows) && rows.length <= MAX_SAFES && rows.every((r) => Array.isArray(r) && r.length === 2 && r.every((x) => typeof x === 'number' && Number.isFinite(x) && x > 0));
  if (!ok) throw new Error(`parameter "safes" should be an array of up to ${MAX_SAFES} [amount, cap] pairs of positive numbers, got ${JSON.stringify(v)}`);
  return (rows as number[][]).map(([amount, cap]) => ({ amount, cap }));
}

interface Row {
  amount: string;
  cap: string;
}

function niceStep(max: number) {
  return max <= 50e6 ? 250000 : max <= 200e6 ? 1e6 : 5e6;
}

function Bar({ parts, label }: { parts: { value: number; color: string; opacity?: number; name: string }[]; label: string }) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  return (
    <div>
      <div className="mb-1 text-xs text-ink-2">{label}</div>
      <div className="flex h-5 w-full overflow-hidden rounded-md border border-line bg-surface-2" role="img" aria-label={`${label}: ${parts.map((p) => `${p.name} ${pct(p.value, total)}`).join(', ')}`}>
        {parts
          .filter((p) => p.value > 0)
          .map((p, i) => (
            <div key={i} title={`${p.name}: ${pct(p.value, total)}`} style={{ width: `${(100 * p.value) / total}%`, background: p.color, opacity: p.opacity ?? 1 }} className="h-full border-r border-surface last:border-r-0" />
          ))}
      </div>
    </div>
  );
}

export default function CapTable({ params }: WidgetProps) {
  const founders0 = num(params, 'founders', 10000000);
  const pool0 = num(params, 'pool', 0);
  if (!(founders0 > 0) || !(pool0 >= 0)) throw new Error('parameters "founders" must be positive and "pool" zero or more');
  const safes0 = readSafes(params);
  const pre0 = num(params, 'pre', 20000000);
  const money0 = num(params, 'money', 5000000);
  const poolT0 = num(params, 'poolTarget', 10);
  if (!(pre0 > 0) || !(money0 > 0)) throw new Error('parameters "pre" and "money" must be positive');
  if (!(poolT0 >= 0 && poolT0 <= 30)) throw new Error('parameter "poolTarget" must be a percentage from 0 to 30');
  const exit0 = num(params, 'exit', 30000000);
  if (!(exit0 >= 0)) throw new Error('parameter "exit" must be zero or more');

  const [rows, setRows] = useState<Row[]>(() => safes0.map((s) => ({ amount: mill(s.amount), cap: mill(s.cap) })));
  const [safeType, setSafeType] = useState<SafeType>(oneOf(params, 'safeType', ['post', 'pre'] as const, 'post'));
  const [roundOn, setRoundOn] = useState(bool(params, 'round', false));
  const [pre, setPre] = useState(pre0);
  const [money, setMoney] = useState(money0);
  const [poolT, setPoolT] = useState(poolT0);
  const [timing, setTiming] = useState<PoolTiming>(oneOf(params, 'poolTiming', ['pre', 'post'] as const, 'pre'));
  const [saleOn, setSaleOn] = useState(bool(params, 'waterfall', false));
  const [exit, setExit] = useState(exit0);

  const parsed = rows.map((r) => ({ amount: parseFloat(r.amount) * 1e6, cap: parseFloat(r.cap) * 1e6 }));
  const valid = parsed.map((s) => Number.isFinite(s.amount) && Number.isFinite(s.cap) && s.amount > 0 && s.cap > 0);
  const safes = parsed.filter((_, i) => valid[i]);
  const idx = parsed.map((_, i) => (valid[i] ? valid.slice(0, i).filter(Boolean).length : -1));

  const key = JSON.stringify([safes, safeType, roundOn, pre, money, poolT, timing, founders0, pool0]);
  const res = useMemo(
    () => computeCapTable({ founders: founders0, pool: pool0, safes, safeType, round: roundOn ? { pre, money, poolTarget: poolT / 100, poolTiming: timing } : null }),
    [key], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const preMax = Math.max(60e6, 2 * pre0);
  const moneyMax = Math.max(20e6, 2 * money0);
  const capMax = safes.reduce((a, s) => Math.max(a, s.cap), 0);
  const exitMax = Math.max(2 * exit0, roundOn ? 4 * (pre + money) : 4 * capMax, 10e6);
  const exitStep = niceStep(exitMax);
  const exitTop = Math.ceil(exitMax / exitStep) * exitStep;

  const s1 = res.stage1;
  const s2 = res.stage2;
  const fin = s2 ?? s1;
  const sold = res.safeFractions.reduce((a, b) => a + b, 0);

  const barParts = (st: typeof s1) => [
    { value: st.founders, color: C_FOUNDERS, name: 'Founders' },
    { value: st.pool, color: C_POOL, name: 'Option pool' },
    ...st.safes.map((s, i) => ({ value: s.shares, color: C_SAFE, opacity: 1 - 0.13 * i, name: `SAFE ${i + 1}` })),
    { value: st.investors, color: C_INV, name: 'New investors' },
  ];

  // Sale: preferred = each SAFE (its purchase amount) and the round's investors (their money).
  const sale = useMemo(() => {
    if (!saleOn || res.error) return null;
    const classes = [
      { label: 'Founders', shares: fin.founders, pref: 0 },
      ...fin.safes.map((s, i) => ({ label: `SAFE ${i + 1}`, shares: s.shares, pref: safes[i].amount })),
      ...(s2 ? [{ label: 'New investors', shares: s2.investors, pref: money }] : []),
    ];
    return { classes, w: waterfall(classes, exit) };
  }, [saleOn, key, exit]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (i: number, field: keyof Row, v: string) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, [field]: v } : r)));
  const th = 'px-2 py-1 text-left font-medium';
  const td = 'whitespace-nowrap px-2 py-1 font-mono tabular-nums';

  return (
    <Frame title={str(params, 'title', 'Cap table: SAFEs, a priced round and the pool')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="space-y-2">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="text-[13px] font-medium text-ink">SAFEs (amounts and caps in USD millions)</div>
          <Segmented
            options={[
              { value: 'post', label: 'Post-money caps' },
              { value: 'pre', label: 'Pre-money caps' },
            ]}
            value={safeType}
            onChange={setSafeType}
          />
        </div>
        {rows.length === 0 && <div className="text-[13px] text-ink-3">No SAFEs. Add one, or go straight to the priced round.</div>}
        {rows.map((r, i) => {
          const j = idx[i];
          return (
            <div key={i} className="flex flex-wrap items-end gap-2 rounded-lg border border-line bg-surface-2/50 px-2 py-1.5">
              <span className="inline-flex w-16 items-center gap-1.5 whitespace-nowrap pb-1.5 text-xs font-medium text-ink-2">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: C_SAFE, opacity: 1 - 0.13 * Math.max(0, j) }} />
                SAFE {i + 1}
              </span>
              <label className="min-w-26 flex-1 text-xs text-ink-3">
                Amount
                <input type="number" inputMode="decimal" min={0} step={0.05} value={r.amount} onChange={(e) => update(i, 'amount', e.target.value)} className="input mt-0.5 px-2 py-1 font-mono text-[13px]" aria-invalid={!valid[i]} />
              </label>
              <label className="min-w-26 flex-1 text-xs text-ink-3">
                {safeType === 'post' ? 'Post-money cap' : 'Pre-money cap'}
                <input type="number" inputMode="decimal" min={0} step={0.5} value={r.cap} onChange={(e) => update(i, 'cap', e.target.value)} className="input mt-0.5 px-2 py-1 font-mono text-[13px]" aria-invalid={!valid[i]} />
              </label>
              <span className="w-18 pb-1.5 text-right font-mono text-[13px] tabular-nums text-ink" title="Share of the company this SAFE gets if it converts at its cap, before any round">
                {j >= 0 && s1.safes[j] ? pct(s1.safes[j].shares, s1.total) : '–'}
              </span>
              <button type="button" onClick={() => setRows((rs) => rs.filter((_, k) => k !== i))} className="btn-outline mb-0.5 px-2 py-1 text-xs" aria-label={`Remove SAFE ${i + 1}`}>
                Remove
              </button>
            </div>
          );
        })}
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setRows((rs) => [...rs, { amount: '0.5', cap: '10' }])} disabled={rows.length >= MAX_SAFES}>
            Add SAFE
          </Button>
          <Button onClick={() => setRows(safes0.map((s) => ({ amount: mill(s.amount), cap: mill(s.cap) })))}>Reset SAFEs</Button>
        </div>
        {valid.some((v) => !v) && <Note tone="warn">A row with a missing or zero amount or cap is ignored until you fix it.</Note>}
      </div>

      <div className="space-y-3 border-t border-line pt-3">
        <Toggle label="Add a priced round" checked={roundOn} onChange={setRoundOn} />
        {roundOn && (
          <>
            <Controls>
              <Slider label="Pre-money valuation" value={pre} min={1e6} max={preMax} step={250000} onChange={setPre} format={usd} />
              <Slider label="New money" value={money} min={250000} max={moneyMax} step={250000} onChange={setMoney} format={usd} />
              <Slider label="Available pool after closing" value={poolT} min={0} max={30} step={1} onChange={setPoolT} format={(v) => `${v.toFixed(0)}%`} />
              <Segmented
                label="Pool increase"
                options={[
                  { value: 'pre', label: 'In the pre-money' },
                  { value: 'post', label: 'After closing' },
                ]}
                value={timing}
                onChange={setTiming}
              />
            </Controls>
          </>
        )}
      </div>

      {res.error ? (
        <Note tone="warn">{res.error}</Note>
      ) : (
        <>
          <div className="space-y-2 border-t border-line pt-3">
            <Bar parts={barParts(s1)} label={rows.length ? 'SAFEs converted at their caps, before any round' : 'Today'} />
            {s2 && <Bar parts={barParts(s2)} label="After the priced round" />}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-2">
              {[
                ['Founders', C_FOUNDERS],
                ['Option pool', C_POOL],
                ['SAFEs', C_SAFE],
                ['New investors', C_INV],
              ].map(([n, c]) => (
                <span key={n} className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full border-collapse text-[12px]">
              <thead className="bg-surface-2 text-ink-2">
                <tr>
                  <th className={th}>Holder</th>
                  <th className={`${th} text-right`}>{s2 ? 'Shares after round' : 'Shares'}</th>
                  <th className={`${th} text-right`}>Before round</th>
                  {s2 && <th className={`${th} text-right`}>After round</th>}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Founders', a: s1.founders, b: s2?.founders },
                  { name: 'Option pool', a: s1.pool, b: s2?.pool },
                  ...s1.safes.map((s, i) => ({ name: `SAFE ${i + 1}${s2?.safes[i].atRound ? ' (at round price)' : ''}`, a: s.shares, b: s2?.safes[i].shares })),
                  ...(s2 ? [{ name: 'New investors', a: 0, b: s2.investors }] : []),
                ].map((r) => (
                  <tr key={r.name} className="border-t border-line">
                    <td className="px-2 py-1 text-ink">{r.name}</td>
                    <td className={`${td} text-right text-ink-2`}>{shares(r.b ?? r.a)}</td>
                    <td className={`${td} text-right`}>{pct(r.a, s1.total)}</td>
                    {s2 && <td className={`${td} text-right`}>{pct(r.b ?? 0, s2.total)}</td>}
                  </tr>
                ))}
                <tr className="border-t border-line bg-surface-2/60">
                  <td className="px-2 py-1 font-medium text-ink">Fully diluted</td>
                  <td className={`${td} text-right`}>{shares(fin.total)}</td>
                  <td className={`${td} text-right`}>100%</td>
                  {s2 && <td className={`${td} text-right`}>100%</td>}
                </tr>
              </tbody>
            </table>
          </div>

          <Controls cols={3}>
            {rows.length > 0 && <Readout label={safeType === 'post' ? 'Sold on SAFEs (sum of amount / cap)' : 'Sold on SAFEs, at their caps'} value={safeType === 'post' ? `${(100 * sold).toFixed(2)}%` : pct(s1.safes.reduce((a, s) => a + s.shares, 0), s1.total)} tone={C_SAFE} />}
            {rows.length > 0 && <Readout label={safeType === 'post' ? 'Company Capitalization' : 'Shares before SAFEs'} value={shares(safeType === 'post' ? s1.total : founders0 + pool0)} />}
            {s1.safes.length > 0 && <Readout label="SAFE price per share at the cap" value={(s2 ?? s1).safes.map((s) => s.safePrice.toFixed(4)).join(', ')} />}
            {s2 && <Readout label="Round price per share" value={price(s2.price)} tone={C_INV} />}
            {s2 && <Readout label="Pool increase (shares)" value={shares(s2.poolIncrease)} tone={C_POOL} />}
            {s2 && <Readout label="Post-money valuation" value={usd(s2.post)} />}
            {s2 && <Readout label="Existing shares priced at (effective pre-money)" value={usd(s2.effectivePre)} tone={C_FOUNDERS} />}
          </Controls>
          {s2 && !s2.converged && <Note tone="warn">The conversion did not settle; treat these numbers as approximate.</Note>}
          {s2?.safes.some((s) => s.atRound) && <Note>The round is priced below at least one SAFE's price, so that SAFE converts at the round price instead and gets more shares.</Note>}

          <div className="space-y-3 border-t border-line pt-3">
            <Toggle label="Sell the company: who gets paid?" checked={saleOn} onChange={setSaleOn} />
            {sale && (
              <>
                <Slider label="Sale price, after debt and fees" value={Math.min(exit, exitTop)} min={0} max={exitTop} step={exitStep} onChange={setExit} format={usd} />
                <div className="overflow-x-auto rounded-lg border border-line">
                  <table className="w-full border-collapse text-[12px]">
                    <thead className="bg-surface-2 text-ink-2">
                      <tr>
                        <th className={th}>Holder</th>
                        <th className={`${th} text-right`}>Owns</th>
                        <th className={`${th} text-right`}>Receives</th>
                        <th className={`${th} text-right`}>Share of sale</th>
                        <th className={th}>Takes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sale.classes.map((c, i) => (
                        <tr key={c.label} className="border-t border-line">
                          <td className="px-2 py-1 text-ink">{c.label}</td>
                          <td className={`${td} text-right`}>{pct(c.shares, fin.total)}</td>
                          <td className={`${td} text-right`}>{usdShort(sale.w.payouts[i])}</td>
                          <td className={`${td} text-right`}>{pct(sale.w.payouts[i], exit)}</td>
                          <td className="px-2 py-1 text-ink-2">{c.pref === 0 ? 'common' : sale.w.converts[i] ? 'converts' : 'preference'}</td>
                        </tr>
                      ))}
                      {fin.pool > 0 && (
                        <tr className="border-t border-line">
                          <td className="px-2 py-1 text-ink">Unissued pool</td>
                          <td className={`${td} text-right`}>{pct(fin.pool, fin.total)}</td>
                          <td className={`${td} text-right`}>{usdShort(0)}</td>
                          <td className={`${td} text-right`}>0.00%</td>
                          <td className="px-2 py-1 text-ink-2">nothing</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Readout label="Value of one common share" value={price(sale.w.x)} tone={C_FOUNDERS} />
                <Note>
                  Simplified: each SAFE and the new investors hold a 1x non-participating preference equal to what they paid, all ranking equally; nobody participates; the unissued pool gets nothing.
                  {!s2 && ' With no priced round, each SAFE takes the greater of its money back and its share at the cap.'}
                </Note>
              </>
            )}
          </div>
        </>
      )}
    </Frame>
  );
}
