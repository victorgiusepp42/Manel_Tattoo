import { BRAND } from "../data/site";
import { BrandLockupImage } from "./BrandLockupImage";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-white/10 bg-bg/80 backdrop-blur-sm">
      <div className="site-footer__inner mx-auto flex max-w-6xl flex-col items-center px-5">
        <BrandLockupImage size="footer" className="site-footer__lockup" />
        <div className="site-footer__meta">
          <p className="text-sm text-muted">Catalão, GO · Brasil</p>
          <p className="text-xs text-muted/70">© {year} {BRAND.name}</p>
        </div>
      </div>
    </footer>
  );
}
