import { BRAND } from "../data/site";
import { cn } from "../lib/cn";

type Size = "hero" | "footer";

const sizes = {
  hero: "h-auto w-auto max-w-full",
  footer: "w-[min(49.725vw,7.0125rem)] sm:w-[min(44.625vw,7.96875rem)]",
} as const;

type Props = {
  size?: Size;
  className?: string;
};

/** Logo oficial completo (figura + MANEL + TATTOO) — tipografia do ficheiro da marca. */
export function BrandLockupImage({ size = "hero", className }: Props) {
  return (
    <img
      src={BRAND.brandLockup}
      alt="Manel Tattoo"
      width={1024}
      height={1024}
      className={cn("brand-lockup-image block h-auto max-w-full object-contain", sizes[size], className)}
      decoding="async"
      fetchPriority="high"
      draggable={false}
    />
  );
}
