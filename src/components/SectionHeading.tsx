import { cn } from "../lib/cn";

type Props = {
  line1: string;
  line2: string;
  as?: "h2" | "h3";
  size?: "lg" | "md";
  layout?: "stack" | "inline";
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

export function SectionHeading({
  line1,
  line2,
  as: Tag = "h2",
  size = "lg",
  layout = "stack",
  className,
}: Props) {
  const s = sizes[size];
  const inline = layout === "inline";

  return (
    <Tag
      className={cn(
        "brand-title m-0",
        inline ? "brand-title--inline flex flex-wrap items-baseline gap-x-3" : "leading-[0.88]",
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
}
