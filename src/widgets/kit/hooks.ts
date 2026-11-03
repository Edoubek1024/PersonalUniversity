import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/** Width and height of an element, updated on resize. */
export function useElementSize<T extends HTMLElement>(): [RefObject<T | null>, { width: number; height: number }] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize((s) => (s.width === el.clientWidth && s.height === el.clientHeight ? s : { width: el.clientWidth, height: el.clientHeight }));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

/**
 * Calls `tick(dtSeconds)` on every animation frame while `running` is true. The callback may
 * change between renders; the latest one is used.
 */
export function useAnimation(running: boolean, tick: (dt: number) => void) {
  const cb = useRef(tick);
  cb.current = tick;
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      cb.current(Math.min(0.05, (now - last) / 1000));
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);
}

/** True while the site is in dark mode; re-renders when the theme changes. */
export function useDark(): boolean {
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const el = document.documentElement;
    const mo = new MutationObserver(() => setDark(el.classList.contains('dark')));
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

/**
 * Resolved value of a CSS custom property such as "--plot-1", for canvas drawing (SVG can use
 * var() directly). Pass the result of useDark() as `dark` so the value refreshes with the theme.
 */
export function cssVar(name: string, _dark?: boolean): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
