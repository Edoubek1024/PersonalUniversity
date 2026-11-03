/**
 * Small UI helpers for the Calculus III widgets: captions with inline $TeX$, TeX labels that
 * survive the uppercase Readout label style, resolved theme colours for canvas drawing, and
 * reading point parameters.
 */
import { Fragment, useMemo, type ReactNode } from 'react';
import { Tex } from './controls';
import { useDark, cssVar } from './hooks';
import { numArray } from './params';
import { parseColor } from './calc3-contour';

/** Plain text in which $...$ spans are rendered with KaTeX. */
export function Rich({ text }: { text: string }) {
  const parts = text.split('$');
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <Tex key={i}>{p}</Tex> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}

export function caption(params: Record<string, unknown>): ReactNode {
  return typeof params.caption === 'string' ? <Rich text={params.caption} /> : undefined;
}

/** A TeX label for Readout (whose label is styled uppercase). */
export function TL({ children }: { children: string }) {
  return (
    <span className="normal-case tracking-normal">
      <Tex>{children}</Tex>
    </span>
  );
}

/** The --plot-* and site colours resolved for canvas, refreshed when the theme changes. */
export function useColors() {
  const dark = useDark();
  return useMemo(() => {
    const v = (n: string) => cssVar(n, dark) || '#888888';
    return {
      dark,
      p: [1, 2, 3, 4, 5, 6].map((i) => v(`--plot-${i}`)),
      grid: v('--plot-grid'),
      axis: v('--plot-axis'),
      text: v('--plot-text'),
      surface: v('--color-surface'),
      ink: v('--color-ink'),
      rgb: (n: string) => parseColor(v(n)),
    };
  }, [dark]);
}

export type Colors = ReturnType<typeof useColors>;

/** A point parameter [x, y]. */
export function point(p: Record<string, unknown>, key: string, def: [number, number]): [number, number] {
  const v = numArray(p, key, def);
  if (v.length !== 2) throw new Error(`parameter "${key}" should be a point [x, y], got ${JSON.stringify(v)}`);
  return [v[0], v[1]];
}

export function rgba([r, g, b]: readonly number[], a: number): string {
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
}
