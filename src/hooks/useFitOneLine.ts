import { useLayoutEffect, useRef, type RefObject } from "react";

type Options = {
  minPx?: number;
  maxPx?: number;
  reserveSibling?: string;
  /** Ref para o elemento cuja largura de CONTEÚDO (excluindo padding) é o alvo. */
  widthRef?: RefObject<HTMLElement | null>;
};

/** Ajusta `font-size` do elemento referenciado até caber na largura-alvo.
 *  Mede o conteúdo com `width: max-content` para funcionar em flex containers. */
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
    if (!el || !box) return;

    const getTargetWidth = () => {
      const target = widthRef?.current ?? box;
      const style = getComputedStyle(target);
      const pl = parseFloat(style.paddingLeft) || 0;
      const pr = parseFloat(style.paddingRight) || 0;
      return target.clientWidth - pl - pr;
    };

    /** Mede a largura real do conteúdo independente de como o container está configurado. */
    const measureContent = (fontSize: number): number => {
      el.style.fontSize = `${fontSize}px`;
      const savedWidth = el.style.width;
      const savedMaxWidth = el.style.maxWidth;
      el.style.width = "max-content";
      el.style.maxWidth = "none";
      const w = el.getBoundingClientRect().width;
      el.style.width = savedWidth;
      el.style.maxWidth = savedMaxWidth;
      return w;
    };

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

      const maxW = getTargetWidth() - reserve;
      if (maxW <= 0) return;

      // Start at max, shrink if needed
      if (measureContent(maxPx) <= maxW) {
        el.style.fontSize = `${maxPx}px`;
        box.style.setProperty("--fit-one-line-size", `${maxPx}px`);
        return;
      }

      let lo = minPx;
      let hi = maxPx;
      while (hi - lo > 0.4) {
        const mid = (lo + hi) / 2;
        if (measureContent(mid) > maxW) hi = mid;
        else lo = mid;
      }

      el.style.fontSize = `${lo}px`;
      box.style.setProperty("--fit-one-line-size", `${lo}px`);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(widthRef?.current ?? box);
    ro.observe(el);
    window.addEventListener("resize", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [minPx, maxPx, reserveSibling, widthRef]);

  return ref;
}
