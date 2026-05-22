import { assetUrl } from "../../lib/assetUrl";

type Props = { className?: string };

/** Casinha (linhas brancas, fundo transparente). */
export function HomeIcon({ className }: Props) {
  return (
    <img
      src={assetUrl("home-icon.png")}
      alt=""
      width={22}
      height={20}
      className={className}
      decoding="async"
      aria-hidden
    />
  );
}
