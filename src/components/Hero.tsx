import { BrandTitle } from "./BrandTitle";
import { InstagramButton } from "./InstagramButton";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section
      id="inicio"
      className="hero relative flex min-h-[100dvh] flex-col overflow-hidden px-5 pb-6"
    >
      <div className="hero__inner relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <div className="hero__content">
          <div className="hero-brand-cluster">
            <Logo size="hero" className="logo-tone-original" />
            <BrandTitle size="hero" className="hero-brand-cluster__title" />
          </div>

          <p className="mx-auto mt-2 max-w-lg text-base font-medium text-muted md:mt-3 md:text-lg">
            Tatuagem autoral com semanas dedicadas na sua cidade. Traço forte, conversa direta.
          </p>

          <div className="mt-4 flex w-full max-w-md flex-col gap-3 sm:mt-5 sm:max-w-none sm:flex-row sm:justify-center">
            <InstagramButton className="min-h-[48px] w-full sm:w-auto">
              Chamar no Instagram
            </InstagramButton>
            <a href="#portfolio" className="btn btn-ghost min-h-[48px] w-full sm:w-auto">
              Ver trabalhos
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
