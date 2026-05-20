import { useEffect, useRef } from "react";
import { BRAND } from "../data/site";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  c: string;
};

const COLORS = ["185,28,28", "248,113,113", "245,158,11", "251,191,36"];

export function BrandBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 48 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        a: Math.random() * 0.28 + 0.05,
        c: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        if (p.y < -4) p.y = canvas.height + 4;
        if (p.y > canvas.height + 4) p.y = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      if (!artRef.current) return;
      const y = window.scrollY * 0.04;
      artRef.current.style.setProperty("--scroll-y", `${y}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="brand-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="brand-bg__canvas absolute inset-0 h-full w-full" />

      {/* Ilustração central — sem moldura (crop ampliado) */}
      <div
        ref={artRef}
        className="brand-bg__art absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${BRAND.heroArt})`,
        }}
      />

      {/* Lua / sol / fogo — fluidez sobre a arte */}
      <span className="brand-bg__moon" />
      <span className="brand-bg__sun" />
      <span className="brand-bg__fire" />
      <span className="brand-bg__fire brand-bg__fire--2" />

      <div className="brand-bg__veil absolute inset-0" />

    </div>
  );
}
