/**
 * Small UI pieces shared by the economics widgets: a legend with line and area swatches, a
 * readout grid, number formatting with units, and plot helpers for shaded areas and brackets.
 */
import type { ReactNode } from 'react';
import { usePlot } from './Plot';
import { clamp, fmt } from './num';

/** Series colours used consistently across the economics widgets. */
export const EC = {
  demand: 'var(--plot-1)',
  supply: 'var(--plot-2)',
  cs: 'var(--plot-1)',
  ps: 'var(--plot-3)',
  gov: 'var(--plot-4)',
  dwl: 'var(--plot-6)',
  extra: 'var(--plot-4)',
} as const;

/**
 * A number with an optional unit after it ("4.5 USD", "120 units"). Values of 1,000 or more are
 * rounded to whole numbers and grouped with commas, matching how the lessons write them.
 */
export function withUnit(x: number, unit: string, digits = 3): string {
  const s = Number.isFinite(x) && Math.abs(x) >= 1000 && Math.abs(x) < 1e12 ? fmtBig(x) : fmt(x, digits);
  return unit ? `${s} ${unit}` : s;
}

function fmtBig(x: number): string {
  const s = Math.round(Math.abs(x)).toLocaleString('en-US');
  return x < 0 ? `−${s}` : s;
}

const titleStyle = { paintOrder: 'stroke' as const, stroke: 'var(--color-surface)', strokeWidth: 3, strokeLinejoin: 'round' as const };

/**
 * Axis names that do not collide with tick labels. The kit's Plot draws its axis names on top of
 * the tick labels when an axis sits on the edge of the plot (as it does for price and quantity,
 * which start at zero), so the economics widgets pass no xLabel/yLabel to Plot and draw these.
 */
export function AxisTitles({ x, y }: { x?: string; y?: string }) {
  const { sx, sy, width, height } = usePlot();
  const ax = clamp(sy(0), 0, height);
  const ay = clamp(sx(0), 0, width);
  // Tick labels sit above an axis on the bottom edge and to the right of an axis on the left edge.
  const xBaseline = ax < height - 18 ? ax - 6 : ax - 21;
  const yLeft = ay > 30 ? ay + 6 : ay + 34;
  return (
    <g fontStyle="italic" fontSize={12} fill="var(--plot-text)" style={titleStyle}>
      {x && (
        <text x={width - 6} y={xBaseline} textAnchor="end">
          {x}
        </text>
      )}
      {y && (
        <text x={yLeft} y={13}>
          {y}
        </text>
      )}
    </g>
  );
}

export interface LegendItem {
  color: string;
  label: ReactNode;
  /** 'line' (default), 'dash' or 'box' (a shaded area). */
  kind?: 'line' | 'dash' | 'box';
}

export function EconLegend({ items }: { items: LegendItem[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {it.kind === 'box' ? (
            <span className="inline-block h-3 w-3.5 rounded-sm" style={{ background: it.color, opacity: 0.45, outline: `1px solid ${it.color}` }} />
          ) : (
            <span className="inline-block h-0 w-4 align-middle" style={{ borderTop: `2.5px ${it.kind === 'dash' ? 'dashed' : 'solid'} ${it.color}` }} />
          )}
          {it.label}
        </span>
      ))}
    </div>
  );
}

/** Readouts in two columns on a phone and three on wider screens. */
export function EconReadouts({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-x-3">{children}</div>;
}

/** A filled polygon in data coordinates (no outline). Skips degenerate input. */
export function Area({ points, fill, opacity = 0.3 }: { points: [number, number][]; fill: string; opacity?: number }) {
  const { sx, sy } = usePlot();
  const ok = points.length >= 3 && points.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
  if (!ok) return null;
  const pts = points.map(([x, y]) => `${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(' ');
  return <polygon points={pts} fill={fill} fillOpacity={opacity} stroke="none" />;
}

/**
 * A horizontal bracket from x1 to x2 at height y, with a label: used for shortages, surpluses,
 * imports and exports. Drawn in pixels so it stays readable at any zoom.
 */
export function HBracket({ x1, x2, y, label, color = 'var(--plot-text)', above = true }: { x1: number; x2: number; y: number; label: ReactNode; color?: string; above?: boolean }) {
  const { sx, sy } = usePlot();
  if (![x1, x2, y].every(Number.isFinite) || Math.abs(sx(x2) - sx(x1)) < 4) return null;
  const a = Math.min(sx(x1), sx(x2));
  const b = Math.max(sx(x1), sx(x2));
  const py = sy(y) + (above ? -9 : 9);
  const tick = above ? 5 : -5;
  return (
    <g stroke={color} fill="none" strokeWidth={1.5}>
      <path d={`M${a},${py + tick} V${py} H${b} V${py + tick}`} />
      <text x={(a + b) / 2} y={above ? py - 4 : py + 13} textAnchor="middle" fontSize={11} fill={color} stroke="var(--color-surface)" strokeWidth={3} style={{ paintOrder: 'stroke' }}>
        {label}
      </text>
    </g>
  );
}

/** A short tick label on the vertical axis at price y (drawn just inside the plot). */
export function YTag({ y, label, color }: { y: number; label: ReactNode; color: string }) {
  const { sy, height } = usePlot();
  if (!Number.isFinite(y)) return null;
  const py = sy(y);
  if (py < 6 || py > height - 4) return null;
  return (
    <text x={4} y={py - 4} fontSize={11} fill={color} style={{ paintOrder: 'stroke', stroke: 'var(--color-surface)', strokeWidth: 3, strokeLinejoin: 'round' }}>
      {label}
    </text>
  );
}
