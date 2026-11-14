/**
 * gen-pedigree: a pedigree drawn from a list of people (or a built-in example), with a
 * mode-of-inheritance checker. Generations, positions and the I-1, II-3 ... labels are worked out
 * from the parent links (people who married in are drawn beside their spouse). Click a symbol (or
 * focus it and press Enter or Space) to toggle whether that person is affected, and watch which
 * modes stay consistent. The checker tests autosomal dominant, autosomal recessive, X-linked
 * dominant, X-linked recessive, Y-linked and mitochondrial inheritance by genotype elimination,
 * assuming complete penetrance and no new mutations, names the individuals that exclude a mode,
 * and says when a consistent mode needs unaffected carriers to have married into the family.
 *
 * Params:
 *   people    object[]   [{"id": "a", "sex": "M" | "F", "affected": true, "carrier": false,
 *                         "deceased": false, "father": "id", "mother": "id"}, ...]; only id and
 *                         sex are required; "carrier" draws a dot (display only)   default none (a preset is used)
 *   preset    string     "ad" | "ar" | "xr" | "xd" | "y" | "mito": a built-in three-generation
 *                         example consistent with that mode                         default "ar" when people is absent
 *   choose    boolean    show buttons to switch between the presets                 default false
 *   editable  boolean    clicking a symbol toggles affected                         default true
 *   check     boolean    show the mode-of-inheritance checker                       default true
 *   title     string                                                                default "Pedigree"
 *   caption   string     what to try
 */
import { useMemo, useState, type KeyboardEvent, type ReactElement } from 'react';
import type { WidgetProps } from '../types';
import { bool, oneOf, str } from '../kit/params';
import { Button, Frame, Note, Segmented } from '../kit/controls';
import { MODE_NAMES, PRESETS, checkModes, layoutPedigree, readPeople, type Person } from '../kit/gen-pedigree';
import { roman } from '../kit/gen-ui';

const PRESET_KEYS = ['ad', 'ar', 'xr', 'xd', 'y', 'mito'] as const;
type PresetKey = (typeof PRESET_KEYS)[number];
const PRESET_LABEL: Record<PresetKey, string> = { ad: 'Example 1', ar: 'Example 2', xr: 'Example 3', xd: 'Example 4', y: 'Example 5', mito: 'Example 6' };

const SLOT = 44;
const S = 24; // symbol size
const GEN_H = 84;
const LEFT = 34;
const TOP = 14;

export default function GenPedigree({ params }: WidgetProps) {
  const given = params.people !== undefined ? readPeople(params.people) : null;
  const preset0 = oneOf(params, 'preset', PRESET_KEYS, 'ar');
  const choose = bool(params, 'choose', false);
  const editable = bool(params, 'editable', true);
  const check = bool(params, 'check', true);
  const [preset, setPreset] = useState<PresetKey>(preset0);
  const base = given ?? PRESETS[preset];
  const [edits, setEdits] = useState<Record<string, boolean>>({});
  const people: Person[] = useMemo(() => base.map((p) => (p.id in edits ? { ...p, affected: edits[p.id] } : p)), [base, edits]);
  const lay = useMemo(() => layoutPedigree(base), [base]);
  const labels = useMemo(() => new Map([...lay.placed.values()].map((q) => [q.p.id, q.label])), [lay]);
  const results = useMemo(() => (check ? checkModes(people, labels) : []), [people, labels, check]);
  const [focus, setFocus] = useState<string | null>(null);

  const W = LEFT + lay.width * SLOT + 8;
  const H = TOP + lay.gens * GEN_H - 10;
  const cx = (id: string) => LEFT + lay.placed.get(id)!.x * SLOT + SLOT / 2;
  const cy = (id: string) => TOP + lay.placed.get(id)!.gen * GEN_H + S / 2;
  const affected = new Map(people.map((p) => [p.id, p.affected]));

  const toggle = (id: string) => {
    if (!editable) return;
    setEdits((e) => ({ ...e, [id]: !(affected.get(id) ?? false) }));
  };
  const onKey = (id: string) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(id);
    }
  };

  const lines: ReactElement[] = [];
  // marriage lines
  for (const [f, m] of lay.couples) {
    const [a, b] = [cx(f), cx(m)].sort((u, v) => u - v);
    lines.push(<line key={`c${f}${m}`} x1={a + S / 2} x2={b - S / 2} y1={cy(f)} y2={cy(m)} />);
  }
  // descent and sibship lines
  lay.sibships.forEach((s, i) => {
    const kids = s.kids;
    const kidX = kids.map(cx);
    const parents = [s.father, s.mother].filter((v): v is string => !!v);
    const px = parents.length === 2 ? (cx(parents[0]) + cx(parents[1])) / 2 : cx(parents[0]);
    const py = parents.length === 2 ? cy(parents[0]) : cy(parents[0]) + S / 2;
    const sibY = cy(kids[0]) - S / 2 - 16;
    const lo = Math.min(px, ...kidX);
    const hi = Math.max(px, ...kidX);
    lines.push(<line key={`d${i}`} x1={px} x2={px} y1={py} y2={sibY} />);
    lines.push(<line key={`s${i}`} x1={lo} x2={hi} y1={sibY} y2={sibY} />);
    kids.forEach((k, j) => lines.push(<line key={`k${i}-${j}`} x1={kidX[j]} x2={kidX[j]} y1={sibY} y2={cy(k) - S / 2} />));
  });

  return (
    <Frame title={str(params, 'title', 'Pedigree')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {(choose || editable) && (
        <div className="flex flex-wrap items-end gap-2">
          {choose && !given && (
            <Segmented
              label="Pedigree"
              options={PRESET_KEYS.map((k) => ({ value: k, label: PRESET_LABEL[k] }))}
              value={preset}
              onChange={(v) => {
                setPreset(v);
                setEdits({});
              }}
            />
          )}
          {editable && (
            <Button onClick={() => setEdits({})} disabled={Object.keys(edits).length === 0}>
              Reset
            </Button>
          )}
        </div>
      )}
      <div className="w-full">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: Math.round(W * 1.35) }} className="mx-auto block rounded-lg bg-surface" role="group" aria-label="Pedigree chart">
          <g stroke="var(--color-ink-2)" strokeWidth={1.5} fill="none">
            {lines}
          </g>
          {Array.from({ length: lay.gens }, (_, g) => (
            <text key={g} x={6} y={TOP + g * GEN_H + S / 2 + 4} fontSize={12} fontWeight={600} fill="var(--color-ink-2)">
              {roman(g + 1)}
            </text>
          ))}
          {[...lay.placed.values()].map((q) => {
            const id = q.p.id;
            const x = cx(id);
            const y = cy(id);
            const aff = affected.get(id);
            const fill = aff ? 'var(--color-ink)' : 'var(--color-surface)';
            const isFocus = focus === id;
            return (
              <g
                key={id}
                tabIndex={editable ? 0 : undefined}
                role={editable ? 'button' : undefined}
                aria-pressed={editable ? !!aff : undefined}
                aria-label={`${q.label}, ${q.p.sex === 'M' ? 'male' : 'female'}, ${aff ? 'affected' : 'unaffected'}${q.p.carrier ? ', carrier' : ''}`}
                onClick={() => toggle(id)}
                onKeyDown={onKey(id)}
                onFocus={() => setFocus(id)}
                onBlur={() => setFocus(null)}
                style={{ cursor: editable ? 'pointer' : undefined, outline: 'none' }}
              >
                <rect x={x - SLOT / 2} y={y - S / 2 - 4} width={SLOT} height={S + 22} fill="transparent" />
                {isFocus && (q.p.sex === 'M' ? <rect x={x - S / 2 - 4} y={y - S / 2 - 4} width={S + 8} height={S + 8} fill="none" stroke="var(--color-accent)" strokeWidth={2} rx={3} /> : <circle cx={x} cy={y} r={S / 2 + 4} fill="none" stroke="var(--color-accent)" strokeWidth={2} />)}
                {q.p.sex === 'M' ? <rect x={x - S / 2} y={y - S / 2} width={S} height={S} fill={fill} stroke="var(--color-ink)" strokeWidth={1.75} /> : <circle cx={x} cy={y} r={S / 2} fill={fill} stroke="var(--color-ink)" strokeWidth={1.75} />}
                {q.p.carrier && !aff && <circle cx={x} cy={y} r={3.5} fill="var(--color-ink)" />}
                {q.p.deceased && <line x1={x - S / 2 - 4} y1={y + S / 2 + 4} x2={x + S / 2 + 4} y2={y - S / 2 - 4} stroke="var(--color-ink)" strokeWidth={1.5} />}
                <text x={x} y={y + S / 2 + 14} fontSize={10.5} textAnchor="middle" fill="var(--color-ink-2)">
                  {q.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {check && (
        <div className="space-y-1.5">
          <div className="text-xs text-ink-3">Which modes fit? (complete penetrance, no new mutations)</div>
          {results.map((r) => (
            <div key={r.mode} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 rounded-lg border border-line px-3 py-1.5 text-[13px]">
              <span
                className={`inline-block w-[5.6rem] shrink-0 rounded px-1.5 text-center text-[11px] font-semibold ${r.consistent ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300'}`}
              >
                {r.consistent ? 'consistent' : 'excluded'}
              </span>
              <span className="font-semibold">{MODE_NAMES[r.mode]}</span>
              <span className="min-w-0 basis-full text-ink-2 sm:basis-auto">
                {r.consistent
                  ? r.marriedInCarriers.length
                    ? `but needs ${r.marriedInCarriers.length} unrelated carrier${r.marriedInCarriers.length > 1 ? 's' : ''} married in (${r.marriedInCarriers.join(', ')}), unlikely for a rare allele.`
                    : r.carriers.length
                      ? `with obligate carriers ${r.carriers.join(', ')}.`
                      : ''
                  : r.reason}
              </span>
            </div>
          ))}
        </div>
      )}
      {editable && <Note>Click a symbol (or Tab to it and press Enter) to switch it between affected and unaffected.</Note>}
    </Frame>
  );
}
