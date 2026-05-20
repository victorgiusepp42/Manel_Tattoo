import { useState } from "react";
import { BRAND } from "../data/site";
import { assetUrl } from "../lib/assetUrl";
import { cn } from "../lib/cn";

const heights = {
  nav: "h-[3.25rem] w-auto max-w-[92px] sm:h-[3.75rem] sm:max-w-[104px]",
  footer: "h-[7.5rem] w-auto max-w-[180px]",
  hero: "h-[18rem] w-auto max-w-[min(92vw,520px)] sm:h-[22rem] md:h-[28rem] md:max-w-[640px]",
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
