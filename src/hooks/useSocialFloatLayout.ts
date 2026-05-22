import { useEffect, useRef, useState } from "react";

const ANCHOR_GAP_PX = 10;
const SCROLL_UP_THRESHOLD = 8;

export type SocialFloatMode = "hidden" | "parked" | "fixed";

export type SocialFloatLayout = {
  mode: SocialFloatMode;
  /** Document Y for `position: absolute` when parked (só ao rolar para cima). */
  parkedTop?: number;
};

function bottomInsetPx(): number {
  const root = document.documentElement;
  const rem = parseFloat(getComputedStyle(root).fontSize) || 16;
  const raw = getComputedStyle(root).getPropertyValue("--safe-area-bottom").trim();
  const safe = parseFloat(raw);
  return Math.max(rem, Number.isFinite(safe) && safe > 0 ? safe : 0);
}

function sameLayout(a: SocialFloatLayout, b: SocialFloatLayout): boolean {
  return a.mode === b.mode && a.parkedTop === b.parkedTop;
}

/** Limite = topo de #portfolio; fixos ao descer; parados no limite só ao subir e encostar nele. */
export function useSocialFloatLayout(buttonHeight: number): SocialFloatLayout {
  const [layout, setLayout] = useState<SocialFloatLayout>({ mode: "hidden" });
  const lastScrollYRef = useRef(0);
  const wasVisibleRef = useRef(false);
  const atLimitRef = useRef(false);
  const layoutRef = useRef<SocialFloatLayout>({ mode: "hidden" });

  const commit = (next: SocialFloatLayout) => {
    if (sameLayout(layoutRef.current, next)) return;
    layoutRef.current = next;
    setLayout(next);
  };

  useEffect(() => {
    if (buttonHeight <= 0) return;

    let raf = 0;
    lastScrollYRef.current = window.scrollY;

    const sync = () => {
      const section = document.getElementById("portfolio");
      const title = document.querySelector<HTMLElement>(".portfolio-intro__title");
      if (!section || !title) return;

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;
      const scrollingUp = delta < -SCROLL_UP_THRESHOLD;
      const scrollingDown = delta > 2;
      lastScrollYRef.current = scrollY;

      const vh = window.innerHeight;
      const limitTop = section.getBoundingClientRect().top;
      const titleTop = title.getBoundingClientRect().top;
      const inset = bottomInsetPx();
      const fixedTop = vh - inset - buttonHeight;
      const parkedTopViewport = titleTop - ANCHOR_GAP_PX - buttonHeight;

      const visible = limitTop <= vh && titleTop <= vh;

      if (!visible) {
        wasVisibleRef.current = false;
        atLimitRef.current = false;
        commit({ mode: "hidden" });
        return;
      }

      if (!wasVisibleRef.current) {
        wasVisibleRef.current = true;
        commit({ mode: "fixed" });
        return;
      }

      if (scrollingDown) {
        atLimitRef.current = false;
        commit({ mode: "fixed" });
        return;
      }

      const atLimitLine = parkedTopViewport >= fixedTop - 4;

      if (atLimitLine) {
        atLimitRef.current = true;
      }

      if (scrollingUp && atLimitRef.current) {
        commit({
          mode: "parked",
          parkedTop: scrollY + parkedTopViewport,
        });
        return;
      }

      commit({ mode: "fixed" });
    };

    const onChange = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, [buttonHeight]);

  return layout;
}
