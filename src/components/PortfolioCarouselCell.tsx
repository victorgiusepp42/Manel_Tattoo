import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import { useInView } from "../hooks/useInView";
import { preloadImages } from "../hooks/usePreloadImages";
import type { GalleryPhoto, GallerySlide } from "../data/site";

/** Toque rápido (< 0,6s) troca de foto; segurar 0,6s abre o zoom. */
const TAP_MS = 600;
const ZOOM_HOLD_MS = 600;
const PEEK_ANIM_MS = 620;

type Props = {
  photo: GalleryPhoto;
  slides: readonly GallerySlide[];
};

export function PortfolioCarouselCell({ photo, slides }: Props) {
  const [active, setActive] = useState(0);
  const [peek, setPeek] = useState(false);
  const [peekActive, setPeekActive] = useState(false);
  const pressStartRef = useRef(0);
  const pressActiveRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const cellRef = useRef<HTMLButtonElement>(null);
  const zoomOpenedRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const globalEndRef = useRef<(() => void) | null>(null);

  const inView = useInView(cellRef, { rootMargin: "320px" });
  const slideUrls = useMemo(() => slides.map((s) => s.image), [slides]);

  useEffect(() => {
    if (!inView || slides.length <= 1) return;
    preloadImages(slideUrls);
  }, [inView, slideUrls, slides.length]);

  const clearZoomTimer = useCallback(() => {
    if (zoomTimerRef.current !== null) {
      clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }
  }, []);

  const removeGlobalEnd = useCallback(() => {
    const fn = globalEndRef.current;
    if (!fn) return;
    window.removeEventListener("pointerup", fn);
    window.removeEventListener("pointercancel", fn);
    globalEndRef.current = null;
  }, []);

  const closeZoom = useCallback(() => {
    zoomOpenedRef.current = false;
    setPeekActive(false);
    if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setPeek(false);
      closeTimerRef.current = null;
    }, PEEK_ANIM_MS);
  }, []);

  useEffect(() => {
    if (!peek) {
      setPeekActive(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPeekActive(true));
    });
    return () => cancelAnimationFrame(id);
  }, [peek]);

  useEffect(
    () => () => {
      removeGlobalEnd();
      clearZoomTimer();
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    },
    [clearZoomTimer, removeGlobalEnd],
  );

  const n = slides.length;

  const goNext = useCallback(() => {
    if (n <= 1) return;
    setActive((i) => (i + 1) % n);
  }, [n]);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  const preloadNext = useCallback(() => {
    if (n <= 1) return;
    preloadImages([slides[(active + 1) % n]!.image]);
  }, [active, n, slides]);

  const endPress = useCallback(() => {
    if (!pressActiveRef.current) return;
    pressActiveRef.current = false;
    removeGlobalEnd();
    clearZoomTimer();

    const btn = cellRef.current;
    const pid = pointerIdRef.current;
    if (btn && pid !== null && btn.hasPointerCapture(pid)) {
      btn.releasePointerCapture(pid);
    }
    pointerIdRef.current = null;

    if (zoomOpenedRef.current) {
      closeZoom();
      return;
    }

    const duration = Date.now() - pressStartRef.current;
    if (duration > 0 && duration < TAP_MS && n > 1) {
      goNext();
    }
  }, [clearZoomTimer, closeZoom, goNext, n, removeGlobalEnd]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0 || pressActiveRef.current) return;

      preloadNext();
      pressActiveRef.current = true;
      zoomOpenedRef.current = false;
      pressStartRef.current = Date.now();
      pointerIdRef.current = e.pointerId;
      e.currentTarget.setPointerCapture(e.pointerId);

      if (closeTimerRef.current !== null) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      clearZoomTimer();
      setPeek(false);
      setPeekActive(false);

      removeGlobalEnd();
      const onGlobalEnd = () => endPress();
      globalEndRef.current = onGlobalEnd;
      window.addEventListener("pointerup", onGlobalEnd);
      window.addEventListener("pointercancel", onGlobalEnd);

      zoomTimerRef.current = setTimeout(() => {
        if (!pressActiveRef.current) return;
        zoomOpenedRef.current = true;
        setPeek(true);
      }, ZOOM_HOLD_MS);
    },
    [clearZoomTimer, endPress, preloadNext, removeGlobalEnd],
  );

  const current = slides[active]!;

  return (
    <>
      <button
        ref={cellRef}
        type="button"
        className="portfolio-grid__cell card-surface"
        onPointerDown={onPointerDown}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={
          n > 1
            ? `${photo.style}: toque rápido para próxima foto, segure 0,6s para ampliar (${active + 1} de ${n})`
            : `${photo.style}: segure 0,6s para ampliar`
        }
      >
        <div className="portfolio-grid__img-stack" aria-hidden>
          {slides.map((slide, i) => (
            <img
              key={slide.image}
              src={slide.image}
              alt=""
              className={cn(
                "portfolio-grid__img",
                i === active && "portfolio-grid__img--active",
              )}
              loading={inView && i <= 1 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
      </button>

      {peek &&
        createPortal(
          <div
            className={cn("portfolio-peek", peekActive && "portfolio-peek--active")}
            role="dialog"
            aria-modal="true"
            aria-label={`${photo.style} ampliado`}
            onPointerUp={closeZoom}
            onPointerCancel={closeZoom}
          >
            <img
              src={current.image}
              alt=""
              className="portfolio-peek__img"
              draggable={false}
            />
          </div>,
          document.body,
        )}

      {n > 1 && (
        <div
          className="portfolio-carousel__dots"
          role="tablist"
          aria-label="Fotos deste trabalho"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              tabIndex={-1}
              className={cn(
                "portfolio-carousel__dot",
                i === active && "portfolio-carousel__dot--active",
              )}
              onClick={(e) => {
                e.stopPropagation();
                preloadImages([slides[(i + 1) % n]!.image]);
                goTo(i);
              }}
              aria-label={`Foto ${i + 1} de ${n}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
