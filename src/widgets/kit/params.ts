/**
 * Typed readers for widget parameters. Each falls back to the default when the key is missing,
 * and throws a readable Error when it is present with the wrong type, so a typo in lesson data
 * shows up as a visible widget error instead of a silently different widget.
 */

type Params = Record<string, unknown>;

function bad(key: string, want: string, got: unknown): never {
  throw new Error(`parameter "${key}" should be ${want}, got ${JSON.stringify(got)}`);
}

export function num(p: Params, key: string, def: number): number {
  const v = p[key];
  if (v === undefined) return def;
  if (typeof v !== 'number' || !Number.isFinite(v)) bad(key, 'a number', v);
  return v;
}

export function str(p: Params, key: string, def: string): string {
  const v = p[key];
  if (v === undefined) return def;
  if (typeof v !== 'string') bad(key, 'a string', v);
  return v;
}

export function bool(p: Params, key: string, def: boolean): boolean {
  const v = p[key];
  if (v === undefined) return def;
  if (typeof v !== 'boolean') bad(key, 'true or false', v);
  return v;
}

/** One of a fixed set of strings. */
export function oneOf<T extends string>(p: Params, key: string, choices: readonly T[], def: T): T {
  const v = p[key];
  if (v === undefined) return def;
  if (typeof v !== 'string' || !choices.includes(v as T)) bad(key, `one of ${choices.join(', ')}`, v);
  return v as T;
}

export function numArray(p: Params, key: string, def: number[]): number[] {
  const v = p[key];
  if (v === undefined) return def;
  if (!Array.isArray(v) || !v.every((x) => typeof x === 'number' && Number.isFinite(x))) bad(key, 'an array of numbers', v);
  return v as number[];
}

export function strArray(p: Params, key: string, def: string[]): string[] {
  const v = p[key];
  if (v === undefined) return def;
  if (!Array.isArray(v) || !v.every((x) => typeof x === 'string')) bad(key, 'an array of strings', v);
  return v as string[];
}

/** A matrix given as an array of equal-length rows of numbers. */
export function matrix(p: Params, key: string, def: number[][]): number[][] {
  const v = p[key];
  if (v === undefined) return def;
  const ok =
    Array.isArray(v) &&
    v.length > 0 &&
    v.every((r) => Array.isArray(r) && r.length === (v[0] as unknown[]).length && r.every((x) => typeof x === 'number' && Number.isFinite(x)));
  if (!ok) bad(key, 'a matrix (array of equal-length number arrays)', v);
  return v as number[][];
}

/** A viewport [xMin, xMax, yMin, yMax]. */
export function view(p: Params, key: string, def: [number, number, number, number]): [number, number, number, number] {
  const v = numArray(p, key, def);
  if (v.length !== 4 || !(v[0] < v[1]) || !(v[2] < v[3])) bad(key, '[xMin, xMax, yMin, yMax] with min < max', v);
  return v as [number, number, number, number];
}

/**
 * Slider definitions: {"a": [initial, min, max]} or {"a": [initial, min, max, step]}.
 * Returned in the order written.
 */
export interface SliderDef {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
}

export function sliders(p: Params, key: string, def: Record<string, number[]> = {}): SliderDef[] {
  const v = p[key] ?? def;
  if (!v || typeof v !== 'object' || Array.isArray(v)) bad(key, 'an object of [initial, min, max, step?] arrays', v);
  return Object.entries(v as Record<string, unknown>).map(([name, d]) => {
    if (!Array.isArray(d) || d.length < 3 || d.length > 4 || !d.every((x) => typeof x === 'number')) {
      bad(`${key}.${name}`, '[initial, min, max] or [initial, min, max, step]', d);
    }
    const [value, min, max, step] = d as number[];
    if (!(min < max)) bad(`${key}.${name}`, 'an array with min < max', d);
    return { name, value, min, max, step: step ?? (max - min) / 100 };
  });
}
