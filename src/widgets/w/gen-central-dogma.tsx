/**
 * gen-central-dogma: from DNA to protein, codon by codon. Shows the coding strand 5′→3′, the
 * template strand 3′→5′ under it, the mRNA (the coding sequence with U for T, made by reading the
 * template), the codons of the reading frame and the polypeptide (three- and one-letter codes).
 * The reading frame starts at the first AUG or at a chosen frame. In mutate mode, click a base of
 * the coding strand (or Tab to it and type A, C, G or T) to substitute it, or insert and delete
 * bases, and the widget classifies the change against the original: silent, missense, nonsense,
 * stop-loss, start-loss, in-frame insertion/deletion or frameshift.
 *
 * Params:
 *   dna         string    a DNA sequence written 5′→3′ (A, C, G, T; spaces ignored)     default "GCCATGGCTTGGAAAGACCTGTTCCGCTATGGATGAAC"
 *   given       string    "coding" | "template": which strand `dna` is                   default "coding"
 *   startAtAug  boolean   translate from the first AUG (true) or from `frame` (false)    default true
 *   frame       number    0 | 1 | 2, reading-frame offset when startAtAug is false       default 0
 *   mode        string    "translate" | "mutate"                                        default "translate"
 *   editable    boolean   a text box to type a new sequence, and a reading-frame picker default true
 *   title       string                                                                   default "DNA → mRNA → protein" / "Mutations and the protein"
 *   caption     string    what to try
 *
 * The default codes for Met-Ala-Trp-Lys-Asp-Leu-Phe-Arg-Tyr-Gly-Stop (MAWKDLFRYG) after a
 * 3-base 5′ UTR, with 2 bases of 3′ UTR.
 */
import { useId, useMemo, useState, type KeyboardEvent } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Button, Frame, Note, Segmented } from '../kit/controls';
import { classify, cleanDna, complement, readOrf, revcomp, three, toRna } from '../kit/gen-code';
import { GC } from '../kit/gen-ui';

const DEFAULT = 'GCCATGGCTTGGAAAGACCTGTTCCGCTATGGATGAAC';
type FrameChoice = 'aug' | '0' | '1' | '2';

export default function GenCentralDogma({ params }: WidgetProps) {
  const raw = str(params, 'dna', DEFAULT);
  const given = oneOf(params, 'given', ['coding', 'template'] as const, 'coding');
  const startAtAug0 = bool(params, 'startAtAug', true);
  const frame0 = num(params, 'frame', 0);
  const mode = oneOf(params, 'mode', ['translate', 'mutate'] as const, 'translate');
  const editable = bool(params, 'editable', true);
  if (![0, 1, 2].includes(frame0)) throw new Error('parameter "frame" should be 0, 1 or 2');
  const parsed = cleanDna(raw);
  if (parsed.error) throw new Error(`parameter "dna": ${parsed.error}`);
  const coding0 = given === 'coding' ? parsed.seq : revcomp(parsed.seq);

  const [text, setText] = useState(parsed.seq);
  const [textErr, setTextErr] = useState<string | undefined>();
  const [orig, setOrig] = useState(coding0);
  const [seq, setSeq] = useState(coding0);
  const [marks, setMarks] = useState<number[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [insBase, setInsBase] = useState('A');
  const [fc, setFc] = useState<FrameChoice>(startAtAug0 ? 'aug' : (String(frame0) as FrameChoice));
  const startAtAug = fc === 'aug';
  const frame = startAtAug ? 0 : parseInt(fc, 10);
  const inputId = useId();

  const orf = useMemo(() => readOrf(seq, startAtAug, frame), [seq, startAtAug, frame]);
  const cls = useMemo(() => (mode === 'mutate' ? classify(orig, seq, startAtAug, frame) : null), [mode, orig, seq, startAtAug, frame]);

  const setSequence = (t: string) => {
    setText(t);
    const c = cleanDna(t);
    setTextErr(c.error);
    if (!c.error) {
      const cod = given === 'coding' ? c.seq : revcomp(c.seq);
      setOrig(cod);
      setSeq(cod);
      setMarks([]);
      setSel(null);
    }
  };

  const substitute = (i: number, b: string) => {
    if (seq[i] === b) return;
    setSeq((s) => s.slice(0, i) + b + s.slice(i + 1));
    setMarks((m) => (m.includes(i) ? m : [...m, i]));
  };
  const insert = (i: number, b: string) => {
    setSeq((s) => s.slice(0, i) + b + s.slice(i));
    setMarks((m) => [...m.map((x) => (x >= i ? x + 1 : x)), i]);
    setSel(i);
  };
  const del = (i: number) => {
    if (seq.length <= 3) return;
    setSeq((s) => s.slice(0, i) + s.slice(i + 1));
    setMarks((m) => m.filter((x) => x !== i).map((x) => (x > i ? x - 1 : x)));
    setSel((v) => (v === null ? null : Math.min(v, seq.length - 2)));
  };
  const onBaseKey = (i: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key.toUpperCase();
    if ('ACGT'.includes(k) && k.length === 1) {
      e.preventDefault();
      setSel(i);
      substitute(i, k);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      del(i);
    }
  };

  // blocks: [start, length, isCodon, aa]
  const blocks: { at: number; len: number; aa?: string; inOrf: boolean }[] = [];
  const pushUtr = (from: number, to: number) => {
    for (let i = from; i < to; i += 3) blocks.push({ at: i, len: Math.min(3, to - i), inOrf: false });
  };
  if (orf.start < 0) pushUtr(0, seq.length);
  else {
    pushUtr(0, orf.start);
    for (const c of orf.codons) blocks.push({ at: c.at, len: 3, aa: c.aa, inOrf: true });
    const end = orf.codons.length ? orf.codons[orf.codons.length - 1].at + 3 : orf.start;
    pushUtr(end, seq.length);
  }
  const tmpl = complement(seq);
  const rna = toRna(seq);
  const markSet = new Set(marks);
  const prot = orf.codons.filter((c) => c.aa !== '*');

  const rowCls = 'h-6 leading-6';
  const labelCol = (
    <div className="flex flex-col pr-1 text-right text-[11px] text-ink-3">
      <span className={rowCls}>coding 5′</span>
      <span className={rowCls}>template 3′</span>
      <span className={rowCls}>mRNA 5′</span>
      <span className={rowCls}>protein</span>
    </div>
  );
  const endCol = (
    <div className="flex flex-col pl-1 text-[11px] text-ink-3">
      <span className={rowCls}>3′</span>
      <span className={rowCls}>5′</span>
      <span className={rowCls}>3′</span>
      <span className={rowCls}>{orf.codons.length ? 'C' : ''}</span>
    </div>
  );

  const tone = cls ? (cls.kind === 'silent' || cls.kind === 'utr' ? 'good' : cls.kind === 'none' ? 'info' : cls.kind === 'missense' || cls.kind === 'in-frame' ? 'info' : 'warn') : 'info';

  return (
    <Frame title={str(params, 'title', mode === 'mutate' ? 'Mutations and the protein' : 'DNA → mRNA → protein')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {editable && (
        <div className="space-y-2">
          <div>
            <label htmlFor={inputId} className="mb-1 block text-[13px] text-ink-2">
              {given === 'coding' ? 'Coding' : 'Template'} strand, 5′→3′
            </label>
            <input id={inputId} value={text} onChange={(e) => setSequence(e.target.value)} spellCheck={false} autoCapitalize="characters" autoComplete="off" className="input font-mono text-[13px]" aria-invalid={!!textErr} />
            {textErr && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{textErr}</div>}
          </div>
          <Segmented
            label="Reading frame"
            options={[
              { value: 'aug' as FrameChoice, label: 'from first AUG' },
              { value: '0' as FrameChoice, label: 'frame 1' },
              { value: '1' as FrameChoice, label: 'frame 2' },
              { value: '2' as FrameChoice, label: 'frame 3' },
            ]}
            value={fc}
            onChange={setFc}
          />
        </div>
      )}
      <div className="flex flex-wrap items-start gap-y-2 rounded-lg border border-line bg-surface px-2 py-2 font-mono text-[13px]">
        {labelCol}
        {blocks.map((b) => {
          const isStop = b.aa === '*';
          const isMet = b.inOrf && b.at === orf.start && b.aa === 'M';
          const color = !b.inOrf ? 'var(--color-ink-3)' : isStop ? GC.b : isMet ? GC.c : GC.a;
          return (
            <div key={b.at} className={`mx-[3px] flex flex-col items-center rounded ${b.inOrf ? 'bg-surface-2' : ''}`}>
              <span className={`${rowCls} flex`}>
                {Array.from({ length: b.len }, (_, j) => {
                  const i = b.at + j;
                  const hit = markSet.has(i);
                  const style = { color: hit ? GC.b : undefined, fontWeight: hit ? 700 : undefined, outline: sel === i ? '2px solid var(--color-accent)' : undefined, outlineOffset: -1 };
                  return mode === 'mutate' ? (
                    <button
                      key={j}
                      type="button"
                      onClick={() => setSel(i)}
                      onKeyDown={onBaseKey(i)}
                      aria-label={`base ${i + 1}, ${seq[i]}`}
                      aria-pressed={sel === i}
                      className="w-[0.9rem] rounded-sm text-center hover:bg-surface"
                      style={style}
                    >
                      {seq[i]}
                    </button>
                  ) : (
                    <span key={j} className="w-[0.9rem] text-center" style={style}>
                      {seq[i]}
                    </span>
                  );
                })}
              </span>
              <span className={`${rowCls} flex text-ink-2`}>
                {Array.from({ length: b.len }, (_, j) => (
                  <span key={j} className="w-[0.9rem] text-center">
                    {tmpl[b.at + j]}
                  </span>
                ))}
              </span>
              <span className={`${rowCls} flex`} style={{ color: b.inOrf ? 'var(--color-ink)' : 'var(--color-ink-3)' }}>
                {Array.from({ length: b.len }, (_, j) => (
                  <span key={j} className="w-[0.9rem] text-center">
                    {rna[b.at + j]}
                  </span>
                ))}
              </span>
              <span className={`${rowCls} px-0.5 text-[11px] font-semibold`} style={{ color }}>
                {b.aa ? `${three(b.aa)}${b.aa === '*' ? '' : ` ${b.aa}`}` : ''}
              </span>
            </div>
          );
        })}
        {endCol}
      </div>
      <div className="text-[13px] text-ink-2">
        {orf.start < 0 ? (
          'No AUG start codon, so nothing is translated.'
        ) : (
          <>
            Polypeptide (N→C), {prot.length} residue{prot.length === 1 ? '' : 's'}:{' '}
            <span className="font-mono text-ink [overflow-wrap:anywhere]">{prot.map((c) => three(c.aa)).join('-') || '(none)'}</span>
            {!orf.stopped && <span className="text-rose-600 dark:text-rose-300"> (no stop codon before the end of the sequence)</span>}
          </>
        )}
      </div>
      {mode === 'mutate' && (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 text-[13px]">
            <span className="text-ink-2">{sel === null ? 'Click a base of the coding strand.' : `Base ${sel + 1} (${seq[sel]}):`}</span>
            {sel !== null &&
              'ACGT'.split('').map((b) => (
                <Button key={b} onClick={() => substitute(sel, b)} disabled={seq[sel] === b} title={`Change base ${sel + 1} to ${b}`}>
                  → {b}
                </Button>
              ))}
            {sel !== null && (
              <Button onClick={() => del(sel)} title="Delete this base">
                Delete
              </Button>
            )}
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <Segmented label="Base to insert" options={'ACGT'.split('').map((b) => ({ value: b, label: b }))} value={insBase} onChange={setInsBase} />
            <Button onClick={() => insert(sel ?? 0, insBase)}>{sel === null ? `Insert ${insBase} at the start` : `Insert ${insBase} before base ${sel + 1}`}</Button>
            <Button
              onClick={() => {
                setSeq(orig);
                setMarks([]);
                setSel(null);
              }}
              disabled={seq === orig}
            >
              Reset
            </Button>
          </div>
          {cls && <Note tone={tone}>{cls.text}</Note>}
        </div>
      )}
      <div className="text-[11px] text-ink-3">The mRNA has the same sequence as the coding strand (U for T) because RNA polymerase builds it complementary to the template strand, 5′→3′.</div>
    </Frame>
  );
}
