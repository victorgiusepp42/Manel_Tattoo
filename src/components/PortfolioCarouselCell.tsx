import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import { useInView } from "../hooks/useInView";
import { preloadImages } from "../hooks/usePreloadImages";
import type { GalleryPhoto, GallerySlide } from "../data/site";

/** Distância mínima para considerar swipe (em pixels) */
const SWIPE_THRESHOLD = 30;

type Props = {
  photo: GalleryPhoto;
  slides: readonly GallerySlide[];
};

export function PortfolioCarouselCell({ photo, slides }: Props) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const cellRef = useRef<HTMLButtonElement>(null);
  const swipeStartXRef = useRef(0);
  const isSwipingRef = useRef(false);
  const isPointerDownRef = useRef(false);

  const inView = useInView(cellRef, { rootMargin: "320px" });
  const slideUrls = useMemo(() => slides.map((s) => s.image), [slides]);

  useEffect(() => {
    if (!inView || slides.length <= 1) return;

    const first = slideUrls[0];
    if (first) preloadImages([first]);

    const rest = slideUrls.slice(1);
    if (rest.length === 0) return;

    const preloadRest = () => preloadImages(rest);
    const deferId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(preloadRest, { timeout: 1800 })
        : window.setTimeout(preloadRest, 200);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(deferId as number);
      } else {
        clearTimeout(deferId as number);
      }
    };
  }, [inView, slideUrls, slides.length]);

  const n = slides.length;

  const goNext = useCallback(() => {
    if (n <= 1) return;
    setActive((i) => (i + 1) % n);
  }, [n]);

  const goPrev = useCallback(() => {
    if (n <= 1) return;
    setActive((i) => (i - 1 + n) % n);
  }, [n]);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  const toggleZoom = useCallback(() => {
    setZoomOpen((z) => !z);
  }, []);

  // Bloqueia scroll quando zoom está aberto
  useEffect(() => {
    if (zoomOpen) {
      document.body.classList.add('portfolio-peek-open');
      document.documentElement.classList.add('portfolio-peek-open');
      const preventDefault = (e: Event) => e.preventDefault();
      document.addEventListener('touchmove', preventDefault, { passive: false });
      document.addEventListener('gesturestart', preventDefault);
      document.addEventListener('gesturechange', preventDefault);
      document.addEventListener('gestureend', preventDefault);
      return () => {
        document.body.classList.remove('portfolio-peek-open');
        document.documentElement.classList.remove('portfolio-peek-open');
        document.removeEventListener('touchmove', preventDefault);
        document.removeEventListener('gesturestart', preventDefault);
        document.removeEventListener('gesturechange', preventDefault);
        document.removeEventListener('gestureend', preventDefault);
        // NÃO faz scroll ao fechar - mantém posição atual
      };
    }
  }, [zoomOpen]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      isPointerDownRef.current = true;
      swipeStartXRef.current = e.clientX;
      isSwipingRef.current = false;
    },
    [],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = Math.abs(e.clientX - swipeStartXRef.current);
    if (deltaX > SWIPE_THRESHOLD) {
      isSwipingRef.current = true;
    }
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const deltaX = e.clientX - swipeStartXRef.current;

      if (isSwipingRef.current || Math.abs(deltaX) > SWIPE_THRESHOLD) {
        // Swipe detectado
        if (deltaX < 0) {
          goNext();
        } else {
          goPrev();
        }
      } else {
        // Clique = zoom toggle
        toggleZoom();
      }

      isPointerDownRef.current = false;
      isSwipingRef.current = false;
    },
    [goNext, goPrev, toggleZoom],
  );

  // Handler para o overlay de zoom (swipe para navegar)
  const zoomOverlayRef = useRef<HTMLDivElement>(null);
  const handleZoomPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    swipeStartXRef.current = e.clientX;
    isSwipingRef.current = false;
  }, []);

  const handleZoomPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = Math.abs(e.clientX - swipeStartXRef.current);
    if (deltaX > SWIPE_THRESHOLD) {
      isSwipingRef.current = true;
    }
  }, []);

  const handleZoomPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const deltaX = e.clientX - swipeStartXRef.current;

      if (isSwipingRef.current || Math.abs(deltaX) > SWIPE_THRESHOLD) {
        // Swipe no zoom = navegar foto
        if (deltaX < 0) {
          goNext();
        } else {
          goPrev();
        }
      } else {
        // Clique no zoom = fechar
        setZoomOpen(false);
      }

      isPointerDownRef.current = false;
      isSwipingRef.current = false;
    },
    [goNext, goPrev],
  );

  const current = slides[active]!;

  return (
    <>
      <button
        ref={cellRef}
        type="button"
        className="portfolio-grid__cell card-surface"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => { isPointerDownRef.current = false; }}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={
          n > 1
            ? `${photo.style}: clique para zoom, arraste para passar foto (${active + 1} de ${n})`
            : `${photo.style}: clique para zoom`
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

      {zoomOpen &&
        createPortal(
          <div
            ref={zoomOverlayRef}
            className="portfolio-peek portfolio-peek--active"
            role="dialog"
            aria-modal="true"
            aria-label={`${photo.style} ampliado`}
            onPointerDown={handleZoomPointerDown}
            onPointerMove={handleZoomPointerMove}
            onPointerUp={handleZoomPointerUp}
          >
            {/* Meta info que aparece com zoom */}
            <div className="portfolio-peek__meta">
              <p className="portfolio-peek__style">{photo.style}</p>
            </div>
            <img
              src={current.image}
              alt=""
              className="portfolio-peek__img"
              draggable={false}
            />
            {/* Dots que aparecem com zoom */}
            {n > 1 && (
              <div
                className="portfolio-peek__dots"
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
                      "portfolio-peek__dot",
                      i === active && "portfolio-peek__dot--active",
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
