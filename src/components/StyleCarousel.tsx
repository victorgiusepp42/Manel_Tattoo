import { useEffect, useRef } from "react";
import type { PortfolioItem } from "../data/site";

type Props = {
  items: PortfolioItem[];
  onOpen: (item: PortfolioItem) => void;
  label: string;
};

export function StyleCarousel({ items, onOpen, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let startX = 0;
    let startScroll = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startScroll = el.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = startX - e.touches[0].clientX;
      el.scrollLeft = startScroll + dx;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section className="carousel-wrap" aria-label={`Carrossel ${label}`}>
      <div ref={trackRef} className="carousel">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item)}
            className="carousel__item card-surface group text-left"
          >
            <span className="relative block aspect-[3/4] w-full overflow-hidden rounded-[10px]">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                style={{ objectPosition: item.imageFocus ?? "center" }}
                loading="lazy"
                draggable={false}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {item.beforeAfter && (
                <span className="absolute left-3 top-3 pill pill--active text-[0.6rem]">
                  Antes / Depois
                </span>
              )}
              <span className="absolute bottom-0 left-0 right-0 p-4">
                <span className="display-title block text-lg text-cream">{item.title}</span>
                <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-wider text-amber">
                  Ver em tela cheia
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
