import { useEffect, useRef } from "react";
import { BRAND } from "../data/site";
import { LightParticles } from "./LightParticles";

export function BrandBackground() {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!artRef.current) return;
      const y = window.scrollY * 0.04;
      artRef.current.style.setProperty("--scroll-y", `${y}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="brand-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Ilustração central — sem moldura (crop ampliado) */}
      <div
        ref={artRef}
        className="brand-bg__art absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${BRAND.heroArt})`,
        }}
      />

      {/* Labaredas — fluidez sobre a arte */}
      <span className="brand-bg__fire" />
      <span className="brand-bg__fire brand-bg__fire--2" />

      <div className="brand-bg__veil absolute inset-0" />

      <LightParticles />
    </div>
  );
}
