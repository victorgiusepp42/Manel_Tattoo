import { useFitOneLine } from "../hooks/useFitOneLine";
import { BrandTitle } from "./BrandTitle";
import { InstagramButton } from "./InstagramButton";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";

export function Hero() {
  const taglinePrimaryRef = useFitOneLine<HTMLParagraphElement>({ minPx: 7, maxPx: 18 });
  return (
    <section
      id="inicio"
      className="hero relative flex min-h-[100dvh] flex-col overflow-x-clip pb-6"
    >
      <div className="hero__inner relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <div className="hero__content">
          <div className="hero__content-top">
            <div className="hero-brand-cluster">
              <Logo size="hero" className="logo-tone-original" />
              <BrandTitle size="hero" className="hero-brand-cluster__title" />
            </div>
          </div>

          <div className="hero__taglines">
            <p
              ref={taglinePrimaryRef}
              className="hero__tagline-line hero__tagline-line--primary text-muted"
            >
              Tatuagem autoral com semanas dedicadas na sua cidade.
            </p>
          </div>

          <div className="hero__actions">
            <InstagramButton className="hero__cta btn-instagram--compact">
              <span className="hero__cta-label hero__cta-label--long">Chamar no Instagram</span>
              <span className="hero__cta-label hero__cta-label--short">Instagram</span>
            </InstagramButton>
            <WhatsAppButton className="hero__cta">
              <span className="hero__cta-label hero__cta-label--long">WhatsApp</span>
              <span className="hero__cta-label hero__cta-label--short" aria-hidden>
                WA
              </span>
            </WhatsAppButton>
            <a href="#portfolio" className="btn hero__cta hero__cta--cutout">
              <span className="hero__cta-cutout">Ver trabalhos</span>
            </a>
          </div>
        </div>
      </div>

      <a
        href="#portfolio"
        className="hero__scroll relative z-10 mx-auto mt-auto flex min-h-[44px] flex-col items-center gap-0.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted transition hover:text-red-light"
        aria-label="Rolar para portfólio"
      >
        <span>Portfólio</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 5v14M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
