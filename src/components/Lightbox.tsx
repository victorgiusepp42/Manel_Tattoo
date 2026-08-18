import { useEffect, useState, useRef, useCallback } from "react";
import { InstagramButton } from "./InstagramButton";

export type LightboxItem = {
  image: string;
  title: string;
  imageFocus?: string;
  style?: string;
};

type Props = {
  item: LightboxItem;
  onClose: () => void;
};

const ZOOM_STEPS = [1, 1.5, 2] as const;

export function Lightbox({ item, onClose }: Props) {
  const [zoomIdx, setZoomIdx] = useState(0);
  const scrollYRef = useRef(0);
  const scale = ZOOM_STEPS[zoomIdx];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    const originalTop = window.getComputedStyle(document.body).top;
    const originalWidth = window.getComputedStyle(document.body).width;

    // Bloqueia scroll no body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollYRef.current}px`;

    // Adiciona classe para CSS saber que modal está aberto
    document.body.classList.add("lightbox-scroll-locked");
    document.documentElement.classList.add("lightbox-scroll-locked");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "+" || e.key === "=") setZoomIdx((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
      if (e.key === "-") setZoomIdx((i) => Math.max(i - 1, 0));
    };

    // Previne scroll no window
    const preventDefault = (e: Event) => e.preventDefault();

    // Tenta bloquear touchmove
    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);
    document.addEventListener("gestureend", preventDefault);
    document.addEventListener("scroll", preventDefault, { passive: false });

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("lightbox-scroll-locked");
      document.documentElement.classList.remove("lightbox-scroll-locked");
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      window.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", preventDefault);
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
      document.removeEventListener("gestureend", preventDefault);
      document.removeEventListener("scroll", preventDefault);

      window.scrollTo(0, scrollYRef.current);
    };
  }, [handleClose]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal
      aria-label="Visualização do trabalho"
      onTouchMove={(e) => e.stopPropagation()}
    >
      <header className="lightbox__bar">
        <button type="button" onClick={handleClose} className="lightbox__btn min-h-[44px]">
          Fechar
        </button>
        <section className="flex gap-2">
          <button
            type="button"
            className="lightbox__btn min-h-[44px] min-w-[44px]"
            onClick={() => setZoomIdx((i) => Math.max(i - 1, 0))}
            aria-label="Diminuir zoom"
          >
            −
          </button>
          <button
            type="button"
            className="lightbox__btn min-h-[44px] min-w-[44px]"
            onClick={() => setZoomIdx((i) => Math.min(i + 1, ZOOM_STEPS.length - 1))}
            aria-label="Aumentar zoom"
          >
            +
          </button>
        </section>
      </header>

      <section className="lightbox__viewport" onTouchMove={(e) => e.stopPropagation()}>
        <img
          src={item.image}
          alt={item.title}
          className="lightbox__img max-h-[min(70vh,720px)] w-auto max-w-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${scale})`, objectPosition: item.imageFocus ?? "center" }}
          draggable={false}
        />
      </section>

      <footer className="lightbox__footer">
        {item.style ? <span className="pill">{item.style}</span> : null}
        <h3 className="headline-heavy text-2xl text-cream">{item.title}</h3>
        <InstagramButton className="lightbox__cta min-h-[48px] w-full sm:w-auto">
          Quero algo assim
        </InstagramButton>
      </footer>
    </div>
  );
}
