import { useEffect, useState, useRef } from "react";
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

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "+" || e.key === "=") setZoomIdx((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
      if (e.key === "-") setZoomIdx((i) => Math.max(i - 1, 0));
    };
    const preventScroll = (e: TouchEvent) => {
      if (e.target === document.body || document.body.contains(e.target as Node)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [onClose]);

  return (
    <section className="lightbox" role="dialog" aria-modal aria-label="Visualização do trabalho">
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

      <section className="lightbox__viewport">
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
    </section>
  );
}
