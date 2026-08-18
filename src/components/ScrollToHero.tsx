import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/** Ao abrir/recarregar, garante scroll no topo (hero com logo centralizada). */
export function ScrollToHero() {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    // Só faz scroll quando a rota realmente muda (não em re-renders)
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      if (pathname === "/" && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  return null;
}
