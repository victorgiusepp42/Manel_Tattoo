import { Fragment, type RefObject } from "react";
import { useFitOneLine } from "../hooks/useFitOneLine";
import { ShurikenIcon } from "./icons/ShurikenIcon";

const STYLES = ["Blackwork", "Realismo", "Old School", "Fineline", "Lettering"] as const;

type Props = {
  widthRef: RefObject<HTMLElement | null>;
};

export function PortfolioStylesLine({ widthRef }: Props) {
  const stylesRef = useFitOneLine<HTMLParagraphElement>({
    minPx: 6,
    maxPx: 13,
    widthRef,
    widthScale: 0.98,
    fitMode: "bounds",
  });

  return (
    <p
      ref={stylesRef}
      className="portfolio-styles"
      aria-label="Estilos: Blackwork, Realismo, Old School, Fineline, Lettering"
    >
      {STYLES.map((style, i) => (
        <Fragment key={style}>
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
        </Fragment>
      ))}
    </p>
  );
}
