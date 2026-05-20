import { forwardRef } from "react";
import { cn } from "../lib/cn";

type Props = {
  line1: string;
  line2: string;
  as?: "h2" | "h3";
  size?: "lg" | "md";
  layout?: "stack" | "inline";
  nowrap?: boolean;
  className?: string;
};

const sizes = {
  lg: {
    line1: "text-[clamp(2.25rem,8vw,3.5rem)]",
    line2: "text-[clamp(2.25rem,8vw,3.5rem)]",
  },
  md: {
    line1: "text-2xl md:text-3xl",
    line2: "text-2xl md:text-3xl",
  },
} as const;

export const SectionHeading = forwardRef<HTMLHeadingElement, Props>(function SectionHeading(
  {
    line1,
    line2,
    as: Tag = "h2",
    size = "lg",
    layout = "stack",
    nowrap = false,
    className,
  },
  ref,
) {
  const s = sizes[size];
  const inline = layout === "inline";

  return (
    <Tag
      ref={ref}
      className={cn(
        "brand-title m-0",
        inline
          ? cn(
              "brand-title--inline flex items-baseline gap-x-3",
              nowrap ? "flex-nowrap" : "flex-wrap",
            )
          : "leading-[0.88]",
        className,
      )}
    >
      <span
        className={cn(
          "brand-title__line font-black uppercase text-cream",
          inline ? "inline" : "block",
          s.line1,
        )}
      >
        {line1}
      </span>
      <span
        className={cn(
          "brand-title__line font-black uppercase text-gradient-brand",
          inline ? "inline" : "block",
          s.line2,
        )}
      >
        {line2}
      </span>
    </Tag>
  );
});
