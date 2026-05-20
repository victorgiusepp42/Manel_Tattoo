import type { ReactNode } from "react";
import { whatsappUrl } from "../data/site";
import { cn } from "../lib/cn";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

type Props = {
  children?: ReactNode;
  className?: string;
  message?: string;
};

export function WhatsAppButton({
  children,
  className,
  message = "Oi! Vi o site da Manel Tattoo e quero saber mais.",
}: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-whatsapp", className)}
    >
      <WhatsAppIcon className="btn-whatsapp__icon shrink-0" />
      {children}
    </a>
  );
}
