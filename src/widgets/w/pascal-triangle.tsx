/**
 * pascal-triangle: Pascal's triangle of binomial coefficients. Tap an entry C(n, k) to see
 * Pascal's rule (its two parents), its symmetric partner C(n, n − k), and the row identities
 * (sum 2^n, alternating sum 0). Optionally colour entries by their remainder mod 2, 3 or 5.
 *
 * Params:
 *   rows     number   rows 0..rows shown (4 to 16)              default 10
 *   n, k     number   selected entry                             default 6, 2
 *   mod      0 | 2 | 3 | 5   colour by remainder (0 = off)       default 0
 *   title    string                                              default "Pascal's triangle"
 *   caption  string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, str } from '../kit/params';
import { Frame, Note, Segmented, Slider, Tex } from '../kit/controls';
import { useElementSize } from '../kit/hooks';

const MODS = ['0', '2', '3', '5'] as const;
const MODCOL = ['var(--color-surface-2)', 'var(--plot-1)', 'var(--plot-3)', 'var(--plot-4)', 'var(--plot-6)'];

export default function PascalTriangle({ params }: WidgetProps) {
  const rows0 = num(params, 'rows', 10);
  if (!Number.isInteger(rows0) || rows0 < 4 || rows0 > 16) throw new Error('parameter "rows" should be a whole number from 4 to 16');
  const n0 = num(params, 'n', 6);
  const k0 = num(params, 'k', 2);
  if (!Number.isInteger(n0) || !Number.isInteger(k0) || n0 < 0 || k0 < 0 || k0 > n0 || n0 > rows0) throw new Error('parameters "n" and "k" should satisfy 0 ≤ k ≤ n ≤ rows');
  const mod0 = String(num(params, 'mod', 0));
  if (!MODS.includes(mod0 as (typeof MODS)[number])) throw new Error('parameter "mod" should be 0, 2, 3 or 5');
  const [rows, setRows] = useState(rows0);
  const [sel, setSel] = useState<[number, number]>([n0, k0]);
  const [mod, setMod] = useState(mod0 as (typeof MODS)[number]);
  const C = useMemo(() => {
    const t: number[][] = [];
    for (let n = 0; n <= 16; n++) t.push(Array.from({ length: n + 1 }, (_, k) => (k === 0 || k === n ? 1 : t[n - 1][k - 1] + t[n - 1][k])));
    return t;
  }, []);
  const [n, k] = sel[0] <= rows ? sel : [rows, Math.min(sel[1], rows)];
  const m = Number(mod);

  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = size.width || 600;
  const cw = Math.min(46, (W - 4) / (rows + 1));
  const ch = Math.max(22, Math.min(32, cw * 0.78));
  const H = ch * (rows + 1) + 4;
  const digits = String(C[rows][Math.floor(rows / 2)]).length;
  const fs = Math.max(7.5, Math.min(13, (cw - 4) / (digits * 0.62)));

  const isParent = (r: number, c: number) => n > 0 && r === n - 1 && (c === k - 1 || c === k) && c >= 0 && c <= r;
  const rowSum = C[n].reduce((a, b) => a + b, 0);

  return (
    <Frame title={str(params, 'title', "Pascal's triangle")} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div ref={ref} className="w-full">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block" role="group" aria-label="Pascal's triangle; each entry is a button">
          {C.slice(0, rows + 1).map((row, r) =>
            row.map((v, c) => {
              const x = W / 2 + (c - r / 2) * cw;
              const y = 2 + r * ch;
              const selected = r === n && c === k;
              const parent = isParent(r, c);
              const mirror = r === n && c === n - k && !selected;
              const fill = m ? (v % m === 0 ? 'var(--color-surface-2)' : `color-mix(in srgb, ${MODCOL[v % m]} 40%, var(--color-surface))`) : selected ? 'color-mix(in srgb, var(--plot-2) 30%, var(--color-surface))' : parent ? 'color-mix(in srgb, var(--plot-4) 32%, var(--color-surface))' : r === n ? 'color-mix(in srgb, var(--plot-1) 12%, var(--color-surface))' : 'var(--color-surface-2)';
              const stroke = selected ? 'var(--plot-2)' : parent ? 'var(--plot-4)' : mirror ? 'var(--plot-1)' : 'var(--color-line)';
              return (
                <g
                  key={`${r},${c}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`C(${r}, ${c}) = ${v}`}
                  aria-pressed={selected}
                  style={{ cursor: 'pointer', outline: 'none' }}
                  onClick={() => setSel([r, c])}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSel([r, c]);
                    }
                  }}
                  className="[&:focus-visible>rect]:stroke-[var(--color-accent)]"
                >
                  <rect x={x - cw / 2 + 1.5} y={y} width={cw - 3} height={ch - 3} rx={5} fill={fill} stroke={stroke} strokeWidth={selected || parent || mirror ? 2 : 1} strokeDasharray={mirror ? '3 2' : undefined} />
                  <text x={x} y={y + (ch - 3) / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={selected ? 700 : 500} fill="var(--color-ink)" style={{ pointerEvents: 'none', fontVariantNumeric: 'tabular-nums' }}>
                    {v}
                  </text>
                </g>
              );
            }),
          )}
        </svg>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider label="Rows" value={rows} min={4} max={16} step={1} onChange={setRows} format={(v) => `0 to ${v}`} />
        <Segmented
          label="Colour by remainder"
          options={MODS.map((x) => ({ value: x, label: x === '0' ? 'off' : `mod ${x}` }))}
          value={mod}
          onChange={setMod}
        />
      </div>
      <div className="space-y-1 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px]">
        <div>
          <Tex>{`\\binom{${n}}{${k}} = \\frac{${n}!}{${k}!\\,${n - k}!} = ${C[n][k]}`}</Tex>
          {k !== n - k && (
            <>
              {' '}
              = <Tex>{`\\binom{${n}}{${n - k}}`}</Tex> (symmetry, dashed)
            </>
          )}
        </div>
        {n > 0 && k > 0 && k < n && (
          <div>
            Pascal's rule: <Tex>{`\\binom{${n}}{${k}} = \\binom{${n - 1}}{${k - 1}} + \\binom{${n - 1}}{${k}} = ${C[n - 1][k - 1]} + ${C[n - 1][k]}`}</Tex>
          </div>
        )}
        <div>
          Row {n}: sum <Tex>{`= ${rowSum} = 2^{${n}}`}</Tex>; alternating sum <Tex>{`= ${C[n].reduce((a, b, i) => a + (i % 2 ? -b : b), 0)}`}</Tex>
          {n > 0 ? ' (as many even-sized subsets as odd)' : ''}.
        </div>
      </div>
      {m > 0 && <Note>Grey entries are divisible by {m}. {m === 2 ? 'The odd entries form a Sierpiński triangle, and row 2^j − 1 (7, 15) is entirely odd.' : `Row ${m} is 1, 0, …, 0, 1 mod ${m}: a prime p divides every C(p, k) with 0 < k < p.`}</Note>}
    </Frame>
  );
}
