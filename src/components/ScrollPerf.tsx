import { useEffect } from "react";

/** Pausa animações pesadas do chrome durante scroll (menos tranco no mobile). */
export function ScrollPerf() {
  useEffect(() => {
    let timer = 0;
    const root = document.documentElement;

    const onScroll = () => {
      root.classList.add("is-scrolling");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        root.classList.remove("is-scrolling");
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
