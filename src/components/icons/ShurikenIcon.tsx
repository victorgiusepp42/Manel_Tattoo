import { assetUrl } from "../../lib/assetUrl";

type Props = { className?: string };

export function ShurikenIcon({ className }: Props) {
  return (
    <img
      src={assetUrl("shuriken-icon.png")}
      alt=""
      width={20}
      height={20}
      className={className}
      decoding="async"
      aria-hidden
    />
  );
}
