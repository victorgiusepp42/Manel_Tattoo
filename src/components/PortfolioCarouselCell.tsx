import { useCallback, useRef, useState } from "react";
import { cn } from "../lib/cn";
import type { GalleryPhoto, GallerySlide } from "../data/site";

const HOLD_MS = 2000;

type Props = {
  photo: GalleryPhoto;
  slides: readonly GallerySlide[];
};

export function PortfolioCarouselCell({ photo, slides }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressRef = useRef(false);

  const n = slides.length;

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current !== null) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    if (n <= 1) return;
    setActive((i) => (i + 1) % n);
  }, [n]);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  const endHold = useCallback(() => {
    clearHoldTimer();
    setZoomed(false);
  }, [clearHoldTimer]);

  const onHoldStart = useCallback(() => {
    longPressRef.current = false;
    clearHoldTimer();
    holdTimerRef.current = setTimeout(() => {
      longPressRef.current = true;
      setZoomed(true);
    }, HOLD_MS);
  }, [clearHoldTimer]);

  const onCellClick = useCallback(() => {
    if (longPressRef.current) {
      longPressRef.current = false;
      return;
    }
    goNext();
  }, [goNext]);

  const current = slides[active]!;

  return (
    <>
      <button
        type="button"
        className={cn("portfolio-grid__cell card-surface", zoomed && "portfolio-grid__cell--zoom")}
        onClick={onCellClick}
        onPointerDown={onHoldStart}
        onPointerUp={endHold}
        onPointerCancel={endHold}
        onPointerLeave={endHold}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={
          n > 1
            ? `${photo.style}: toque para próxima foto, segure 2s para ampliar (${active + 1} de ${n})`
            : `${photo.style}: segure 2s para ampliar`
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
              className={`portfolio-carousel__dot ${i === active ? "portfolio-carousel__dot--active" : ""}`}
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
