/**
 * UI pieces shared by the General Chemistry Lab I simulators (lab-* widgets):
 *
 *   Meniscus      a magnified view of a graduated scale and the liquid surface, which the learner
 *                 reads to one tenth of the smallest division (the instrument does not print it)
 *   Display       an instrument's digital display (balance, thermometer, pH meter, barometer)
 *   SampleBar     the sample number and a "New sample" button (each sample is a fresh seed)
 *   CheckResult   the learner types a computed result; it is compared with the sample's true value
 *   DataLog       a small table of logged readings with "Copy as CSV" for a spreadsheet
 *   NumberField   a labelled number input
 */
import { useId, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { Button, Note } from './controls';
import { fx } from './chemlab-core';

/** Number formatting for tick labels: integers stay integers. */
function tickLabel(v: number): string {
  return Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(1);
}

export interface MeniscusProps {
  /** The true reading at the bottom of the meniscus, in scale units (mL). */
  level: number;
  /** Smallest graduation (0.1 mL for a burette). */
  minor: number;
  /** Labelled graduation (1 mL). */
  major: number;
  /** Scale units shown in the window (from top to bottom). */
  span: number;
  /** "down": numbers increase downward (burette, gas tube); "up": increase upward (cylinder, beaker). */
  direction: 'down' | 'up';
  /** Only draw ticks inside [min, max]. */
  min?: number;
  max?: number;
  /** Where to centre the window; defaults to the level (a magnifier held at the surface). */
  centre?: number;
  /** Liquid colour (CSS). */
  liquid?: string;
  /** A single calibration mark (volumetric pipet or flask) instead of a full scale. */
  mark?: number;
  label?: string;
  height?: number;
  /** Ticks every `minor` drawn half length every `mid` units (0.5 on a burette). */
  mid?: number;
}

/**
 * The liquid fills the tube below its surface (gravity), whichever way the numbers run. The
 * meniscus is concave: its bottom is at `level`, its edges climb the walls.
 */
export function Meniscus({ level, minor, major, span, direction, min = -Infinity, max = Infinity, centre, liquid = 'var(--chemlab-water)', mark, label = 'Magnified view of the scale', height = 220, mid }: MeniscusProps) {
  const W = 150;
  const H = height;
  const c = centre ?? level;
  const top = direction === 'down' ? c - span / 2 : c + span / 2; // scale value at y = 0
  const k = H / span; // px per unit
  const y = (v: number) => (direction === 'down' ? (v - top) * k : (top - v) * k);
  const tubeL = 58;
  const tubeR = 122;
  const ySurf = y(level);
  const ticks = useMemo(() => {
    if (mark !== undefined) return [];
    const out: { v: number; kind: 'major' | 'mid' | 'minor' }[] = [];
    const lo = Math.max(min, Math.min(top, direction === 'down' ? top + span : top - span));
    const hi = Math.min(max, Math.max(top, direction === 'down' ? top + span : top - span));
    const first = Math.ceil(lo / minor - 1e-9);
    const last = Math.floor(hi / minor + 1e-9);
    for (let i = first; i <= last; i++) {
      const v = i * minor;
      const isMajor = Math.abs(v / major - Math.round(v / major)) < 1e-6;
      const isMid = !isMajor && mid !== undefined && Math.abs(v / mid - Math.round(v / mid)) < 1e-6;
      out.push({ v, kind: isMajor ? 'major' : isMid ? 'mid' : 'minor' });
    }
    return out;
  }, [top, span, minor, major, mid, min, max, direction, mark]);
  // Concave surface: bottom at ySurf, rising about 7 px at the walls.
  const rise = 7;
  const surf = `M${tubeL},${ySurf - rise} C${tubeL + 14},${ySurf + 1} ${tubeR - 14},${ySurf + 1} ${tubeR},${ySurf - rise}`;
  const liquidPath = `${surf} L${tubeR},${H + 2} L${tubeL},${H + 2} Z`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} data-level={level} className="block shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
      <rect x={tubeL} y={0} width={tubeR - tubeL} height={H} fill="var(--chemlab-glass)" />
      {ySurf < H + rise && <path d={liquidPath} fill={liquid} opacity={0.85} />}
      <path d={surf} fill="none" stroke="var(--chemlab-meniscus)" strokeWidth={1.6} />
      <line x1={tubeL} y1={0} x2={tubeL} y2={H} stroke="var(--plot-axis)" strokeWidth={1.5} />
      <line x1={tubeR} y1={0} x2={tubeR} y2={H} stroke="var(--plot-axis)" strokeWidth={1.5} />
      {ticks.map(({ v, kind }) => {
        const yy = y(v);
        const len = kind === 'major' ? 40 : kind === 'mid' ? 28 : 18;
        return (
          <g key={v.toFixed(4)}>
            <line x1={tubeL} x2={tubeL + len} y1={yy} y2={yy} stroke="var(--color-ink)" strokeWidth={kind === 'major' ? 1.6 : 1} />
            {kind === 'major' && (
              <text x={tubeL - 6} y={yy + 4} textAnchor="end" fontSize={13} fill="var(--color-ink)" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {tickLabel(v)}
              </text>
            )}
          </g>
        );
      })}
      {mark !== undefined && (
        <g>
          <line x1={tubeL - 4} x2={tubeR + 4} y1={y(mark)} y2={y(mark)} stroke="var(--color-ink)" strokeWidth={1.4} />
          <text x={tubeL - 6} y={y(mark) - 5} textAnchor="end" fontSize={12} fill="var(--color-ink)">
            mark
          </text>
        </g>
      )}
    </svg>
  );
}

/** An instrument display: a dark panel with a monospaced reading and its unit. */
export function Display({ label, value, unit, tone }: { label: ReactNode; value: string; unit?: string; tone?: 'idle' | 'live' }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-surface-2 px-3 py-1.5" aria-live="polite">
      <div className="text-xs text-ink-3">{label}</div>
      <div className={`font-mono text-base tabular-nums ${tone === 'idle' ? 'text-ink-3' : 'text-ink'}`}>
        {value}
        {unit && <span className="ml-1 text-xs text-ink-2">{unit}</span>}
      </div>
    </div>
  );
}

export function SampleBar({ seed, onNew, fixed, children }: { seed: number; onNew: () => void; fixed?: boolean; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-ink-2">
      <span>
        Sample <span className="font-mono text-ink">#{seed}</span>
        {fixed ? ' (fixed by the lesson)' : ''}
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        {children}
        <Button onClick={onNew} title="Start again with a new sample: new unknowns, new random errors">
          New sample
        </Button>
      </div>
    </div>
  );
}

export function NumberField({ label, value, onChange, placeholder, width = 'w-28' }: { label: ReactNode; value: string; onChange: (v: string) => void; placeholder?: string; width?: string }) {
  const id = useId();
  return (
    <label htmlFor={id} className="inline-flex flex-wrap items-center gap-2 text-[13px] text-ink-2">
      {label}
      <input id={id} inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={`input ${width} px-2 py-1 font-mono text-[13px]`} />
    </label>
  );
}

/** Parses a number typed by a learner: accepts a comma decimal and a leading true minus sign. */
export function parseNum(s: string): number {
  const t = s.trim().replace(/−/g, '-').replace(',', '.');
  if (!t) return NaN;
  return Number(t);
}

/**
 * The learner enters a result computed from their own readings and checks it against the sample's
 * true value, like handing a report on an unknown to an instructor. Shows the percent difference.
 */
export function CheckResult({ label, unit, truth, decimals, tolerancePct, note }: { label: ReactNode; unit: string; truth: number; decimals: number; tolerancePct: number; note?: ReactNode }) {
  const [text, setText] = useState('');
  const [shown, setShown] = useState<number | null>(null);
  const v = parseNum(text);
  const diff = shown === null ? NaN : (100 * (shown - truth)) / Math.abs(truth);
  return (
    <div className="space-y-2 rounded-lg border border-dashed border-line p-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <NumberField label={label} value={text} onChange={(s) => { setText(s); setShown(null); }} placeholder="value" />
        <span className="text-[13px] text-ink-3">{unit}</span>
        <Button onClick={() => setShown(v)} disabled={!Number.isFinite(v)}>
          Check my result
        </Button>
      </div>
      {shown !== null && Number.isFinite(shown) && (
        <Note tone={Math.abs(diff) <= tolerancePct ? 'good' : 'warn'}>
          Your value differs from this sample's true value ({fx(truth, decimals)} {unit}) by {fx(diff, 2)}%.{' '}
          {Math.abs(diff) <= tolerancePct
            ? `That is within the ${tolerancePct}% a careful analysis of good data reaches.`
            : `Careful work reaches ${tolerancePct}%. Recheck the calculation first, then the readings, then look for a systematic error in the procedure.`}
          {note && <> {note}</>}
        </Note>
      )}
    </div>
  );
}

export interface LogColumn {
  key: string;
  label: string;
}

/** Logged readings with a CSV copy for the learner's spreadsheet. */
export function DataLog({ columns, rows, onClear, empty = 'No readings recorded yet.', caption }: { columns: LogColumn[]; rows: Record<string, string>[]; onClear?: () => void; empty?: string; caption?: string }) {
  const [copied, setCopied] = useState(false);
  const csv = [columns.map((c) => c.label).join(','), ...rows.map((r) => columns.map((c) => (r[c.key] ?? '').replace(/−/g, '-')).join(','))].join('\n');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(csv);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[13px] text-ink-2">{caption ?? 'Your recorded readings'}</span>
        <div className="flex gap-1.5">
          <Button onClick={copy} disabled={!rows.length}>
            {copied ? 'Copied' : 'Copy as CSV'}
          </Button>
          {onClear && (
            <Button onClick={onClear} disabled={!rows.length}>
              Clear
            </Button>
          )}
        </div>
      </div>
      {rows.length ? (
        <div className="max-h-56 overflow-auto rounded-lg border border-line">
          <table className="w-full text-[13px] tabular-nums">
            <thead className="sticky top-0 bg-surface-2 text-ink-2">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-2 py-1 text-left font-medium">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono">
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line">
                  {columns.map((c) => (
                    <td key={c.key} className="px-2 py-0.5">
                      {r[c.key] ?? ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-[13px] text-ink-3">{empty}</div>
      )}
    </div>
  );
}

/** CSS custom properties the lab widgets use for glass, water and meniscus lines, per theme. */
export const labVars = {
  '--chemlab-glass': 'color-mix(in oklab, var(--plot-5) 7%, var(--color-surface))',
  '--chemlab-water': 'color-mix(in oklab, var(--plot-5) 28%, var(--color-surface))',
  '--chemlab-meniscus': 'color-mix(in oklab, var(--plot-5) 70%, var(--color-ink))',
} as CSSProperties;

/** A wrapper that defines the lab colour variables for its children. */
export function LabVars({ children }: { children: ReactNode }) {
  return <div style={labVars} className="space-y-3">{children}</div>;
}

/** A row of buttons that wraps on a phone. */
export function ButtonRow({ children, label }: { children: ReactNode; label?: ReactNode }) {
  return (
    <div>
      {label && <div className="mb-1 text-[13px] text-ink-2">{label}</div>}
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

/** A plain-text event log line list (what happened at the bench), newest last. */
export function BenchLog({ lines }: { lines: string[] }) {
  if (!lines.length) return null;
  return (
    <ol className="max-h-32 list-decimal space-y-0.5 overflow-auto rounded-lg border border-line bg-surface-2 py-1.5 pl-8 pr-2 text-[13px] text-ink-2" aria-label="Bench log">
      {lines.map((l, i) => (
        <li key={i}>{l}</li>
      ))}
    </ol>
  );
}
