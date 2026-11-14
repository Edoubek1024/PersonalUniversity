/**
 * gen-lac-operon: the lac operon of E. coli, including the Jacob–Monod partial diploids. Toggle
 * lactose (inducer) and glucose, set the alleles of lacI, the promoter, the operator, lacZ and
 * lacY on the chromosome and on an optional F′ plasmid, and see where the repressor and CAP-cAMP
 * sit, which copies are transcribed, how much β-galactosidase (lacZ) and permease (lacY) the cell
 * makes, and the classic table entry (inducible, constitutive or uninducible) for each enzyme.
 * Repressor acts in trans on every operator; promoter and operator act only in cis.
 *
 * Params:
 *   lactose   boolean   inducer present                                               default false
 *   glucose   boolean   glucose present (low cAMP, CAP not bound)                      default true
 *   genotype  string    chromosome alleles, e.g. "I+ P+ O+ Z+ Y+"; I+ | I- | Is | I-d,
 *                       P+ | P-, O+ | Oc, Z+ | Z-, Y+ | Y-; loci left out are wild type   default "I+ P+ O+ Z+ Y+"
 *   fprime    string    alleles on an F′ plasmid (same format); "" for a haploid cell   default ""
 *   editable  boolean   allele pickers, F′ add/remove and the quick-set genotypes       default true
 *   showCap   boolean   show CAP-cAMP and the glucose toggle                           default true
 *   title     string                                                                   default "The lac operon"
 *   caption   string    what to try
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, str } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Toggle } from '../kit/controls';
import { LEVEL_TEXT, WILD, copyText, evaluate, parseLac, regulation, sup, type CopyState, type LacCopy, type Level } from '../kit/gen-lac';
import { GC } from '../kit/gen-ui';

const PRESETS: { label: string; chrom: string; f: string }[] = [
  { label: 'wild type', chrom: '', f: '' },
  { label: 'I⁻', chrom: 'I-', f: '' },
  { label: 'I⁻ / F′ I⁺', chrom: 'I-', f: 'I+' },
  { label: 'Iˢ', chrom: 'Is', f: '' },
  { label: 'Iˢ / F′ I⁺', chrom: 'Is', f: 'I+' },
  { label: 'Oᶜ', chrom: 'Oc', f: '' },
  { label: 'Oᶜ Z⁺ / F′ O⁺ Z⁻', chrom: 'Oc Z+', f: 'O+ Z-' },
  { label: 'O⁺ Z⁺ / F′ Oᶜ Z⁻', chrom: 'O+ Z+', f: 'Oc Z-' },
];

const levelTone = (l: Level) => (l === 'high' ? GC.c : l === 'low' ? GC.d : l === 'basal' ? 'var(--color-ink-3)' : GC.b);

function OperonRow({ c, s, name, showCap, inducer }: { c: LacCopy; s: CopyState; name: string; showCap: boolean; inducer: boolean }) {
  // geometry in a 360 × 84 viewBox
  const y = 52;
  const h = 22;
  const box = (x: number, w: number, label: string, mut: boolean, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={mut ? `color-mix(in srgb, ${GC.b} 22%, var(--color-surface))` : 'var(--color-surface-2)'} stroke={mut ? GC.b : 'var(--color-ink-2)'} strokeWidth={1.25} />
      <text x={x + w / 2} y={y + 15.5} textAnchor="middle" fontSize={12.5} fontStyle="italic" fill="var(--color-ink)">
        {label}
      </text>
    </g>
  );
  const xs = { I: 8, P: 82, O: 116, Z: 152, Y: 262 };
  const Ilabel = sup('lacI', c.I.slice(1));
  const repX = xs.O + 17;
  const funcRep = c.I === 'I+' || c.I === 'Is';
  return (
    <svg viewBox="0 0 360 92" width="100%" style={{ maxWidth: 460 }} className="mx-auto block rounded-lg bg-surface" role="img" aria-label={`${name}: ${copyText(c)}; ${s.repressorBound ? 'repressor bound' : 'operator free'}; ${s.transcribed ? `transcribed (${s.level})` : 'not transcribed'}`}>
      <text x={6} y={14} fontSize={11} fontWeight={600} fill="var(--color-ink-2)">
        {name}
      </text>
      <line x1={2} x2={358} y1={y + h / 2} y2={y + h / 2} stroke="var(--color-ink-3)" strokeWidth={2} />
      {box(xs.I, 60, Ilabel, c.I !== 'I+', 'I')}
      {box(xs.P, 30, sup('P', c.P), c.P !== '+', 'P')}
      {box(xs.O, 34, sup('O', c.O), c.O !== '+', 'O')}
      {box(xs.Z, 106, sup('lacZ', c.Z), c.Z !== '+', 'Z')}
      {box(xs.Y, 74, sup('lacY', c.Y), c.Y !== '+', 'Y')}
      {/* repressor made from this copy's lacI, drawn above lacI */}
      {c.I !== 'I-' && (
        <g>
          <path d={`M${xs.I + 14},${y - 4} q16,-18 32,0 z`} fill={funcRep ? GC.a : 'var(--color-ink-3)'} opacity={0.85} />
          {c.I === 'I+' && inducer && <circle cx={xs.I + 30} cy={y - 14} r={3.5} fill={GC.d} />}
          <text x={xs.I - 4} y={y - 22} textAnchor="start" fontSize={10.5} fill="var(--color-ink-3)">
            {c.I === 'Is' ? 'super-repressor' : c.I === 'I-d' ? 'faulty subunits' : inducer ? 'repressor + inducer' : 'repressor'}
          </text>
        </g>
      )}
      {/* repressor on the operator */}
      {s.repressorBound && <path d={`M${repX - 16},${y} q16,-22 32,0 z`} fill={GC.a} />}
      {s.repressorBound && (
        <text x={repX} y={y - 16} textAnchor="middle" fontSize={10.5} fill={GC.a}>
          bound
        </text>
      )}
      {/* CAP-cAMP */}
      {showCap && s.capBound && c.P === '+' && (
        <g>
          <rect x={xs.P - 4} y={y - 14} width={34} height={12} rx={6} fill={GC.e} />
          <text x={xs.P + 13} y={y - 5} textAnchor="middle" fontSize={8} fontWeight={600} fill="var(--color-surface)">
            CAP
          </text>
        </g>
      )}
      {/* transcript */}
      {s.transcribed && (
        <g>
          <line x1={xs.P + 26} x2={xs.Y + 70} y1={y + h + 8} y2={y + h + 8} stroke={levelTone(s.level)} strokeWidth={s.level === 'high' ? 4 : 2} strokeDasharray={s.level === 'low' ? '6 3' : undefined} />
          <path d={`M${xs.Y + 70},${y + h + 3} l8,5 l-8,5 z`} fill={levelTone(s.level)} />
        </g>
      )}
      {!s.transcribed && c.P === '+' && s.repressorBound && (
        <text x={xs.Z + 53} y={y + h + 12} textAnchor="middle" fontSize={10.5} fill="var(--color-ink-3)">
          blocked (trace only)
        </text>
      )}
    </svg>
  );
}

const LOCI: { k: keyof LacCopy; opts: string[] }[] = [
  { k: 'I', opts: ['I+', 'I-', 'Is', 'I-d'] },
  { k: 'P', opts: ['+', '-'] },
  { k: 'O', opts: ['+', 'c'] },
  { k: 'Z', opts: ['+', '-'] },
  { k: 'Y', opts: ['+', '-'] },
];

function CopyPicker({ c, set, label }: { c: LacCopy; set: (c: LacCopy) => void; label: string }) {
  return (
    <div className="rounded-lg border border-line px-3 py-2">
      <div className="mb-1 text-xs font-semibold text-ink-2">{label}</div>
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {LOCI.map(({ k, opts }) => (
          <Segmented
            key={k}
            label={k === 'I' ? 'lacI' : k === 'P' ? 'promoter' : k === 'O' ? 'operator' : k === 'Z' ? 'lacZ' : 'lacY'}
            options={opts.map((o) => ({ value: o, label: k === 'I' ? sup('I', o.slice(1)) : sup(k, o) }))}
            value={c[k]}
            onChange={(v) => set({ ...c, [k]: v } as LacCopy)}
          />
        ))}
      </div>
    </div>
  );
}

export default function GenLacOperon({ params }: WidgetProps) {
  const lac0 = bool(params, 'lactose', false);
  const glu0 = bool(params, 'glucose', true);
  const chrom0 = parseLac(str(params, 'genotype', 'I+ P+ O+ Z+ Y+'), 'genotype');
  const fText = str(params, 'fprime', '');
  const f0 = fText.trim() ? parseLac(fText, 'fprime') : null;
  const editable = bool(params, 'editable', true);
  const showCap = bool(params, 'showCap', true);
  const [lactose, setLactose] = useState(lac0);
  const [glucose, setGlucose] = useState(showCap ? glu0 : false);
  const [chrom, setChrom] = useState<LacCopy>(chrom0);
  const [fp, setFp] = useState<LacCopy | null>(f0);
  const copies = useMemo(() => (fp ? [chrom, fp] : [chrom]), [chrom, fp]);
  const st = useMemo(() => evaluate(copies, lactose, glucose), [copies, lactose, glucose]);
  const regZ = regulation(copies, 'Z');
  const regY = regulation(copies, 'Y');
  const genoText = fp ? `${copyText(chrom)} / F′ ${copyText(fp)}` : copyText(chrom);

  return (
    <Frame title={str(params, 'title', 'The lac operon')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Toggle label="Lactose (inducer) present" checked={lactose} onChange={setLactose} />
        {showCap && <Toggle label="Glucose present" checked={glucose} onChange={setGlucose} />}
      </div>
      <div className="font-mono text-[13px] italic text-ink-2 [overflow-wrap:anywhere]">{genoText}</div>
      <OperonRow c={chrom} s={st.copies[0]} name="Chromosome" showCap={showCap} inducer={lactose} />
      {fp && <OperonRow c={fp} s={st.copies[1]} name="F′ plasmid" showCap={showCap} inducer={lactose} />}
      <Controls cols={2}>
        <Readout label="β-galactosidase (lacZ)" value={LEVEL_TEXT[st.z]} tone={levelTone(st.z)} />
        <Readout label="Permease (lacY)" value={LEVEL_TEXT[st.y]} tone={levelTone(st.y)} />
        <Readout label="lacZ regulation (without glucose)" value={regZ === 'none' ? 'no functional enzyme' : regZ} />
        <Readout label="lacY regulation (without glucose)" value={regY === 'none' ? 'no functional enzyme' : regY} />
      </Controls>
      <div className="text-[12px] text-ink-3">
        Repressor in this cell: {st.repressorKinds.join('; ')}.{showCap ? (glucose ? ' Glucose present: cAMP is low and CAP is not bound, so unrepressed copies are transcribed only weakly.' : ' No glucose: cAMP is high and CAP-cAMP helps RNA polymerase bind the promoter.') : ''}
      </div>
      {editable && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <Button
                key={p.label}
                onClick={() => {
                  setChrom(p.chrom ? parseLac(p.chrom, 'preset') : { ...WILD });
                  setFp(p.f ? parseLac(p.f, 'preset') : null);
                }}
              >
                {p.label}
              </Button>
            ))}
          </div>
          <CopyPicker c={chrom} set={setChrom} label="Chromosome" />
          {fp ? <CopyPicker c={fp} set={setFp} label="F′ plasmid" /> : null}
          <Button onClick={() => setFp(fp ? null : { ...WILD })}>{fp ? 'Remove F′' : 'Add an F′ lac plasmid (merodiploid)'}</Button>
        </div>
      )}
      <Note>The inducer is treated like IPTG, which enters the cell without permease, as in the classic experiments; with real lactose a lacY⁻ cell would also struggle to take it up.</Note>
    </Frame>
  );
}
