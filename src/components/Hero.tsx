import { useRef } from "react";
import { useFitOneLine } from "../hooks/useFitOneLine";
import { HeroBrandLockup } from "./HeroBrandLockup";
import { InstagramButton } from "./InstagramButton";
import { WhatsAppButton } from "./WhatsAppButton";
import { Ticker } from "./Ticker";
import { TattooMachineIcon } from "./icons/TattooMachineIcon";

export function Hero() {
  const ctaBlockRef = useRef<HTMLDivElement>(null);
  const taglinePrimaryRef = useFitOneLine<HTMLParagraphElement>({
    minPx: 7,
    maxPx: 18,
    widthRef: ctaBlockRef,
  });

  return (
    <section
      id="inicio"
      className="hero relative flex flex-col overflow-hidden"
    >
      <Ticker />
      <div className="hero__inner relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <div className="hero__content">
          <div className="hero__cluster">
            <HeroBrandLockup className="hero-brand-lockup" />

            <div ref={ctaBlockRef} className="hero__cta-block">
              <div className="hero__actions">
                <InstagramButton
                  grouped
                  className="hero__cta hero__cta--instagram btn-instagram--compact"
                >
                  Instagram
                </InstagramButton>
                <WhatsAppButton grouped className="hero__cta hero__cta--whatsapp">
                  WHATSAPP
                </WhatsAppButton>
                <a href="#portfolio" className="btn hero__cta hero__cta--portfolio">
                  <span className="hero__cta-content">
                    <TattooMachineIcon className="hero__cta-portfolio-icon shrink-0" />
                    <span className="hero__cta-label hero__cta-portfolio">Portfólio</span>
                  </span>
                </a>
              </div>

              <div className="hero__taglines">
                <p
                  ref={taglinePrimaryRef}
                  className="hero__tagline-line hero__tagline-line--primary font-manel"
                >
                  Tatuagem autoral com semanas dedicadas na sua cidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
