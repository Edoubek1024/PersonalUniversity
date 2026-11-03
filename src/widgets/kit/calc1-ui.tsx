/**
 * Small UI pieces shared by the Calculus I widgets: a log-scale slider, a compact number table,
 * example tabs, plot bands and a cheap many-dots path.
 */
import type { ReactNode } from 'react';
import { usePlot } from './Plot';
import { Segmented, Slider } from './controls';
import { fmt } from './num';

/** A slider over a positive quantity on a logarithmic scale (good for ε, δ, h, zoom). */
export function LogSlider({ label, value, min, max, onChange, format = (v) => fmt(v), steps = 200, disabled }: { label: ReactNode; value: number; min: number; max: number; onChange: (v: number) => void; format?: (v: number) => string; steps?: number; disabled?: boolean }) {
  const lo = Math.log10(min);
  const hi = Math.log10(max);
  return <Slider label={label} value={Math.log10(Math.min(max, Math.max(min, value)))} min={lo} max={hi} step={(hi - lo) / steps} onChange={(s) => onChange(Math.pow(10, s))} format={(s) => format(Math.pow(10, s))} disabled={disabled} />;
}

/** A compact numeric table that scrolls sideways inside its card on a narrow screen. */
export function NumTable({ head, rows, highlight }: { head: ReactNode[]; rows: ReactNode[][]; highlight?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-xs tabular-nums">
        <thead className="bg-surface-2 text-ink-2">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-2.5 py-1.5 text-right font-medium first:text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono">
          {rows.map((r, i) => (
            <tr key={i} className={`border-t border-line ${i === highlight ? 'bg-accent/10' : ''}`}>
              {r.map((c, j) => (
                <td key={j} className="whitespace-nowrap px-2.5 py-1 text-right first:text-left">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Vertical band lo < x < hi across the whole plot. */
export function VBand({ lo, hi, fill, opacity = 0.14 }: { lo: number; hi: number; fill: string; opacity?: number }) {
  const { sx, height } = usePlot();
  const x0 = Math.max(-10, Math.min(sx(lo), sx(hi)));
  const x1 = Math.min(1e5, Math.max(sx(lo), sx(hi)));
  return <rect x={x0} y={0} width={Math.max(0, x1 - x0)} height={height} fill={fill} fillOpacity={opacity} />;
}

/** Horizontal band lo < y < hi across the whole plot. */
export function HBand({ lo, hi, fill, opacity = 0.14 }: { lo: number; hi: number; fill: string; opacity?: number }) {
  const { sy, width } = usePlot();
  const y0 = Math.max(-10, Math.min(sy(lo), sy(hi)));
  const y1 = Math.min(1e5, Math.max(sy(lo), sy(hi)));
  return <rect x={0} y={y0} width={width} height={Math.max(0, y1 - y0)} fill={fill} fillOpacity={opacity} />;
}

/** Many dots as one path of zero-length round-capped segments (cheap for hundreds of points). */
export function Dots({ points, r = 3, color = 'var(--plot-1)' }: { points: [number, number][]; r?: number; color?: string }) {
  const { sx, sy, width, height } = usePlot();
  let d = '';
  for (const [x, y] of points) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    const px = sx(x);
    const py = sy(y);
    if (px < -10 || px > width + 10 || py < -10 || py > height + 10) continue;
    d += `M${px.toFixed(1)},${py.toFixed(1)}h0`;
  }
  return <path d={d} stroke={color} strokeWidth={2 * r} strokeLinecap="round" fill="none" />;
}

/** Text pinned to a pixel corner of the plot (for small legends inside a plot). */
export function Corner({ children, corner = 'tl', color = 'var(--plot-text)' }: { children: ReactNode; corner?: 'tl' | 'tr' | 'bl' | 'br'; color?: string }) {
  const { width, height } = usePlot();
  const x = corner.endsWith('l') ? 8 : width - 8;
  const y = corner.startsWith('t') ? 16 : height - 8;
  return (
    <text x={x} y={y} textAnchor={corner.endsWith('l') ? 'start' : 'end'} fontSize={12} fill={color} style={{ paintOrder: 'stroke', stroke: 'var(--color-surface)', strokeWidth: 3, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

type Params = Record<string, unknown>;

/**
 * Reads an `examples` parameter: an array of objects, each with a "label" and any of the widget's
 * own parameters, which override the top-level ones while that example is selected.
 */
export function readExamples(p: Params): { label: string; params: Params }[] {
  const v = p.examples;
  if (v === undefined) return [];
  if (!Array.isArray(v) || !v.every((e) => e && typeof e === 'object' && !Array.isArray(e) && typeof (e as Params).label === 'string')) {
    throw new Error('parameter "examples" should be an array of objects, each with a "label" string');
  }
  return (v as Params[]).map((e) => {
    const { label, ...rest } = e;
    return { label: label as string, params: { ...p, ...rest } };
  });
}

export function ExampleTabs({ examples, value, onChange }: { examples: { label: string }[]; value: number; onChange: (i: number) => void }) {
  if (examples.length < 2) return null;
  return <Segmented label="Example" options={examples.map((e, i) => ({ value: String(i), label: e.label }))} value={String(value)} onChange={(v) => onChange(Number(v))} />;
}

/** A small coloured line swatch for legends. */
export function Swatch({ color, dash }: { color: string; dash?: boolean }) {
  return <span className="inline-block h-0 w-4 align-middle" style={{ borderTop: `2.5px ${dash ? 'dashed' : 'solid'} ${color}` }} />;
}

export function Legend({ items }: { items: { color: string; label: ReactNode; dash?: boolean }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <Swatch color={it.color} dash={it.dash} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

/** Readouts in two columns on a phone and three on wider screens. */
export function ReadoutGrid({ children }: { children: ReactNode }) {
  // Labels keep their case: readout names here are maths (cos θ, f′(a)), which uppercase would garble.
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-x-3 [&_.uppercase]:normal-case [&_.uppercase]:tracking-normal">{children}</div>;
}
