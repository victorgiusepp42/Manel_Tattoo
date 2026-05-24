import { useRef } from "react";
import { BRAND } from "../data/site";
import { useFitLinesToWidth } from "../hooks/useFitLinesToWidth";
import { useFooterBrandAlign } from "../hooks/useFooterBrandAlign";
import { FooterBrandLockup } from "./FooterBrandLockup";

export function Footer() {
  const year = new Date().getFullYear();
  const columnRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLImageElement>(null);
  const textWidthRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useFooterBrandAlign(stackRef, markRef, columnRef);
  useFitLinesToWidth(textWidthRef, line1Ref, line2Ref, { minPx: 7, maxPx: 14 });

  return (
    <footer className="site-footer border-t border-white/10">
      <div ref={columnRef} className="site-footer__brand-column">
        <div ref={stackRef} className="site-footer__brand-stack">
          <FooterBrandLockup markRef={markRef} className="site-footer__lockup" />
          <div ref={textWidthRef} className="site-footer__meta">
            <p ref={line1Ref} className="site-footer__meta-line font-manel text-muted">
              Catalão, GO · Brasil
            </p>
            <p ref={line2Ref} className="site-footer__meta-line font-manel text-muted/70">
              © {year} {BRAND.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
