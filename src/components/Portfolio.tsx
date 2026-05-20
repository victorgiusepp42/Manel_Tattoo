import { useEffect, useRef, useState } from "react";
import { useFitOneLine } from "../hooks/useFitOneLine";
import { CATEGORIES, PORTFOLIO_GALLERY } from "../data/site";
import { PortfolioCarouselCell } from "./PortfolioCarouselCell";
import { SectionHeading } from "./SectionHeading";

type Category = (typeof CATEGORIES)[number];

function filtersWithActiveCentered(active: Category): Category[] {
  const rest = CATEGORIES.filter((c) => c !== active);
  const half = Math.floor(rest.length / 2);
  return [...rest.slice(0, half), active, ...rest.slice(half)];
}

export function Portfolio() {
  const [activeStyle, setActiveStyle] = useState<Category>("Old School");
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const filterOrder = filtersWithActiveCentered(activeStyle);
  const portfolioTitleRef = useFitOneLine<HTMLHeadingElement>({ minPx: 14, maxPx: 36 });

  useEffect(() => {
    const first = PORTFOLIO_GALLERY.find((p) => p.filterStyle === activeStyle);
    if (first) {
      itemRefs.current[first.id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeStyle]);

  return (
    <section id="portfolio" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-6xl">
        <div className="portfolio-intro px-5">
          <SectionHeading
            ref={portfolioTitleRef}
            line1="Amostra"
            line2="Portfólio"
            layout="inline"
            nowrap
            className="portfolio-intro__title"
          />

          <section className="portfolio-filters" role="tablist" aria-label="Filtrar por estilo">
            {filterOrder.map((style) => (
              <button
                key={style}
                type="button"
                role="tab"
                aria-selected={activeStyle === style}
                onClick={() => setActiveStyle(style)}
                className={`pill ${activeStyle === style ? "pill--active" : ""}`}
              >
                {style}
              </button>
            ))}
          </section>
        </div>

        <div className="portfolio-grid px-5">
          {PORTFOLIO_GALLERY.map((photo) => (
            <article
              key={photo.id}
              id={`portfolio-photo-${photo.index}`}
              ref={(el) => {
                itemRefs.current[photo.id] = el;
              }}
              className="portfolio-grid__item"
            >
              {photo.missing || photo.slides.length === 0 ? (
                <div
                  className="portfolio-grid__cell portfolio-placeholder card-surface flex items-center justify-center"
                  aria-hidden
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted/70">
                    Em breve
                  </span>
                </div>
              ) : (
                <PortfolioCarouselCell photo={photo} slides={photo.slides} />
              )}
              <div className="portfolio-grid__meta">
                <p className="portfolio-grid__caption">{photo.style}</p>
                {photo.instagramUrl ? (
                  <a
                    href={photo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-grid__more"
                  >
                    Ver mais
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
