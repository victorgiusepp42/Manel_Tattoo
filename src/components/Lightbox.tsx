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
  const lightboxRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Função para prevenir default em qualquer evento de touch
  const preventDefault = useCallback((e: Event | TouchEvent) => {
    if (e.cancelable) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    // Salva estilos originais
    const originalStyle = body.getAttribute('style') || '';
    const originalScrollY = window.scrollY;

    // Aplica estilos de lock
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.height = '100vh';
    body.style.overscrollBehavior = 'none';

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    html.style.touchAction = 'none';

    // Adiciona classe para estilos CSS
    body.classList.add('lightbox-scroll-locked');
    html.classList.add('lightbox-scroll-locked');

    // Previne todos os eventos que podem causar scroll
    const options: AddEventListenerOptions = { passive: false, capture: true };

    document.addEventListener('touchmove', preventDefault, options);
    document.addEventListener('touchstart', preventDefault, options);
    document.addEventListener('touchend', preventDefault, options);
    document.addEventListener('gesturestart', preventDefault, options);
    document.addEventListener('gesturechange', preventDefault, options);
    document.addEventListener('gestureend', preventDefault, options);
    document.addEventListener('scroll', preventDefault, options);

    // Keyboard
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === '+' || e.key === '=') setZoomIdx((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
      if (e.key === '-') setZoomIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);

    return () => {
      // Restaura estilos
      body.setAttribute('style', originalStyle);
      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      body.style.top = '';
      body.style.height = '';
      body.style.overscrollBehavior = '';

      html.style.overflow = '';
      html.style.overscrollBehavior = '';
      html.style.touchAction = '';

      body.classList.remove('lightbox-scroll-locked');
      html.classList.remove('lightbox-scroll-locked');

      // Remove event listeners
      document.removeEventListener('touchmove', preventDefault, options);
      document.removeEventListener('touchstart', preventDefault, options);
      document.removeEventListener('touchend', preventDefault, options);
      document.removeEventListener('gesturestart', preventDefault, options);
      document.removeEventListener('gesturechange', preventDefault, options);
      document.removeEventListener('gestureend', preventDefault, options);
      document.removeEventListener('scroll', preventDefault, options);

      window.removeEventListener('keydown', onKey);
      window.scrollTo(0, originalScrollY);
    };
  }, [handleClose, preventDefault]);

  return (
    <div
      ref={lightboxRef}
      className="lightbox"
      role="dialog"
      aria-modal
      aria-label="Visualização do trabalho"
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <header
        className="lightbox__bar"
        onTouchMove={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
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

      <section
        className="lightbox__viewport"
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="lightbox__img max-h-[min(70vh,720px)] w-auto max-w-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${scale})`, objectPosition: item.imageFocus ?? "center" }}
          draggable={false}
        />
      </section>

      <footer
        className="lightbox__footer"
        onTouchMove={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {item.style ? <span className="pill">{item.style}</span> : null}
        <h3 className="headline-heavy text-2xl text-cream">{item.title}</h3>
        <InstagramButton className="lightbox__cta min-h-[48px] w-full sm:w-auto">
          Quero algo assim
        </InstagramButton>
      </footer>
    </div>
  );
}
