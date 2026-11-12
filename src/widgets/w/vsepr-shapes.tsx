/**
 * vsepr-shapes: VSEPR in 3D. The number of electron domains around the central atom fixes the
 * electron geometry (the domains get as far apart as they can on a sphere); the number of those
 * domains that are lone pairs picks the molecular shape (the shape names only the atoms). Lone
 * pairs take equatorial positions in a trigonal bipyramid and opposite positions in an octahedron.
 * Drag the picture (or use the sliders) to rotate it. Polarity is judged from the vector sum of
 * the bond dipoles, with one terminal atom optionally different from the others.
 *
 * Params:
 *   domains    number    electron domains on the central atom, 2-6                     default 4
 *   lone       number    how many of them are lone pairs (2: 0; 3: 0-1; 4: 0-2; 5: 0-3; 6: 0-2)   default 0
 *   central    string    label of the central atom                                     default "A"
 *   terminal   string    label of the terminal atoms                                   default "X"
 *   different  string    label of the odd terminal atom when "one different" is chosen default "Y"
 *   polarity   boolean   start with one terminal atom different                        default false
 *   angles     boolean   start with the bond-angle arc shown                           default true
 *   locked     boolean   hide the domain and lone-pair controls (show one fixed case)  default false
 *   title      string                                                                  default "VSEPR shapes"
 *   caption    string    what to try
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { useDark, cssVar } from '../kit/hooks';
import { CamSliders, Scene3D, add, dot, font, norm, scale, type Cam, type Proj, type Vec3 } from '../kit/calc3-3d';

const MAX_LONE: Record<number, number> = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 2 };

interface ShapeInfo {
  eg: string;
  shape: string;
  ideal: string;
  example: string;
}

const INFO: Record<string, ShapeInfo> = {
  '2-0': { eg: 'linear', shape: 'linear', ideal: '180°', example: 'CO₂, BeCl₂ (gas): 180°' },
  '3-0': { eg: 'trigonal planar', shape: 'trigonal planar', ideal: '120°', example: 'BF₃: 120°' },
  '3-1': { eg: 'trigonal planar', shape: 'bent', ideal: 'a little under 120°', example: 'O₃: 116.8°' },
  '4-0': { eg: 'tetrahedral', shape: 'tetrahedral', ideal: '109.5°', example: 'CH₄: 109.5°' },
  '4-1': { eg: 'tetrahedral', shape: 'trigonal pyramidal', ideal: 'under 109.5°', example: 'NH₃: 106.7°' },
  '4-2': { eg: 'tetrahedral', shape: 'bent', ideal: 'under 109.5°', example: 'H₂O: 104.5°' },
  '5-0': { eg: 'trigonal bipyramidal', shape: 'trigonal bipyramidal', ideal: '90°, 120°, 180°', example: 'PCl₅' },
  '5-1': { eg: 'trigonal bipyramidal', shape: 'seesaw', ideal: 'under 90° and 120°', example: 'SF₄: about 102° and 173°' },
  '5-2': { eg: 'trigonal bipyramidal', shape: 'T-shaped', ideal: 'a little under 90°', example: 'ClF₃: about 87.5°' },
  '5-3': { eg: 'trigonal bipyramidal', shape: 'linear', ideal: '180°', example: 'XeF₂, I₃⁻: 180°' },
  '6-0': { eg: 'octahedral', shape: 'octahedral', ideal: '90°, 180°', example: 'SF₆' },
  '6-1': { eg: 'octahedral', shape: 'square pyramidal', ideal: 'a little under 90°', example: 'BrF₅: about 85°' },
  '6-2': { eg: 'octahedral', shape: 'square planar', ideal: '90°, 180°', example: 'XeF₄: 90°' },
};

const S3 = Math.sqrt(3) / 2;
const T = Math.sqrt(8) / 3;

/** Domain directions, listed with the positions lone pairs take first. */
function positions(d: number): Vec3[] {
  switch (d) {
    case 2:
      return [
        [0, 1, 0],
        [0, -1, 0],
      ];
    case 3:
      return [
        [0, 0, 1],
        [0, S3, -0.5],
        [0, -S3, -0.5],
      ];
    case 4:
      return [
        [0, 0, 1],
        [T, 0, -1 / 3],
        [-T / 2, T * S3, -1 / 3],
        [-T / 2, -T * S3, -1 / 3],
      ];
    case 5:
      return [
        [1, 0, 0],
        [-0.5, S3, 0],
        [-0.5, -S3, 0],
        [0, 0, 1],
        [0, 0, -1],
      ];
    default:
      return [
        [0, 0, 1],
        [0, 0, -1],
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
      ];
  }
}

const angleDeg = (a: Vec3, b: Vec3) => (Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (norm(a) * norm(b))))) * 180) / Math.PI;

export default function VseprShapes({ params }: WidgetProps) {
  const d0 = Math.round(num(params, 'domains', 4));
  if (d0 < 2 || d0 > 6) throw new Error('parameter "domains" should be 2, 3, 4, 5 or 6');
  const l0 = Math.round(num(params, 'lone', 0));
  if (l0 < 0 || l0 > MAX_LONE[d0]) throw new Error(`parameter "lone" should be between 0 and ${MAX_LONE[d0]} when domains is ${d0}`);
  const centralLabel = str(params, 'central', 'A');
  const termLabel = str(params, 'terminal', 'X');
  const diffLabel = str(params, 'different', 'Y');
  const locked = bool(params, 'locked', false);

  const [dom, setDom] = useState(d0);
  const [lone, setLone] = useState(l0);
  const [diff, setDiff] = useState(bool(params, 'polarity', false));
  const [diffAt, setDiffAt] = useState(0);
  const [showAngle, setShowAngle] = useState(bool(params, 'angles', true));
  const [cam, setCam] = useState<Cam>({ az: 15, el: 20 });
  const dark = useDark();

  const pos = useMemo(() => positions(dom), [dom]);
  const bonds = pos.slice(lone);
  const lps = pos.slice(0, lone);
  const info = INFO[`${dom}-${lone}`];
  const odd = diff ? diffAt % bonds.length : -1;

  // Bond dipoles point from the central atom toward the (more electronegative) terminal atoms;
  // the odd atom's bond dipole is given a different size.
  const net = bonds.reduce<Vec3>((s, b, i) => add(s, scale(b, i === odd ? 2 : 1)), [0, 0, 0]);
  const polar = norm(net) > 1e-6;

  // the smallest angle between two bonds, for the arc
  const pair = useMemo(() => {
    let best: [number, number] | null = null;
    let ang = 999;
    for (let i = 0; i < bonds.length; i++)
      for (let j = i + 1; j < bonds.length; j++) {
        const a = angleDeg(bonds[i], bonds[j]);
        if (a < ang - 1e-6) {
          ang = a;
          best = [i, j];
        }
      }
    return best ? { i: best[0], j: best[1], ang } : null;
  }, [bonds]);

  const draw = (ctx: CanvasRenderingContext2D, P: Proj) => {
    const col = {
      bond: cssVar('--plot-axis', dark),
      centre: cssVar('--plot-1', dark),
      term: cssVar('--plot-3', dark),
      odd: cssVar('--plot-4', dark),
      lp: cssVar('--plot-6', dark),
      dip: cssVar('--plot-2', dark),
      text: cssVar('--color-ink', dark),
      surf: cssVar('--color-surface', dark),
      arc: cssVar('--plot-5', dark),
    };
    const R = P.s;
    type Item = { z: number; paint: () => void };
    const items: Item[] = [];
    const c0 = P.p([0, 0, 0]);

    lps.forEach((u) => {
      const tip = P.p(scale(u, 0.62));
      items.push({
        z: P.p(scale(u, 0.4))[2],
        paint: () => {
          const dx = tip[0] - c0[0];
          const dy = tip[1] - c0[1];
          const len = Math.hypot(dx, dy);
          const ang = Math.atan2(dy, dx);
          const major = Math.max(0.16 * R, len / 2 + 0.08 * R);
          ctx.save();
          ctx.translate((c0[0] + tip[0]) / 2, (c0[1] + tip[1]) / 2);
          ctx.rotate(ang);
          ctx.beginPath();
          ctx.ellipse(0, 0, major, 0.17 * R, 0, 0, 2 * Math.PI);
          ctx.globalAlpha = 0.28;
          ctx.fillStyle = col.lp;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = col.lp;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = col.lp;
          for (const s of [-1, 1]) {
            ctx.beginPath();
            ctx.arc(major * 0.35, s * 0.055 * R, 3, 0, 2 * Math.PI);
            ctx.fill();
          }
          ctx.restore();
        },
      });
    });

    bonds.forEach((u, i) => {
      const a = P.p(u);
      items.push({
        z: Math.min(a[2], 0) - 0.001,
        paint: () => {
          ctx.beginPath();
          ctx.moveTo(c0[0], c0[1]);
          ctx.lineTo(a[0], a[1]);
          ctx.strokeStyle = col.bond;
          ctx.lineWidth = Math.max(5, 0.07 * R);
          ctx.stroke();
        },
      });
      items.push({
        z: a[2],
        paint: () => {
          ctx.beginPath();
          ctx.arc(a[0], a[1], 0.17 * R, 0, 2 * Math.PI);
          ctx.fillStyle = i === odd ? col.odd : col.term;
          ctx.fill();
          ctx.strokeStyle = col.surf;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.font = font(Math.max(11, 0.12 * R), 700);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = col.surf;
          ctx.fillText(i === odd ? diffLabel : termLabel, a[0], a[1] + 0.5);
        },
      });
    });

    items.push({
      z: 0,
      paint: () => {
        ctx.beginPath();
        ctx.arc(c0[0], c0[1], 0.21 * R, 0, 2 * Math.PI);
        ctx.fillStyle = col.centre;
        ctx.fill();
        ctx.strokeStyle = col.surf;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = font(Math.max(12, 0.13 * R), 700);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = col.surf;
        ctx.fillText(centralLabel, c0[0], c0[1] + 0.5);
      },
    });

    items.sort((p, q) => p.z - q.z);
    for (const it of items) it.paint();

    if (showAngle && pair) {
      const a = bonds[pair.i];
      const b = bonds[pair.j];
      const pts: [number, number][] = [];
      const th = (pair.ang * Math.PI) / 180;
      // For 180° the arc needs a direction to bow out in: use the screen-up direction made perpendicular to a.
      const upPerp = add(P.up, scale(a, -dot(P.up, a)));
      const perp: Vec3 = norm(upPerp) > 0.1 ? scale(upPerp, 1 / norm(upPerp)) : [0, 0, 1];
      for (let k = 0; k <= 24; k++) {
        const t = k / 24;
        let v: Vec3;
        if (th > Math.PI - 1e-3) v = add(scale(a, 0.42 * Math.cos(t * Math.PI)), scale(perp, 0.42 * Math.sin(t * Math.PI)));
        else v = add(scale(a, (0.42 * Math.sin((1 - t) * th)) / Math.sin(th)), scale(b, (0.42 * Math.sin(t * th)) / Math.sin(th))); // slerp
        const q = P.p(v);
        pts.push([q[0], q[1]]);
      }
      ctx.beginPath();
      pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = col.arc;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      const bis = norm(add(a, b)) > 0.2 ? scale(add(a, b), 1 / norm(add(a, b))) : perp;
      const mid = P.p(scale(bis, 0.62));
      ctx.font = font(13, 700);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 4;
      ctx.strokeStyle = col.surf;
      const label = `${pair.ang.toFixed(1).replace('.0', '')}°${lone ? ' ideal' : ''}`;
      ctx.strokeText(label, mid[0], mid[1]);
      ctx.fillStyle = col.arc;
      ctx.fillText(label, mid[0], mid[1]);
    }

    if (diff && polar) {
      const u = scale(net, 0.9 / norm(net));
      const a = P.p([0, 0, 0]);
      const b = P.p(u);
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (len > 4) {
        const ux = (b[0] - a[0]) / len;
        const uy = (b[1] - a[1]) / len;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0] - ux * 10, b[1] - uy * 10);
        ctx.strokeStyle = col.dip;
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(b[0], b[1]);
        ctx.lineTo(b[0] - ux * 12 - uy * 6, b[1] - uy * 12 + ux * 6);
        ctx.lineTo(b[0] - ux * 12 + uy * 6, b[1] - uy * 12 - ux * 6);
        ctx.closePath();
        ctx.fillStyle = col.dip;
        ctx.fill();
      }
    }
  };

  // polarity verdict for identical terminal atoms
  const sameNet = bonds.reduce<Vec3>((s, b) => add(s, b), [0, 0, 0]);
  const symmetric = norm(sameNet) < 1e-6;

  return (
    <Frame title={str(params, 'title', 'VSEPR shapes')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Scene3D cam={cam} onCam={setCam} fit={1.45} draw={draw} aspect={0.72} minHeight={260} maxHeight={420} label={`${info.shape} molecule: ${bonds.length} bonded atoms and ${lone} lone pairs around the central atom. Drag to rotate.`} />
      <Controls cols={3}>
        <Readout label="Electron geometry" value={`${info.eg} (${dom} domains)`} />
        <Readout label="Molecular shape" value={`${info.shape} (${bonds.length} bonds, ${lone} lone)`} tone="var(--plot-1)" />
        <Readout label="Bond angle" value={info.ideal} />
        <Readout label="Example" value={info.example} />
        <Readout
          label={diff ? `Polarity with one ${diffLabel}` : `Polarity, all ${termLabel} the same`}
          value={diff ? (polar ? 'polar: bond dipoles do not cancel' : 'nonpolar: dipoles cancel') : symmetric ? 'nonpolar: dipoles cancel' : 'polar: bond dipoles do not cancel'}
          tone={(diff ? polar : !symmetric) ? 'var(--plot-2)' : 'var(--plot-3)'}
        />
      </Controls>
      <Controls>
        {!locked && (
          <>
            <Slider
              label="Electron domains (bonds + lone pairs)"
              value={dom}
              min={2}
              max={6}
              step={1}
              onChange={(v) => {
                const n = Math.round(v);
                setDom(n);
                setLone((l) => Math.min(l, MAX_LONE[n]));
              }}
            />
            <Slider label="Lone pairs on the central atom" value={lone} min={0} max={Math.max(1, MAX_LONE[dom])} step={1} disabled={MAX_LONE[dom] === 0} onChange={(v) => setLone(Math.min(MAX_LONE[dom], Math.round(v)))} />
          </>
        )}
        <div className="space-y-2">
          <Segmented
            label="Terminal atoms"
            options={[
              { value: 'same', label: `All ${termLabel}` },
              { value: 'diff', label: `One ${diffLabel}` },
            ]}
            value={diff ? 'diff' : 'same'}
            onChange={(v) => setDiff(v === 'diff')}
          />
          {diff && bonds.length > 1 && (
            <Button onClick={() => setDiffAt((k) => (k + 1) % bonds.length)}>Move the {diffLabel} atom</Button>
          )}
        </div>
        <Toggle label="Show the smallest bond angle" checked={showAngle} onChange={setShowAngle} />
        <CamSliders cam={cam} onCam={setCam} elRange={[-89, 89]} />
      </Controls>
      {lone > 0 && (
        <Note>
          Lone pairs (shaded lobes) are held by one nucleus only, so they spread wider than bonding pairs and push the bonds together: real angles come out smaller than the ideal geometric ones. The polarity verdict sums bond dipoles only; lone pairs add
          their own contribution, which is why NH₃ is much more polar than NF₃.
        </Note>
      )}
    </Frame>
  );
}
