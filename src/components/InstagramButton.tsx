import type { ReactNode } from "react";
import { instagramUrl } from "../data/site";
import { cn } from "../lib/cn";
import { InstagramIcon } from "./icons/InstagramIcon";

type Props = {
  children: ReactNode;
  className?: string;
};

export function InstagramButton({ children, className }: Props) {
  return (
    <a
      href={instagramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn btn-instagram", className)}
    >
      <InstagramIcon className="h-5 w-5 shrink-0" />
      {children}
    </a>
  );
}
