import { assetUrl } from "../../lib/assetUrl";

type Props = { className?: string };

/** Máquina de tatuar (PNG transparente, traços brancos). */
export function TattooMachineIcon({ className }: Props) {
  return (
    <img
      src={assetUrl("tattoo-machine-icon.png")}
      alt=""
      width={40}
      height={34}
      className={className}
      decoding="async"
      aria-hidden
    />
  );
}
