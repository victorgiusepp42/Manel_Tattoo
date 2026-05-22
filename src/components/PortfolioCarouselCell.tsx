import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import type { GalleryPhoto, GallerySlide } from "../data/site";

/** Toque rápido (< 1s) troca de foto; segurar 1s abre o zoom. */
const TAP_MS = 1000;
const ZOOM_HOLD_MS = 1000;
/** Deve coincidir com a duração em CSS (--portfolio-peek-ms). */
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
  const pointerIdRef = useRef<number | null>(null);
  const cellRef = useRef<HTMLButtonElement>(null);
  const endedRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearZoomTimer = useCallback(() => {
    if (zoomTimerRef.current !== null) {
      clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }
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
      clearZoomTimer();
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    },
    [clearZoomTimer],
  );

  const n = slides.length;

  const goNext = useCallback(() => {
    if (n <= 1) return;
    setActive((i) => (i + 1) % n);
  }, [n]);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  const endPeek = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;

    clearZoomTimer();

    const btn = cellRef.current;
    const pid = pointerIdRef.current;
    if (btn && pid !== null && btn.hasPointerCapture(pid)) {
      btn.releasePointerCapture(pid);
    }
    pointerIdRef.current = null;

    const duration = Date.now() - pressStartRef.current;

    if (peek) {
      setPeekActive(false);
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        setPeek(false);
        closeTimerRef.current = null;
      }, PEEK_ANIM_MS);
      return;
    }

    if (duration > 0 && duration < TAP_MS && n > 1) {
      goNext();
    }
  }, [clearZoomTimer, goNext, n, peek]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      endedRef.current = false;
      e.currentTarget.setPointerCapture(e.pointerId);
      pointerIdRef.current = e.pointerId;
      if (closeTimerRef.current !== null) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      clearZoomTimer();
      pressStartRef.current = Date.now();
      zoomTimerRef.current = setTimeout(() => setPeek(true), ZOOM_HOLD_MS);
    },
    [clearZoomTimer],
  );

  const current = slides[active]!;

  return (
    <>
      <button
        ref={cellRef}
        type="button"
        className="portfolio-grid__cell card-surface"
        onPointerDown={onPointerDown}
        onPointerUp={endPeek}
        onPointerCancel={endPeek}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={
          n > 1
            ? `${photo.style}: toque rápido para próxima foto, segure 1 segundo para ampliar (${active + 1} de ${n})`
            : `${photo.style}: segure 1 segundo para ampliar`
        }
      >
        <img
          src={current.image}
          alt=""
          className="portfolio-grid__img"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </button>

      {peek &&
        createPortal(
          <div
            className={cn("portfolio-peek", peekActive && "portfolio-peek--active")}
            role="dialog"
            aria-modal="true"
            aria-label={`${photo.style} ampliado`}
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
