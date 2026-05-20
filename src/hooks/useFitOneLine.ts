import { useLayoutEffect, useRef, type RefObject } from "react";

type Options = {
  minPx?: number;
  maxPx?: number;
  /** Seletor de irmão no mesmo pai cuja largura (+ gap) é descontada do espaço útil. */
  reserveSibling?: string;
  /** Largura máxima medida neste elemento (ex.: grid de fotos abaixo). */
  widthRef?: RefObject<HTMLElement | null>;
};

/** Reduz a fonte até o texto caber em uma linha na largura do pai. */
export function useFitOneLine<T extends HTMLElement>({
  minPx = 7,
  maxPx = 18,
  reserveSibling,
  widthRef,
}: Options = {}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    const widthEl = widthRef?.current ?? box;
    if (!el || !box || !widthEl) return;

    const fit = () => {
      let reserve = 0;
      if (reserveSibling) {
        const sib = box.querySelector<HTMLElement>(reserveSibling);
        if (sib) {
          reserve += sib.getBoundingClientRect().width;
          const gap = parseFloat(getComputedStyle(box).columnGap || getComputedStyle(box).gap) || 0;
          reserve += gap;
        }
      }
      const maxW = widthEl.clientWidth - reserve;
      if (maxW <= 0) return;

      let lo = minPx;
      let hi = maxPx;
      el.style.fontSize = `${hi}px`;

      const syncSizeVar = (px: number) => {
        box.style.setProperty("--fit-one-line-size", `${px}px`);
      };

      if (el.scrollWidth <= maxW) {
        syncSizeVar(hi);
        return;
      }

      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth > maxW) hi = mid;
        else lo = mid;
      }

      el.style.fontSize = `${lo}px`;
      syncSizeVar(lo);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(widthEl);
    ro.observe(el);
    window.addEventListener("resize", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [minPx, maxPx, reserveSibling, widthRef]);

  return ref;
}
