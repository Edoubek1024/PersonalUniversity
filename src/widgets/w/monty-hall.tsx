/**
 * monty-hall: play the Monty Hall game by hand (pick a door, the host opens goat doors, stay or
 * switch) and run many simulated games of each strategy, with win rates against the exact
 * answers 1/n (stay) and (n − 1)/n (switch).
 *
 * Params:
 *   doors    number   number of doors, 3 to 10; the host opens all but one other   default 3
 *   title    string                                                    default "Monty Hall"
 *   caption  string
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { num, str } from '../kit/params';
import { Button, Frame, Note, Readout, Slider } from '../kit/controls';

type Phase = 'pick' | 'decide' | 'done';

export default function MontyHall({ params }: WidgetProps) {
  const d0 = num(params, 'doors', 3);
  if (!Number.isInteger(d0) || d0 < 3 || d0 > 10) throw new Error('parameter "doors" should be a whole number from 3 to 10');
  const [doors, setDoors] = useState(d0);
  const [car, setCar] = useState(() => Math.floor(Math.random() * d0));
  const [pick, setPick] = useState<number | null>(null);
  const [closed, setClosed] = useState<number | null>(null); // the other door left shut
  const [final, setFinal] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('pick');
  const [hand, setHand] = useState({ stayW: 0, stayN: 0, switchW: 0, switchN: 0 });
  const [sim, setSim] = useState({ stayW: 0, switchW: 0, n: 0 });

  const newGame = (nd = doors) => {
    setCar(Math.floor(Math.random() * nd));
    setPick(null);
    setClosed(null);
    setFinal(null);
    setPhase('pick');
  };
  const choose = (i: number) => {
    if (phase !== 'pick') return;
    setPick(i);
    // The host keeps one other door shut: the car if you missed it, otherwise a random goat door.
    const others = [...Array(doors).keys()].filter((x) => x !== i);
    setClosed(i === car ? others[Math.floor(Math.random() * others.length)] : car);
    setPhase('decide');
  };
  const decide = (sw: boolean) => {
    const f = sw ? closed! : pick!;
    setFinal(f);
    setPhase('done');
    const win = f === car;
    setHand((h) => (sw ? { ...h, switchN: h.switchN + 1, switchW: h.switchW + +win } : { ...h, stayN: h.stayN + 1, stayW: h.stayW + +win }));
  };
  const simulate = (count: number) => {
    let sw = 0;
    let st = 0;
    for (let t = 0; t < count; t++) {
      const c = Math.floor(Math.random() * doors);
      const p = Math.floor(Math.random() * doors);
      if (p === c) st++;
      else sw++; // switching wins exactly when the first pick was wrong
    }
    setSim((s) => ({ stayW: s.stayW + st, switchW: s.switchW + sw, n: s.n + count }));
  };
  const pct = (w: number, n: number) => (n ? `${((100 * w) / n).toFixed(1)}%` : '–');
  const open = (i: number) => phase === 'done' || (phase === 'decide' && i !== pick && i !== closed);

  return (
    <Frame title={str(params, 'title', 'Monty Hall')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap justify-center gap-2">
        {[...Array(doors).keys()].map((i) => {
          const isOpen = open(i);
          const prize = isOpen ? (i === car ? 'car' : 'goat') : '?';
          const mine = i === pick;
          const fin = i === final;
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={phase !== 'pick'}
              aria-label={`Door ${i + 1}${isOpen ? (i === car ? ': car' : ': goat') : ''}${mine ? ', your pick' : ''}`}
              className="flex h-20 w-14 flex-col items-center justify-between rounded-lg border-2 px-1 py-1.5 text-xs font-semibold sm:h-24 sm:w-16"
              style={{
                borderColor: fin ? (i === car ? 'var(--plot-3)' : 'var(--plot-2)') : mine ? 'var(--color-accent)' : 'var(--color-line)',
                background: isOpen ? 'var(--color-surface)' : 'color-mix(in srgb, var(--plot-4) 22%, var(--color-surface-2))',
                cursor: phase === 'pick' ? 'pointer' : 'default',
              }}
            >
              <span className="text-ink-2">{i + 1}</span>
              <span className="text-sm font-bold leading-none" aria-hidden style={{ color: !isOpen ? 'var(--color-ink-3)' : i === car ? 'var(--plot-3)' : 'var(--color-ink-2)' }}>
                {prize}
              </span>
              <span className="h-3 text-[10px] text-ink-3">{mine ? 'yours' : phase === 'decide' && i === closed ? 'shut' : ''}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {phase === 'pick' && <span className="text-[13px] text-ink-2">Pick a door.</span>}
        {phase === 'decide' && (
          <>
            <span className="text-[13px] text-ink-2">
              The host, who knows where the car is, opened {doors - 2} goat door{doors > 3 ? 's' : ''}.
            </span>
            <Button onClick={() => decide(false)}>Stay with {pick! + 1}</Button>
            <Button primary onClick={() => decide(true)}>
              Switch to {closed! + 1}
            </Button>
          </>
        )}
        {phase === 'done' && (
          <>
            <span className="text-[13px] font-semibold" style={{ color: final === car ? 'var(--plot-3)' : 'var(--plot-2)' }}>
              {final === car ? 'You win the car.' : 'A goat.'}
            </span>
            <Button primary onClick={() => newGame()}>
              Play again
            </Button>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Readout label="you: stay" value={`${hand.stayW} / ${hand.stayN} (${pct(hand.stayW, hand.stayN)})`} />
        <Readout label="you: switch" value={`${hand.switchW} / ${hand.switchN} (${pct(hand.switchW, hand.switchN)})`} />
      </div>
      <div className="space-y-2 border-t border-line pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => simulate(100)}>Simulate 100 games</Button>
          <Button onClick={() => simulate(10000)}>Simulate 10 000</Button>
          <Button onClick={() => setSim({ stayW: 0, switchW: 0, n: 0 })} disabled={!sim.n}>
            Clear
          </Button>
          <div className="ml-auto w-44">
            <Slider
              label="Doors"
              value={doors}
              min={3}
              max={10}
              step={1}
              onChange={(v) => {
                setDoors(v);
                setSim({ stayW: 0, switchW: 0, n: 0 });
                setHand({ stayW: 0, stayN: 0, switchW: 0, switchN: 0 });
                newGame(v);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Readout label={`sim stay (exact ${(100 / doors).toFixed(1)}%)`} value={sim.n ? `${pct(sim.stayW, sim.n)} of ${sim.n}` : '–'} tone="var(--plot-2)" />
          <Readout label={`sim switch (exact ${((100 * (doors - 1)) / doors).toFixed(1)}%)`} value={sim.n ? `${pct(sim.switchW, sim.n)} of ${sim.n}` : '–'} tone="var(--plot-3)" />
        </div>
        {sim.n > 0 && (
          <Note>
            Switching wins exactly when your first pick was wrong, which has probability {doors - 1}/{doors}. With N = {sim.n} games the estimate is good to about ±{(100 / Math.sqrt(sim.n)).toFixed(1)} percentage points (error ~ 1/√N).
          </Note>
        )}
      </div>
    </Frame>
  );
}
