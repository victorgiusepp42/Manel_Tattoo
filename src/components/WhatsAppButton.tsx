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
};

export function WhatsAppButton({
  children,
  className,
  message = "Oi! Vi o site da Manel Tattoo e quero saber mais.",
  hideIcon = false,
}: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-whatsapp", className)}
    >
      {!hideIcon ? <WhatsAppIcon className="btn-whatsapp__icon shrink-0" /> : null}
      {children}
    </a>
  );
}
