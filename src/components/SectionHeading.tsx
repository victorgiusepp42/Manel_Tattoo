import { cn } from "../lib/cn";

type Props = {
  line1: string;
  line2: string;
  as?: "h2" | "h3";
  size?: "lg" | "md";
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
  className,
}: Props) {
  const s = sizes[size];

  return (
    <Tag className={cn("brand-title m-0 leading-[0.88]", className)}>
      <span className={cn("brand-title__line block font-black uppercase text-cream", s.line1)}>
        {line1}
      </span>
      <span
        className={cn(
          "brand-title__line block font-black uppercase text-gradient-brand",
          s.line2,
        )}
      >
        {line2}
      </span>
    </Tag>
  );
}
