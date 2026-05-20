import { useState } from "react";
import { BRAND } from "../data/site";
import { assetUrl } from "../lib/assetUrl";
import { cn } from "../lib/cn";

const heights = {
  nav: "h-[3.25rem] w-auto max-w-[92px] sm:h-[3.75rem] sm:max-w-[104px]",
  footer: "h-[7.5rem] w-auto max-w-[180px]",
  hero: "h-[min(18rem,52vw)] w-auto max-w-[min(92vw,480px)] sm:h-[min(22rem,46vw)] md:h-[min(26rem,38vw)] md:max-w-[580px]",
} as const;

type LogoSize = keyof typeof heights;

type Props = {
  size?: LogoSize;
  className?: string;
};

const FALLBACK_LOGO = assetUrl("manel-logo.png");

export function Logo({ size = "nav", className }: Props) {
  const [src, setSrc] = useState<string>(BRAND.logo);

  return (
    <span className="logo-wrap inline-flex shrink-0 items-center justify-center">
      <img
        src={src}
        alt=""
        width={420}
        height={540}
        className={cn("logo-blend object-contain", heights[size], className)}
        decoding="async"
        aria-hidden
        onError={() => {
          if (src !== FALLBACK_LOGO) setSrc(FALLBACK_LOGO);
        }}
      />
    </span>
  );
}
