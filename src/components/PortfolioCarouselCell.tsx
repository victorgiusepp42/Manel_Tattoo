import { useCallback, useState } from "react";
import type { GalleryPhoto, GallerySlide } from "../data/site";

type Props = {
  photo: GalleryPhoto;
  slides: readonly GallerySlide[];
};

export function PortfolioCarouselCell({ photo, slides }: Props) {
  const [active, setActive] = useState(0);
  const n = slides.length;

  const goNext = useCallback(() => {
    if (n <= 1) return;
    setActive((i) => (i + 1) % n);
  }, [n]);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);

  const current = slides[active]!;

  return (
    <>
      <button
        type="button"
        className="portfolio-grid__cell card-surface"
        onClick={goNext}
        aria-label={
          n > 1
            ? `${photo.style}: próxima foto (${active + 1} de ${n})`
            : `${photo.style}: foto`
        }
      >
        <img
          src={current.image}
          alt=""
          className="portfolio-grid__img"
          loading="lazy"
          decoding="async"
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
