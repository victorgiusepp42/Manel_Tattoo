import { useLayoutEffect, type RefObject } from "react";

/** Faixa inferior da lockup (MANEL / TATTOO). */
const WORDMARK_TOP_RATIO = 0.68;
const ALPHA_MIN = 20;

function measureWordmarkMidRatio(img: HTMLImageElement): number | null {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return null;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, w, h);
  const startY = Math.floor(h * WORDMARK_TOP_RATIO);

  let minX = w;
  let maxX = 0;
  let found = false;

  for (let y = startY; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3]! <= ALPHA_MIN) continue;
      found = true;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }

  if (!found || minX >= maxX) return null;
  return (minX + maxX) / 2 / w;
}

/** Desloca logo + texto juntos para centralizar a wordmark na coluna. */
export function useFooterBrandAlign(
  stackRef: RefObject<HTMLElement | null>,
  markRef: RefObject<HTMLImageElement | null>,
  columnRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const stack = stackRef.current;
    const mark = markRef.current;
    const column = columnRef.current;
    if (!stack || !mark || !column) return;

    const sync = () => {
      const midRatio = measureWordmarkMidRatio(mark);
      const columnW = column.getBoundingClientRect().width;
      if (midRatio === null || columnW <= 0) {
        stack.style.transform = "";
        return;
      }

      const shiftPx = (midRatio - 0.5) * columnW;
      stack.style.transform = `translateX(${-shiftPx}px)`;
    };

    const onReady = () => sync();

    if (mark.complete) onReady();
    else mark.addEventListener("load", onReady, { once: true });

    const ro = new ResizeObserver(sync);
    ro.observe(column);
    ro.observe(mark);

    return () => {
      ro.disconnect();
      mark.removeEventListener("load", onReady);
      stack.style.transform = "";
    };
  }, [stackRef, markRef, columnRef]);
}
