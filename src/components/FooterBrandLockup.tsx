import { BRAND } from "../data/site";
import { cn } from "../lib/cn";

type Props = {
  className?: string;
};

/** Lockup do rodapé (figura + MANEL + TATTOO em gradiente). */
export function FooterBrandLockup({ className }: Props) {
  return (
    <div
      className={cn("footer-brand-lockup-stack", className)}
      role="img"
      aria-label="Manel Tattoo"
    >
      <img
        src={BRAND.brandLockupMark}
        alt=""
        width={1024}
        height={1024}
        className="footer-brand-lockup-stack__mark brand-lockup-image block h-auto w-full max-w-full object-contain"
        decoding="async"
        draggable={false}
      />
      <div
        className="footer-brand-lockup-stack__tattoo brand-tattoo-gradient"
        style={{
          WebkitMaskImage: `url(${BRAND.brandTattooMask})`,
          maskImage: `url(${BRAND.brandTattooMask})`,
        }}
        aria-hidden
      />
    </div>
  );
}
