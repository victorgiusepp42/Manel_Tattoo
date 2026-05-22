import { useEffect, useRef } from "react";
import { useScrollIdleRef } from "../hooks/useScrollIdle";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  c: string;
  phase: number;
  twinkle: number;
  glow: boolean;
};

/** Branco, amarelo e vermelho (tons da marca). */
const COLORS = [
  "255,255,255",
  "255,252,245",
  "253,224,71",
  "251,191,36",
  "255,210,120",
  "248,113,113",
  "239,68,68",
  "220,38,38",
] as const;

export function LightParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollIdleRef = useScrollIdleRef(140);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let tick = 0;
    let particles: Particle[] = [];
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const maxCount = coarse ? 42 : 95;
    const minCount = coarse ? 28 : 58;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const area = canvas.width * canvas.height;
      const count = Math.min(maxCount, Math.max(minCount, Math.round(area / (coarse ? 11000 : 7200))));

      particles = Array.from({ length: count }, (_, i) => {
        const glow = i % 4 === 0;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: glow ? Math.random() * 2.2 + 1.4 : Math.random() * 1.4 + 0.5,
          vx: (Math.random() - 0.5) * (glow ? 0.1 : 0.2),
          vy: (Math.random() - 0.5) * (glow ? 0.1 : 0.2),
          a: glow ? Math.random() * 0.16 + 0.38 : Math.random() * 0.18 + 0.26,
          c: COLORS[Math.floor(Math.random() * COLORS.length)]!,
          phase: Math.random() * Math.PI * 2,
          twinkle: Math.random() * 0.028 + 0.016,
          glow,
        };
      });
    };

    const drawParticle = (p: Particle, alpha: number) => {
      const haloR = p.r * (p.glow ? 4 : 2.6);

      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
      halo.addColorStop(0, `rgba(${p.c},${alpha * 0.92})`);
      halo.addColorStop(0.35, `rgba(${p.c},${alpha * 0.42})`);
      halo.addColorStop(1, `rgba(${p.c},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${alpha * 0.96})`;
      ctx.fill();
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (document.hidden) return;

      tick += 1;
      if (!scrollIdleRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -16) p.x = canvas.width + 16;
        if (p.x > canvas.width + 16) p.x = -16;
        if (p.y < -16) p.y = canvas.height + 16;
        if (p.y > canvas.height + 16) p.y = -16;

        const pulse = 0.78 + 0.22 * Math.sin(tick * p.twinkle + p.phase);
        drawParticle(p, Math.min(0.78, p.a * pulse));
      });
      ctx.globalCompositeOperation = "source-over";
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [scrollIdleRef]);

  return <canvas ref={canvasRef} className="light-particles" aria-hidden />;
}
