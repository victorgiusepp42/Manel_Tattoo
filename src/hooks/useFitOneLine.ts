import { useLayoutEffect, useRef } from "react";

type Options = {
  minPx?: number;
  maxPx?: number;
};

/** Reduz a fonte até o texto caber em uma linha na largura do pai. */
export function useFitOneLine<T extends HTMLElement>({ minPx = 7, maxPx = 18 }: Options = {}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;

    const fit = () => {
      const maxW = box.clientWidth;
      if (maxW <= 0) return;

      let lo = minPx;
      let hi = maxPx;
      el.style.fontSize = `${hi}px`;

      if (el.scrollWidth <= maxW) return;

      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth > maxW) hi = mid;
        else lo = mid;
      }

      el.style.fontSize = `${lo}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    window.addEventListener("resize", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [minPx, maxPx]);

  return ref;
}
