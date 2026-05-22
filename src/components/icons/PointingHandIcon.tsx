import { assetUrl } from "../../lib/assetUrl";

type Props = { className?: string };

/** Mãozinha clicando (PNG branco, fundo transparente). */
export function PointingHandIcon({ className }: Props) {
  return (
    <img
      src={assetUrl("pointing-hand-icon.png")}
      alt=""
      width={22}
      height={18}
      className={className}
      decoding="async"
      aria-hidden
    />
  );
}
