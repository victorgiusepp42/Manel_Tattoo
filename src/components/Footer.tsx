import { useRef } from "react";
import { BRAND } from "../data/site";
import { useFitLinesToWidth } from "../hooks/useFitLinesToWidth";
import { FooterBrandLockup } from "./FooterBrandLockup";

export function Footer() {
  const year = new Date().getFullYear();
  const lockupRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useFitLinesToWidth(lockupRef, line1Ref, line2Ref, { minPx: 8, maxPx: 17 });

  return (
    <footer className="site-footer border-t border-white/10">
      <div className="site-footer__inner mx-auto flex max-w-6xl flex-col items-center px-5">
        <div ref={lockupRef} className="site-footer__lockup-wrap">
          <FooterBrandLockup className="site-footer__lockup" />
        </div>
        <div className="site-footer__meta">
          <p ref={line1Ref} className="site-footer__meta-line font-manel text-muted">
            Catalão, GO · Brasil
          </p>
          <p ref={line2Ref} className="site-footer__meta-line font-manel text-muted/70">
            © {year} {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
