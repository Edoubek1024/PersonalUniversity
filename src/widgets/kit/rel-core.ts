/**
 * Special-relativity helpers for the rel-* widgets. Units have c = 1: coordinates are (ct, x, y)
 * and velocities are beta = v/c. Boosts are passive: they give the coordinates of the same event
 * in a frame moving at beta relative to the original one, ct' = gamma (ct - beta x).
 */

export const gammaOf = (beta: number) => 1 / Math.sqrt(1 - beta * beta);

/** Lorentz boost along x of an event (ct, x) into the frame moving at beta. */
export function boost(beta: number, ct: number, x: number): [number, number] {
  const g = gammaOf(beta);
  return [g * (ct - beta * x), g * (x - beta * ct)];
}

/** Interval s^2 = -(c dt)^2 + dx^2 (mostly-plus signature, as in the course). */
export const interval2 = (dct: number, dx: number) => -dct * dct + dx * dx;

export type Separation = 'timelike' | 'spacelike' | 'lightlike';

export function classify(s2: number, eps = 1e-9): Separation {
  if (Math.abs(s2) < eps) return 'lightlike';
  return s2 < 0 ? 'timelike' : 'spacelike';
}

/** Collinear velocity addition. */
export const addBeta = (b1: number, b2: number) => (b1 + b2) / (1 + b1 * b2);

export type M3 = number[][];

export function mul3(a: M3, b: M3): M3 {
  return a.map((row, i) => b[0].map((_, j) => row.reduce((s, _v, k) => s + a[i][k] * b[k][j], 0)));
}

export function inv3(m: M3): M3 {
  const [[a, b, c], [d, e, f], [g, h, i]] = m;
  const A = e * i - f * h;
  const B = -(d * i - f * g);
  const C = d * h - e * g;
  const det = a * A + b * B + c * C;
  return [
    [A / det, -(b * i - c * h) / det, (b * f - c * e) / det],
    [B / det, (a * i - c * g) / det, -(a * f - c * d) / det],
    [C / det, -(a * h - b * g) / det, (a * e - b * d) / det],
  ];
}

/** Passive boost in (ct, x, y) for a frame moving with velocity (bx, by). */
export function boost3(bx: number, by: number): M3 {
  const b2 = bx * bx + by * by;
  if (b2 < 1e-15) return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const g = 1 / Math.sqrt(1 - b2);
  const k = (g - 1) / b2;
  return [
    [g, -g * bx, -g * by],
    [-g * bx, 1 + k * bx * bx, k * bx * by],
    [-g * by, k * bx * by, 1 + k * by * by],
  ];
}

/**
 * Splits a Lorentz transformation L (frame S to frame S'') into a boost and a rotation,
 * L = R B(w): w is the velocity of S'' measured in S, and R a rotation of the spatial axes by
 * `angle` (radians). `residual` is max |R00 - 1| etc., a check that R really is a rotation.
 */
export function polar3(L: M3): { w: [number, number]; angle: number; R: M3; residual: number } {
  const Li = inv3(L);
  const w: [number, number] = [Li[1][0] / Li[0][0], Li[2][0] / Li[0][0]];
  const R = mul3(L, inv3(boost3(w[0], w[1])));
  const residual = Math.max(Math.abs(R[0][0] - 1), Math.abs(R[0][1]), Math.abs(R[0][2]), Math.abs(R[1][0]), Math.abs(R[2][0]));
  return { w, angle: Math.atan2(R[2][1], R[1][1]), R, residual };
}

/**
 * Relativistic Doppler factor nu_observed / nu_emitted for a source moving at beta. With
 * frame "observer", theta is the angle between the source velocity and the direction from the
 * source to the observer, measured in the observer's frame; with "source" it is measured in the
 * source's rest frame. theta = 0 means approaching head-on.
 */
export function dopplerFactor(beta: number, theta: number, frame: 'observer' | 'source'): number {
  const g = gammaOf(beta);
  return frame === 'observer' ? 1 / (g * (1 - beta * Math.cos(theta))) : g * (1 + beta * Math.cos(theta));
}

/** Aberration: observer-frame angle from source-frame angle and back. */
export const toObserverAngle = (beta: number, thetaS: number) => Math.acos((Math.cos(thetaS) + beta) / (1 + beta * Math.cos(thetaS)));
export const toSourceAngle = (beta: number, thetaO: number) => Math.acos((Math.cos(thetaO) - beta) / (1 - beta * Math.cos(thetaO)));

/**
 * Approximate sRGB colour of monochromatic light (380-750 nm), after Dan Bruton's piecewise
 * fit, with the intensity fall-off at the ends of the visible range. Outside it, null.
 */
export function wavelengthToRgb(nm: number): [number, number, number] | null {
  if (!(nm >= 380 && nm <= 750)) return null;
  let r = 0;
  let g = 0;
  let b = 0;
  if (nm < 440) [r, g, b] = [-(nm - 440) / 60, 0, 1];
  else if (nm < 490) [r, g, b] = [0, (nm - 440) / 50, 1];
  else if (nm < 510) [r, g, b] = [0, 1, -(nm - 510) / 20];
  else if (nm < 580) [r, g, b] = [(nm - 510) / 70, 1, 0];
  else if (nm < 645) [r, g, b] = [1, -(nm - 645) / 65, 0];
  else [r, g, b] = [1, 0, 0];
  const f = nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (750 - nm)) / 50 : 1;
  const c = (v: number) => Math.round(255 * Math.pow(v * f, 0.8));
  return [c(r), c(g), c(b)];
}
