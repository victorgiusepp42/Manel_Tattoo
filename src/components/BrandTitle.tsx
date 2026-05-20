import { cn } from "../lib/cn";

type Props = {
  size?: "hero" | "nav" | "footer";
  className?: string;
};

const sizes = {
  hero: {
    line1: "text-[clamp(3.1rem,12.5vw,6.25rem)]",
    line2: "text-[clamp(3.1rem,12.5vw,6.25rem)]",
  },
  nav: {
    line1: "text-xl leading-none sm:text-2xl",
    line2: "text-xl leading-none sm:text-2xl",
  },
  footer: {
    line1: "text-2xl",
    line2: "text-2xl",
  },
} as const;

export function BrandTitle({ size = "hero", className }: Props) {
  const s = sizes[size];

  return (
    <h1 className={cn("brand-title m-0", className)} aria-label="Manel Tattoo">
      <span className={cn("brand-title__line block font-black uppercase text-cream", s.line1)}>
        Manel
      </span>
      <span
        className={cn(
          "brand-title__line block font-black uppercase text-gradient-brand",
          s.line2,
        )}
      >
        Tattoo
      </span>
    </h1>
  );
}
