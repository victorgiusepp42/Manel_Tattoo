import { useRef } from "react";
import { useFitOneLine } from "../hooks/useFitOneLine";
import { PORTFOLIO_GALLERY } from "../data/site";
import { TattooMachineIcon } from "./icons/TattooMachineIcon";
import { PortfolioCarouselCell } from "./PortfolioCarouselCell";
import { PortfolioStylesLine } from "./PortfolioStylesLine";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  const contentRef = useRef<HTMLDivElement>(null);
  const portfolioTitleRef = useFitOneLine<HTMLHeadingElement>({
    minPx: 14,
    maxPx: 36,
    widthRef: contentRef,
    reserveSibling: ".portfolio-intro__icon",
  });

  return (
    <section id="portfolio" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-6xl">
        <div ref={contentRef} className="portfolio-section px-5">
          <div className="portfolio-intro">
            <div className="portfolio-intro__title-wrap">
              <SectionHeading
                ref={portfolioTitleRef}
                line1="Amostra"
                line2="Portfólio"
                layout="inline"
                nowrap
                className="portfolio-intro__title"
              />
              <TattooMachineIcon className="portfolio-intro__icon shrink-0" />
            </div>

            <div className="portfolio-styles-block">
              <PortfolioStylesLine widthRef={contentRef} />
            </div>
          </div>

          <div className="portfolio-grid">
            {PORTFOLIO_GALLERY.map((photo) => (
              <article key={photo.id} id={`portfolio-photo-${photo.index}`} className="portfolio-grid__item">
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
      </div>
    </section>
  );
}
