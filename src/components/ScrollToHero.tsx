import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Ao abrir/recarregar, garante scroll no topo (hero com logo centralizada). */
export function ScrollToHero() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (pathname !== "/") return;
    /* Só corrige se o browser restaurou posição — evita briga com o 1º scroll. */
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
