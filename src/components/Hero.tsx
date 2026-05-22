import { useRef } from "react";
import { useFitOneLine } from "../hooks/useFitOneLine";
import { HeroBrandLockup } from "./HeroBrandLockup";
import { InstagramButton } from "./InstagramButton";
import { WhatsAppButton } from "./WhatsAppButton";
import { TattooMachineIcon } from "./icons/TattooMachineIcon";

export function Hero() {
  const actionsRef = useRef<HTMLDivElement>(null);
  const taglinePrimaryRef = useFitOneLine<HTMLParagraphElement>({
    minPx: 7,
    maxPx: 18,
    widthRef: actionsRef,
  });

  return (
    <section
      id="inicio"
      className="hero relative flex flex-col overflow-hidden"
    >
      <div className="hero__inner relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <div className="hero__content">
          <div className="hero__content-top">
            <HeroBrandLockup className="hero-brand-lockup" />
          </div>

          <div ref={actionsRef} className="hero__actions">
            <InstagramButton className="hero__cta hero__cta--instagram btn-instagram--compact">
              Instagram
            </InstagramButton>
            <WhatsAppButton className="hero__cta hero__cta--whatsapp">
              WHATSAPP
            </WhatsAppButton>
            <a href="#portfolio" className="btn hero__cta hero__cta--portfolio">
              <TattooMachineIcon className="hero__cta-portfolio-icon shrink-0" />
              <span className="hero__cta-portfolio">Portfólio</span>
            </a>
          </div>

          <div className="hero__taglines">
            <p
              ref={taglinePrimaryRef}
              className="hero__tagline-line hero__tagline-line--primary font-manel text-muted"
            >
              Tatuagem autoral com semanas dedicadas na sua cidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
