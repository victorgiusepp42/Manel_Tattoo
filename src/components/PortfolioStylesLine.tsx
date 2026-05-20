import { useFitOneLine } from "../hooks/useFitOneLine";
import { ShurikenIcon } from "./icons/ShurikenIcon";

const STYLES = ["Blackwork", "Realismo", "Old School", "Fineline", "Lettering"] as const;

export function PortfolioStylesLine() {
  const stylesRef = useFitOneLine<HTMLParagraphElement>({ minPx: 9, maxPx: 42 });

  return (
    <p
      ref={stylesRef}
      className="portfolio-styles"
      aria-label="Estilos: Blackwork, Realismo, Old School, Fineline, Lettering"
    >
      {STYLES.map((style, i) => (
        <span key={style} className="contents">
          {i > 0 ? <ShurikenIcon className="portfolio-styles__shuriken" /> : null}
          <span
            className={
              style === "Old School"
                ? "portfolio-styles__word portfolio-styles__word--featured"
                : "portfolio-styles__word"
            }
          >
            {style}
          </span>
        </span>
      ))}
    </p>
  );
}
