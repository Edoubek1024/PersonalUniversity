/**
 * Approximate display colour of monochromatic light (after Dan Bruton's widely used
 * piecewise-linear fit), for the hydrogen-spectrum widget. Outside 380-750 nm it returns null.
 */
export function wavelengthRGB(nm: number): [number, number, number] | null {
  if (nm < 380 || nm > 750) return null;
  let r = 0;
  let g = 0;
  let b = 0;
  if (nm < 440) {
    r = -(nm - 440) / (440 - 380);
    b = 1;
  } else if (nm < 490) {
    g = (nm - 440) / (490 - 440);
    b = 1;
  } else if (nm < 510) {
    g = 1;
    b = -(nm - 510) / (510 - 490);
  } else if (nm < 580) {
    r = (nm - 510) / (580 - 510);
    g = 1;
  } else if (nm < 645) {
    r = 1;
    g = -(nm - 645) / (645 - 580);
  } else {
    r = 1;
  }
  // Fade at the edges of vision.
  const f = nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (750 - nm)) / 50 : 1;
  const gamma = 0.8;
  const c = (v: number) => Math.round(255 * Math.pow(v * f, gamma));
  return [c(r), c(g), c(b)];
}

export function wavelengthCss(nm: number): string | null {
  const rgb = wavelengthRGB(nm);
  return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : null;
}

export function regionOf(nm: number): string {
  if (nm < 10) return 'X-ray';
  if (nm < 380) return 'ultraviolet';
  if (nm <= 750) return 'visible';
  if (nm < 1e6) return 'infrared';
  return 'microwave';
}

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };

/** Scientific notation as plain text, e.g. sciText(3.03e-19) = "3.030 × 10⁻¹⁹". */
export function sciText(x: number, digits = 4): string {
  if (!Number.isFinite(x)) return '—';
  if (x === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = x / Math.pow(10, e);
  if (Math.abs(+m.toFixed(digits - 1)) >= 10) {
    e += 1;
    m /= 10;
  }
  const exp = String(e)
    .split('')
    .map((ch) => SUP[ch] ?? ch)
    .join('');
  return `${m.toFixed(digits - 1).replace('-', '−')} × 10${exp}`;
}
