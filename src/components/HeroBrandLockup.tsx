import { BRAND } from "../data/site";
import { cn } from "../lib/cn";

type Props = {
  className?: string;
};

/** Lockup do hero: figura + MANEL em PNG; TATTOO com o mesmo gradiente de «Portfólio». */
export function HeroBrandLockup({ className }: Props) {
  return (
    <div
      className={cn("hero-brand-lockup-stack", className)}
      role="img"
      aria-label="Manel Tattoo"
    >
      <img
        src={BRAND.brandLockupMark}
        alt=""
        width={1024}
        height={1024}
        className="hero-brand-lockup-stack__mark brand-lockup-image block h-auto w-auto max-w-full object-contain"
        decoding="async"
        fetchPriority="high"
        draggable={false}
      />
      <div
        className="hero-brand-lockup-stack__tattoo brand-tattoo-gradient"
        style={{
          WebkitMaskImage: `url(${BRAND.brandTattooMask})`,
          maskImage: `url(${BRAND.brandTattooMask})`,
        }}
        aria-hidden
      />
    </div>
  );
}
