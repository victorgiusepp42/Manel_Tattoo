import { BRAND, instagramUrl, whatsappUrl } from "../data/site";
import { BrandTitle } from "./BrandTitle";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-bg/80 py-12 backdrop-blur-sm">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 md:flex-row md:items-start md:justify-between">
        <section className="flex flex-col items-center gap-3 md:items-start">
          <section className="flex items-center gap-3">
            <Logo size="footer" />
            <BrandTitle size="footer" />
          </section>
          <p className="text-sm text-muted">Catalão, GO · Brasil</p>
          <p className="text-xs text-muted/70">© {year} {BRAND.name}</p>
        </section>
        <nav className="flex flex-col items-center gap-3 text-sm md:items-end">
          <a
            href={instagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] leading-[44px] text-red-light hover:text-amber"
          >
            @{BRAND.instagram}
          </a>
          <a
            href={`https://www.instagram.com/${BRAND.studio}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] leading-[44px] text-muted hover:text-cream"
          >
            @{BRAND.studio}
          </a>
          <a
            href={whatsappUrl("Oi! Vim pelo site da Manel Tattoo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] leading-[44px] text-muted hover:text-cream"
          >
            WhatsApp
          </a>
        </nav>
      </section>
    </footer>
  );
}
