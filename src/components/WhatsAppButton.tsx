import type { ReactNode } from "react";
import { whatsappUrl } from "../data/site";
import { cn } from "../lib/cn";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

type Props = {
  children?: ReactNode;
  className?: string;
  message?: string;
  /** Quando true, não renderiza o ícone padrão do WhatsApp (ex.: card de viagem). */
  hideIcon?: boolean;
  /** Agrupa ícone + texto para alinhamento central no hero. */
  grouped?: boolean;
};

export function WhatsAppButton({
  children,
  className,
  message = "Oi! Vi o site da Manel Tattoo e quero saber mais.",
  hideIcon = false,
  grouped = false,
}: Props) {
  const icon =
    !hideIcon ? (
      <WhatsAppIcon
        className={cn(grouped ? "hero__cta-icon btn-whatsapp__icon" : "btn-whatsapp__icon", "shrink-0")}
      />
    ) : null;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-whatsapp", className)}
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
