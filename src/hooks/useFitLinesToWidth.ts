import { useLayoutEffect, type RefObject } from "react";

type Options = {
  minPx?: number;
  maxPx?: number;
};

function measureLineWidth(el: HTMLElement, fontSizePx: number): number {
  el.style.fontSize = `${fontSizePx}px`;
  const savedWidth = el.style.width;
  const savedMaxWidth = el.style.maxWidth;
  el.style.width = "max-content";
  el.style.maxWidth = "none";
  const w = el.getBoundingClientRect().width;
  el.style.width = savedWidth;
  el.style.maxWidth = savedMaxWidth;
  return w;
}

/** Mesmo font-size em várias linhas até a mais larga caber em `widthRef`. */
export function useFitLinesToWidth(
  widthRef: RefObject<HTMLElement | null>,
  line1Ref: RefObject<HTMLElement | null>,
  line2Ref: RefObject<HTMLElement | null>,
  { minPx = 8, maxPx = 16 }: Options = {},
) {
  useLayoutEffect(() => {
    const targetEl = widthRef.current;
    const lines = [line1Ref.current, line2Ref.current].filter(Boolean) as HTMLElement[];
    if (!targetEl || lines.length === 0) return;

    const getTargetWidth = () => targetEl.getBoundingClientRect().width;

    const measureWidest = (fontSizePx: number) =>
      Math.max(...lines.map((line) => measureLineWidth(line, fontSizePx)));

    const fit = () => {
      const maxW = getTargetWidth();
      if (maxW <= 0) return;

      const apply = (px: number) => {
        const size = `${px}px`;
        lines.forEach((line) => {
          line.style.fontSize = size;
        });
      };

      if (measureWidest(maxPx) <= maxW) {
        apply(maxPx);
        return;
      }

      let lo = minPx;
      let hi = maxPx;
      while (hi - lo > 0.4) {
        const mid = (lo + hi) / 2;
        if (measureWidest(mid) > maxW) hi = mid;
        else lo = mid;
      }

      apply(lo);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(targetEl);
    lines.forEach((line) => ro.observe(line));
    window.addEventListener("resize", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [widthRef, line1Ref, line2Ref, minPx, maxPx]);
}
