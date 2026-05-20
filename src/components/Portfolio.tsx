import { useEffect, useRef, useState } from "react";
import { CATEGORIES, STYLE_FILTERS, type StyleFilter } from "../data/site";
import { SectionHeading } from "./SectionHeading";

const PLACEHOLDERS_PER_STYLE = 3;

export function Portfolio() {
  const [activeStyle, setActiveStyle] = useState<StyleFilter>("Todos");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const visibleCategories =
    activeStyle === "Todos" ? [...CATEGORIES] : [activeStyle];

  useEffect(() => {
    if (activeStyle === "Todos") return;
    const el = sectionRefs.current[activeStyle];
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeStyle]);

  return (
    <section id="portfolio" className="section-panel py-16 md:py-20 section-enter">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 px-5 text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber">Portfólio</p>
          <SectionHeading line1="Trabalhos" line2="por estilo" className="mt-3" />
          <p className="mx-auto mt-3 max-w-xl text-muted md:mx-0">
            Fotos reais em breve. Enquanto isso, chama no Instagram e vê o feed completo.
          </p>
        </header>

        <section
          className="mb-8 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-none"
          role="tablist"
          aria-label="Filtrar por estilo"
        >
          {STYLE_FILTERS.map((style) => (
            <button
              key={style}
              type="button"
              role="tab"
              aria-selected={activeStyle === style}
              onClick={() => setActiveStyle(style)}
              className={`pill shrink-0 min-h-[44px] ${activeStyle === style ? "pill--active" : ""}`}
            >
              {style}
            </button>
          ))}
        </section>

        {visibleCategories.map((cat) => (
          <section
            key={cat}
            ref={(el) => {
              sectionRefs.current[cat] = el;
            }}
            className="mb-10"
            id={`portfolio-${cat.replace(/\s/g, "-").toLowerCase()}`}
          >
            <h3
              className={`headline-heavy mb-4 px-5 text-2xl md:text-3xl ${
                activeStyle === cat ? "text-amber" : "text-red-light"
              }`}
            >
              {cat}
            </h3>
            <div className="grid grid-cols-2 gap-3 px-5 sm:grid-cols-3 sm:gap-4">
              {Array.from({ length: PLACEHOLDERS_PER_STYLE }, (_, i) => (
                <div
                  key={`${cat}-${i}`}
                  className="portfolio-placeholder card-surface flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-[12px] p-4 text-center"
                  aria-hidden
                >
                  <span className="text-2xl opacity-40" aria-hidden>
                    ✦
                  </span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">
                    {cat}
                  </span>
                  <span className="text-xs text-muted/70">Em breve</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
