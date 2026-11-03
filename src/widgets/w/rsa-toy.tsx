/**
 * rsa-toy: textbook RSA with small numbers. Pick primes p and q and an exponent e (all
 * validated), see n, φ(n) and d = e⁻¹ mod φ(n) computed, then encrypt and decrypt a number or a
 * short text (one character code per block), sign and verify, and break the key by factoring n.
 *
 * Params:
 *   p        number   first prime                                default 61
 *   q        number   second prime                               default 53
 *   e        number   public exponent                            default 17
 *   m        number   message as a number                        default 65
 *   text     string   message as text                            default "HI"
 *   input    "number" | "text"   which message form shows first  default "number"
 *   attack   boolean  show the "factor n" attack panel           default true
 *   title    string                                              default "Toy RSA"
 *   caption  string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Button, Frame, Note, Readout, Segmented, Tex } from '../kit/controls';
import { egcd, gcdBig, isPrime, modpow, parseNat, powTable, show, smallestFactor, bmod } from '../kit/discrete-number';

const MAXP = 10n ** 6n;

export default function RsaToy({ params }: WidgetProps) {
  const [p, setP] = useState(() => String(num(params, 'p', 61)));
  const [q, setQ] = useState(() => String(num(params, 'q', 53)));
  const [e, setE] = useState(() => String(num(params, 'e', 17)));
  const [m, setM] = useState(() => String(num(params, 'm', 65)));
  const [text, setText] = useState(() => str(params, 'text', 'HI'));
  const [input, setInput] = useState<'number' | 'text'>(() => oneOf(params, 'input', ['number', 'text'] as const, 'number'));
  const showAttack = bool(params, 'attack', true);
  const [attacked, setAttacked] = useState<string | null>(null);

  const pp = parseNat(p, 'p', 7);
  const pq = parseNat(q, 'q', 7);
  const pe = parseNat(e, 'e', 13);
  const errs: { p?: string; q?: string; e?: string } = {};
  if (pp.error) errs.p = pp.error;
  else if (pp.v! > MAXP) errs.p = 'keep p below 1 000 000 for this toy';
  else if (!isPrime(pp.v!)) errs.p = `${p} is not prime${pp.v! > 1n ? ` (${show(smallestFactor(pp.v!).p)} divides it)` : ''}`;
  if (pq.error) errs.q = pq.error;
  else if (pq.v! > MAXP) errs.q = 'keep q below 1 000 000 for this toy';
  else if (!isPrime(pq.v!)) errs.q = `${q} is not prime${pq.v! > 1n ? ` (${show(smallestFactor(pq.v!).p)} divides it)` : ''}`;
  else if (!errs.p && pq.v === pp.v) errs.q = 'p and q must be different primes (otherwise φ(n) ≠ (p−1)(q−1) and n = p² is trivial to factor)';
  const keyOk = !errs.p && !errs.q;
  const n = keyOk ? pp.v! * pq.v! : 0n;
  const phi = keyOk ? (pp.v! - 1n) * (pq.v! - 1n) : 0n;
  let suggestion = '';
  if (pe.error) errs.e = pe.error;
  else if (keyOk) {
    const ev = pe.v!;
    if (ev <= 1n || ev >= phi) errs.e = `e must satisfy 1 < e < φ(n) = ${show(phi)}`;
    else if (gcdBig(ev, phi) !== 1n) {
      errs.e = `gcd(${show(ev)}, ${show(phi)}) = ${show(gcdBig(ev, phi))}, so e has no inverse mod φ(n)`;
      for (let c = ev + 1n; c < phi; c++)
        if (gcdBig(c, phi) === 1n) {
          suggestion = show(c);
          break;
        }
    }
  }
  const ok = keyOk && !errs.e;
  const ev = pe.v ?? 0n;
  const eg = ok ? egcd(ev, phi) : null;
  const d = eg ? bmod(eg.x, phi) : 0n;
  const kq = ok ? (ev * d - 1n) / phi : 0n;

  // Message blocks.
  const pm = parseNat(m, 'm', 20);
  const mErr = input === 'number' ? (pm.error ?? (ok && pm.v! >= n ? `m must be less than n = ${show(n)}` : undefined)) : undefined;
  const codes = [...text].map((ch) => BigInt(ch.codePointAt(0)!));
  const maxCode = codes.reduce((a, b) => (b > a ? b : a), 0n);
  const tErr = input === 'text' ? (!text ? 'type a short message' : text.length > 12 ? 'keep the message to 12 characters' : ok && maxCode >= n ? `n = ${show(n)} is smaller than the character code ${show(maxCode)}; choose bigger primes` : undefined) : undefined;

  const blocks = useMemo(() => {
    if (!ok) return [];
    const ms = input === 'number' ? (mErr ? [] : [pm.v!]) : tErr ? [] : codes;
    return ms.map((mv) => {
      const c = modpow(mv, ev, n);
      return { m: mv, c, back: modpow(c, d, n), enc: powTable(mv, ev, n), dec: powTable(c, d, n) };
    });
  }, [ok, input, m, text, ev, n, d, mErr, tErr]); // eslint-disable-line react-hooks/exhaustive-deps

  const attack = () => {
    const t0 = performance.now();
    const { p: f, tries } = smallestFactor(n);
    const g = n / f;
    const ph = (f - 1n) * (g - 1n);
    const dd = bmod(egcd(ev, ph).x, ph);
    const ms = (performance.now() - t0).toFixed(2);
    setAttacked(`Trial division finds ${show(f)} × ${show(g)} = ${show(n)} after ${tries} divisions (${ms} ms). Then φ(n) = ${show(ph)} and d = e⁻¹ mod φ(n) = ${show(dd)}: the private key, recovered from public information alone. Each extra decimal digit of n multiplies trial division's work by about 3; at 2048 bits the best known algorithms are hopeless.`);
  };

  return (
    <Frame title={str(params, 'title', 'Toy RSA')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="grid grid-cols-3 gap-3">
        <Field label="prime p" value={p} onChange={(v) => (setP(v), setAttacked(null))} error={errs.p} />
        <Field label="prime q" value={q} onChange={(v) => (setQ(v), setAttacked(null))} error={errs.q} />
        <Field label="public e" value={e} onChange={(v) => (setE(v), setAttacked(null))} error={errs.e && keyOk ? errs.e + (suggestion ? `; try e = ${suggestion}` : '') : pe.error} />
      </div>

      {keyOk && (
        <div className="space-y-1.5 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px]">
          <div>
            <Tex>{`n = pq = ${show(pp.v!)} \\cdot ${show(pq.v!)} = ${show(n)}`}</Tex>
          </div>
          <div>
            <Tex>{`\\varphi(n) = (p-1)(q-1) = ${show(pp.v! - 1n)} \\cdot ${show(pq.v! - 1n)} = ${show(phi)}`}</Tex>
          </div>
          {ok && eg && (
            <div>
              Extended Euclid on (e, φ): <Tex>{`(${show(eg.x)})\\cdot ${show(ev)} + (${show(eg.y)})\\cdot ${show(phi)} = 1`}</Tex>, so{' '}
              <Tex>{`d = e^{-1} \\bmod \\varphi(n) = ${show(d)}`}</Tex>. Check: <Tex>{`ed = ${show(ev * d)} = ${show(kq)}\\cdot ${show(phi)} + 1`}</Tex>.
            </div>
          )}
        </div>
      )}
      {ok && (
        <div className="grid grid-cols-2 gap-2">
          <Readout label="public key (n, e)" value={`(${show(n)}, ${show(ev)})`} tone="var(--plot-3)" />
          <Readout label="private key d" value={show(d)} tone="var(--plot-2)" />
        </div>
      )}

      {ok && (
        <div className="space-y-2">
          <Segmented
            label="Message"
            options={[
              { value: 'number', label: 'a number m < n' },
              { value: 'text', label: 'text (character codes)' },
            ]}
            value={input}
            onChange={setInput}
          />
          {input === 'number' ? (
            <div className="max-w-[16rem]">
              <Field label="m" value={m} onChange={setM} error={mErr} />
            </div>
          ) : (
            <label className="block max-w-[20rem]">
              <span className="mb-1 block text-[13px] text-ink-2">message</span>
              <input className="input font-mono text-[13px]" value={text} onChange={(ev2) => setText(ev2.target.value)} spellCheck={false} aria-invalid={!!tErr} />
              {tErr && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-300">{tErr}</span>}
            </label>
          )}

          {blocks.length > 0 && input === 'number' && (
            <div className="space-y-1.5 text-[13px]">
              <div>
                Encrypt: <Tex>{`c = m^e \\bmod n = ${show(blocks[0].m)}^{${show(ev)}} \\bmod ${show(n)} = ${show(blocks[0].c)}`}</Tex>{' '}
                <span className="text-ink-3">({blocks[0].enc.squarings + blocks[0].enc.multiplies} multiplications by square-and-multiply)</span>
              </div>
              <div>
                Decrypt: <Tex>{`c^d \\bmod n = ${show(blocks[0].c)}^{${show(d)}} \\bmod ${show(n)} = ${show(blocks[0].back)}`}</Tex>{' '}
                <span className="text-ink-3">({blocks[0].dec.squarings + blocks[0].dec.multiplies} multiplications)</span>
              </div>
              <div>
                Sign: <Tex>{`s = m^d \\bmod n = ${show(modpow(blocks[0].m, d, n))}`}</Tex>; verify: <Tex>{`s^e \\bmod n = ${show(modpow(modpow(blocks[0].m, d, n), ev, n))}`}</Tex>
              </div>
              <Note tone={blocks[0].back === blocks[0].m ? 'good' : 'warn'}>
                {blocks[0].back === blocks[0].m ? `Decryption returns m = ${show(blocks[0].m)}: ed ≡ 1 (mod φ(n)), so m^(ed) = m·(m^φ(n))^k ≡ m by Euler's theorem.` : 'Decryption did not return m.'}
                {gcdBig(blocks[0].m, n) !== 1n && blocks[0].m !== 0n && ` Here gcd(m, n) = ${show(gcdBig(blocks[0].m, n))} ≠ 1, so Euler's theorem does not apply directly, yet it still works: the CRT argument in the lesson covers this case.`}
              </Note>
            </div>
          )}
          {blocks.length > 0 && input === 'text' && (
            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="my-0 w-full border-collapse font-mono text-[13px] tabular-nums">
                <thead className="bg-surface-2 text-ink-2">
                  <tr>
                    {['char', 'm (code)', 'c = m^e mod n', 'c^d mod n', 'char'].map((h, i) => (
                      <th key={i} className="whitespace-nowrap border-b border-line px-2.5 py-1.5 text-right font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {blocks.map((b, i) => (
                    <tr key={i} className={i % 2 ? 'bg-surface-2/40' : ''}>
                      <td className="px-2.5 py-1 text-right">{JSON.stringify([...text][i])}</td>
                      <td className="px-2.5 py-1 text-right">{show(b.m)}</td>
                      <td className="px-2.5 py-1 text-right font-semibold" style={{ color: 'var(--plot-2)' }}>
                        {show(b.c)}
                      </td>
                      <td className="px-2.5 py-1 text-right">{show(b.back)}</td>
                      <td className="px-2.5 py-1 text-right">{JSON.stringify(String.fromCodePoint(Number(b.back)))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {blocks.length > 1 && input === 'text' && new Set(blocks.map((b) => b.c)).size < blocks.length && (
            <Note tone="warn">Repeated letters give repeated ciphertext blocks: textbook RSA is deterministic, which is one reason real systems add random padding.</Note>
          )}
        </div>
      )}

      {ok && showAttack && (
        <div className="space-y-2 border-t border-line pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={attack}>Break it: factor n</Button>
            <span className="text-xs text-ink-3">An attacker sees only (n, e).</span>
          </div>
          {attacked && <Note tone="warn">{attacked}</Note>}
        </div>
      )}
    </Frame>
  );
}

function Field({ label, value, onChange, error }: { label: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-[13px] text-ink-2">{label}</span>
      <input type="text" inputMode="numeric" className="input font-mono text-[13px]" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} spellCheck={false} autoComplete="off" />
      {error && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-300">{error}</span>}
    </label>
  );
}
