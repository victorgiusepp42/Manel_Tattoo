import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Ao abrir/recarregar, garante scroll no topo (hero com logo centralizada). */
export function ScrollToHero() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollTop = () => {
      window.scrollTo(0, 0);
    };

    scrollTop();
    const id = window.requestAnimationFrame(scrollTop);
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
