import { useEffect, useRef } from "react";

const DEFAULT_MS = 140;

/** Ref estável: true quando o utilizador não está a fazer scroll. */
export function useScrollIdleRef(idleMs = DEFAULT_MS) {
  const idleRef = useRef(true);

  useEffect(() => {
    let timer = 0;

    const onScroll = () => {
      idleRef.current = false;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        idleRef.current = true;
      }, idleMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [idleMs]);

  return idleRef;
}
