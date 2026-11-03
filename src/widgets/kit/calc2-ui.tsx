/**
 * Small UI pieces shared by the Calculus II widgets: a colour legend, Play/Pause/Step/Reset
 * buttons, and state for lesson-defined parameter sliders.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import { Button, Slider, Tex } from './controls';
import type { SliderDef } from './params';

export function Legend({ items }: { items: { color: string; label: ReactNode; dash?: boolean; box?: boolean }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {it.box ? (
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: it.color, opacity: 0.35 }} />
          ) : (
            <span
              className="inline-block h-0 w-5"
              style={{ borderTop: `2.5px ${it.dash ? 'dashed' : 'solid'} ${it.color}` }}
            />
          )}
          {typeof it.label === 'string' ? <Tex>{it.label}</Tex> : it.label}
        </span>
      ))}
    </div>
  );
}

export function PlayBar({ playing, onPlay, onStep, onReset, children }: { playing: boolean; onPlay: () => void; onStep?: () => void; onReset: () => void; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Button primary onClick={onPlay} title={playing ? 'Pause' : 'Play'}>
        <span className="inline-flex items-center gap-1">
          {playing ? <Pause size={13} aria-hidden /> : <Play size={13} aria-hidden />}
          {playing ? 'Pause' : 'Play'}
        </span>
      </Button>
      {onStep && (
        <Button onClick={onStep} title="Step">
          <span className="inline-flex items-center gap-1">
            <StepForward size={13} aria-hidden />
            Step
          </span>
        </Button>
      )}
      <Button onClick={onReset} title="Reset">
        <span className="inline-flex items-center gap-1">
          <RotateCcw size={13} aria-hidden />
          Reset
        </span>
      </Button>
      {children}
    </div>
  );
}

/** Values for lesson-defined sliders, in definition order, with a setter. */
export function useSliderValues(defs: SliderDef[]) {
  const key = defs.map((d) => `${d.name}:${d.value}`).join('|');
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(defs.map((d) => [d.name, d.value])));
  const names = useMemo(() => defs.map((d) => d.name), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const args = names.map((n) => values[n] ?? 0);
  const set = (name: string, v: number) => setValues((s) => ({ ...s, [name]: v }));
  return { names, args, values, set };
}

/** One Slider per definition. Names that look like Greek letters are shown as symbols. */
export function ParamSliders({ defs, values, set }: { defs: SliderDef[]; values: Record<string, number>; set: (name: string, v: number) => void }) {
  return (
    <>
      {defs.map((d) => (
        <Slider key={d.name} label={<Tex>{greek(d.name)}</Tex>} value={values[d.name]} min={d.min} max={d.max} step={d.step} onChange={(v) => set(d.name, v)} />
      ))}
    </>
  );
}

const GREEK = new Set(['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'theta', 'lambda', 'mu', 'sigma', 'omega', 'phi', 'rho', 'tau']);

export function greek(name: string): string {
  return GREEK.has(name) ? `\\${name}` : name;
}

/** Readouts two to a row on a phone and three on wider screens. */
export function ReadoutGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">{children}</div>;
}
