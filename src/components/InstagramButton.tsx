import type { ReactNode } from "react";
import { instagramUrl } from "../data/site";
import { cn } from "../lib/cn";
import { InstagramIcon } from "./icons/InstagramIcon";

type Props = {
  children: ReactNode;
  className?: string;
  /** Agrupa ícone + texto para alinhamento central no hero. */
  grouped?: boolean;
};

export function InstagramButton({ children, className, grouped = false }: Props) {
  const icon = (
    <InstagramIcon
      className={cn(grouped ? "hero__cta-icon" : "h-5 w-5", "shrink-0")}
    />
  );

  return (
    <a
      href={instagramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-instagram", className)}
    >
      {grouped ? (
        <span className="hero__cta-content">
          {icon}
          <span className="hero__cta-label">{children}</span>
        </span>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </a>
  );
}
