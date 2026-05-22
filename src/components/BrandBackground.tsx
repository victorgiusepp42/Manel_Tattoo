import { BRAND } from "../data/site";
import { LightParticles } from "./LightParticles";

/** Fundo fixo — sem listeners de scroll (parallax ia ao main thread e travava em mobile). */
export function BrandBackground() {
  return (
    <div className="brand-bg fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="brand-bg__art absolute left-0 right-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${BRAND.heroArt})`,
        }}
      />

      <div className="brand-bg__veil absolute left-0 right-0" />

      <LightParticles />
    </div>
  );
}
