import { useEffect, useState } from "react";
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
  const scale = ZOOM_STEPS[zoomIdx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoomIdx((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
      if (e.key === "-") setZoomIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <section className="lightbox" role="dialog" aria-modal aria-label="Visualização do trabalho">
      <header className="lightbox__bar">
        <button type="button" onClick={onClose} className="lightbox__btn min-h-[44px]">
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
        <InstagramButton className="min-h-[48px] w-full sm:w-auto">
          Quero algo assim
        </InstagramButton>
      </footer>
    </section>
  );
}
